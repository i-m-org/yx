import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, SmartphoneNfc, Smartphone, Globe, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react"
import { useApp } from "@/lib/app-context"

const beneficioIcons = [<Globe />, <Zap />, <ShieldCheck />];

export function ChipExpressSeccion() {
  const { infografiasConfig } = useApp();
  const { heroBadge, heroSubtitulo, beneficios, pasos, ctaTexto, footerTexto } = infografiasConfig.chipExpress;

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* HERO CHIP EXPRESS */}
      <div className="relative overflow-hidden rounded-[3rem] bg-gradient-to-r from-blue-600 to-sky-500 p-10 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <Badge className="bg-white text-blue-600 font-black px-4 py-1 rounded-full uppercase tracking-tighter text-[10px]">
              {heroBadge}
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-[0.8]">
              CHIP <br /> EXPRESS
            </h1>
            <p className="text-blue-50 text-xl font-medium max-w-sm">
              {heroSubtitulo}
            </p>
          </div>
          <div className="flex justify-center md:justify-end">
             <div className="relative group">
                <div className="absolute -inset-4 bg-white/20 rounded-full blur-2xl group-hover:bg-white/30 transition-all" />
                <Zap className="w-40 h-40 text-yellow-300 relative drop-shadow-2xl" />
             </div>
          </div>
        </div>
      </div>

      {/* BENEFICIOS CLAVE */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {beneficios.map((item, i) => (
          <Card key={i} className="p-8 rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-md transition-all text-center space-y-4 group">
            <div className="mx-auto w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-[#002f6c] group-hover:text-white transition-colors">
              {beneficioIcons[i % beneficioIcons.length]}
            </div>
            <h3 className="text-xl font-black italic tracking-tighter uppercase">{item.titulo}</h3>
            <p className="text-slate-500 text-sm font-medium">{item.descripcion}</p>
          </Card>
        ))}
      </div>

      {/* PASO A PASO (INSTRUCTIONS) */}
      <div className="bg-[#f8f5f5] rounded-[3rem] p-10 md:p-14 border border-white">
        <h2 className="text-4xl font-black text-[#002f6c] mb-10 tracking-tighter italic uppercase text-center md:text-left">
          Activa en 3 Pasos
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {pasos.map((step, i) => (
            <div key={i} className="relative group">
              <span className="text-8xl font-black text-white absolute -top-10 -left-4 group-hover:text-blue-100 transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="relative z-10 space-y-2">
                <h4 className="text-2xl font-black text-slate-900 italic uppercase tracking-tighter">
                  {step.titulo}
                </h4>
                <p className="text-slate-500 font-medium leading-relaxed">
                  {step.descripcion}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FOOTER CALL TO ACTION */}
      <Card className="bg-[#002f6c] p-10 rounded-[3rem] text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl overflow-hidden relative">
        <div className="space-y-2 relative z-10">
            <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none">
                {ctaTexto}
            </h3>
            <p className="text-blue-200 font-medium">Empieza a navegar con los mejores paquetes Sin Límite.</p>
        </div>
        <button className="bg-white text-[#002f6c] px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-yellow-300 transition-all flex items-center gap-2 group relative z-10 shadow-lg">
            Ver Paquetes <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
        </button>
        {/* Decoración de fondo */}
        <div className="absolute right-0 bottom-0 w-64 h-64 bg-blue-500 rounded-full blur-[80px] opacity-20 translate-x-1/2 translate-y-1/2" />
      </Card>

      {/* LEGALES PEQUEÑOS */}
      <div className="text-center opacity-40">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.4em]">
           {footerTexto}
        </p>
      </div>

    </div>
  )
}
