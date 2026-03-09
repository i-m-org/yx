import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Smartphone, 
  Globe2, 
  Zap, 
  MousePointer2, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  QrCode
} from "lucide-react"

export const AdquiereEsim = () => {
  const pasos = [
    {
      n: "1",
      icon: <Smartphone className="w-5 h-5" />,
      title: "Verifica compatibilidad",
      desc: "Consulta nuestra lista de modelos compatibles con tecnología eSIM."
    },
    {
      n: "2",
      icon: <MousePointer2 className="w-5 h-5" />,
      title: "Compra tu paquete",
      desc: "Selecciona tu Paquete Amigo Sin Límite y realiza la compra en línea."
    },
    {
      n: "3",
      icon: <Mail className="w-5 h-5" />,
      title: "Descarga y activa",
      desc: "Sigue las instrucciones enviadas a tu correo para instalar tu eSIM."
    },
    {
      n: "4",
      icon: <Zap className="w-5 h-5" />,
      title: "Conéctate sin límites",
      desc: "Comienza a disfrutar tu línea nueva con todos los beneficios Telcel."
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
      
      {/* HEADER HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#002f6c] to-[#001a3d] rounded-[3rem] p-8 md:p-16 text-white shadow-2xl">
        <div className="relative z-10 space-y-6 max-w-3xl">
          <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">
            Lanzamiento Digital
          </Badge>
          <h2 className="text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase">
            Estrena línea con <br />
            <span className="text-emerald-400">eSIM Amigo</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 font-medium leading-relaxed">
            Activa tu eSIM desde donde estés y comienza a hablar, navegar y mensajear al instante. 
            <span className="block mt-2 text-emerald-300 font-bold">Conéctate sin fronteras en México, E.U.A. y Canadá.</span>
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-tight">Llamadas Incluidas</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-tight">SMS y Datos Sin Frontera</span>
            </div>
          </div>
        </div>
        <QrCode className="absolute -right-16 -bottom-16 w-80 h-80 text-white opacity-[0.03] rotate-12" />
      </section>

      {/* SECCIÓN: CÓMO FUNCIONA */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h3 className="text-3xl font-black italic uppercase text-slate-900 tracking-tighter">¿Cómo funciona la eSIM de Telcel?</h3>
          <p className="text-slate-500 font-medium italic">Actívala en minutos desde cualquier lugar con internet</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {pasos.map((paso) => (
            <div key={paso.n} className="group relative">
              <Card className="h-full p-8 rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#002f6c] group-hover:bg-[#002f6c] group-hover:text-white transition-colors duration-300">
                    {paso.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Paso {paso.n}</span>
                    <h4 className="text-lg font-black italic uppercase text-slate-900 leading-tight mt-1">{paso.title}</h4>
                    <p className="text-xs text-slate-500 mt-2 font-medium leading-relaxed">{paso.desc}</p>
                  </div>
                </div>
              </Card>
              {paso.n !== "4" && (
                <div className="hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-20">
                  <ArrowRight className="w-6 h-6 text-slate-200" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* INFO ADICIONAL & ESTILO DE VIDA */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="p-10 rounded-[3rem] border-none bg-emerald-500 text-white space-y-6 shadow-lg shadow-emerald-200">
          <h3 className="text-3xl font-black italic uppercase leading-none tracking-tighter">Así de fácil es tener <br /> tu eSIM Amigo</h3>
          <ul className="space-y-4">
            {[
              "Todo 100% en línea",
              "Sin acudir al Centro de Atención a Clientes",
              "Activación inmediata desde tu smartphone"
            ].map((item, i) => (
              <li key={i} className="flex items-center gap-3 font-bold text-emerald-950">
                <div className="w-2 h-2 bg-emerald-950 rounded-full" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="p-10 rounded-[3rem] border-none bg-slate-900 text-white relative overflow-hidden flex flex-col justify-center">
          <div className="relative z-10 space-y-4">
            <h3 className="text-3xl font-black italic uppercase leading-none tracking-tighter text-blue-400">
              La eSIM que se adapta <br /> a tu estilo de vida
            </h3>
            <p className="text-sm font-medium text-slate-400 leading-relaxed">
              Cambia de equipo, viaja, trabaja desde cualquier lugar y mantén tu línea contigo siempre disponible. 
              <span className="block mt-4 text-white font-black italic uppercase tracking-widest text-xs">Con eSIM Telcel, tú tienes el control.</span>
            </p>
          </div>
          <Globe2 className="absolute -right-10 -bottom-10 w-48 h-48 text-blue-500 opacity-10" />
        </Card>
      </div>
    </div>
  );
};
