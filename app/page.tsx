"use client";

import { Sidebar } from "@/components/sidebar";
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
    <div className="min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        <div className="border-b border-border bg-card/50 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Vista general del rendimiento de ventas
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2">
              <CalendarDays className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium capitalize text-foreground">{nombreMes}</span>
            </div>
          </div>
        </div>

        <div className="p-8">
          <div className="space-y-8">
            {/* KPI Cards */}
            <KPICards />

            {/* Charts Row 1 */}
            <div className="grid gap-6 lg:grid-cols-3">
              <SucursalesChart />
              <ProductosChart />
            </div>

            {/* Charts Row 2 */}
            <div className="grid gap-6 lg:grid-cols-3">
              <ProgressTable />
              <TopEmpleados />
            </div>

            {/* Avance Chart */}
            <div className="grid gap-6 lg:grid-cols-2">
              <AvanceChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
