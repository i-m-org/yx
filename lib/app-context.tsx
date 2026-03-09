import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from "react";
import type {
  AppState,
  AppContextType,
  Sucursal,
  Empleado,
  Producto,
  Meta,
  Venta,
  OfertaComercial,
  RegistroHistorico,
  EstadisticaSucursal,
  EstadisticaProducto,
  EstadisticaEmpleado,
  InfografiasConfig,
} from "./types";
import {
  sucursalesIniciales,
  empleadosIniciales,
  productosIniciales,
  metasIniciales,
  ventasIniciales,
  ofertasIniciales,
} from "./initial-data";
import { infografiasConfigInicial } from "./infografias-config";
import {
  loadAppState,
  saveAppState,
  loadInfografiasConfig,
  saveInfografiasConfig,
  onConnectivityChange,
  requestSync,
  isOnline,
  queueOperation,
  STORES,
} from "./db";

const estadoInicial: AppState = {
  sucursales: sucursalesIniciales,
  empleados: empleadosIniciales,
  productos: productosIniciales,
  metas: metasIniciales,
  ventas: ventasIniciales,
  ofertasComerciales: ofertasIniciales,
  registrosHistoricos: [],
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(estadoInicial);
  const [infografiasConfig, setInfografiasConfig] = useState<InfografiasConfig>(infografiasConfigInicial);
  const [isLoaded, setIsLoaded] = useState(false);
  const [online, setOnline] = useState(isOnline());
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── CARGA INICIAL desde IndexedDB ──────────────────────────────────────────
  useEffect(() => {
    async function cargarDatos() {
      try {
        // Intentar cargar desde IndexedDB
        const estadoGuardado = await loadAppState();
        if (estadoGuardado) {
          setState((prev) => ({ ...prev, ...estadoGuardado }));
        } else {
          // Primera vez: guardar datos iniciales en IndexedDB
          await saveAppState(estadoInicial);
        }

        const configGuardada = await loadInfografiasConfig();
        if (configGuardada) {
          setInfografiasConfig(configGuardada);
        } else {
          await saveInfografiasConfig(infografiasConfigInicial);
        }
      } catch (err) {
        console.error("[App] Error cargando desde IndexedDB, usando datos iniciales:", err);
        // Fallback a localStorage si IndexedDB falla
        try {
          const ls = localStorage.getItem("ventas-app-data");
          if (ls) setState(JSON.parse(ls));
          const li = localStorage.getItem("infografias-config");
          if (li) setInfografiasConfig(JSON.parse(li));
        } catch { /* ignorar */ }
      } finally {
        setIsLoaded(true);
      }
    }
    cargarDatos();
  }, []);

  // ── PERSISTENCIA: guardar en IndexedDB con debounce ──────────────────────
  useEffect(() => {
    if (!isLoaded) return;
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(async () => {
      try {
        await saveAppState(state);
        // También guardar en localStorage como respaldo
        localStorage.setItem("ventas-app-data", JSON.stringify(state));
      } catch (err) {
        console.error("[App] Error guardando estado:", err);
        localStorage.setItem("ventas-app-data", JSON.stringify(state));
      }
    }, 300);
    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [state, isLoaded]);

  useEffect(() => {
    if (!isLoaded) return;
    saveInfografiasConfig(infografiasConfig).catch(() => {
      localStorage.setItem("infografias-config", JSON.stringify(infografiasConfig));
    });
  }, [infografiasConfig, isLoaded]);

  // ── CONECTIVIDAD: disparar sync al reconectar ─────────────────────────────
  useEffect(() => {
    const handleOnline = () => {
      console.log("[App] Conexión restaurada — iniciando sincronización");
      setOnline(true);
      requestSync();
    };
    const handleOffline = () => {
      console.log("[App] Sin conexión — modo offline activo");
      setOnline(false);
    };

    const unregister = onConnectivityChange(handleOnline, handleOffline);

    // Escuchar mensajes del Service Worker
    const handleSWMessage = (event: MessageEvent) => {
      const { type, procesadas } = event.data || {};
      if (type === "SYNC_COMPLETE" && procesadas > 0) {
        console.log(`[App] SW: ${procesadas} operaciones sincronizadas`);
      }
    };
    navigator.serviceWorker?.addEventListener("message", handleSWMessage);

    return () => {
      unregister();
      navigator.serviceWorker?.removeEventListener("message", handleSWMessage);
    };
  }, []);

  // ── HELPER: encola operación si está offline ──────────────────────────────
  const encolarSiOffline = useCallback(
    (storeName: string, tipo: "CREATE" | "UPDATE" | "DELETE", recordId: string, datos: unknown) => {
      if (!isOnline()) {
        queueOperation({
          storeName: storeName as typeof STORES[keyof typeof STORES],
          operationType: tipo,
          recordId,
          datos,
        }).catch(console.error);
      }
    },
    []
  );

  const actualizarInfografiasConfig = useCallback((config: InfografiasConfig) => {
    setInfografiasConfig(config);
  }, []);



  // Utilidad para generar IDs únicos
  const generarId = (prefijo: string) => `${prefijo}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  // Mes actual
  const getMesActual = useCallback(() => {
    const fecha = new Date();
    return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
  }, []);

  // SUCURSALES
  const agregarSucursal = useCallback((sucursal: Omit<Sucursal, "id">) => {
    setState((prev) => ({
      ...prev,
      sucursales: [...prev.sucursales, { ...sucursal, id: generarId("suc") }],
    }));
  }, []);

  const actualizarSucursal = useCallback((id: string, datos: Partial<Sucursal>) => {
    setState((prev) => ({
      ...prev,
      sucursales: prev.sucursales.map((s) => (s.id === id ? { ...s, ...datos } : s)),
    }));
  }, []);

  const eliminarSucursal = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      sucursales: prev.sucursales.filter((s) => s.id !== id),
    }));
  }, []);

  // EMPLEADOS
  const agregarEmpleado = useCallback((empleado: Omit<Empleado, "id">) => {
    setState((prev) => ({
      ...prev,
      empleados: [...prev.empleados, { ...empleado, id: generarId("emp") }],
    }));
  }, []);

  const actualizarEmpleado = useCallback((id: string, datos: Partial<Empleado>) => {
    setState((prev) => ({
      ...prev,
      empleados: prev.empleados.map((e) => (e.id === id ? { ...e, ...datos } : e)),
    }));
  }, []);

  const eliminarEmpleado = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      empleados: prev.empleados.filter((e) => e.id !== id),
    }));
  }, []);

  // PRODUCTOS
  const agregarProducto = useCallback((producto: Omit<Producto, "id">) => {
    setState((prev) => ({
      ...prev,
      productos: [...prev.productos, { ...producto, id: generarId("prod") }],
    }));
  }, []);

  const actualizarProducto = useCallback((id: string, datos: Partial<Producto>) => {
    setState((prev) => ({
      ...prev,
      productos: prev.productos.map((p) => (p.id === id ? { ...p, ...datos } : p)),
    }));
  }, []);

  const eliminarProducto = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      productos: prev.productos.filter((p) => p.id !== id),
    }));
  }, []);

  // METAS
  const agregarMeta = useCallback((meta: Omit<Meta, "id">) => {
    setState((prev) => ({
      ...prev,
      metas: [...prev.metas, { ...meta, id: generarId("meta") }],
    }));
  }, []);

  const actualizarMeta = useCallback((id: string, datos: Partial<Meta>) => {
    setState((prev) => ({
      ...prev,
      metas: prev.metas.map((m) => (m.id === id ? { ...m, ...datos } : m)),
    }));
  }, []);

  const eliminarMeta = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      metas: prev.metas.filter((m) => m.id !== id),
    }));
  }, []);

  // VENTAS
  const agregarVenta = useCallback((venta: Omit<Venta, "id">) => {
    const id = generarId("venta");
    const nuevaVenta = { ...venta, id };
    setState((prev) => ({
      ...prev,
      ventas: [...prev.ventas, nuevaVenta],
    }));
    encolarSiOffline(STORES.ventas, "CREATE", id, nuevaVenta);
  }, [encolarSiOffline]);

  const actualizarVenta = useCallback((id: string, datos: Partial<Venta>) => {
    setState((prev) => ({
      ...prev,
      ventas: prev.ventas.map((v) => (v.id === id ? { ...v, ...datos } : v)),
    }));
    encolarSiOffline(STORES.ventas, "UPDATE", id, datos);
  }, [encolarSiOffline]);

  const eliminarVenta = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      ventas: prev.ventas.filter((v) => v.id !== id),
    }));
    encolarSiOffline(STORES.ventas, "DELETE", id, { id });
  }, [encolarSiOffline]);

  // OFERTAS COMERCIALES
  const agregarOferta = useCallback((oferta: Omit<OfertaComercial, "id">) => {
    setState((prev) => ({
      ...prev,
      ofertasComerciales: [...prev.ofertasComerciales, { ...oferta, id: generarId("oferta") }],
    }));
  }, []);

  const actualizarOferta = useCallback((id: string, datos: Partial<OfertaComercial>) => {
    setState((prev) => ({
      ...prev,
      ofertasComerciales: prev.ofertasComerciales.map((o) => (o.id === id ? { ...o, ...datos } : o)),
    }));
  }, []);

  const eliminarOferta = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      ofertasComerciales: prev.ofertasComerciales.filter((o) => o.id !== id),
    }));
  }, []);

  // REGISTROS HISTÓRICOS
  const agregarRegistroHistorico = useCallback((registro: Omit<RegistroHistorico, "id">) => {
    setState((prev) => ({
      ...prev,
      registrosHistoricos: [...prev.registrosHistoricos, { ...registro, id: generarId("hist") }],
    }));
  }, []);

  const actualizarRegistroHistorico = useCallback((id: string, datos: Partial<RegistroHistorico>) => {
    setState((prev) => ({
      ...prev,
      registrosHistoricos: prev.registrosHistoricos.map((r) => (r.id === id ? { ...r, ...datos } : r)),
    }));
  }, []);

  // ESTADÍSTICAS POR SUCURSAL
  const getEstadisticasSucursal = useCallback(
    (mes?: string): EstadisticaSucursal[] => {
      const mesActual = mes || getMesActual();
      return state.sucursales.map((sucursal) => {
        const metasSucursal = state.metas.filter((m) => m.sucursalId === sucursal.id && m.mes === mesActual);
        const ventasSucursal = state.ventas.filter((v) => v.sucursalId === sucursal.id && v.mes === mesActual);
        const empleadosSucursal = state.empleados.filter((e) => e.sucursalId === sucursal.id && e.activo);

        const totalMeta = metasSucursal.reduce((acc, m) => acc + m.cantidad, 0);
        const totalVentas = ventasSucursal.reduce((acc, v) => acc + v.cantidad, 0);

        return {
          sucursalId: sucursal.id,
          sucursalNombre: sucursal.nombre,
          totalVentas,
          totalMeta,
          porcentajeAvance: totalMeta > 0 ? Math.round((totalVentas / totalMeta) * 100) : 0,
          empleadosActivos: empleadosSucursal.length,
        };
      });
    },
    [state.sucursales, state.metas, state.ventas, state.empleados, getMesActual]
  );

  // ESTADÍSTICAS POR PRODUCTO
  const getEstadisticasProducto = useCallback(
    (mes?: string): EstadisticaProducto[] => {
      const mesActual = mes || getMesActual();
      return state.productos.map((producto) => {
        const metasProducto = state.metas.filter((m) => m.productoId === producto.id && m.mes === mesActual);
        const ventasProducto = state.ventas.filter((v) => v.productoId === producto.id && v.mes === mesActual);

        const totalMeta = metasProducto.reduce((acc, m) => acc + m.cantidad, 0);
        const totalVentas = ventasProducto.reduce((acc, v) => acc + v.cantidad, 0);

        return {
          productoId: producto.id,
          productoNombre: producto.nombre,
          totalVentas,
          totalMeta,
          porcentajeAvance: totalMeta > 0 ? Math.round((totalVentas / totalMeta) * 100) : 0,
        };
      });
    },
    [state.productos, state.metas, state.ventas, getMesActual]
  );

  // ESTADÍSTICAS POR EMPLEADO
  const getEstadisticasEmpleado = useCallback(
    (mes?: string): EstadisticaEmpleado[] => {
      const mesActual = mes || getMesActual();
      return state.empleados.map((empleado) => {
        const sucursal = state.sucursales.find((s) => s.id === empleado.sucursalId);
        const ventasEmpleado = state.ventas.filter((v) => v.empleadoId === empleado.id && v.mes === mesActual);

        const ventasPorProducto: Record<string, number> = {};
        ventasEmpleado.forEach((v) => {
          ventasPorProducto[v.productoId] = (ventasPorProducto[v.productoId] || 0) + v.cantidad;
        });

        return {
          empleadoId: empleado.id,
          empleadoNombre: empleado.nombre,
          sucursalNombre: sucursal?.nombre || "Sin sucursal",
          totalVentas: ventasEmpleado.reduce((acc, v) => acc + v.cantidad, 0),
          ventasPorProducto,
        };
      });
    },
    [state.empleados, state.sucursales, state.ventas, getMesActual]
  );

  const value: AppContextType = {
    ...state,
    online,
    infografiasConfig,
    actualizarInfografiasConfig,
    agregarSucursal,
    actualizarSucursal,
    eliminarSucursal,
    agregarEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
    agregarMeta,
    actualizarMeta,
    eliminarMeta,
    agregarVenta,
    actualizarVenta,
    eliminarVenta,
    agregarOferta,
    actualizarOferta,
    eliminarOferta,
    agregarRegistroHistorico,
    actualizarRegistroHistorico,
    getMesActual,
    getEstadisticasSucursal,
    getEstadisticasProducto,
    getEstadisticasEmpleado,
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-primary">Cargando...</div>
      </div>
    );
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp debe usarse dentro de AppProvider");
  }
  return context;
}
