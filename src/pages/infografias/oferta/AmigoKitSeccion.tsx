import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Smartphone, Gift, Info, CheckCircle2, ChevronRight } from "lucide-react"

const paquetesKit = [
  { p: "50", base: "500 MB", promo: "500 MB", total: "1.0 GB", hot: false },
  { p: "80", base: "800 MB", promo: "800 MB", total: "1.6 GB", hot: false },
  { p: "100", base: "1.5 GB", promo: "1.5 GB", total: "3 GB", hot: true },
  { p: "150", base: "2.5 GB", promo: "2.5 GB", total: "5 GB", hot: false },
  { p: "200", base: "3.5 GB", promo: "3.5 GB", total: "7 GB", hot: false },
  { p: "300", base: "5.5 GB", promo: "5.5 GB", total: "11 GB", hot: true },
  { p: "500", base: "8 GB", promo: "8 GB", total: "16 GB", hot: false },
]

export function AmigoKitSeccion() {
  return (
    <div className="max-w-6xl mx-auto px-4 pb-20 space-y-10">
      
      {/* HERO BANNER AMIGO KIT */}
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-slate-900 via-[#002f6c] to-blue-900 p-10 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-2xl">
          <Badge className="bg-amber-400 text-slate-900 border-none font-black px-4 py-1">PROMO AMIGO KIT</Badge>
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.9]">
            ESTRENA Y <br />
            <span className="text-amber-400 tracking-normal text-4xl md:text-6xl uppercase">Recibe el Doble</span>
          </h1>
          <p className="text-blue-100 text-lg font-medium">
            Durante 6 meses, disfruta el doble de datos al comprar tu Amigo Kit con esquema Amigo Sin Límite.
          </p>
          <div className="flex items-center gap-2 text-xs font-bold text-blue-200 uppercase tracking-widest">
             Vigencia: 05 Sep 2025 - 02 Mar 2026
          </div>
        </div>
        <Smartphone className="absolute -right-10 -bottom-10 w-80 h-80 text-white/10 rotate-12" />
      </div>

      {/* GRID DE DATOS AL DOBLE */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paquetesKit.map((item, idx) => (
          <Card key={idx} className={`p-6 rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-xl transition-all group ${item.hot ? 'ring-2 ring-amber-400 shadow-amber-100' : ''}`}>
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-400 font-bold text-sm uppercase italic">Paquete</span>
              {item.hot && <Badge className="bg-amber-100 text-amber-700 font-black text-[10px]">RECOMENDADO</Badge>}
            </div>
            
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-black text-slate-900">${item.p}</span>
            </div>

            <div className="space-y-3 relative">
              <div className="flex justify-between text-sm text-slate-500 font-medium">
                <span>Base: {item.base}</span>
                <span>Promo: +{item.promo}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden flex">
                <div className="h-full w-1/2 bg-blue-600" />
                <div className="h-full w-1/2 bg-amber-400 animate-pulse" />
              </div>
              <div className="pt-2 flex justify-between items-center">
                <span className="text-slate-900 font-black text-2xl tracking-tighter italic">Total {item.total}</span>
                <div className="bg-blue-50 text-blue-700 p-2 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CÓMO ACTIVAR */}
      <div className="bg-[#f8f5f5] rounded-[2.5rem] p-8 md:p-12 border border-white shadow-inner">
        <h3 className="text-3xl font-black text-[#002f6c] mb-8 flex items-center gap-3 tracking-tighter italic">
          <Gift className="text-amber-500" /> ¿Cómo obtengo el beneficio?
        </h3>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { step: "01", t: "Compra", d: "Adquiere un Smartphone participante en Amigo Kit." },
            { step: "02", t: "Activa", d: "Realiza una recarga inicial de $50 o más en una exhibición." },
            { step: "03", t: "Usa", d: "Realiza tu primer evento con costo (llamada, SMS o datos)." }
          ].map((s, i) => (
            <div key={i} className="relative p-6 bg-white rounded-3xl shadow-sm border border-slate-100">
              <span className="text-5xl font-black text-slate-100 absolute top-4 right-6">{s.step}</span>
              <h4 className="font-black text-[#002f6c] text-xl mb-2 relative z-10 italic uppercase tracking-tighter">{s.t}</h4>
              <p className="text-slate-500 text-sm font-medium leading-snug">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      {/* TÉRMINOS Y CONDICIONES - DISEÑO COMPACTO */}
      <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
        <div className="flex items-center gap-2 mb-6 text-[#002f6c]">
          <Info className="w-5 h-5" />
          <h4 className="font-black uppercase text-sm tracking-widest">Términos y Condiciones Legales</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-x-8 gap-y-3 text-[11px] text-slate-400 leading-relaxed max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> Válido a nivel nacional para usuarios Amigo de Telcel (Prepago) con esquema Amigo Sin Límite.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> Aplica únicamente en la compra de Smartphones en Amigo Kit participantes.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> Requiere recarga mínima de $50 en una sola exhibición para activar la promoción.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> Los datos promocionales tienen la misma vigencia que el paquete adquirido.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> Al término de la vigencia, los datos no utilizados se perderán.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> No acumulable con otras promociones de datos o recargas.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> La promoción se pierde si el usuario realiza un cambio de Esquema de Cobro.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> No aplica en Paquetes Internet por tiempo ni Saldo Entretenimiento.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> Los beneficios no son permutables por efectivo ni saldo amigo.</p>
          <p><CheckCircle2 className="inline w-3 h-3 mr-1 text-blue-400"/> Sujeto a disponibilidad de equipos en el punto de venta.</p>
        </div>
      </div>

    </div>
  )
}

