import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// IMPORTANTE: Se incluyeron todos los iconos necesarios para evitar el error de renderizado
import {
  Calendar,
  Facebook,
  Tablet,
  Watch,
  ChevronRight,
  ShieldCheck,
  Zap,
  CheckCircle2
} from "lucide-react"
import { useApp } from "@/lib/app-context"

export function AmigoVieneConTodo() {
  const { infografiasConfig } = useApp();
  const { modelos: modelosHuawei, descripcion, fechaCierre, paqueteRegalo } = infografiasConfig.amigoVieneConTodo;

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12 animate-in fade-in duration-500">
      
      {/* HEADER EXCLUSIVO */}
      <div className="bg-white rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-50 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Badge className="bg-red-600 hover:bg-red-700 text-white font-black px-4 py-1 rounded-full uppercase tracking-widest text-[10px]">Exclusivo Huawei</Badge>
              <div className="flex gap-2">
                <Facebook className="w-4 h-4 text-blue-600" />
                <Calendar className="w-4 h-4 text-slate-400" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-slate-900 leading-[0.85]">
              AMIGO VIENE <br /> <span className="text-[#002f6c]">CON TODO</span>
            </h1>
            <p className="text-slate-500 font-medium max-w-lg text-lg leading-relaxed">
              Estrena un Huawei participante y recibe un <span className="text-blue-600 font-black underline">Paquete SL300 Gratis</span> con tu primera activación.
            </p>
          </div>
          
          <div className="bg-[#f8f5f5] p-6 rounded-[2.5rem] border border-white min-w-[200px] text-center shadow-inner">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Cierre de edición</p>
            <p className="text-2xl font-black text-slate-800 tracking-tight">28 FEB 2026</p>
          </div>
        </div>
        
        {/* Marca de agua decorativa */}
        <div className="absolute top-1/2 right-10 -translate-y-1/2 opacity-[0.03] pointer-events-none select-none">
            <h2 className="text-[15rem] font-black italic">HUAWEI</h2>
        </div>
      </div>

      {/* PAQUETE REGALO SL300 */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 p-8 rounded-[2.5rem] bg-[#002f6c] text-white flex flex-col justify-center shadow-2xl relative overflow-hidden group">
          <Zap className="absolute top-4 right-4 text-yellow-400 w-8 h-8 opacity-50 group-hover:scale-125 transition-transform" />
          <p className="text-xs font-bold text-blue-300 uppercase tracking-[0.2em] mb-2">Beneficio de Regalo</p>
          <h3 className="text-4xl font-black italic tracking-tighter">Paquete SL300</h3>
          <ul className="mt-6 space-y-3 text-sm font-medium text-blue-100">
            <li className="flex items-center gap-2"> <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Minutos y SMS Ilimitados</li>
            <li className="flex items-center gap-2"> <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Redes Sociales Ilimitadas</li>
            <li className="flex items-center gap-2"> <CheckCircle2 className="w-4 h-4 text-emerald-400" /> La mejor Red 4.5G</li>
          </ul>
        </Card>

        {/* LISTADO DE EQUIPOS */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {modelosHuawei.map((item, i) => (
            <Card key={i} className="p-6 rounded-[2rem] border-none bg-white shadow-sm hover:shadow-md transition-all flex items-center justify-between group cursor-pointer hover:bg-slate-50">
              <div className="flex items-center gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl group-hover:bg-[#002f6c] group-hover:text-white transition-colors">
                  {item.tipo === "Watch" ? <Watch className="w-6 h-6" /> : <Tablet className="w-6 h-6" />}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 italic uppercase tracking-tighter">{item.nombre}</h4>
                  <p className="text-[10px] font-bold text-slate-400 tracking-widest">{item.detalle}</p>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-200 group-hover:text-blue-600 transition-colors" />
            </Card>
          ))}
        </div>
      </div>

      {/* TÉRMINOS LEGALES */}
      <div className="bg-[#f8f5f5] rounded-[2.5rem] p-10 border border-white">
        <div className="flex items-center gap-3 mb-6">
            <ShieldCheck className="text-[#002f6c] w-6 h-6" />
            <h4 className="text-xl font-black text-slate-800 tracking-tighter italic uppercase">Condiciones de Promoción</h4>
        </div>
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-4 text-[11px] text-slate-500 font-medium leading-relaxed">
          <p>• Promoción aplicada automáticamente al adquirir el Amigo Kit y realizar el primer evento de red con costo.</p>
          <p>• La línea se activa con el primer evento con costo de voz, SMS o navegación.</p>
          <p>• Los beneficios son exclusivos para el equipo adquirido; al separar la SIM, se elimina la promoción.</p>
          <p>• No aplica para equipos en Amigo Fácil o Amigo Kit Portabilidad.</p>
          <p>• Sujeto a disponibilidad en punto de venta a nivel nacional.</p>
          <p>• Los beneficios no son permutables por saldo ni dinero en efectivo.</p>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase italic">Vigente del 01 al 28 de Febrero 2026</p>
        </div>
      </div>

    </div>
  )
}
