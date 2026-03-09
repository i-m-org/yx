import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '@/app/globals.css'

// ── Registro del Service Worker ──────────────────────────────────────────────
async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Workers no soportados en este navegador');
    return;
  }

  try {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none', // Siempre verificar actualizaciones
    });

    console.log('[SW] Registrado con scope:', registration.scope);

    // Detectar actualizaciones del SW
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          console.log('[SW] Nueva versión disponible');
          // Puedes mostrar un toast/banner aquí para notificar al usuario
          // y pedirle que recargue la página
          window.dispatchEvent(new CustomEvent('sw:update-available'));
        }
      });
    });

    // Forzar activación inmediata si hay SW en espera
    if (registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }

    // Recargar cuando el SW toma control (después de actualización)
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });

    // Verificar actualizaciones periódicamente (cada 60 minutos)
    setInterval(() => {
      registration.update().catch(console.error);
    }, 60 * 60 * 1000);

    // Solicitar sincronización si hay conexión al iniciar
    if (navigator.onLine) {
      try {
        const syncMgr = (registration as ServiceWorkerRegistration & {
          sync?: { register: (tag: string) => Promise<void> }
        }).sync;
        if (syncMgr) {
          await syncMgr.register('ventas-sync');
          console.log('[SW] Background Sync inicial registrado');
        }
      } catch {
        // Background Sync no disponible en todos los navegadores
      }
    }

  } catch (error) {
    console.error('[SW] Error al registrar Service Worker:', error);
  }
}

// Registrar SW (producción y desarrollo)
registerServiceWorker();

// ── Render Principal ─────────────────────────────────────────────────────────
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
