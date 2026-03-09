import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Music, Video, Zap, CheckCircle2 } from "lucide-react"

export const SinLimite = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-right-4 duration-500">
    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-slate-100 relative overflow-hidden">
      <div className="relative z-10 space-y-6">
        <Badge className="bg-[#002f6c] text-white font-black px-4 py-1 rounded-full uppercase tracking-tighter text-[10px]">Esquema Recomendado</Badge>
        <h2 className="text-4xl md:text-6xl font-black italic tracking-tighter text-slate-900 uppercase">Amigo Sin Límite</h2>
        <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed">
          Llamadas, SMS y WhatsApp <span className="text-[#002f6c] font-black underline italic">Ilimitados Sin Frontera</span>.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          {['Facebook', 'X', 'Messenger', 'Snapchat', 'Instagram'].map(red => (
            <Badge key={red} variant="outline" className="border-slate-200 text-slate-400 font-bold px-3 py-1 uppercase text-[9px] tracking-widest">{red}</Badge>
          ))}
        </div>
      </div>
      <Zap className="absolute -right-10 -bottom-10 w-64 h-64 text-blue-50 opacity-[0.05] rotate-12" />
    </div>

    <div className="grid md:grid-cols-2 gap-6">
      <Card className="p-8 rounded-[2.5rem] border-none bg-[#002f6c] text-white space-y-6">
        <h3 className="text-2xl font-black italic tracking-tighter uppercase flex items-center gap-3">
          <CheckCircle2 className="text-blue-400" /> Beneficios Clave
        </h3>
        <ul className="space-y-4 text-sm font-medium text-blue-100">
          <li>• Llamadas, SMS y WhatsApp ilimitados (Paquete 10+).</li>
          <li>• GB para navegar en México, E.U.A. y Canadá.</li>
          <li>• Amazon Prime Básico incluido (Paquete 100+).</li>
        </ul>
      </Card>

      <Card className="p-8 rounded-[2.5rem] border-none bg-white shadow-sm space-y-6 border border-slate-50">
        <h3 className="text-2xl font-black italic tracking-tighter uppercase text-slate-900 flex items-center gap-3">
          <Video className="text-sky-500" /> Entretenimiento
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-sky-50 rounded-2xl flex items-center gap-4">
            <Video className="text-sky-600 w-6 h-6" />
            <div>
              <p className="font-black text-sky-900 text-sm italic uppercase tracking-tighter">Amazon Prime Básico</p>
              <p className="text-[10px] text-sky-700 font-bold uppercase tracking-tight">Incluido desde Paquete 100</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </div>
);
