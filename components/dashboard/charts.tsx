import { useApp } from "@/lib/app-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const COLORS = [
  "oklch(0.65 0.18 250)", // primary
  "oklch(0.55 0.22 160)", // accent
  "oklch(0.70 0.20 80)",  // chart-3
  "oklch(0.60 0.20 320)", // chart-4
  "oklch(0.75 0.15 45)",  // chart-5
];

export function SucursalesChart() {
  const { getEstadisticasSucursal, getMesActual } = useApp();
  const estadisticas = getEstadisticasSucursal(getMesActual());

  const data = estadisticas.map((est) => ({
    nombre: est.sucursalNombre.replace("Coppel ", "C").replace("Elektra ", "E").replace("Chedraui ", "Ch"),
    ventas: est.totalVentas,
    meta: est.totalMeta,
    avance: est.porcentajeAvance,
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Ventas por Sucursal</CardTitle>
        <CardDescription>Comparativa ventas vs metas del mes actual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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
  );
}

export function ProductosChart() {
  const { getEstadisticasProducto, getMesActual } = useApp();
  const estadisticas = getEstadisticasProducto(getMesActual());

  const data = estadisticas.map((est, index) => ({
    name: est.productoNombre,
    value: est.totalVentas,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Ventas por Producto</CardTitle>
        <CardDescription>Distribucion de ventas mensuales</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={{ stroke: "oklch(0.65 0 0)" }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.17 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0 0)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function AvanceChart() {
  const { getEstadisticasSucursal, getMesActual } = useApp();
  const estadisticas = getEstadisticasSucursal(getMesActual());

  const data = estadisticas.map((est) => ({
    nombre: est.sucursalNombre.replace("Coppel ", "C").replace("Elektra ", "E").replace("Chedraui ", "Ch"),
    avance: est.porcentajeAvance,
  }));

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Avance por Sucursal</CardTitle>
        <CardDescription>Porcentaje de cumplimiento de metas</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.28 0.02 260)" />
              <XAxis 
                dataKey="nombre" 
                tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.28 0.02 260)" }}
              />
              <YAxis 
                tick={{ fill: "oklch(0.65 0 0)", fontSize: 12 }}
                axisLine={{ stroke: "oklch(0.28 0.02 260)" }}
                domain={[0, 100]}
                tickFormatter={(value) => `${value}%`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "oklch(0.17 0.02 260)",
                  border: "1px solid oklch(0.28 0.02 260)",
                  borderRadius: "8px",
                  color: "oklch(0.98 0 0)",
                }}
                formatter={(value: number) => [`${value}%`, "Avance"]}
              />
              <Line
                type="monotone"
                dataKey="avance"
                stroke="oklch(0.55 0.22 160)"
                strokeWidth={3}
                dot={{ fill: "oklch(0.55 0.22 160)", strokeWidth: 2, r: 5 }}
                activeDot={{ r: 8, fill: "oklch(0.65 0.18 250)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
