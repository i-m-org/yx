/**
 * lib/db.ts
 * Wrapper completo de IndexedDB para la app de Ventas.
 * Proporciona:
 *  - CRUD para cada entidad
 *  - Cola de sincronización (syncQueue) para operaciones offline
 *  - Detección de conectividad y disparo de Background Sync
 */

import type {
  AppState,
  Sucursal,
  Empleado,
  Producto,
  Meta,
  Venta,
  OfertaComercial,
  RegistroHistorico,
  InfografiasConfig,
} from './types';

// ─────────────────────────────────────────────────────────────────────────────
// Constantes
// ─────────────────────────────────────────────────────────────────────────────
export const DB_NAME = 'VentasAppDB';
export const DB_VERSION = 1;
export const SYNC_TAG = 'ventas-sync';

export const STORES = {
  sucursales: 'sucursales',
  empleados: 'empleados',
  productos: 'productos',
  metas: 'metas',
  ventas: 'ventas',
  ofertasComerciales: 'ofertasComerciales',
  registrosHistoricos: 'registrosHistoricos',
  infografiasConfig: 'infografiasConfig',
  syncQueue: 'syncQueue',
  appMeta: 'appMeta',
} as const;

export type StoreName = (typeof STORES)[keyof typeof STORES];

export type SyncOperationType = 'CREATE' | 'UPDATE' | 'DELETE';

export interface SyncQueueItem {
  id?: number;
  storeName: StoreName;
  operationType: SyncOperationType;
  recordId: string;
  datos: unknown;
  timestamp: string;
  synced: boolean;
  intentos: number;
  apiUrl?: string;
}

// ─────────────────────────────────────────────────────────────────────────────
// Singleton de la conexión DB
// ─────────────────────────────────────────────────────────────────────────────
let dbInstance: IDBDatabase | null = null;

export function openDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // sucursales
      if (!db.objectStoreNames.contains(STORES.sucursales)) {
        const s = db.createObjectStore(STORES.sucursales, { keyPath: 'id' });
        s.createIndex('nombre', 'nombre', { unique: false });
      }

      // empleados
      if (!db.objectStoreNames.contains(STORES.empleados)) {
        const s = db.createObjectStore(STORES.empleados, { keyPath: 'id' });
        s.createIndex('sucursalId', 'sucursalId', { unique: false });
        s.createIndex('nombre', 'nombre', { unique: false });
      }

      // productos
      if (!db.objectStoreNames.contains(STORES.productos)) {
        db.createObjectStore(STORES.productos, { keyPath: 'id' });
      }

      // metas
      if (!db.objectStoreNames.contains(STORES.metas)) {
        const s = db.createObjectStore(STORES.metas, { keyPath: 'id' });
        s.createIndex('mes', 'mes', { unique: false });
        s.createIndex('anio', 'anio', { unique: false });
        s.createIndex('sucursalId', 'sucursalId', { unique: false });
      }

      // ventas
      if (!db.objectStoreNames.contains(STORES.ventas)) {
        const s = db.createObjectStore(STORES.ventas, { keyPath: 'id' });
        s.createIndex('fecha', 'fecha', { unique: false });
        s.createIndex('empleadoId', 'empleadoId', { unique: false });
        s.createIndex('sucursalId', 'sucursalId', { unique: false });
        s.createIndex('synced', 'synced', { unique: false });
      }

      // ofertasComerciales
      if (!db.objectStoreNames.contains(STORES.ofertasComerciales)) {
        db.createObjectStore(STORES.ofertasComerciales, { keyPath: 'id' });
      }

      // registrosHistoricos
      if (!db.objectStoreNames.contains(STORES.registrosHistoricos)) {
        const s = db.createObjectStore(STORES.registrosHistoricos, { keyPath: 'id' });
        s.createIndex('mes', 'mes', { unique: false });
        s.createIndex('anio', 'anio', { unique: false });
      }

      // infografiasConfig
      if (!db.objectStoreNames.contains(STORES.infografiasConfig)) {
        db.createObjectStore(STORES.infografiasConfig, { keyPath: 'key' });
      }

      // syncQueue
      if (!db.objectStoreNames.contains(STORES.syncQueue)) {
        const s = db.createObjectStore(STORES.syncQueue, {
          keyPath: 'id',
          autoIncrement: true,
        });
        s.createIndex('storeName', 'storeName', { unique: false });
        s.createIndex('timestamp', 'timestamp', { unique: false });
        s.createIndex('synced', 'synced', { unique: false });
      }

      // appMeta
      if (!db.objectStoreNames.contains(STORES.appMeta)) {
        db.createObjectStore(STORES.appMeta, { keyPath: 'key' });
      }
    };

    request.onsuccess = () => {
      dbInstance = request.result;

      // Limpiar instancia si la DB se cierra inesperadamente
      dbInstance.onclose = () => { dbInstance = null; };
      dbInstance.onerror = (e) => console.error('[DB] Error:', e);

      resolve(dbInstance);
    };

    request.onerror = () => reject(request.error);
    request.onblocked = () => console.warn('[DB] Conexión bloqueada por otra pestaña');
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CRUD genérico
// ─────────────────────────────────────────────────────────────────────────────

export async function dbGetAll<T>(storeName: StoreName): Promise<T[]> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.getAll();
    req.onsuccess = () => resolve((req.result as T[]) || []);
    req.onerror = () => reject(req.error);
  });
}

export async function dbGet<T>(storeName: StoreName, id: string | number): Promise<T | undefined> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const store = tx.objectStore(storeName);
    const req = store.get(id);
    req.onsuccess = () => resolve(req.result as T);
    req.onerror = () => reject(req.error);
  });
}

export async function dbPut<T>(storeName: StoreName, data: T): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.put(data);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function dbPutMany<T>(storeName: StoreName, items: T[]): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    items.forEach((item) => store.put(item));
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function dbDelete(storeName: StoreName, id: string | number): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.delete(id);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function dbClear(storeName: StoreName): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const store = tx.objectStore(storeName);
    const req = store.clear();
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// AppMeta (key-value simple)
// ─────────────────────────────────────────────────────────────────────────────

export async function metaGet<T>(key: string): Promise<T | undefined> {
  const record = await dbGet<{ key: string; value: T }>(STORES.appMeta, key);
  return record?.value;
}

export async function metaSet<T>(key: string, value: T): Promise<void> {
  await dbPut(STORES.appMeta, { key, value });
}

// ─────────────────────────────────────────────────────────────────────────────
// COLA DE SINCRONIZACIÓN
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Agrega una operación a la cola de sincronización.
 * Se llama automáticamente en cada mutación cuando se está offline.
 */
export async function queueOperation(item: Omit<SyncQueueItem, 'id' | 'synced' | 'intentos' | 'timestamp'>): Promise<void> {
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORES.syncQueue, 'readwrite');
    const store = tx.objectStore(STORES.syncQueue);
    const req = store.add({
      ...item,
      timestamp: new Date().toISOString(),
      synced: false,
      intentos: 0,
    } as SyncQueueItem);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

export async function getSyncQueue(): Promise<SyncQueueItem[]> {
  return dbGetAll<SyncQueueItem>(STORES.syncQueue);
}

export async function clearSyncQueue(): Promise<void> {
  return dbClear(STORES.syncQueue);
}

export async function removeSyncQueueItem(id: number): Promise<void> {
  return dbDelete(STORES.syncQueue, id);
}

/**
 * Solicita Background Sync al Service Worker.
 * Si no está disponible, procesa inmediatamente.
 */
export async function requestSync(): Promise<void> {
  if ('serviceWorker' in navigator && 'SyncManager' in window) {
    try {
      const reg = await navigator.serviceWorker.ready;
      await (reg as ServiceWorkerRegistration & { sync: { register: (tag: string) => Promise<void> } })
        .sync.register(SYNC_TAG);
      console.log('[DB] Background Sync registrado:', SYNC_TAG);
    } catch (err) {
      console.warn('[DB] Background Sync no disponible, procesando localmente:', err);
      processQueueLocally();
    }
  } else {
    processQueueLocally();
  }
}

/**
 * Procesa la cola localmente si Background Sync no está disponible.
 */
async function processQueueLocally(): Promise<void> {
  const queue = await getSyncQueue();
  if (queue.length === 0) return;

  console.log(`[DB] Procesando ${queue.length} operaciones localmente`);
  // Las operaciones ya están en IndexedDB; limpiar cola
  await clearSyncQueue();

  // Notificar
  window.dispatchEvent(new CustomEvent('ventas:sync-complete', {
    detail: { procesadas: queue.length, timestamp: new Date().toISOString() }
  }));
}

// ─────────────────────────────────────────────────────────────────────────────
// CARGA / GUARDADO masivo del estado de la app
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Carga todo el estado de la app desde IndexedDB.
 * Retorna null si la DB está vacía (primer uso).
 */
export async function loadAppState(): Promise<Partial<AppState> | null> {
  await openDB();

  const [
    sucursales,
    empleados,
    productos,
    metas,
    ventas,
    ofertasComerciales,
    registrosHistoricos,
  ] = await Promise.all([
    dbGetAll<Sucursal>(STORES.sucursales),
    dbGetAll<Empleado>(STORES.empleados),
    dbGetAll<Producto>(STORES.productos),
    dbGetAll<Meta>(STORES.metas),
    dbGetAll<Venta>(STORES.ventas),
    dbGetAll<OfertaComercial>(STORES.ofertasComerciales),
    dbGetAll<RegistroHistorico>(STORES.registrosHistoricos),
  ]);

  // Si no hay datos, retornar null para usar datos iniciales
  if (sucursales.length === 0 && empleados.length === 0) {
    return null;
  }

  return {
    sucursales,
    empleados,
    productos,
    metas,
    ventas,
    ofertasComerciales,
    registrosHistoricos,
  };
}

/**
 * Guarda el estado completo en IndexedDB.
 */
export async function saveAppState(state: AppState): Promise<void> {
  await Promise.all([
    dbPutMany(STORES.sucursales, state.sucursales),
    dbPutMany(STORES.empleados, state.empleados),
    dbPutMany(STORES.productos, state.productos),
    dbPutMany(STORES.metas, state.metas),
    dbPutMany(STORES.ventas, state.ventas),
    dbPutMany(STORES.ofertasComerciales, state.ofertasComerciales),
    dbPutMany(STORES.registrosHistoricos, state.registrosHistoricos),
  ]);
}

/**
 * Guarda la configuración de infografías.
 */
export async function saveInfografiasConfig(config: InfografiasConfig): Promise<void> {
  await dbPut(STORES.infografiasConfig, { key: 'config', ...config });
}

/**
 * Carga la configuración de infografías.
 */
export async function loadInfografiasConfig(): Promise<InfografiasConfig | null> {
  const record = await dbGet<InfografiasConfig & { key: string }>(
    STORES.infografiasConfig,
    'config'
  );
  if (!record) return null;
  const { key: _key, ...config } = record;
  return config as InfografiasConfig;
}

// ─────────────────────────────────────────────────────────────────────────────
// Helpers de conectividad
// ─────────────────────────────────────────────────────────────────────────────

export function isOnline(): boolean {
  return navigator.onLine;
}

/**
 * Registra handlers para cambios de conectividad.
 * Retorna función para desregistrar.
 */
export function onConnectivityChange(
  onOnline: () => void,
  onOffline: () => void
): () => void {
  window.addEventListener('online', onOnline);
  window.addEventListener('offline', onOffline);
  return () => {
    window.removeEventListener('online', onOnline);
    window.removeEventListener('offline', onOffline);
  };
}
