import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, ShieldCheck, CheckCircle2, Info, AlertCircle } from "lucide-react"

export const MasInformacion = () => (
  <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="grid md:grid-cols-2 gap-8">
      
      {/* NÚMEROS GRATIS */}
      <Card className="p-8 md:p-10 rounded-[2.5rem] border-none bg-white shadow-sm border border-slate-100 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black italic uppercase text-slate-900 tracking-tighter leading-none">Números Gratis<br/>Todo Destino</h3>
          </div>
        </div>

        <div className="space-y-6">
          <p className="text-xs font-medium text-slate-500 leading-relaxed">
            Elige números locales o nacionales de <span className="text-slate-900 font-bold">cualquier compañía</span> para hablar o mensajear sin costo.
          </p>

          <div className="space-y-4">
            <div className="p-5 bg-slate-50 rounded-2xl border border-white">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 italic">Reglas de llamadas</h4>
              <ul className="space-y-2 text-[11px] font-medium text-slate-600">
                <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5" /> Primeros 5 minutos sin costo.</li>
                <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5" /> Del minuto 5:01 en adelante se cobra tarifa normal.</li>
                <li className="flex gap-2"><AlertCircle className="w-3 h-3 text-amber-500 mt-0.5" /> Requiere saldo nominal mínimo de <span className="text-slate-900 font-black">$5.97</span>.</li>
              </ul>
            </div>

            <div className="p-5 bg-slate-50 rounded-2xl border border-white">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-3 italic">Reglas de SMS</h4>
              <ul className="space-y-2 text-[11px] font-medium text-slate-600">
                <li className="flex gap-2"><CheckCircle2 className="w-3 h-3 text-emerald-500 mt-0.5" /> Mensajes de texto ilimitados.</li>
                <li className="flex gap-2"><AlertCircle className="w-3 h-3 text-amber-500 mt-0.5" /> Requiere saldo nominal mínimo de <span className="text-slate-900 font-black">$0.98</span>.</li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50/50 rounded-xl text-[10px] text-blue-700 font-bold italic">
            * Si usas el mismo número para llamadas y SMS, contará como 2 números registrados.
          </div>
        </div>
      </Card>

      {/* NÚMEROS FRECUENTES */}
      <Card className="p-8 md:p-10 rounded-[2.5rem] border-none bg-slate-900 text-white shadow-xl space-y-8 relative overflow-hidden">
        <div className="flex items-center gap-4 relative z-10">
          <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-black italic uppercase tracking-tighter leading-none">Números<br/>Frecuentes</h3>
        </div>

        <div className="space-y-6 relative z-10">
          <p className="text-xs font-medium text-blue-100/70 leading-relaxed">
            Números de cualquier compañía con <span className="text-white font-bold">tarifa preferencial</span> aplicada automáticamente.
          </p>

          <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
            <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest italic">¿Cómo registrarlos?</h4>
            <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-black uppercase tracking-tighter">
                <div className="p-2 border border-white/10 rounded-lg bg-white/5">Marcar *264</div>
                <div className="p-2 border border-white/10 rounded-lg bg-white/5">Chat Telcel</div>
                <div className="p-2 border border-white/10 rounded-lg bg-white/5">CAC Telcel</div>
            </div>
          </div>

          <div className="bg-emerald-500 p-8 rounded-[2rem] text-center shadow-lg shadow-emerald-900/20">
            <p className="text-[10px] font-black text-emerald-900 uppercase tracking-widest mb-2 italic">Costo por modificación</p>
            <p className="text-5xl font-black italic tracking-tighter">$49.00</p>
            <p className="text-[9px] font-bold text-emerald-900/60 mt-1 uppercase">Cada cambio de número registrado</p>
          </div>
        </div>
        <ShieldCheck className="absolute -left-20 -bottom-20 w-80 h-80 text-white/5 pointer-events-none" />
      </Card>

    </div>
  </div>
);
