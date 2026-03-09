import { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone, 
  ArrowRightLeft, 
  CheckCircle2, 
  Wifi, 
  Lock, 
  Cloud, 
  RefreshCw,
  Info
} from "lucide-react"

export const LineaEsim = () => {
  const [metodo, setMetodo] = useState<'mismo' | 'nuevo'>('mismo');

  const requisitos = [
    { icon: <Smartphone className="w-4 h-4" />, text: "iPhone con iOS 17.4 o superior" },
    { icon: <Cloud className="w-4 h-4" />, text: "iCloud vinculado" },
    { icon: <Lock className="w-4 h-4" />, text: "Código de bloqueo activo" },
    { icon: <Wifi className="w-4 h-4" />, text: "Conexión WiFi estable" },
    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Línea Telcel activa" },
  ];

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* HEADER E INTRO */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h2 className="text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none">
          Transferencia rápida a eSIM
        </h2>
        <p className="text-slate-500 font-medium italic">
          Cambia tu SIM física a eSIM directamente desde tu dispositivo. Rápido, seguro y sin costo.
        </p>
      </div>

      {/* REQUISITOS GENERALES */}
      <Card className="p-6 rounded-[2.5rem] border-none bg-blue-50/50 flex flex-wrap justify-center gap-6 border border-blue-100">
        {requisitos.map((req, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="text-blue-600">{req.icon}</div>
            <span className="text-[10px] font-black uppercase tracking-tight text-slate-600">{req.text}</span>
          </div>
        ))}
      </Card>

      {/* SELECTOR DE MÉTODO */}
      <div className="flex justify-center gap-4">
        <button 
          onClick={() => setMetodo('mismo')}
          className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${metodo === 'mismo' ? 'bg-[#002f6c] text-white shadow-xl scale-105' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
          En tu mismo iPhone
        </button>
        <button 
          onClick={() => setMetodo('nuevo')}
          className={`px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${metodo === 'nuevo' ? 'bg-[#002f6c] text-white shadow-xl scale-105' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
          En tu nuevo iPhone
        </button>
      </div>

      {/* CONTENIDO DINÁMICO */}
      <div className="max-w-4xl mx-auto">
        {metodo === 'mismo' ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black italic uppercase text-[#002f6c] mb-6 flex items-center gap-2">
                <RefreshCw className="w-5 h-5" /> De SIM física a eSIM (Mismo equipo)
              </h3>
              <div className="grid gap-4">
                {[
                  "Entra a Configuración > Red celular",
                  "Selecciona tu línea y elige “Convertir en eSIM”",
                  "Pulsa nuevamente en “Convertir en eSIM”",
                  "Espera a que se active tu nueva eSIM",
                  "Cuando finalice el proceso, selecciona “Listo”",
                  "Retira la SIM física y reinicia tu iPhone"
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors">
                    <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                    <p className="text-sm font-bold text-slate-700">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100">
              <h3 className="text-xl font-black italic uppercase text-[#002f6c] mb-2 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5" /> Transferencia a otro iPhone
              </h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic">Pasa tu línea al instante sin códigos QR ni visitas al CAC</p>
              
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                {[
                  "Nuevo iPhone: Configuración > Red celular > Agregar eSIM",
                  "Selecciona “Transferir de iPhone cercano”",
                  "En el iPhone anterior, haz clic en “Continuar”",
                  "El nuevo iPhone generará un código de seguridad",
                  "Ingresa ese código en el iPhone anterior",
                  "Confirma “Transferir número” y presiona “Ok”",
                  "En el iPhone anterior, confirma la transferencia",
                  "Haz clic en “Continuar” para finalizar",
                  "En el nuevo iPhone, toca nuevamente “Continuar”",
                  "Verifica tu señal activa en el nuevo iPhone",
                  "Finalmente, reinicia ambos dispositivos"
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-2 border-b border-slate-50">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center shrink-0">{idx + 1}</span>
                    <p className="text-[12px] font-bold text-slate-600 leading-tight">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER ADICIONAL */}
      <div className="flex justify-center">
        <div className="bg-slate-900 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl">
          <Info className="text-blue-400 w-5 h-5" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em]">¡Y listo! Ya eres parte de la revolución eSIM</p>
        </div>
      </div>
    </div>
  )
}
