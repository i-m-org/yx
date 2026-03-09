// Tipos principales para la aplicación de ventas

// ─── Infografías Config ──────────────────────────────────────────────────────

export interface PlanInternetAmigo {
  id: string;
  gb: string;
  vigencia: string;
  precio: string;
  redes: string;
  prime: string;
  music: string;
}

export interface PaqueteAmigoKit {
  p: string;
  base: string;
  promo: string;
  total: string;
  hot: boolean;
}

export interface PaqueteTiempo {
  id: string;
  horas: string;
  precio: string;
  recomendado: boolean;
}

export interface ModeloHuawei {
  nombre: string;
  detalle: string;
  tipo: string;
}

export interface BeneficioChip {
  titulo: string;
  descripcion: string;
}

export interface PasoChip {
  titulo: string;
  descripcion: string;
}

export interface InfografiasConfig {
  internetAmigo: {
    subtitulo: string;
    planes: PlanInternetAmigo[];
  };
  amigoKit: {
    heroBadge: string;
    heroTitulo: string;
    heroSubtitulo: string;
    vigencia: string;
    paquetes: PaqueteAmigoKit[];
  };
  chipExpress: {
    heroBadge: string;
    heroSubtitulo: string;
    beneficios: BeneficioChip[];
    pasos: PasoChip[];
    ctaTexto: string;
    footerTexto: string;
  };
  amigoVieneConTodo: {
    descripcion: string;
    fechaCierre: string;
    paqueteRegalo: string;
    modelos: ModeloHuawei[];
  };
  portabilidad: {
    vigenciaDisplay: string;
    fechaInicio: string;
    fechaFin: string;
    footerTexto: string;
  };
  internetPorTiempo: {
    paquetes: PaqueteTiempo[];
  };
}


export interface Sucursal {
  id: string;
  nombre: string;
  tipo: "coppel" | "elektra" | "chedraui";
  activa: boolean;
}

export interface Empleado {
  id: string;
  nombre: string;
  sucursalId: string;
  activo: boolean;
  fechaIngreso: string;
}

export interface Producto {
  id: string;
  nombre: string;
  descripcion: string;
  activo: boolean;
}

export interface Meta {
  id: string;
  sucursalId: string;
  productoId: string;
  mes: string; // formato: "2024-01"
  cantidad: number;
}

export interface Venta {
  id: string;
  empleadoId: string;
  sucursalId: string;
  productoId: string;
  fecha: string; // formato: "2024-01-15"
  cantidad: number;
  mes: string; // formato: "2024-01"
}

export interface OfertaComercial {
  id: string;
  titulo: string;
  descripcion: string;
  valor: string;
  fechaInicio: string;
  fechaFin: string;
  activa: boolean;
}

export interface RegistroHistorico {
  id: string;
  mes: string;
  sucursalId: string;
  productoId: string;
  metaTotal: number;
  ventaTotal: number;
  observaciones?: string;
}

// Tipos para estadísticas y reportes
export interface EstadisticaSucursal {
  sucursalId: string;
  sucursalNombre: string;
  totalVentas: number;
  totalMeta: number;
  porcentajeAvance: number;
  empleadosActivos: number;
}

export interface EstadisticaProducto {
  productoId: string;
  productoNombre: string;
  totalVentas: number;
  totalMeta: number;
  porcentajeAvance: number;
}

export interface EstadisticaEmpleado {
  empleadoId: string;
  empleadoNombre: string;
  sucursalNombre: string;
  totalVentas: number;
  ventasPorProducto: Record<string, number>;
}

// Tipos para filtros
export interface FiltroReporte {
  mes?: string;
  sucursalId?: string;
  productoId?: string;
  empleadoId?: string;
}

// Estado global de la aplicación
export interface AppState {
  sucursales: Sucursal[];
  empleados: Empleado[];
  productos: Producto[];
  metas: Meta[];
  ventas: Venta[];
  ofertasComerciales: OfertaComercial[];
  registrosHistoricos: RegistroHistorico[];
}

// Tipo para el contexto
export interface AppContextType extends AppState {
  // Infografías Config
  infografiasConfig: InfografiasConfig;
  actualizarInfografiasConfig: (config: InfografiasConfig) => void;

  // Sucursales
  agregarSucursal: (sucursal: Omit<Sucursal, "id">) => void;
  actualizarSucursal: (id: string, datos: Partial<Sucursal>) => void;
  eliminarSucursal: (id: string) => void;
  
  // Empleados
  agregarEmpleado: (empleado: Omit<Empleado, "id">) => void;
  actualizarEmpleado: (id: string, datos: Partial<Empleado>) => void;
  eliminarEmpleado: (id: string) => void;
  
  // Productos
  agregarProducto: (producto: Omit<Producto, "id">) => void;
  actualizarProducto: (id: string, datos: Partial<Producto>) => void;
  eliminarProducto: (id: string) => void;
  
  // Metas
  agregarMeta: (meta: Omit<Meta, "id">) => void;
  actualizarMeta: (id: string, datos: Partial<Meta>) => void;
  eliminarMeta: (id: string) => void;
  
  // Ventas
  agregarVenta: (venta: Omit<Venta, "id">) => void;
  actualizarVenta: (id: string, datos: Partial<Venta>) => void;
  eliminarVenta: (id: string) => void;
  
  // Ofertas Comerciales
  agregarOferta: (oferta: Omit<OfertaComercial, "id">) => void;
  actualizarOferta: (id: string, datos: Partial<OfertaComercial>) => void;
  eliminarOferta: (id: string) => void;
  
  // Registros Históricos
  agregarRegistroHistorico: (registro: Omit<RegistroHistorico, "id">) => void;
  actualizarRegistroHistorico: (id: string, datos: Partial<RegistroHistorico>) => void;
  
  // Utilidades
  getMesActual: () => string;
  getEstadisticasSucursal: (mes?: string) => EstadisticaSucursal[];
  getEstadisticasProducto: (mes?: string) => EstadisticaProducto[];
  getEstadisticasEmpleado: (mes?: string) => EstadisticaEmpleado[];
  // Estado de conectividad
  online: boolean;
}
