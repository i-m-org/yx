"use client";

import { useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { useApp } from "@/lib/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target, Building2, Package, TrendingUp, Filter } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MetasPage() {
  const { sucursales, productos, metas, ventas, getMesActual } = useApp();
  const [filtroSucursal, setFiltroSucursal] = useState<string>("todas");
  const [filtroProducto, setFiltroProducto] = useState<string>("todos");
  const [mesSeleccionado, setMesSeleccionado] = useState(getMesActual());

  // Generar opciones de meses (últimos 12 meses)
  const opcionesMeses = Array.from({ length: 12 }, (_, i) => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - i);
    const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
    const nombre = fecha.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
    return { value: mes, label: nombre };
  });

  // Filtrar metas según selección
  const metasFiltradas = metas.filter((meta) => {
    const cumpleSucursal = filtroSucursal === "todas" || meta.sucursalId === filtroSucursal;
    const cumpleProducto = filtroProducto === "todos" || meta.productoId === filtroProducto;
    const cumpleMes = meta.mes === mesSeleccionado;
    return cumpleSucursal && cumpleProducto && cumpleMes;
  });

  // Calcular ventas para cada meta
  const metasConVentas = metasFiltradas.map((meta) => {
    const ventasMeta = ventas.filter(
      (v) =>
        v.sucursalId === meta.sucursalId &&
        v.productoId === meta.productoId &&
        v.mes === mesSeleccionado
    );
    const totalVentas = ventasMeta.reduce((acc, v) => acc + v.cantidad, 0);
    const porcentaje = meta.cantidad > 0 ? Math.round((totalVentas / meta.cantidad) * 100) : 0;
    const sucursal = sucursales.find((s) => s.id === meta.sucursalId);
    const producto = productos.find((p) => p.id === meta.productoId);

    return {
      ...meta,
      totalVentas,
      porcentaje,
      sucursalNombre: sucursal?.nombre || "Desconocida",
      productoNombre: producto?.nombre || "Desconocido",
      sucursalTipo: sucursal?.tipo || "desconocido",
    };
  });

  // Agrupar por sucursal
  const metasPorSucursal = sucursales
    .filter((s) => filtroSucursal === "todas" || s.id === filtroSucursal)
    .map((sucursal) => {
      const metasSucursal = metasConVentas.filter((m) => m.sucursalId === sucursal.id);
      const totalMeta = metasSucursal.reduce((acc, m) => acc + m.cantidad, 0);
      const totalVentas = metasSucursal.reduce((acc, m) => acc + m.totalVentas, 0);
      const porcentajeGeneral = totalMeta > 0 ? Math.round((totalVentas / totalMeta) * 100) : 0;

      return {
        sucursal,
        metas: metasSucursal,
        totalMeta,
        totalVentas,
        porcentajeGeneral,
      };
    })
    .filter((g) => g.metas.length > 0);

  const getProgressColor = (porcentaje: number) => {
    if (porcentaje >= 100) return "bg-accent";
    if (porcentaje >= 80) return "bg-chart-2";
    if (porcentaje >= 50) return "bg-chart-3";
    return "bg-destructive";
  };

  const getBadgeVariant = (porcentaje: number): "default" | "secondary" | "destructive" | "outline" => {
    if (porcentaje >= 100) return "default";
    if (porcentaje >= 80) return "secondary";
    if (porcentaje >= 50) return "outline";
    return "destructive";
  };

  const getTipoColor = (tipo: string) => {
    switch (tipo) {
      case "coppel":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30";
      case "elektra":
        return "bg-chart-3/20 text-chart-3 border-chart-3/30";
      case "chedraui":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="border-b border-border bg-card/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Metas</h1>
              <p className="text-sm text-muted-foreground">
                Objetivos y avances por sucursal y producto
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
            </div>
          </div>
        </div>

        <div className="p-8">
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
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Mes
                  </label>
                  <Select value={mesSeleccionado} onValueChange={setMesSeleccionado}>
                    <SelectTrigger>
                      <SelectValue />
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
                <div className="min-w-[200px]">
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Sucursal
                  </label>
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
                  <label className="mb-2 block text-sm font-medium text-muted-foreground">
                    Producto
                  </label>
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

          {/* Metas por Sucursal */}
          <div className="space-y-6">
            {metasPorSucursal.map(({ sucursal, metas: metasSuc, totalMeta, totalVentas, porcentajeGeneral }) => (
              <Card key={sucursal.id} className="overflow-hidden">
                <CardHeader className="bg-card/80">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="rounded-lg bg-primary/10 p-2">
                        <Building2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{sucursal.nombre}</CardTitle>
                        <CardDescription className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={cn("text-xs capitalize", getTipoColor(sucursal.tipo))}
                          >
                            {sucursal.tipo}
                          </Badge>
                        </CardDescription>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        <span className="text-2xl font-bold text-foreground">{porcentajeGeneral}%</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {totalVentas} de {totalMeta}
                      </p>
                    </div>
                  </div>
                  <Progress value={Math.min(porcentajeGeneral, 100)} className="mt-4 h-2" />
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                    {metasSuc.map((meta) => (
                      <div
                        key={meta.id}
                        className="flex flex-col gap-2 rounded-lg border border-border bg-card/50 p-4 transition-all hover:bg-card hover:shadow-md"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-4 w-4 text-muted-foreground" />
                            <span className="font-medium text-foreground">{meta.productoNombre}</span>
                          </div>
                          <Badge variant={getBadgeVariant(meta.porcentaje)}>
                            {meta.porcentaje}%
                          </Badge>
                        </div>
                        <Progress
                          value={Math.min(meta.porcentaje, 100)}
                          className="h-1.5"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>Ventas: {meta.totalVentas}</span>
                          <span>Meta: {meta.cantidad}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {metasPorSucursal.length === 0 && (
              <Card className="p-12 text-center">
                <Target className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <h3 className="mt-4 text-lg font-medium text-foreground">No hay metas registradas</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  No se encontraron metas para los filtros seleccionados
                </p>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
