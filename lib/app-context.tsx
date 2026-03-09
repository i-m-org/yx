import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
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

const STORAGE_KEY = "ventas-app-data";
const INFOGRAFIAS_KEY = "infografias-config";

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

  // Cargar datos del localStorage al iniciar
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setState(parsed);
      } catch {
        console.error("Error al cargar datos guardados");
      }
    }
    const savedInfografias = localStorage.getItem(INFOGRAFIAS_KEY);
    if (savedInfografias) {
      try {
        setInfografiasConfig(JSON.parse(savedInfografias));
      } catch {
        console.error("Error al cargar configuración de infografías");
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar datos en localStorage cuando cambien
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(INFOGRAFIAS_KEY, JSON.stringify(infografiasConfig));
    }
  }, [infografiasConfig, isLoaded]);

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
    setState((prev) => ({
      ...prev,
      ventas: [...prev.ventas, { ...venta, id: generarId("venta") }],
    }));
  }, []);

  const actualizarVenta = useCallback((id: string, datos: Partial<Venta>) => {
    setState((prev) => ({
      ...prev,
      ventas: prev.ventas.map((v) => (v.id === id ? { ...v, ...datos } : v)),
    }));
  }, []);

  const eliminarVenta = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      ventas: prev.ventas.filter((v) => v.id !== id),
    }));
  }, []);

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
