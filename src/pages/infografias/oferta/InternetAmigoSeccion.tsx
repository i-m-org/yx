import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Wifi, 
  Clock, 
  MessageSquare, 
  Share2, 
  Music, 
  Video, 
  ShieldAlert, 
  ChevronRight,
  Info
} from "lucide-react"

const planesInternet = [
  { id: "150", gb: "3 GB", vigencia: "25 días", precio: "$150", redes: "Ilimitadas", prime: "Básico", music: "500MB" },
  { id: "100", gb: "1.8 GB", vigencia: "15 días", precio: "$100", redes: "Ilimitadas", prime: "Básico", music: "No" },
  { id: "200", gb: "4 GB", vigencia: "30 días", precio: "$200", redes: "Ilimitadas", prime: "Básico", music: "500MB" },
  { id: "500", gb: "10 GB", vigencia: "30 días", precio: "$500", redes: "Ilimitadas", prime: "Básico", music: "500MB" },
  { id: "20", gb: "140 MB", vigencia: "2 días", precio: "$20", redes: "200 MB", prime: "No", music: "No" },
  { id: "80", gb: "1 GB", vigencia: "12 días", precio: "$80", redes: "1.5 GB", prime: "No", music: "No" }
]

export function InternetAmigoSeccion() {
  const [showLegal, setShowLegal] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-12 animate-in fade-in duration-700">
      
      {/* HEADER DINÁMICO */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter text-[#002f6c]">
          INTERNET AMIGO
        </h1>
        <p className="text-slate-500 font-medium max-w-2xl mx-auto">
          Elige el paquete que mejor se adapte a tu ritmo. Con navegación Sin Frontera y beneficios de streaming incluidos.
        </p>
      </div>

      {/* GRID DE PLANES (Estilo imagen original) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {planesInternet.map((plan) => (
          <Card key={plan.id} className="rounded-[2rem] border-none bg-white shadow-[0_10px_40px_rgba(0,0,0,0.03)] hover:shadow-xl transition-all overflow-hidden flex flex-col group">
            <div className="bg-blue-50/50 px-6 py-3 border-b border-blue-100 flex justify-between items-center">
              <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest italic">Internet Amigo {plan.id}</span>
              <Wifi className="w-4 h-4 text-blue-300" />
            </div>

            <div className="p-8 flex-1 space-y-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-4xl font-black text-slate-900 tracking-tighter italic">{plan.gb}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Sin Frontera</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-black text-slate-900">{plan.precio}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Precio</p>
                </div>
              </div>

              <div className="flex items-center gap-3 py-3 border-y border-slate-50">
                <Clock className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-bold text-slate-700">{plan.vigencia} de vigencia</span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Share2 className="w-4 h-4 text-pink-500 mt-1" />
                  <div>
                    <p className="text-xs font-black uppercase text-slate-800 tracking-tight">Redes Sociales:</p>
                    <p className="text-xs font-medium text-slate-500">{plan.redes}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MessageSquare className="w-4 h-4 text-emerald-500 mt-1" />
                  <div>
                    <p className="text-xs font-black uppercase text-slate-800 tracking-tight">Mensajería Sin Frontera:</p>
                    <p className="text-xs font-medium text-slate-500">Ilimitado</p>
                  </div>
                </div>
              </div>

              {/* Badges de Streaming */}
              <div className="flex gap-2 pt-2">
                {plan.prime !== "No" && (
                  <div className="bg-sky-50 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Video className="w-3 h-3 text-sky-600" />
                    <span className="text-[9px] font-black text-sky-700 uppercase italic leading-none">Prime Video</span>
                  </div>
                )}
                {plan.music !== "No" && (
                  <div className="bg-red-50 px-3 py-1 rounded-lg flex items-center gap-2">
                    <Music className="w-3 h-3 text-red-600" />
                    <span className="text-[9px] font-black text-red-700 uppercase italic leading-none">Claro Música</span>
                  </div>
                )}
              </div>
            </div>

            <button className="w-[90%] mx-auto mb-6 bg-[#8b3dff] hover:bg-[#722ed1] text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-200">
              LO QUIERO
            </button>
          </Card>
        ))}
      </div>

      {/* BOTÓN TÉRMINOS Y CONDICIONES */}
      <div className="flex justify-center">
        <button 
          onClick={() => setShowLegal(true)}
          className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors"
        >
          <Info className="w-4 h-4" /> Ver Políticas y Términos Legales
        </button>
      </div>

      {/* MODAL DE TÉRMINOS LEGALES (Con tu texto proporcionado) */}
      {showLegal && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
          <Card className="w-full max-w-4xl max-h-[85vh] overflow-hidden bg-white rounded-[2.5rem] flex flex-col shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-[#f8f5f5]">
              <div className="flex items-center gap-3">
                <ShieldAlert className="text-[#002f6c] w-6 h-6" />
                <h3 className="font-black italic uppercase text-lg tracking-tighter text-[#002f6c]">Políticas de Uso Justo e Internet Amigo</h3>
              </div>
              <button onClick={() => setShowLegal(false)} className="text-slate-400 hover:text-slate-900 font-black text-xl px-2">✕</button>
            </div>
            
            <div className="p-8 overflow-y-auto text-[12px] leading-relaxed text-slate-600 space-y-6 custom-scrollbar">
              <section>
                <h4 className="font-black text-slate-900 uppercase mb-2">1. Prevención de Prácticas Prohibidas</h4>
                <p>Para ofrecer un servicio de calidad y con equidad de acceso a la red, todos los servicios ilimitados están sujetos a fines de comunicación persona a persona. Queda prohibido el uso para reventa, call centers, baby phones, bypass, spam, phishing o descargas masivas tipo Torrent.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-900 uppercase mb-2">2. Política Sin Frontera (EEUU y Canadá)</h4>
                <p>No es para uso internacional permanente. Se considera uso permanente si el usuario permanece fuera del territorio nacional por 29 días continuos o si el consumo en el extranjero supera el promedio nacional de los últimos 3 meses.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-900 uppercase mb-2">3. Promoción Claro Música</h4>
                <p>Activaciones de paquetes ≥ $150 reciben 500MB para Claro Música. No incluye la suscripción al servicio. El beneficio aplica únicamente dentro del Territorio Nacional.</p>
              </section>

              <section>
                <h4 className="font-black text-slate-900 uppercase mb-2">4. Beneficio Amazon Prime</h4>
                <p>Paquetes de $100 a $200 incluyen Amazon Prime Básico (1 dispositivo móvil, calidad estándar). Paquetes de $270 y $400 incluyen Amazon Prime Full (3 pantallas, HD/UHD, Music y Gaming). No incluye el uso de datos móviles para streaming.</p>
              </section>

              <div className="bg-blue-50 p-4 rounded-xl text-[10px] font-bold text-blue-700 italic border border-blue-100">
                Folios IFT: 1960763, 1960792, 1960829, 235712, 2203995.
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 text-center">
              <button 
                onClick={() => setShowLegal(false)}
                className="bg-[#002f6c] text-white px-12 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-colors"
              >
                He leído y entiendo
              </button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
