import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, MessageSquare, Globe, Table as TableIcon } from "lucide-react"

export const PorSegundo = () => (
  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
    <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
      <div className="space-y-4 relative z-10">
        <Badge className="bg-emerald-500 text-white font-black px-4 py-1 rounded-full uppercase text-[10px]">Control Total</Badge>
        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase">Amigo por Segundo</h2>
        <p className="text-slate-300 font-medium max-w-2xl text-lg">Paga solo lo que usas: <span className="text-emerald-400 font-black">$0.0142 por segundo</span>.</p>
      </div>
      <Clock className="absolute -right-10 -bottom-10 w-64 h-64 text-white opacity-[0.03] rotate-12" />
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-6 rounded-[2rem] border-none bg-white shadow-sm text-center space-y-3">
        <Clock className="mx-auto w-10 h-10 text-emerald-500" />
        <h3 className="text-3xl font-black italic text-slate-900">$0.0142</h3>
        <p className="text-[10px] font-black uppercase text-slate-400">Segundo Saliente</p>
      </Card>
      <Card className="p-6 rounded-[2rem] border-none bg-white shadow-sm text-center space-y-3">
        <MessageSquare className="mx-auto w-10 h-10 text-blue-500" />
        <h3 className="text-3xl font-black italic text-slate-900">$0.85</h3>
        <p className="text-[10px] font-black uppercase text-slate-400">Mensaje SMS</p>
      </Card>
      <Card className="p-6 rounded-[2rem] border-none bg-white shadow-sm text-center space-y-3">
        <Globe className="mx-auto w-10 h-10 text-sky-500" />
        <h3 className="text-3xl font-black italic text-slate-900">$0.85</h3>
        <p className="text-[10px] font-black uppercase text-slate-400">Megabyte (MB)</p>
      </Card>
    </div>
  </div>
);
