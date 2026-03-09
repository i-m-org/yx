import { useApp } from "@/lib/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export function ProgressTable() {
  const { getEstadisticasSucursal, getMesActual, sucursales } = useApp();
  const estadisticas = getEstadisticasSucursal(getMesActual());

  const getProgressColor = (porcentaje: number) => {
    if (porcentaje >= 80) return "bg-accent";
    if (porcentaje >= 50) return "bg-chart-3";
    return "bg-destructive";
  };

  const getBadgeVariant = (porcentaje: number) => {
    if (porcentaje >= 80) return "default";
    if (porcentaje >= 50) return "secondary";
    return "destructive";
  };

  const getSucursalTipo = (sucursalId: string) => {
    const sucursal = sucursales.find((s) => s.id === sucursalId);
    return sucursal?.tipo || "desconocido";
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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Avance Detallado por Sucursal</CardTitle>
        <CardDescription>Progreso hacia las metas del mes actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {estadisticas.map((est) => (
            <div
              key={est.sucursalId}
              className="flex flex-col gap-3 rounded-lg border border-border bg-card/50 p-4 transition-all hover:bg-card hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{est.sucursalNombre}</span>
                  <Badge
                    variant="outline"
                    className={cn("text-xs capitalize", getTipoColor(getSucursalTipo(est.sucursalId)))}
                  >
                    {getSucursalTipo(est.sucursalId)}
                  </Badge>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-muted-foreground">
                    {est.empleadosActivos} empleados
                  </span>
                  <Badge variant={getBadgeVariant(est.porcentajeAvance)}>
                    {est.porcentajeAvance}%
                  </Badge>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Progress
                  value={Math.min(est.porcentajeAvance, 100)}
                  className="h-2 flex-1"
                />
                <span className="min-w-[80px] text-right text-sm text-muted-foreground">
                  {est.totalVentas} / {est.totalMeta}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export function TopEmpleados() {
  const { getEstadisticasEmpleado, getMesActual } = useApp();
  const estadisticas = getEstadisticasEmpleado(getMesActual());

  // Ordenar por total de ventas
  const topEmpleados = [...estadisticas]
    .sort((a, b) => b.totalVentas - a.totalVentas)
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Top Vendedores</CardTitle>
        <CardDescription>Mejores resultados del mes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {topEmpleados.map((emp, index) => (
            <div
              key={emp.empleadoId}
              className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-3 transition-all hover:bg-card"
            >
              <div className="flex items-center gap-3">
                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                    index === 0
                      ? "bg-chart-3 text-background"
                      : index === 1
                      ? "bg-muted-foreground text-background"
                      : index === 2
                      ? "bg-chart-5 text-background"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>
                <div>
                  <p className="font-medium text-foreground">{emp.empleadoNombre}</p>
                  <p className="text-xs text-muted-foreground">{emp.sucursalNombre}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-primary">{emp.totalVentas}</p>
                <p className="text-xs text-muted-foreground">ventas</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
