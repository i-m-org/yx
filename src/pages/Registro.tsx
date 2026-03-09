import { useState, useMemo } from "react";
import { MainLayout } from "@/components/sidebar";
import { useApp } from "@/lib/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ShoppingCart, Plus, Pencil, Trash2, Filter, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Venta } from "@/lib/types";

export default function RegistroPage() {
  const {
    sucursales,
    productos,
    empleados,
    ventas,
    agregarVenta,
    actualizarVenta,
    eliminarVenta,
  } = useApp();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingVenta, setEditingVenta] = useState<Venta | null>(null);
  const [filtroSucursal, setFiltroSucursal] = useState<string>("todas");
  const [filtroFecha, setFiltroFecha] = useState<string>("");

  // Form state
  const [formSucursal, setFormSucursal] = useState("");
  const [formEmpleado, setFormEmpleado] = useState("");
  const [formProducto, setFormProducto] = useState("");
  const [formCantidad, setFormCantidad] = useState("");
  const [formFecha, setFormFecha] = useState(new Date().toISOString().split("T")[0]);

  // Empleados filtrados por sucursal seleccionada
  const empleadosFiltrados = useMemo(() => {
    if (!formSucursal) return [];
    return empleados.filter((e) => e.sucursalId === formSucursal && e.activo);
  }, [formSucursal, empleados]);

  // Ventas filtradas
  const ventasFiltradas = useMemo(() => {
    return ventas
      .filter((v) => {
        const cumpleSucursal = filtroSucursal === "todas" || v.sucursalId === filtroSucursal;
        const cumpleFecha = !filtroFecha || v.fecha === filtroFecha;
        return cumpleSucursal && cumpleFecha;
      })
      .sort((a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime());
  }, [ventas, filtroSucursal, filtroFecha]);

  const resetForm = () => {
    setFormSucursal("");
    setFormEmpleado("");
    setFormProducto("");
    setFormCantidad("");
    setFormFecha(new Date().toISOString().split("T")[0]);
    setEditingVenta(null);
  };

  const handleOpenDialog = (venta?: Venta) => {
    if (venta) {
      setEditingVenta(venta);
      setFormSucursal(venta.sucursalId);
      setFormEmpleado(venta.empleadoId);
      setFormProducto(venta.productoId);
      setFormCantidad(venta.cantidad.toString());
      setFormFecha(venta.fecha);
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formSucursal || !formEmpleado || !formProducto || !formCantidad || !formFecha) {
      return;
    }

    const fecha = formFecha;
    const mes = fecha.substring(0, 7);

    if (editingVenta) {
      actualizarVenta(editingVenta.id, {
        sucursalId: formSucursal,
        empleadoId: formEmpleado,
        productoId: formProducto,
        cantidad: parseInt(formCantidad),
        fecha,
        mes,
      });
    } else {
      agregarVenta({
        sucursalId: formSucursal,
        empleadoId: formEmpleado,
        productoId: formProducto,
        cantidad: parseInt(formCantidad),
        fecha,
        mes,
      });
    }

    setDialogOpen(false);
    resetForm();
  };

  const handleDelete = (id: string) => {
    eliminarVenta(id);
  };

  const getSucursalNombre = (id: string) => sucursales.find((s) => s.id === id)?.nombre || "Desconocida";
  const getEmpleadoNombre = (id: string) => empleados.find((e) => e.id === id)?.nombre || "Desconocido";
  const getProductoNombre = (id: string) => productos.find((p) => p.id === id)?.nombre || "Desconocido";
  const getSucursalTipo = (id: string) => sucursales.find((s) => s.id === id)?.tipo || "desconocido";

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "coppel":
        return "bg-chart-1/20 text-chart-1";
      case "elektra":
        return "bg-chart-3/20 text-chart-3";
      case "chedraui":
        return "bg-chart-2/20 text-chart-2";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatFecha = (fecha: string) => {
    return new Date(fecha + "T00:00:00").toLocaleDateString("es-MX", {
      weekday: "short",
      day: "numeric",
      month: "short",
    });
  };

  // Resumen del dia
  const resumenHoy = useMemo(() => {
    const hoy = new Date().toISOString().split("T")[0];
    const ventasHoy = ventas.filter((v) => v.fecha === hoy);
    const totalVentas = ventasHoy.reduce((acc, v) => acc + v.cantidad, 0);
    const registros = ventasHoy.length;
    return { totalVentas, registros };
  }, [ventas]);

  return (
    <MainLayout>
      <div className="border-b border-border bg-card/50 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">Registro de Ventas</h1>
            <p className="text-sm text-muted-foreground">
              Captura y administracion de ventas diarias
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Nueva Venta
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingVenta ? "Editar Venta" : "Registrar Nueva Venta"}
                  </DialogTitle>
                  <DialogDescription>
                    {editingVenta
                      ? "Modifica los datos de la venta"
                      : "Ingresa los datos de la venta realizada"}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="fecha">Fecha</Label>
                    <Input
                      id="fecha"
                      type="date"
                      value={formFecha}
                      onChange={(e) => setFormFecha(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sucursal">Sucursal</Label>
                    <Select
                      value={formSucursal}
                      onValueChange={(v) => {
                        setFormSucursal(v);
                        setFormEmpleado("");
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona una sucursal" />
                      </SelectTrigger>
                      <SelectContent>
                        {sucursales.map((suc) => (
                          <SelectItem key={suc.id} value={suc.id}>
                            {suc.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="empleado">Empleado</Label>
                    <Select
                      value={formEmpleado}
                      onValueChange={setFormEmpleado}
                      disabled={!formSucursal}
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={
                            formSucursal ? "Selecciona un empleado" : "Primero selecciona sucursal"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        {empleadosFiltrados.map((emp) => (
                          <SelectItem key={emp.id} value={emp.id}>
                            {emp.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="producto">Producto</Label>
                    <Select value={formProducto} onValueChange={setFormProducto}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un producto" />
                      </SelectTrigger>
                      <SelectContent>
                        {productos.map((prod) => (
                          <SelectItem key={prod.id} value={prod.id}>
                            {prod.nombre}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="cantidad">Cantidad</Label>
                    <Input
                      id="cantidad"
                      type="number"
                      min="1"
                      value={formCantidad}
                      onChange={(e) => setFormCantidad(e.target.value)}
                      placeholder="Cantidad vendida"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formSucursal || !formEmpleado || !formProducto || !formCantidad}
                  >
                    {editingVenta ? "Guardar Cambios" : "Registrar Venta"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-4 sm:p-6 lg:p-8">
          {/* Resumen del dia */}
          <div className="mb-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-primary/10 p-3">
                  <ShoppingCart className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ventas de Hoy</p>
                  <p className="text-2xl font-bold text-foreground">{resumenHoy.totalVentas}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="rounded-lg bg-accent/10 p-3">
                  <CalendarDays className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registros de Hoy</p>
                  <p className="text-2xl font-bold text-foreground">{resumenHoy.registros}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filtros */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Filtros</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="min-w-[200px]">
                  <Label className="mb-2 block text-sm">Sucursal</Label>
                  <Select value={filtroSucursal} onValueChange={setFiltroSucursal}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas las sucursales</SelectItem>
                      {sucursales.map((suc) => (
                        <SelectItem key={suc.id} value={suc.id}>
                          {suc.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="min-w-[200px]">
                  <Label className="mb-2 block text-sm">Fecha</Label>
                  <Input
                    type="date"
                    value={filtroFecha}
                    onChange={(e) => setFiltroFecha(e.target.value)}
                    className="w-full"
                  />
                </div>
                {filtroFecha && (
                  <div className="flex items-end">
                    <Button variant="outline" onClick={() => setFiltroFecha("")}>
                      Limpiar fecha
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tabla de ventas */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Registro de Ventas</CardTitle>
              <CardDescription>
                {ventasFiltradas.length} ventas registradas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Empleado</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-center">Cantidad</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {ventasFiltradas.map((venta) => (
                    <TableRow key={venta.id}>
                      <TableCell className="font-medium">
                        <span className="capitalize">{formatFecha(venta.fecha)}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <span>{getSucursalNombre(venta.sucursalId)}</span>
                          <Badge
                            variant="outline"
                            className={cn("text-xs capitalize", getTipoColor(getSucursalTipo(venta.sucursalId)))}
                          >
                            {getSucursalTipo(venta.sucursalId)}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>{getEmpleadoNombre(venta.empleadoId)}</TableCell>
                      <TableCell>{getProductoNombre(venta.productoId)}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="default">{venta.cantidad}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenDialog(venta)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <Trash2 className="h-4 w-4 text-destructive" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Eliminar venta</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Esta seguro de eliminar este registro? Esta accion no se puede
                                  deshacer.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete(venta.id)}
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                >
                                  Eliminar
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                  {ventasFiltradas.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                        No hay ventas registradas con los filtros seleccionados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
    </MainLayout>
  );
}
