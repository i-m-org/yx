/**
 * Service Worker - Sistema de Ventas
 * Estrategia: Cache-First para assets estáticos
 * IndexedDB: Base de datos local completa
 * Background Sync: Sincronización cuando reconecta internet
 */

const APP_VERSION = 'v1.0.0';
const CACHE_STATIC = `ventas-static-${APP_VERSION}`;
const CACHE_DYNAMIC = `ventas-dynamic-${APP_VERSION}`;
const DB_NAME = 'VentasAppDB';
const DB_VERSION = 1;
const SYNC_TAG = 'ventas-sync';

// Assets esenciales para funcionamiento offline
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// ─────────────────────────────────────────────
// INSTALL: Pre-cache assets estáticos
// ─────────────────────────────────────────────
self.addEventListener('install', (event) => {
  console.log('[SW] Instalando versión', APP_VERSION);
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => {
      console.log('[SW] Assets estáticos cacheados');
      return self.skipWaiting();
    })
  );
});

// ─────────────────────────────────────────────
// ACTIVATE: Limpiar caches viejos
// ─────────────────────────────────────────────
self.addEventListener('activate', (event) => {
  console.log('[SW] Activando versión', APP_VERSION);
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name.startsWith('ventas-') &&
              name !== CACHE_STATIC &&
              name !== CACHE_DYNAMIC;
          })
          .map((name) => {
            console.log('[SW] Eliminando cache viejo:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      console.log('[SW] Activación completa, tomando control');
      return self.clients.claim();
    })
  );
});

// ─────────────────────────────────────────────
// FETCH: Estrategia Cache-First / Offline-First
// ─────────────────────────────────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorar requests que no son de nuestra app
  if (!url.origin.includes(self.location.origin) && !url.pathname.startsWith('/')) {
    return;
  }

  // Ignorar métodos que no son GET
  if (request.method !== 'GET') {
    return;
  }

  // Ignorar chrome-extension y otros protocolos
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(
    cacheFirst(request)
  );
});

/**
 * Estrategia Cache-First:
 * 1. Busca en cache → si existe, retorna inmediatamente
 * 2. Si no está en cache → busca en red y guarda en cache dinámico
 * 3. Si no hay red → retorna página offline
 */
async function cacheFirst(request) {
  const url = new URL(request.url);
  const isNavigation = request.mode === 'navigate';
  const isAsset = url.pathname.match(/\.(js|css|png|jpg|jpeg|svg|ico|woff|woff2|ttf)$/);

  // Para assets y navegación: cache primero
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    // Actualizar cache en segundo plano si hay red
    if (navigator.onLine !== false) {
      refreshCache(request);
    }
    return cachedResponse;
  }

  // No está en cache, intentar red
  try {
    const networkResponse = await fetch(request.clone());

    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(
        isAsset ? CACHE_STATIC : CACHE_DYNAMIC
      );
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Sin red, cargando fallback para:', request.url);

    // Fallback para navegación: retornar index.html cacheado
    if (isNavigation) {
      const fallback = await caches.match('/index.html') ||
                       await caches.match('/');
      if (fallback) return fallback;
    }

    // Fallback genérico
    return new Response(
      JSON.stringify({ error: 'Sin conexión', offline: true }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

/**
 * Actualiza cache en segundo plano (stale-while-revalidate)
 */
async function refreshCache(request) {
  try {
    const networkResponse = await fetch(request.clone());
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(CACHE_STATIC);
      await cache.put(request, networkResponse);
    }
  } catch {
    // Sin conexión, ignorar silenciosamente
  }
}

// ─────────────────────────────────────────────
// BACKGROUND SYNC: Sincronizar cuando reconecta
// ─────────────────────────────────────────────
self.addEventListener('sync', (event) => {
  console.log('[SW] Background Sync activado, tag:', event.tag);

  if (event.tag === SYNC_TAG || event.tag.startsWith('ventas-')) {
    event.waitUntil(processSyncQueue());
  }
});

/**
 * Procesa la cola de operaciones pendientes
 */
async function processSyncQueue() {
  console.log('[SW] Procesando cola de sincronización...');

  try {
    const db = await openDB();
    const pendientes = await getAllFromStore(db, 'syncQueue');

    if (pendientes.length === 0) {
      console.log('[SW] No hay operaciones pendientes');
      notifyClients({ type: 'SYNC_COMPLETE', pendientes: 0 });
      return;
    }

    console.log(`[SW] ${pendientes.length} operaciones pendientes`);

    let procesadas = 0;
    const errores = [];

    for (const operacion of pendientes) {
      try {
        // Si hay una URL de API configurada, enviar al servidor
        // Por ahora, marcamos como procesada localmente
        const resultado = await procesarOperacion(operacion);

        if (resultado.exito) {
          await deleteFromStore(db, 'syncQueue', operacion.id);
          procesadas++;
        } else {
          errores.push(operacion);
        }
      } catch (error) {
        console.error('[SW] Error procesando operación:', operacion.id, error);
        errores.push(operacion);
      }
    }

    console.log(`[SW] Sync completo: ${procesadas} procesadas, ${errores.length} errores`);

    // Notificar a la app
    notifyClients({
      type: 'SYNC_COMPLETE',
      procesadas,
      errores: errores.length,
      total: pendientes.length,
      timestamp: new Date().toISOString()
    });

    // Actualizar estado de conexión
    notifyClients({ type: 'ONLINE_STATUS', online: true });

  } catch (error) {
    console.error('[SW] Error en processSyncQueue:', error);
    notifyClients({ type: 'SYNC_ERROR', error: error.message });
  }
}

/**
 * Procesa una operación individual de la cola
 */
async function procesarOperacion(operacion) {
  const { tipo, store, datos, apiUrl } = operacion;

  // Si hay API URL configurada, intentar sincronizar con servidor
  if (apiUrl) {
    try {
      const metodo = tipo === 'CREATE' ? 'POST' :
                     tipo === 'UPDATE' ? 'PUT' :
                     tipo === 'DELETE' ? 'DELETE' : 'POST';

      const response = await fetch(apiUrl, {
        method: metodo,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
      });

      return { exito: response.ok, response };
    } catch {
      return { exito: false };
    }
  }

  // Sin API: marcar como procesada (datos ya están en IndexedDB localmente)
  return { exito: true, local: true };
}

// ─────────────────────────────────────────────
// MENSAJE desde la App
// ─────────────────────────────────────────────
self.addEventListener('message', (event) => {
  const { type, payload } = event.data || {};

  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;

    case 'GET_VERSION':
      event.source.postMessage({ type: 'VERSION', version: APP_VERSION });
      break;

    case 'FORCE_SYNC':
      processSyncQueue();
      break;

    case 'CACHE_URLS':
      if (payload && payload.urls) {
        caches.open(CACHE_DYNAMIC).then((cache) => {
          cache.addAll(payload.urls);
        });
      }
      break;

    case 'CLEAR_CACHE':
      caches.keys().then((names) => {
        Promise.all(names.map((name) => caches.delete(name)));
      });
      break;

    default:
      console.log('[SW] Mensaje desconocido:', type);
  }
});

// ─────────────────────────────────────────────
// PUSH NOTIFICATIONS (futuro)
// ─────────────────────────────────────────────
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'Sistema de Ventas';
  const options = {
    body: data.body || 'Nueva notificación',
    icon: '/icons/icon-192.png',
    badge: '/icons/icon-72.png',
    vibrate: [100, 50, 100],
    data: { url: data.url || '/' },
    actions: [
      { action: 'open', title: 'Ver' },
      { action: 'close', title: 'Cerrar' }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open' || !event.action) {
    const url = event.notification.data?.url || '/';
    event.waitUntil(
      clients.openWindow(url)
    );
  }
});

// ─────────────────────────────────────────────
// HELPERS: IndexedDB
// ─────────────────────────────────────────────

/**
 * Abre la base de datos IndexedDB del SW
 */
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      // Store para sucursales
      if (!db.objectStoreNames.contains('sucursales')) {
        const store = db.createObjectStore('sucursales', { keyPath: 'id' });
        store.createIndex('nombre', 'nombre', { unique: false });
      }

      // Store para empleados
      if (!db.objectStoreNames.contains('empleados')) {
        const store = db.createObjectStore('empleados', { keyPath: 'id' });
        store.createIndex('sucursalId', 'sucursalId', { unique: false });
        store.createIndex('nombre', 'nombre', { unique: false });
      }

      // Store para productos
      if (!db.objectStoreNames.contains('productos')) {
        db.createObjectStore('productos', { keyPath: 'id' });
      }

      // Store para metas
      if (!db.objectStoreNames.contains('metas')) {
        const store = db.createObjectStore('metas', { keyPath: 'id' });
        store.createIndex('mes', 'mes', { unique: false });
        store.createIndex('anio', 'anio', { unique: false });
        store.createIndex('sucursalId', 'sucursalId', { unique: false });
      }

      // Store para ventas
      if (!db.objectStoreNames.contains('ventas')) {
        const store = db.createObjectStore('ventas', { keyPath: 'id' });
        store.createIndex('fecha', 'fecha', { unique: false });
        store.createIndex('empleadoId', 'empleadoId', { unique: false });
        store.createIndex('sucursalId', 'sucursalId', { unique: false });
        store.createIndex('synced', 'synced', { unique: false });
      }

      // Store para ofertas comerciales
      if (!db.objectStoreNames.contains('ofertasComerciales')) {
        db.createObjectStore('ofertasComerciales', { keyPath: 'id' });
      }

      // Store para registros históricos
      if (!db.objectStoreNames.contains('registrosHistoricos')) {
        const store = db.createObjectStore('registrosHistoricos', { keyPath: 'id' });
        store.createIndex('mes', 'mes', { unique: false });
        store.createIndex('anio', 'anio', { unique: false });
      }

      // Store para configuración de infografías
      if (!db.objectStoreNames.contains('infografiasConfig')) {
        db.createObjectStore('infografiasConfig', { keyPath: 'key' });
      }

      // ⚡ Cola de sincronización (operaciones pendientes sin conexión)
      if (!db.objectStoreNames.contains('syncQueue')) {
        const store = db.createObjectStore('syncQueue', {
          keyPath: 'id',
          autoIncrement: true
        });
        store.createIndex('storeName', 'storeName', { unique: false });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('synced', 'synced', { unique: false });
      }

      // Store para metadatos / configuración general
      if (!db.objectStoreNames.contains('appMeta')) {
        db.createObjectStore('appMeta', { keyPath: 'key' });
      }

      console.log('[SW] Base de datos creada/actualizada');
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Obtiene todos los registros de un store
 */
function getAllFromStore(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result || []);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Elimina un registro por ID
 */
function deleteFromStore(db, storeName, id) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

/**
 * Notifica a todos los clientes (tabs abiertas)
 */
async function notifyClients(message) {
  const allClients = await self.clients.matchAll({ includeUncontrolled: true });
  allClients.forEach((client) => {
    client.postMessage(message);
  });
}
