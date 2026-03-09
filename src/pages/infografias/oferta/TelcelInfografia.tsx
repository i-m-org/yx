import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { CheckCircle2, Zap, Gift, MessageCircle, Crown } from "lucide-react"

const recargas = [
  { monto: "$100", normal: "1.5 GB", promo: "2.25 GB", extra: null, popular: false },
  { monto: "$150", normal: "2.5 GB", promo: "3.75 GB", extra: null, popular: false },
  { monto: "$200", normal: "3.5 GB", promo: "5.25 GB", extra: null, popular: true },
  { monto: "$270", normal: "2.5 GB", promo: "3.75 GB", extra: "Amazon Prime", popular: false },
  { monto: "$300", normal: "5.5 GB", promo: "8.25 GB", extra: "Amazon Prime", popular: false },
  { monto: "$500", normal: "8 GB", promo: "12 GB", extra: "Amazon Prime", popular: false },
]

export function TelcelInfografia() {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex justify-center p-6 font-sans">
      <div className="w-full max-w-6xl space-y-8">
        
        {/* HERO SECTION */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#002f6c] via-[#004a99] to-[#002f6c] p-8 md:p-12 text-white shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left space-y-4">
              <Badge className="bg-orange-500 hover:bg-orange-600 text-white border-none px-4 py-1 rounded-full animate-pulse">
                Exclusivo Chip 0
              </Badge>
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                MÁS PODER <br /> 
                <span className="text-orange-400">+50% GRATIS</span>
              </h1>
              <p className="text-blue-100 text-lg max-w-md">
                Navega a máxima velocidad con la red más moderna de México.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-center min-w-[200px]">
              <p className="text-sm uppercase tracking-widest text-blue-200 mb-1">Vence en</p>
              <p className="text-3xl font-bold">Enero 2026</p>
            </div>
          </div>
          
          {/* Círculos decorativos de fondo */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/20 rounded-full blur-3xl" />
        </div>

        {/* GRID DE RECARGAS */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recargas.map((r) => (
            <Card
              key={r.monto}
              className={cn(
                "relative group overflow-hidden p-0 rounded-[2rem] border-none shadow-xl transition-all duration-300 hover:scale-[1.02]",
                r.popular ? "ring-2 ring-orange-500" : "bg-white"
              )}
            >
              {r.popular && (
                <div className="bg-orange-500 text-white text-[10px] font-bold uppercase text-center py-1 tracking-wider">
                  La más buscada
                </div>
              )}
              
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="text-4xl font-black text-slate-900">{r.monto}</span>
                    <span className="text-slate-400 text-sm ml-1">MXN</span>
                  </div>
                  <div className="bg-emerald-50 p-2 rounded-xl">
                    <Zap className="w-5 h-5 text-emerald-500" />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-blue-600 italic leading-none">{r.promo}</span>
                    <span className="text-slate-400 line-through text-sm">{r.normal}</span>
                  </div>
                  
                  <div className="flex flex-col gap-3 pt-4">
                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Redes Sociales Ilimitadas</span>
                    </div>
                    {r.extra && (
                      <div className="flex items-center gap-2 text-sm font-semibold text-blue-700 bg-blue-50 p-2 rounded-lg">
                        <Crown className="w-4 h-4" />
                        <span>{r.extra} Incluido</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" />
            </Card>
          ))}
        </div>

        {/* SECCIÓN DE BENEFICIOS PREMIUM */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-8 rounded-[2rem] bg-white border-slate-100 shadow-lg">
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Gift className="text-orange-500" /> Servicios Digitales
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-medium text-slate-700 italic font-bold">claro-música</span>
                <Badge variant="secondary">500 MB</Badge>
              </div>
              <div className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <span className="font-medium text-slate-700 italic font-bold">claro-drive</span>
                <Badge variant="secondary">20 GB</Badge>
              </div>
            </div>
          </Card>

          <Card className="p-8 rounded-[2rem] bg-[#004a99] text-white shadow-lg flex flex-col justify-center items-center text-center">
            <h3 className="text-2xl font-bold mb-2">¿Necesitas ayuda?</h3>
            <p className="text-blue-100 mb-6 text-sm">Activa tu paquete en segundos por WhatsApp</p>
            <button className="w-full bg-white text-blue-900 hover:bg-orange-500 hover:text-white transition-all duration-300 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-xl">
              <MessageCircle className="w-5 h-5" />
              SOLICITAR AHORA
            </button>
          </Card>
        </div>

      </div>
    </div>
  )
}
