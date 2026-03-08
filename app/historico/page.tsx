"use client";

import { useState, useMemo } from "react";
import { Sidebar } from "@/components/sidebar";
import { useApp } from "@/lib/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { History, Plus, Pencil, CalendarDays, Building2, Package, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import type { RegistroHistorico } from "@/lib/types";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function HistoricoPage() {
  const {
    sucursales,
    productos,
    registrosHistoricos,
    agregarRegistroHistorico,
    actualizarRegistroHistorico,
    metas,
    ventas,
  } = useApp();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRegistro, setEditingRegistro] = useState<RegistroHistorico | null>(null);
  const [filtroSucursal, setFiltroSucursal] = useState<string>("todas");
  const [filtroProducto, setFiltroProducto] = useState<string>("todos");

  // Form state
  const [formMes, setFormMes] = useState("");
  const [formSucursal, setFormSucursal] = useState("");
  const [formProducto, setFormProducto] = useState("");
  const [formMetaTotal, setFormMetaTotal] = useState("");
  const [formVentaTotal, setFormVentaTotal] = useState("");
  const [formObservaciones, setFormObservaciones] = useState("");

  // Generar opciones de meses (últimos 24 meses)
  const opcionesMeses = Array.from({ length: 24 }, (_, i) => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - i);
    const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
    const nombre = fecha.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
    return { value: mes, label: nombre };
  });

  // Combinar registros históricos con datos calculados del mes actual
  const todosLosRegistros = useMemo(() => {
    // Obtener todos los meses únicos de metas y ventas
    const mesesUnicos = new Set<string>();
    metas.forEach((m) => mesesUnicos.add(m.mes));
    ventas.forEach((v) => mesesUnicos.add(v.mes));
    registrosHistoricos.forEach((r) => mesesUnicos.add(r.mes));

    const registrosCompletos: Array<{
      id: string;
      mes: string;
      sucursalId: string;
      sucursalNombre: string;
      productoId: string;
      productoNombre: string;
      metaTotal: number;
      ventaTotal: number;
      porcentaje: number;
      observaciones?: string;
      esHistorico: boolean;
    }> = [];

    // Para cada combinación de mes/sucursal/producto
    Array.from(mesesUnicos).forEach((mes) => {
      sucursales.forEach((sucursal) => {
        productos.forEach((producto) => {
          // Buscar si existe un registro histórico
          const registroHistorico = registrosHistoricos.find(
            (r) => r.mes === mes && r.sucursalId === sucursal.id && r.productoId === producto.id
          );

          if (registroHistorico) {
            const porcentaje =
              registroHistorico.metaTotal > 0
                ? Math.round((registroHistorico.ventaTotal / registroHistorico.metaTotal) * 100)
                : 0;
            registrosCompletos.push({
              id: registroHistorico.id,
              mes,
              sucursalId: sucursal.id,
              sucursalNombre: sucursal.nombre,
              productoId: producto.id,
              productoNombre: producto.nombre,
              metaTotal: registroHistorico.metaTotal,
              ventaTotal: registroHistorico.ventaTotal,
              porcentaje,
              observaciones: registroHistorico.observaciones,
              esHistorico: true,
            });
          } else {
            // Calcular de metas y ventas actuales
            const metaMes = metas.find(
              (m) => m.mes === mes && m.sucursalId === sucursal.id && m.productoId === producto.id
            );
            const ventasMes = ventas.filter(
              (v) => v.mes === mes && v.sucursalId === sucursal.id && v.productoId === producto.id
            );

            if (metaMes || ventasMes.length > 0) {
              const totalMeta = metaMes?.cantidad || 0;
              const totalVentas = ventasMes.reduce((acc, v) => acc + v.cantidad, 0);
              const porcentaje = totalMeta > 0 ? Math.round((totalVentas / totalMeta) * 100) : 0;

              registrosCompletos.push({
                id: `calc-${mes}-${sucursal.id}-${producto.id}`,
                mes,
                sucursalId: sucursal.id,
                sucursalNombre: sucursal.nombre,
                productoId: producto.id,
                productoNombre: producto.nombre,
                metaTotal: totalMeta,
                ventaTotal: totalVentas,
                porcentaje,
                esHistorico: false,
              });
            }
          }
        });
      });
    });

    return registrosCompletos.sort((a, b) => b.mes.localeCompare(a.mes));
  }, [metas, ventas, registrosHistoricos, sucursales, productos]);

  // Registros filtrados
  const registrosFiltrados = useMemo(() => {
    return todosLosRegistros.filter((r) => {
      const cumpleSucursal = filtroSucursal === "todas" || r.sucursalId === filtroSucursal;
      const cumpleProducto = filtroProducto === "todos" || r.productoId === filtroProducto;
      return cumpleSucursal && cumpleProducto;
    });
  }, [todosLosRegistros, filtroSucursal, filtroProducto]);

  // Agrupar por mes para la gráfica
  const datosGrafica = useMemo(() => {
    const porMes = new Map<string, { mes: string; ventas: number; metas: number }>();
    
    registrosFiltrados.forEach((r) => {
      const existing = porMes.get(r.mes) || { mes: r.mes, ventas: 0, metas: 0 };
      existing.ventas += r.ventaTotal;
      existing.metas += r.metaTotal;
      porMes.set(r.mes, existing);
    });

    return Array.from(porMes.values())
      .sort((a, b) => a.mes.localeCompare(b.mes))
      .slice(-6)
      .map((d) => ({
        ...d,
        mesLabel: new Date(d.mes + "-01").toLocaleDateString("es-MX", { month: "short" }),
      }));
  }, [registrosFiltrados]);

  const resetForm = () => {
    setFormMes("");
    setFormSucursal("");
    setFormProducto("");
    setFormMetaTotal("");
    setFormVentaTotal("");
    setFormObservaciones("");
    setEditingRegistro(null);
  };

  const handleOpenDialog = (registro?: RegistroHistorico) => {
    if (registro) {
      setEditingRegistro(registro);
      setFormMes(registro.mes);
      setFormSucursal(registro.sucursalId);
      setFormProducto(registro.productoId);
      setFormMetaTotal(registro.metaTotal.toString());
      setFormVentaTotal(registro.ventaTotal.toString());
      setFormObservaciones(registro.observaciones || "");
    } else {
      resetForm();
    }
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formMes || !formSucursal || !formProducto || !formMetaTotal || !formVentaTotal) {
      return;
    }

    if (editingRegistro) {
      actualizarRegistroHistorico(editingRegistro.id, {
        mes: formMes,
        sucursalId: formSucursal,
        productoId: formProducto,
        metaTotal: parseInt(formMetaTotal),
        ventaTotal: parseInt(formVentaTotal),
        observaciones: formObservaciones || undefined,
      });
    } else {
      agregarRegistroHistorico({
        mes: formMes,
        sucursalId: formSucursal,
        productoId: formProducto,
        metaTotal: parseInt(formMetaTotal),
        ventaTotal: parseInt(formVentaTotal),
        observaciones: formObservaciones || undefined,
      });
    }

    setDialogOpen(false);
    resetForm();
  };

  const getBadgeVariant = (porcentaje: number): "default" | "secondary" | "destructive" | "outline" => {
    if (porcentaje >= 100) return "default";
    if (porcentaje >= 80) return "secondary";
    if (porcentaje >= 50) return "outline";
    return "destructive";
  };

  const formatMes = (mes: string) => {
    return new Date(mes + "-01").toLocaleDateString("es-MX", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="border-b border-border bg-card/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Historico</h1>
              <p className="text-sm text-muted-foreground">
                Registro y consulta de resultados de meses anteriores
              </p>
            </div>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => handleOpenDialog()} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Agregar Registro
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>
                    {editingRegistro ? "Editar Registro Historico" : "Nuevo Registro Historico"}
                  </DialogTitle>
                  <DialogDescription>
                    Registra los resultados de ventas de meses anteriores
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="mes">Mes</Label>
                    <Select value={formMes} onValueChange={setFormMes}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona el mes" />
                      </SelectTrigger>
                      <SelectContent>
                        {opcionesMeses.map((mes) => (
                          <SelectItem key={mes.value} value={mes.value}>
                            <span className="capitalize">{mes.label}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="sucursal">Sucursal</Label>
                    <Select value={formSucursal} onValueChange={setFormSucursal}>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="metaTotal">Meta Total</Label>
                      <Input
                        id="metaTotal"
                        type="number"
                        min="0"
                        value={formMetaTotal}
                        onChange={(e) => setFormMetaTotal(e.target.value)}
                        placeholder="Meta del mes"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="ventaTotal">Venta Total</Label>
                      <Input
                        id="ventaTotal"
                        type="number"
                        min="0"
                        value={formVentaTotal}
                        onChange={(e) => setFormVentaTotal(e.target.value)}
                        placeholder="Ventas logradas"
                      />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="observaciones">Observaciones (opcional)</Label>
                    <Textarea
                      id="observaciones"
                      value={formObservaciones}
                      onChange={(e) => setFormObservaciones(e.target.value)}
                      placeholder="Notas adicionales..."
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    disabled={!formMes || !formSucursal || !formProducto || !formMetaTotal || !formVentaTotal}
                  >
                    {editingRegistro ? "Guardar Cambios" : "Registrar"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className="p-8">
          {/* Gráfica de tendencia */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Tendencia Historica</CardTitle>
              </div>
              <CardDescription>Evolucion de ventas vs metas en los ultimos meses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={datosGrafica} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 260)" />
                    <XAxis
                      dataKey="mesLabel"
                      tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
                      axisLine={{ stroke: "oklch(0.28 0.02 260)" }}
                    />
                    <YAxis
                      tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
                      axisLine={{ stroke: "oklch(0.28 0.02 260)" }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "oklch(0.17 0.02 260)",
                        border: "1px solid oklch(0.28 0.02 260)",
                        borderRadius: "8px",
                        color: "oklch(0.98 0 0)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="metas"
                      name="Metas"
                      stroke="oklch(0.65 0 0)"
                      strokeWidth={2}
                      dot={{ fill: "oklch(0.65 0 0)" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="ventas"
                      name="Ventas"
                      stroke="oklch(0.55 0.22 160)"
                      strokeWidth={3}
                      dot={{ fill: "oklch(0.55 0.22 160)" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Filtros */}
          <Card className="mb-6">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-primary" />
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
                  <Label className="mb-2 block text-sm">Producto</Label>
                  <Select value={filtroProducto} onValueChange={setFiltroProducto}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todos">Todos los productos</SelectItem>
                      {productos.map((prod) => (
                        <SelectItem key={prod.id} value={prod.id}>
                          {prod.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de histórico */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Registros Historicos</CardTitle>
              <CardDescription>
                {registrosFiltrados.length} registros encontrados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Mes</TableHead>
                    <TableHead>Sucursal</TableHead>
                    <TableHead>Producto</TableHead>
                    <TableHead className="text-center">Meta</TableHead>
                    <TableHead className="text-center">Ventas</TableHead>
                    <TableHead className="text-center">Avance</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {registrosFiltrados.slice(0, 50).map((registro) => (
                    <TableRow key={registro.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          <span className="capitalize">{formatMes(registro.mes)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          {registro.sucursalNombre}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Package className="h-4 w-4 text-muted-foreground" />
                          {registro.productoNombre}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{registro.metaTotal}</TableCell>
                      <TableCell className="text-center font-medium">{registro.ventaTotal}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant={getBadgeVariant(registro.porcentaje)}>
                          {registro.porcentaje}%
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={registro.esHistorico ? "default" : "outline"}>
                          {registro.esHistorico ? "Manual" : "Calculado"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {registro.esHistorico && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                              handleOpenDialog({
                                id: registro.id,
                                mes: registro.mes,
                                sucursalId: registro.sucursalId,
                                productoId: registro.productoId,
                                metaTotal: registro.metaTotal,
                                ventaTotal: registro.ventaTotal,
                                observaciones: registro.observaciones,
                              })
                            }
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  {registrosFiltrados.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={8} className="py-8 text-center text-muted-foreground">
                        No hay registros historicos para los filtros seleccionados
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
