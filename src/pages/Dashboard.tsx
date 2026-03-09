import { MainLayout } from "@/components/sidebar";
import { KPICards } from "@/components/dashboard/kpi-cards";
import { SucursalesChart, ProductosChart, AvanceChart } from "@/components/dashboard/charts";
import { ProgressTable, TopEmpleados } from "@/components/dashboard/progress-table";
import { useApp } from "@/lib/app-context";
import { CalendarDays } from "lucide-react";

export default function DashboardPage() {
  const { getMesActual } = useApp();
  
  const mesActual = getMesActual();
  const [year, month] = mesActual.split("-");
  const nombreMes = new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString("es-MX", {
    month: "long",
    year: "numeric",
  });

  return (
    <MainLayout>
      {/* Header */}
      <div className="border-b border-border bg-card/50 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">Dashboard</h1>
            <p className="text-sm text-muted-foreground">
              Vista general del rendimiento de ventas
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 sm:px-4">
            <CalendarDays className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium capitalize text-foreground">{nombreMes}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="space-y-6 lg:space-y-8">
          {/* KPI Cards - Grid horizontal en todas las pantallas */}
          <KPICards />

          {/* Seccion principal - Layout horizontal en desktop */}
          <div className="grid gap-6 xl:grid-cols-3">
            {/* Grafico de sucursales - Ocupa 2 columnas en xl */}
            <div className="xl:col-span-2">
              <SucursalesChart />
            </div>
            {/* Grafico de productos - 1 columna */}
            <div className="xl:col-span-1">
              <ProductosChart />
            </div>
          </div>

          {/* Seccion de tablas y avance - Layout horizontal */}
          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {/* Tabla de progreso */}
            <div className="lg:col-span-1 xl:col-span-1">
              <ProgressTable />
            </div>
            {/* Top empleados */}
            <div className="lg:col-span-1 xl:col-span-1">
              <TopEmpleados />
            </div>
            {/* Grafico de avance */}
            <div className="lg:col-span-2 xl:col-span-1">
              <AvanceChart />
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
