import type { Sucursal, Empleado, Producto, Meta, Venta, OfertaComercial } from "./types";

// Sucursales iniciales
export const sucursalesIniciales: Sucursal[] = [
  { id: "suc-001", nombre: "Coppel 363", tipo: "coppel", activa: true },
  { id: "suc-002", nombre: "Coppel 385", tipo: "coppel", activa: true },
  { id: "suc-003", nombre: "Coppel 716", tipo: "coppel", activa: true },
  { id: "suc-004", nombre: "Elektra 218", tipo: "elektra", activa: true },
  { id: "suc-005", nombre: "Chedraui 23", tipo: "chedraui", activa: true },
  { id: "suc-006", nombre: "Chedraui 99", tipo: "chedraui", activa: true },
  { id: "suc-007", nombre: "Chedraui 105", tipo: "chedraui", activa: true },
];

// Productos iniciales
export const productosIniciales: Producto[] = [
  { id: "prod-001", nombre: "Chip Cero", descripcion: "Chip sin costo de activación", activo: true },
  { id: "prod-002", nombre: "Chip Express", descripcion: "Chip de activación rápida", activo: true },
  { id: "prod-003", nombre: "Amigo Kit", descripcion: "Kit completo Amigo", activo: true },
  { id: "prod-004", nombre: "Portabilidad", descripcion: "Cambio de compañía manteniendo número", activo: true },
  { id: "prod-005", nombre: "Boletín 63", descripcion: "Promoción especial Boletín 63", activo: true },
];

// Empleados iniciales (ejemplos)
export const empleadosIniciales: Empleado[] = [
  { id: "emp-001", nombre: "Carlos Mendoza", sucursalId: "suc-001", activo: true, fechaIngreso: "2023-01-15" },
  { id: "emp-002", nombre: "María García", sucursalId: "suc-001", activo: true, fechaIngreso: "2023-03-20" },
  { id: "emp-003", nombre: "Juan Pérez", sucursalId: "suc-002", activo: true, fechaIngreso: "2022-11-10" },
  { id: "emp-004", nombre: "Ana López", sucursalId: "suc-002", activo: true, fechaIngreso: "2023-06-01" },
  { id: "emp-005", nombre: "Roberto Sánchez", sucursalId: "suc-003", activo: true, fechaIngreso: "2023-02-28" },
  { id: "emp-006", nombre: "Laura Martínez", sucursalId: "suc-004", activo: true, fechaIngreso: "2022-09-15" },
  { id: "emp-007", nombre: "Miguel Torres", sucursalId: "suc-004", activo: true, fechaIngreso: "2023-04-10" },
  { id: "emp-008", nombre: "Patricia Ruiz", sucursalId: "suc-005", activo: true, fechaIngreso: "2023-01-05" },
  { id: "emp-009", nombre: "Fernando Díaz", sucursalId: "suc-006", activo: true, fechaIngreso: "2022-12-01" },
  { id: "emp-010", nombre: "Sofía Hernández", sucursalId: "suc-007", activo: true, fechaIngreso: "2023-05-15" },
];

// Función para obtener el mes actual en formato "YYYY-MM"
export function getMesActualStr(): string {
  const fecha = new Date();
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
}

// Función para obtener el mes anterior
export function getMesAnteriorStr(): string {
  const fecha = new Date();
  fecha.setMonth(fecha.getMonth() - 1);
  return `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
}

// Metas iniciales (ejemplo para el mes actual)
export const metasIniciales: Meta[] = [
  // Coppel 363
  { id: "meta-001", sucursalId: "suc-001", productoId: "prod-001", mes: getMesActualStr(), cantidad: 50 },
  { id: "meta-002", sucursalId: "suc-001", productoId: "prod-002", mes: getMesActualStr(), cantidad: 40 },
  { id: "meta-003", sucursalId: "suc-001", productoId: "prod-003", mes: getMesActualStr(), cantidad: 30 },
  { id: "meta-004", sucursalId: "suc-001", productoId: "prod-004", mes: getMesActualStr(), cantidad: 25 },
  { id: "meta-005", sucursalId: "suc-001", productoId: "prod-005", mes: getMesActualStr(), cantidad: 20 },
  // Coppel 385
  { id: "meta-006", sucursalId: "suc-002", productoId: "prod-001", mes: getMesActualStr(), cantidad: 45 },
  { id: "meta-007", sucursalId: "suc-002", productoId: "prod-002", mes: getMesActualStr(), cantidad: 35 },
  { id: "meta-008", sucursalId: "suc-002", productoId: "prod-003", mes: getMesActualStr(), cantidad: 25 },
  { id: "meta-009", sucursalId: "suc-002", productoId: "prod-004", mes: getMesActualStr(), cantidad: 20 },
  { id: "meta-010", sucursalId: "suc-002", productoId: "prod-005", mes: getMesActualStr(), cantidad: 15 },
  // Coppel 716
  { id: "meta-011", sucursalId: "suc-003", productoId: "prod-001", mes: getMesActualStr(), cantidad: 55 },
  { id: "meta-012", sucursalId: "suc-003", productoId: "prod-002", mes: getMesActualStr(), cantidad: 45 },
  { id: "meta-013", sucursalId: "suc-003", productoId: "prod-003", mes: getMesActualStr(), cantidad: 35 },
  { id: "meta-014", sucursalId: "suc-003", productoId: "prod-004", mes: getMesActualStr(), cantidad: 30 },
  { id: "meta-015", sucursalId: "suc-003", productoId: "prod-005", mes: getMesActualStr(), cantidad: 25 },
  // Elektra 218
  { id: "meta-016", sucursalId: "suc-004", productoId: "prod-001", mes: getMesActualStr(), cantidad: 60 },
  { id: "meta-017", sucursalId: "suc-004", productoId: "prod-002", mes: getMesActualStr(), cantidad: 50 },
  { id: "meta-018", sucursalId: "suc-004", productoId: "prod-003", mes: getMesActualStr(), cantidad: 40 },
  { id: "meta-019", sucursalId: "suc-004", productoId: "prod-004", mes: getMesActualStr(), cantidad: 35 },
  { id: "meta-020", sucursalId: "suc-004", productoId: "prod-005", mes: getMesActualStr(), cantidad: 30 },
  // Chedraui 23
  { id: "meta-021", sucursalId: "suc-005", productoId: "prod-001", mes: getMesActualStr(), cantidad: 40 },
  { id: "meta-022", sucursalId: "suc-005", productoId: "prod-002", mes: getMesActualStr(), cantidad: 30 },
  { id: "meta-023", sucursalId: "suc-005", productoId: "prod-003", mes: getMesActualStr(), cantidad: 25 },
  { id: "meta-024", sucursalId: "suc-005", productoId: "prod-004", mes: getMesActualStr(), cantidad: 20 },
  { id: "meta-025", sucursalId: "suc-005", productoId: "prod-005", mes: getMesActualStr(), cantidad: 15 },
  // Chedraui 99
  { id: "meta-026", sucursalId: "suc-006", productoId: "prod-001", mes: getMesActualStr(), cantidad: 35 },
  { id: "meta-027", sucursalId: "suc-006", productoId: "prod-002", mes: getMesActualStr(), cantidad: 25 },
  { id: "meta-028", sucursalId: "suc-006", productoId: "prod-003", mes: getMesActualStr(), cantidad: 20 },
  { id: "meta-029", sucursalId: "suc-006", productoId: "prod-004", mes: getMesActualStr(), cantidad: 15 },
  { id: "meta-030", sucursalId: "suc-006", productoId: "prod-005", mes: getMesActualStr(), cantidad: 10 },
  // Chedraui 105
  { id: "meta-031", sucursalId: "suc-007", productoId: "prod-001", mes: getMesActualStr(), cantidad: 38 },
  { id: "meta-032", sucursalId: "suc-007", productoId: "prod-002", mes: getMesActualStr(), cantidad: 28 },
  { id: "meta-033", sucursalId: "suc-007", productoId: "prod-003", mes: getMesActualStr(), cantidad: 22 },
  { id: "meta-034", sucursalId: "suc-007", productoId: "prod-004", mes: getMesActualStr(), cantidad: 18 },
  { id: "meta-035", sucursalId: "suc-007", productoId: "prod-005", mes: getMesActualStr(), cantidad: 12 },
];

// Ventas iniciales (ejemplo)
export const ventasIniciales: Venta[] = [
  // Algunas ventas de ejemplo
  { id: "venta-001", empleadoId: "emp-001", sucursalId: "suc-001", productoId: "prod-001", fecha: getMesActualStr() + "-01", cantidad: 5, mes: getMesActualStr() },
  { id: "venta-002", empleadoId: "emp-001", sucursalId: "suc-001", productoId: "prod-002", fecha: getMesActualStr() + "-02", cantidad: 3, mes: getMesActualStr() },
  { id: "venta-003", empleadoId: "emp-002", sucursalId: "suc-001", productoId: "prod-001", fecha: getMesActualStr() + "-03", cantidad: 4, mes: getMesActualStr() },
  { id: "venta-004", empleadoId: "emp-003", sucursalId: "suc-002", productoId: "prod-003", fecha: getMesActualStr() + "-04", cantidad: 2, mes: getMesActualStr() },
  { id: "venta-005", empleadoId: "emp-004", sucursalId: "suc-002", productoId: "prod-004", fecha: getMesActualStr() + "-05", cantidad: 6, mes: getMesActualStr() },
  { id: "venta-006", empleadoId: "emp-005", sucursalId: "suc-003", productoId: "prod-001", fecha: getMesActualStr() + "-06", cantidad: 8, mes: getMesActualStr() },
  { id: "venta-007", empleadoId: "emp-006", sucursalId: "suc-004", productoId: "prod-002", fecha: getMesActualStr() + "-07", cantidad: 7, mes: getMesActualStr() },
  { id: "venta-008", empleadoId: "emp-007", sucursalId: "suc-004", productoId: "prod-005", fecha: getMesActualStr() + "-08", cantidad: 4, mes: getMesActualStr() },
  { id: "venta-009", empleadoId: "emp-008", sucursalId: "suc-005", productoId: "prod-001", fecha: getMesActualStr() + "-09", cantidad: 3, mes: getMesActualStr() },
  { id: "venta-010", empleadoId: "emp-009", sucursalId: "suc-006", productoId: "prod-003", fecha: getMesActualStr() + "-10", cantidad: 5, mes: getMesActualStr() },
];

// Ofertas comerciales iniciales
export const ofertasIniciales: OfertaComercial[] = [
  {
    id: "oferta-001",
    titulo: "Promoción Chip Cero",
    descripcion: "Activa tu Chip Cero y obtén 5GB de datos gratis por un mes",
    valor: "5GB Gratis",
    fechaInicio: getMesActualStr() + "-01",
    fechaFin: getMesActualStr() + "-31",
    activa: true,
  },
  {
    id: "oferta-002",
    titulo: "Portabilidad Premium",
    descripcion: "Al portar tu número, recibe el doble de recargas durante 3 meses",
    valor: "2x Recargas",
    fechaInicio: getMesActualStr() + "-01",
    fechaFin: getMesActualStr() + "-31",
    activa: true,
  },
  {
    id: "oferta-003",
    titulo: "Amigo Kit Especial",
    descripcion: "Compra tu Amigo Kit y obtén $100 de saldo de regalo",
    valor: "$100 Saldo",
    fechaInicio: getMesActualStr() + "-01",
    fechaFin: getMesActualStr() + "-31",
    activa: true,
  },
];
