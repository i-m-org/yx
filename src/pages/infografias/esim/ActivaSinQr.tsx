import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bell, Wifi, CheckCircle2, Smartphone, Settings } from "lucide-react"

export const ActivaSinQr = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      
      {/* HEADER */}
      <div className="text-center space-y-4">
        <Badge className="bg-yellow-400 text-yellow-950 font-black px-4 py-1 rounded-full uppercase text-[10px]">Sin Código QR</Badge>
        <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-[#002f6c]">Activación Directa</h2>
        <p className="text-slate-500 font-medium max-w-xl mx-auto italic">
          Si ya solicitaste tu eSIM en CAC, actívala mediante una notificación push automática.
        </p>
      </div>

      {/* PROCESO INICIAL */}
      <div className="grid md:grid-cols-3 gap-6">
        {[
          { icon: <Settings />, t: "1. Solicita tu eSIM", d: "En CAC Telcel, un asesor vinculará tu línea al equipo." },
          { icon: <Wifi />, t: "2. Conéctate a WiFi", d: "Es indispensable para completar el proceso sin errores." },
          { icon: <Bell />, t: "3. Acepta la notificación", d: "Sigue las instrucciones en pantalla al recibir el aviso." }
        ].map((item, i) => (
          <Card key={i} className="p-8 rounded-[2rem] border-none bg-white shadow-sm hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6">{item.icon}</div>
            <h4 className="font-black italic uppercase text-slate-900 text-sm mb-2">{item.t}</h4>
            <p className="text-xs text-slate-500 leading-relaxed">{item.d}</p>
          </Card>
        ))}
      </div>

      {/* GUÍA PASO A PASO (iOS vs Android) */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* iOS */}
        <Card className="p-8 rounded-[2.5rem] border-none bg-slate-900 text-white">
          <div className="flex items-center gap-3 mb-6">
            <Smartphone className="text-blue-400" />
            <h3 className="text-xl font-black italic uppercase">Activación en iOS</h3>
          </div>
          <div className="space-y-4">
            {[
              "Recibe la notificación: Toca el mensaje de 'eSIM Telcel lista'.",
              "Añade tu eSIM: Se abrirá el asistente. Toca 'Continuar'.",
              "Finaliza: Cuando aparezca la confirmación, toca 'Listo'."
            ].map((step, i) => (
              <div key={i} className="flex gap-3 text-xs font-medium text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" /> {step}
              </div>
            ))}
          </div>
        </Card>

        {/* MENSAJE FINAL */}
        <div className="flex flex-col justify-center items-center text-center p-8 bg-blue-50 rounded-[2.5rem] border border-blue-100">
          <CheckCircle2 className="w-16 h-16 text-emerald-500 mb-4" />
          <h3 className="text-2xl font-black italic uppercase text-[#002f6c] mb-2">¡eSIM Activa!</h3>
          <p className="text-xs font-bold text-slate-600 leading-relaxed">
            Ahora disfruta tu línea con llamadas, mensajes y datos sin necesidad de chip físico. 
            <br/><br/>
            <span className="text-[10px] text-blue-400 italic">Sigue aprovechando los beneficios Telcel.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
