import { useApp } from "@/lib/app-context";
import { Card, CardContent } from "@/components/ui/card";
import {
  TrendingUp,
  TrendingDown,
  Target,
  Users,
  Building2,
  ShoppingCart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: number;
  variant?: "default" | "success" | "warning" | "danger";
}

function KPICard({ title, value, subtitle, icon, trend, variant = "default" }: KPICardProps) {
  const variantStyles = {
    default: "border-border",
    success: "border-accent/50 bg-accent/5",
    warning: "border-chart-3/50 bg-chart-3/5",
    danger: "border-destructive/50 bg-destructive/5",
  };

  return (
    <Card className={cn("relative overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-primary/5", variantStyles[variant])}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
              {trend !== undefined && (
                <span
                  className={cn(
                    "flex items-center text-xs font-medium",
                    trend >= 0 ? "text-accent" : "text-destructive"
                  )}
                >
                  {trend >= 0 ? (
                    <TrendingUp className="mr-0.5 h-3 w-3" />
                  ) : (
                    <TrendingDown className="mr-0.5 h-3 w-3" />
                  )}
                  {Math.abs(trend)}%
                </span>
              )}
            </div>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
          <div className="rounded-lg bg-primary/10 p-3 text-primary">{icon}</div>
        </div>
      </CardContent>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-accent/50" />
    </Card>
  );
}

export function KPICards() {
  const { sucursales, empleados, productos, ventas, metas, getMesActual, getEstadisticasSucursal, getEstadisticasProducto } = useApp();

  const mesActual = getMesActual();
  const estadisticasSucursal = getEstadisticasSucursal(mesActual);
  const estadisticasProducto = getEstadisticasProducto(mesActual);

  // Calcular totales
  const totalVentas = estadisticasSucursal.reduce((acc, s) => acc + s.totalVentas, 0);
  const totalMetas = estadisticasSucursal.reduce((acc, s) => acc + s.totalMeta, 0);
  const porcentajeGeneral = totalMetas > 0 ? Math.round((totalVentas / totalMetas) * 100) : 0;

  // Sucursales activas
  const sucursalesActivas = sucursales.filter((s) => s.activa).length;

  // Empleados activos
  const empleadosActivos = empleados.filter((e) => e.activo).length;

  // Mejor producto
  const mejorProducto = estadisticasProducto.reduce(
    (best, prod) => (prod.totalVentas > (best?.totalVentas || 0) ? prod : best),
    estadisticasProducto[0]
  );

  // Calcular variante según porcentaje
  const getVariant = (porcentaje: number) => {
    if (porcentaje >= 80) return "success";
    if (porcentaje >= 50) return "warning";
    return "danger";
  };

  return (
    <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
      <KPICard
        title="Ventas del Mes"
        value={totalVentas}
        subtitle={`de ${totalMetas} meta total`}
        icon={<ShoppingCart className="h-6 w-6" />}
        trend={porcentajeGeneral - 50}
        variant={getVariant(porcentajeGeneral)}
      />
      <KPICard
        title="Avance General"
        value={`${porcentajeGeneral}%`}
        subtitle="del objetivo mensual"
        icon={<Target className="h-6 w-6" />}
        variant={getVariant(porcentajeGeneral)}
      />
      <KPICard
        title="Sucursales"
        value={sucursalesActivas}
        subtitle={`de ${sucursales.length} totales activas`}
        icon={<Building2 className="h-6 w-6" />}
      />
      <KPICard
        title="Empleados"
        value={empleadosActivos}
        subtitle={`vendedores activos`}
        icon={<Users className="h-6 w-6" />}
      />
    </div>
  );
}
