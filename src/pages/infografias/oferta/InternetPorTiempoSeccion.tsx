import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Timer, 
  Zap, 
  ShieldCheck, 
  Smartphone, 
  CreditCard, 
  Wallet,
  Info,
  ChevronRight,
  Wifi
} from "lucide-react"

const paquetesTiempo = [
  { id: "1", horas: "1 hora", precio: "$10", recomendado: false },
  { id: "2", horas: "2 horas", precio: "$15", recomendado: false },
  { id: "4", horas: "4 horas", precio: "$25", recomendado: true },
]

export function InternetPorTiempoSeccion() {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* HERO SECTION */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-2 bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100">
          <Wifi className="w-4 h-4 text-blue-600" />
          <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">Navega sin límites en la Red 5G</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-[#002f6c] leading-none">
          INTERNET <br /> POR TIEMPO
        </h1>
        <p className="text-slate-500 font-medium max-w-xl mx-auto text-lg">
          Actívalo con cargo a tu <span className="text-slate-900 font-bold">tarjeta de crédito/débito</span> o con tu <span className="text-slate-900 font-bold">Saldo Amigo</span>.
        </p>
      </div>

      {/* GRID DE PAQUETES (Basado en la imagen cargada) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {paquetesTiempo.map((p) => (
          <Card key={p.id} className={`relative p-8 rounded-[3rem] border-none bg-white shadow-sm hover:shadow-2xl transition-all group ${p.recomendado ? 'ring-2 ring-pink-500' : ''}`}>
            {p.recomendado && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white font-black px-6 py-1 rounded-full text-[10px] shadow-lg shadow-pink-100">
                RECOMENDADO
              </Badge>
            )}
            
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest italic">Paquete {p.horas}</span>
                <Timer className="w-5 h-5 text-slate-200 group-hover:text-blue-500 transition-colors" />
              </div>

              <div className="space-y-1">
                <h3 className="text-4xl font-black text-slate-900 italic tracking-tighter italic uppercase leading-none">Ilimitados</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Datos para navegación libre</p>
              </div>

              <div className="flex justify-between items-end border-t border-slate-50 pt-6">
                <div>
                  <p className="text-2xl font-black text-slate-900 italic">{p.horas}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Vigencia</p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-black text-[#002f6c]">{p.precio}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Precio</p>
                </div>
              </div>

              <button className="w-full bg-[#8b3dff] hover:bg-[#722ed1] text-white font-black py-4 rounded-2xl transition-all shadow-lg shadow-purple-100 flex items-center justify-center gap-2 group">
                LO QUIERO <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </Card>
        ))}
      </div>

      {/* ACTIVACIÓN Y PAGO */}
      <div className="bg-[#f8f5f5] rounded-[3rem] p-10 md:p-16 border border-white flex flex-col md:flex-row gap-12 items-center">
        <div className="flex-1 space-y-6">
          <h2 className="text-3xl font-black text-slate-900 italic tracking-tighter uppercase leading-tight">
            Tú decides <span className="text-blue-600">cómo pagar</span> y cuándo activar.
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <CreditCard className="text-emerald-500 w-5 h-5" />
              <span className="text-xs font-black text-slate-700 uppercase">Tarjeta</span>
            </div>
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3">
              <Wallet className="text-amber-500 w-5 h-5" />
              <span className="text-xs font-black text-slate-700 uppercase">Saldo Amigo</span>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-500 leading-relaxed">
            Activa de forma <span className="text-slate-900 font-bold">inmediata</span> o <span className="text-slate-900 font-bold">diferida</span>. Tienes hasta 30 días naturales para usar tu paquete diferido una vez comprado.
          </p>
        </div>
        <div className="w-full md:w-auto">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-slate-50 space-y-4">
                <h4 className="font-black text-[10px] text-blue-600 uppercase tracking-widest text-center">Canales Disponibles</h4>
                <div className="flex flex-col gap-3">
                    {['SMS', 'Mi Telcel', 'Centros de Atención'].map((canal) => (
                        <div key={canal} className="flex items-center gap-3 text-xs font-bold text-slate-500">
                            <Zap className="w-3 h-3 text-yellow-400" /> {canal}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>

      {/* FOOTER LEGAL */}
      <div className="flex flex-col items-center gap-4 py-8 border-t border-slate-100">
        <button 
          onClick={() => setShowLegal(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-pink-600 transition-colors"
        >
          <Info className="w-4 h-4" /> Políticas de Uso e Información Legal
        </button>
      </div>

      {/* MODAL LEGAL */}
      {showLegal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <Card className="w-full max-w-4xl max-h-[85vh] overflow-hidden bg-white rounded-[2.5rem] shadow-2xl flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-[#002f6c] w-6 h-6" />
                <h3 className="font-black italic uppercase text-lg tracking-tighter text-[#002f6c]">Términos y Condiciones Legales</h3>
              </div>
              <button onClick={() => setShowLegal(false)} className="text-slate-400 hover:text-slate-900 p-2">✕</button>
            </div>
            
            <div className="p-8 overflow-y-auto text-[11px] leading-relaxed text-slate-500 space-y-6 custom-scrollbar">
              <section>
                <h4 className="font-black text-slate-900 uppercase mb-2 italic tracking-tighter">1. Disponibilidad y Cobertura</h4>
                <p>Disponible a nivel nacional para usuarios Amigo de Telcel y Pospago Controlado. El uso de datos es exclusivo dentro del territorio nacional (México) y no aplica en cobertura marítima ni aérea.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-900 uppercase mb-2 italic tracking-tighter">2. Activación Diferida</h4>
                <p>Al comprar un paquete diferido, cuentas con 30 días naturales para activarlo. Al día 31 se activará automáticamente. Solo puedes tener un paquete diferido pendiente a la vez.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-900 uppercase mb-2 italic tracking-tighter">3. Política de Uso Justo</h4>
                <p>Queda estrictamente prohibido el uso de servicios ilimitados para otros fines distintos a la comunicación persona a persona. Prohibida la reventa, uso en call centers, monitor de bebé, spam o streaming masivo permanente. Telcel se reserva el derecho de suspender el servicio en caso de detectar prácticas prohibidas.</p>
              </section>
            </div>

            <div className="p-6 border-t border-slate-100 flex justify-center">
              <button onClick={() => setShowLegal(false)} className="bg-[#002f6c] text-white px-10 py-3 rounded-full font-black text-[10px] uppercase tracking-widest hover:bg-slate-800 transition-colors">
                Entendido
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
