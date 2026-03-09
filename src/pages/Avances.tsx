import { useState, useMemo } from "react";
import { MainLayout } from "@/components/sidebar";
import { useApp } from "@/lib/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TrendingUp, Building2, Users, Package, Filter, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function AvancesPage() {
  const { sucursales, productos, empleados, metas, ventas, getMesActual } = useApp();
  const [filtroSucursal, setFiltroSucursal] = useState<string>("todas");
  const [filtroProducto, setFiltroProducto] = useState<string>("todos");
  const [mesSeleccionado, setMesSeleccionado] = useState(getMesActual());
  const [vistaActiva, setVistaActiva] = useState<"sucursal" | "empleado" | "producto">("sucursal");

  // Generar opciones de meses
  const opcionesMeses = Array.from({ length: 12 }, (_, i) => {
    const fecha = new Date();
    fecha.setMonth(fecha.getMonth() - i);
    const mes = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, "0")}`;
    const nombre = fecha.toLocaleDateString("es-MX", { month: "long", year: "numeric" });
    return { value: mes, label: nombre };
  });

  // Avance por Sucursal
  const avancePorSucursal = useMemo(() => {
    return sucursales
      .filter((s) => filtroSucursal === "todas" || s.id === filtroSucursal)
      .map((sucursal) => {
        const metasSuc = metas.filter(
          (m) =>
            m.sucursalId === sucursal.id &&
            m.mes === mesSeleccionado &&
            (filtroProducto === "todos" || m.productoId === filtroProducto)
        );
        const ventasSuc = ventas.filter(
          (v) =>
            v.sucursalId === sucursal.id &&
            v.mes === mesSeleccionado &&
            (filtroProducto === "todos" || v.productoId === filtroProducto)
        );

        const totalMeta = metasSuc.reduce((acc, m) => acc + m.cantidad, 0);
        const totalVentas = ventasSuc.reduce((acc, v) => acc + v.cantidad, 0);
        const porcentaje = totalMeta > 0 ? Math.round((totalVentas / totalMeta) * 100) : 0;
        const empleadosSuc = empleados.filter((e) => e.sucursalId === sucursal.id && e.activo);

        return {
          id: sucursal.id,
          nombre: sucursal.nombre,
          tipo: sucursal.tipo,
          totalMeta,
          totalVentas,
          porcentaje,
          empleados: empleadosSuc.length,
        };
      });
  }, [sucursales, metas, ventas, empleados, filtroSucursal, filtroProducto, mesSeleccionado]);

  // Avance por Empleado
  const avancePorEmpleado = useMemo(() => {
    return empleados
      .filter((e) => e.activo && (filtroSucursal === "todas" || e.sucursalId === filtroSucursal))
      .map((empleado) => {
        const sucursal = sucursales.find((s) => s.id === empleado.sucursalId);
        const ventasEmp = ventas.filter(
          (v) =>
            v.empleadoId === empleado.id &&
            v.mes === mesSeleccionado &&
            (filtroProducto === "todos" || v.productoId === filtroProducto)
        );

        const totalVentas = ventasEmp.reduce((acc, v) => acc + v.cantidad, 0);

        // Desglose por producto
        const ventasPorProducto = productos.map((prod) => ({
          productoId: prod.id,
          productoNombre: prod.nombre,
          cantidad: ventasEmp
            .filter((v) => v.productoId === prod.id)
            .reduce((acc, v) => acc + v.cantidad, 0),
        }));

        return {
          id: empleado.id,
          nombre: empleado.nombre,
          sucursalNombre: sucursal?.nombre || "Sin sucursal",
          sucursalId: empleado.sucursalId,
          totalVentas,
          ventasPorProducto,
        };
      })
      .sort((a, b) => b.totalVentas - a.totalVentas);
  }, [empleados, sucursales, ventas, productos, filtroSucursal, filtroProducto, mesSeleccionado]);

  // Avance por Producto
  const avancePorProducto = useMemo(() => {
    return productos
      .filter((p) => filtroProducto === "todos" || p.id === filtroProducto)
      .map((producto) => {
        const metasProd = metas.filter(
          (m) =>
            m.productoId === producto.id &&
            m.mes === mesSeleccionado &&
            (filtroSucursal === "todas" || m.sucursalId === filtroSucursal)
        );
        const ventasProd = ventas.filter(
          (v) =>
            v.productoId === producto.id &&
            v.mes === mesSeleccionado &&
            (filtroSucursal === "todas" || v.sucursalId === filtroSucursal)
        );

        const totalMeta = metasProd.reduce((acc, m) => acc + m.cantidad, 0);
        const totalVentas = ventasProd.reduce((acc, v) => acc + v.cantidad, 0);
        const porcentaje = totalMeta > 0 ? Math.round((totalVentas / totalMeta) * 100) : 0;

        return {
          id: producto.id,
          nombre: producto.nombre,
          totalMeta,
          totalVentas,
          porcentaje,
        };
      });
  }, [productos, metas, ventas, filtroSucursal, filtroProducto, mesSeleccionado]);

  // Datos para gráfica
  const datosGrafica = avancePorSucursal.map((s) => ({
    nombre: s.nombre.replace("Coppel ", "C").replace("Elektra ", "E").replace("Chedraui ", "Ch"),
    ventas: s.totalVentas,
    meta: s.totalMeta,
  }));

  const getBadgeVariant = (porcentaje: number): "default" | "secondary" | "destructive" | "outline" => {
    if (porcentaje >= 100) return "default";
    if (porcentaje >= 80) return "secondary";
    if (porcentaje >= 50) return "outline";
    return "destructive";
  };

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

  return (
    <MainLayout>
      <div className="border-b border-border bg-card/50 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">Avances</h1>
            <p className="text-sm text-muted-foreground">
              Progreso de ventas por sucursal, empleado y producto
            </p>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 lg:p-8">
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

          {/* Gráfica resumen */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-primary" />
                <CardTitle className="text-base">Resumen Visual</CardTitle>
              </div>
              <CardDescription>Comparativa de ventas vs metas por sucursal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={datosGrafica} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 260)" />
                    <XAxis
                      dataKey="nombre"
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
                    <Bar dataKey="meta" name="Meta" fill="oklch(0.28 0.02 260)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="ventas" name="Ventas" fill="oklch(0.65 0.18 250)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Tabs de vistas */}
          <Tabs value={vistaActiva} onValueChange={(v) => setVistaActiva(v as typeof vistaActiva)}>
            <TabsList className="mb-4">
              <TabsTrigger value="sucursal" className="gap-2">
                <Building2 className="h-4 w-4" />
                Por Sucursal
              </TabsTrigger>
              <TabsTrigger value="empleado" className="gap-2">
                <Users className="h-4 w-4" />
                Por Empleado
              </TabsTrigger>
              <TabsTrigger value="producto" className="gap-2">
                <Package className="h-4 w-4" />
                Por Producto
              </TabsTrigger>
            </TabsList>

            {/* Vista por Sucursal */}
            <TabsContent value="sucursal">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Sucursal</TableHead>
                        <TableHead>Tipo</TableHead>
                        <TableHead>Empleados</TableHead>
                        <TableHead>Ventas</TableHead>
                        <TableHead>Meta</TableHead>
                        <TableHead>Avance</TableHead>
                        <TableHead className="w-[200px]">Progreso</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {avancePorSucursal.map((suc) => (
                        <TableRow key={suc.id}>
                          <TableCell className="font-medium">{suc.nombre}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className={cn("capitalize", getTipoColor(suc.tipo))}>
                              {suc.tipo}
                            </Badge>
                          </TableCell>
                          <TableCell>{suc.empleados}</TableCell>
                          <TableCell className="font-medium">{suc.totalVentas}</TableCell>
                          <TableCell className="text-muted-foreground">{suc.totalMeta}</TableCell>
                          <TableCell>
                            <Badge variant={getBadgeVariant(suc.porcentaje)}>{suc.porcentaje}%</Badge>
                          </TableCell>
                          <TableCell>
                            <Progress value={Math.min(suc.porcentaje, 100)} className="h-2" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vista por Empleado */}
            <TabsContent value="empleado">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Empleado</TableHead>
                        <TableHead>Sucursal</TableHead>
                        <TableHead>Total Ventas</TableHead>
                        {productos.map((prod) => (
                          <TableHead key={prod.id} className="text-center">
                            {prod.nombre.split(" ")[0]}
                          </TableHead>
                        ))}
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {avancePorEmpleado.map((emp) => (
                        <TableRow key={emp.id}>
                          <TableCell className="font-medium">{emp.nombre}</TableCell>
                          <TableCell className="text-muted-foreground">{emp.sucursalNombre}</TableCell>
                          <TableCell>
                            <Badge variant="default">{emp.totalVentas}</Badge>
                          </TableCell>
                          {emp.ventasPorProducto.map((vp) => (
                            <TableCell key={vp.productoId} className="text-center">
                              {vp.cantidad > 0 ? (
                                <span className="font-medium text-foreground">{vp.cantidad}</span>
                              ) : (
                                <span className="text-muted-foreground">-</span>
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Vista por Producto */}
            <TabsContent value="producto">
              <Card>
                <CardContent className="pt-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {avancePorProducto.map((prod) => (
                      <div
                        key={prod.id}
                        className="rounded-lg border border-border bg-card/50 p-4 transition-all hover:bg-card hover:shadow-md"
                      >
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-primary" />
                            <span className="font-medium text-foreground">{prod.nombre}</span>
                          </div>
                          <Badge variant={getBadgeVariant(prod.porcentaje)}>{prod.porcentaje}%</Badge>
                        </div>
                        <Progress value={Math.min(prod.porcentaje, 100)} className="mb-3 h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Ventas: {prod.totalVentas}</span>
                          <span className="text-muted-foreground">Meta: {prod.totalMeta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
    </MainLayout>
  );
}
