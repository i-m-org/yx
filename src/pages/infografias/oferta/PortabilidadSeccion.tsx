import { 
  CalendarCheck, 
  Bolt, 
  Star, 
  Rocket, 
  Globe, 
  Share2, 
  Infinity, 
  Music, 
  Crown, 
  PlusCircle, 
  Video, 
  Headphones,
  Facebook,
  Instagram,
  MessageCircle,
  Twitter,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

export function PortabilidadSeccion() {
  return (
    <div className="bg-gray-50 font-sans text-gray-900 min-h-screen pb-12 animate-in fade-in duration-700">

      {/* Header / Banner Principal */}
      <header className="bg-gradient-to-r from-blue-800 to-blue-500 text-white py-12 px-4 text-center shadow-lg rounded-b-[3rem]">
        <h1 className="text-5xl font-black mb-2 italic tracking-tighter uppercase">
          ¡CÁMBIATE YA!
        </h1>
        <p className="text-xl opacity-90 font-medium">Grandes beneficios en tu Portabilidad</p>
        <div className="mt-6 inline-block bg-white text-blue-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-md">
          Válido del 23 de Jun al 2 de Mar
        </div>
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 -mt-8">

        {/* Sección de Vigencia General */}
        <div className="bg-white rounded-[2.5rem] shadow-xl p-8 mb-10 border-l-[12px] border-blue-600 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <div className="bg-blue-100 p-4 rounded-2xl mr-5">
              <CalendarCheck className="w-10 h-10 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-black uppercase italic tracking-tighter text-slate-800">Beneficios por 12 Meses</h2>
              <p className="text-gray-500 font-medium">Mantén tus ventajas de portabilidad durante todo un año.</p>
            </div>
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <div className="flex-1 text-center px-6 py-3 bg-blue-50 rounded-2xl border border-blue-100">
              <span className="block text-[10px] uppercase font-black text-blue-400 mb-1">Recargas $50-80</span>
              <span className="font-black text-blue-700 text-lg">7-12 Días</span>
            </div>
            <div className="flex-1 text-center px-6 py-3 bg-emerald-50 rounded-2xl border border-emerald-100">
              <span className="block text-[10px] uppercase font-black text-emerald-400 mb-1">Recargas $100+</span>
              <span className="font-black text-emerald-700 text-lg">30 Días</span>
            </div>
          </div>
        </div>

        {/* Grid de Planes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

          {/* Plan 50 y 80 */}
          <div className="bg-white rounded-[3rem] shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="p-8 bg-gradient-to-br from-gray-100 to-gray-200 border-b">
              <div className="flex justify-between items-start">
                <span className="bg-slate-800 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Triple GB</span>
                <Bolt className="text-yellow-500 fill-yellow-500 w-6 h-6" />
              </div>
              <h3 className="text-4xl font-black mt-4 text-slate-900">$50 / $80</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Vigencia: 7 o 12 días</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <Globe className="text-blue-500 w-8 h-8 shrink-0" />
                <div>
                  <p className="text-xl font-black text-slate-800 leading-none">1.5GB / 2.4GB</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Sin Fronteras</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Share2 className="text-pink-500 w-8 h-8 shrink-0" />
                <div>
                  <p className="text-xl font-black text-slate-800 leading-none">1GB / 1.5GB</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Redes Sociales</p>
                </div>
              </div>
              <div className="pt-6 border-t italic text-[10px] text-gray-400 leading-relaxed font-medium">
                Incluye: FB, Messenger, X, Snapchat, Instagram, Llamadas y SMS (MX, USA, CAN)
              </div>
            </div>
          </div>

          {/* Plan 100 (RECOMENDADO) */}
          <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-blue-400 transform scale-105 z-10 relative">
            <div className="absolute top-4 right-6 bg-blue-600 text-white px-4 py-1 rounded-full font-black text-[10px] uppercase tracking-widest animate-pulse">
              Recomendado
            </div>
            <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-100 border-b">
              <div className="flex justify-between items-start">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase italic tracking-widest">Paquete SL300</span>
                <Star className="text-blue-600 fill-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-5xl font-black mt-4 text-blue-900">$100</h3>
              <p className="text-xs font-black text-blue-700 uppercase tracking-widest mt-1">Vigencia: 30 días</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <Globe className="text-blue-600 w-10 h-10 shrink-0" />
                <div>
                  <p className="text-2xl font-black text-blue-900 leading-none">5.5 GB</p>
                  <p className="text-xs font-bold text-blue-400 uppercase tracking-tighter">Sin Fronteras</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Infinity className="text-emerald-500 w-10 h-10 shrink-0" />
                <div>
                  <p className="text-xl font-black text-emerald-600 leading-none uppercase">Redes Ilimitadas</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">FB, WA, X, IG, Snap</p>
                </div>
              </div>
              <div className="flex items-center p-4 bg-blue-50 rounded-[1.5rem] border border-blue-100 gap-3">
                <Music className="text-blue-600 w-6 h-6 shrink-0" />
                <p className="text-[11px] leading-tight font-bold text-blue-800 uppercase tracking-tighter">
                  Claro Música <span className="block text-blue-400 text-[9px]">(500GB) + Prime Clásico</span>
                </p>
              </div>
            </div>
          </div>

          {/* Plan 150 - 300 */}
          <div className="bg-white rounded-[3rem] shadow-md overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="p-8 bg-gradient-to-br from-blue-50 to-slate-50 border-b">
              <div className="flex justify-between items-start">
                <span className="bg-blue-800 text-white px-3 py-1 rounded-lg text-[10px] font-black uppercase italic tracking-widest">Paquete SL500</span>
                <Rocket className="text-blue-800 w-6 h-6" />
              </div>
              <h3 className="text-4xl font-black mt-4 text-slate-800">$150 - $300</h3>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Vigencia: 30 días</p>
            </div>
            <div className="p-8 space-y-6">
              <div className="flex items-center gap-4">
                <Globe className="text-blue-500 w-8 h-8 shrink-0" />
                <div>
                  <p className="text-xl font-black text-slate-800 leading-none">MÁS GB INCLUIDOS</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tighter">Sin Fronteras</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Infinity className="text-emerald-500 w-8 h-8 shrink-0" />
                <p className="text-xl font-black text-emerald-600 leading-none uppercase">Redes Ilimitadas</p>
              </div>
              <div className="flex items-center p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 gap-3">
                <Crown className="text-blue-800 w-6 h-6 shrink-0" />
                <p className="text-[11px] leading-tight font-bold text-slate-700 uppercase tracking-tighter">
                  Prime Clásico <span className="block text-slate-400 text-[9px]">+ 500GB Claro Música</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección VIP / Máxima Potencia */}
        <div className="mt-16 bg-white rounded-[3.5rem] shadow-2xl overflow-hidden border-t-8 border-purple-500">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-12 bg-gradient-to-br from-purple-50 to-fuchsia-100 flex flex-col justify-center items-center text-center">
              <h3 className="text-6xl font-black text-purple-900 tracking-tighter">$270 y $400</h3>
              <p className="text-xl text-purple-700 font-black mt-2 uppercase italic">Máxima Potencia</p>
              <div className="mt-8 flex gap-6 text-4xl text-purple-400 opacity-50">
                <Video />
                <Music />
                <Globe />
              </div>
            </div>
            <div className="p-12 bg-white space-y-8">
              {[
                { icon: <PlusCircle />, t: "Más GB que nunca", d: "Navegación extendida sin fronteras para tus viajes." },
                { icon: <Video />, t: "Amazon Prime Incluido", d: "Disfruta de tus series y películas favoritas." },
                { icon: <Headphones />, t: "500 GB Claro Música", d: "Toda tu música favorita en un solo lugar." }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-5">
                  <div className="bg-purple-100 p-3 rounded-2xl text-purple-600 shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-black italic uppercase text-lg text-slate-800">{item.t}</h4>
                    <p className="text-gray-500 text-sm mt-1 font-medium">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Beneficios Globales */}
        <div className="mt-16 text-center bg-slate-100 rounded-[3rem] p-10 border-4 border-dashed border-slate-200">
          <h3 className="text-3xl font-black mb-10 italic text-slate-400 uppercase tracking-widest">Todas tus recargas incluyen:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-8">
            {[
              { label: "Facebook", icon: <Facebook className="text-blue-600" /> },
              { label: "Messenger", icon: <MessageCircle className="text-blue-400" /> },
              { label: "Instagram", icon: <Instagram className="text-pink-600" /> },
              { label: "Snapchat", icon: <Star className="text-yellow-500" /> },
              { label: "X (Twitter)", icon: <Twitter className="text-black" /> },
              { label: "Llamadas", icon: <Phone className="text-green-600" /> },
              { label: "SMS", icon: <Mail className="text-blue-500" /> },
              { label: "Sin Frontera", icon: <MapPin className="text-red-500" /> }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center group cursor-default">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-black uppercase tracking-tighter text-slate-600">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="text-center py-8">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">
          Aplican términos y condiciones. Vigencia del 23 de junio al 2 de marzo.
        </p>
      </footer>
    </div>
  );
}