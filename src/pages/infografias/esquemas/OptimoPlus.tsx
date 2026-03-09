import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, CheckCircle2, Globe, ShieldCheck } from "lucide-react"

export const OptimoPlus = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
    {/* Hero de sección */}
    <div className="bg-gradient-to-br from-[#002f6c] to-blue-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
      <div className="relative z-10 space-y-4">
        <Badge className="bg-pink-500 text-white font-black px-4 py-1 rounded-full uppercase text-[10px]">Sin Frontera</Badge>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">Amigo Óptimo Plus</h2>
        <p className="text-blue-100 font-medium max-w-2xl text-lg">
          Llamadas de MX a EUA y Canadá <span className="underline decoration-pink-500 underline-offset-4">como locales</span>. Tus beneficios de siempre, ahora internacionales.
        </p>
      </div>
      <Star className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-[0.05] rotate-12" />
    </div>

    {/* Tarifas por Nivel */}
    <div className="grid md:grid-cols-2 gap-8">
      {/* Nivel Base */}
      <Card className="p-8 rounded-[2.5rem] border-none bg-white shadow-sm border border-slate-100">
        <div className="mb-6">
          <h3 className="text-xl font-black italic uppercase text-slate-900 tracking-tighter">Nivel Tarifario Base</h3>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Consumo de $0.00 a $149.99</p>
        </div>
        <div className="space-y-3">
          {[
            { c: "Minuto Saliente", v: "$1.49" },
            { c: "Minuto Números Frecuentes", v: "$0.98" },
            { c: "Minuto adicional Números Gratis", v: "$1.49" },
            { c: "Mensaje de Texto (SMS)", v: "$0.98" },
            { c: "Megabyte (MB)", v: "$1.98" },
          ].map((r, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-slate-50 last:border-none">
              <span className="text-[11px] font-bold text-slate-500 uppercase">{r.c}</span>
              <span className="text-sm font-black text-slate-900">{r.v}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Nivel 1 */}
      <Card className="p-8 rounded-[2.5rem] border-none bg-blue-50/50 shadow-sm border border-blue-100 relative overflow-hidden">
        <div className="mb-6">
          <h3 className="text-xl font-black italic uppercase text-blue-900 tracking-tighter">Nivel Tarifario 1</h3>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mt-1">Consumo de $150.00 en adelante</p>
        </div>
        <div className="space-y-3">
          {[
            { c: "Minuto Saliente", v: "$0.98" },
            { c: "Minuto Números Frecuentes", v: "$0.98" },
            { c: "Minuto adicional Números Gratis", v: "$0.98" },
            { c: "Mensaje de Texto (SMS)", v: "$0.98" },
            { c: "Megabyte (MB)", v: "$1.98" },
          ].map((r, i) => (
            <div key={i} className="flex justify-between items-center py-3 border-b border-blue-200/30 last:border-none">
              <span className="text-[11px] font-bold text-blue-700 uppercase">{r.c}</span>
              <span className="text-sm font-black text-blue-900">{r.v}</span>
            </div>
          ))}
        </div>
        <div className="absolute top-4 right-8">
            <ShieldCheck className="w-12 h-12 text-blue-200/50" />
        </div>
      </Card>
    </div>

    {/* Beneficios Listado */}
    <div className="bg-[#f8f5f5] rounded-[2.5rem] p-10 border border-white">
      <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-widest mb-6 text-center italic">Cobertura México, E.U.A. y Canadá</h4>
      <div className="grid md:grid-cols-2 gap-x-12 gap-y-4">
        {[
            "Llamadas hacia E.U.A. y Canadá cuestan como locales.",
            "Si te llaman en E.U.A. o Canadá, la recepción no tiene costo.",
            "Tus 5 Números Gratis y 9 Frecuentes son válidos en toda la región.",
            "La tarifa de datos es la misma en los 3 países.",
            "El cobro de voz se realiza por minuto redondeado."
        ].map((texto, idx) => (
            <div key={idx} className="flex items-start gap-3 text-xs font-medium text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>{texto}</span>
            </div>
        ))}
      </div>
    </div>
  </div>
);
