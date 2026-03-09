import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Globe2, Zap, MousePointer2, CheckCircle2, ArrowRight, Mail, QrCode } from "lucide-react";
export const AdquiereEsim = () => {
    const pasos = [
        {
            n: "1",
            icon: _jsx(Smartphone, { className: "w-5 h-5" }),
            title: "Verifica compatibilidad",
            desc: "Consulta nuestra lista de modelos compatibles con tecnología eSIM."
        },
        {
            n: "2",
            icon: _jsx(MousePointer2, { className: "w-5 h-5" }),
            title: "Compra tu paquete",
            desc: "Selecciona tu Paquete Amigo Sin Límite y realiza la compra en línea."
        },
        {
            n: "3",
            icon: _jsx(Mail, { className: "w-5 h-5" }),
            title: "Descarga y activa",
            desc: "Sigue las instrucciones enviadas a tu correo para instalar tu eSIM."
        },
        {
            n: "4",
            icon: _jsx(Zap, { className: "w-5 h-5" }),
            title: "Conéctate sin límites",
            desc: "Comienza a disfrutar tu línea nueva con todos los beneficios Telcel."
        }
    ];
    return (_jsxs("div", { className: "space-y-12 animate-in fade-in zoom-in-95 duration-700", children: [_jsxs("section", { className: "relative overflow-hidden bg-gradient-to-br from-[#002f6c] to-[#001a3d] rounded-[3rem] p-8 md:p-16 text-white shadow-2xl", children: [_jsxs("div", { className: "relative z-10 space-y-6 max-w-3xl", children: [_jsx(Badge, { className: "bg-emerald-500 hover:bg-emerald-600 text-white border-none px-4 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]", children: "Lanzamiento Digital" }), _jsxs("h2", { className: "text-5xl md:text-7xl font-black italic tracking-tighter leading-[0.85] uppercase", children: ["Estrena l\u00EDnea con ", _jsx("br", {}), _jsx("span", { className: "text-emerald-400", children: "eSIM Amigo" })] }), _jsxs("p", { className: "text-lg md:text-xl text-blue-100 font-medium leading-relaxed", children: ["Activa tu eSIM desde donde est\u00E9s y comienza a hablar, navegar y mensajear al instante.", _jsx("span", { className: "block mt-2 text-emerald-300 font-bold", children: "Con\u00E9ctate sin fronteras en M\u00E9xico, E.U.A. y Canad\u00E1." })] }), _jsxs("div", { className: "flex flex-wrap gap-4 pt-4", children: [_jsxs("div", { className: "flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }), _jsx("span", { className: "text-[10px] font-black uppercase tracking-tight", children: "Llamadas Incluidas" })] }), _jsxs("div", { className: "flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10", children: [_jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-400" }), _jsx("span", { className: "text-[10px] font-black uppercase tracking-tight", children: "SMS y Datos Sin Frontera" })] })] })] }), _jsx(QrCode, { className: "absolute -right-16 -bottom-16 w-80 h-80 text-white opacity-[0.03] rotate-12" })] }), _jsxs("section", { className: "space-y-8", children: [_jsxs("div", { className: "text-center space-y-3", children: [_jsx("h3", { className: "text-3xl font-black italic uppercase text-slate-900 tracking-tighter", children: "\u00BFC\u00F3mo funciona la eSIM de Telcel?" }), _jsx("p", { className: "text-slate-500 font-medium italic", children: "Act\u00EDvala en minutos desde cualquier lugar con internet" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-6", children: pasos.map((paso) => (_jsxs("div", { className: "group relative", children: [_jsx(Card, { className: "h-full p-8 rounded-[2.5rem] border-none bg-white shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2", children: _jsxs("div", { className: "space-y-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-[#002f6c] group-hover:bg-[#002f6c] group-hover:text-white transition-colors duration-300", children: paso.icon }), _jsxs("div", { children: [_jsxs("span", { className: "text-[10px] font-black text-emerald-500 uppercase tracking-widest", children: ["Paso ", paso.n] }), _jsx("h4", { className: "text-lg font-black italic uppercase text-slate-900 leading-tight mt-1", children: paso.title }), _jsx("p", { className: "text-xs text-slate-500 mt-2 font-medium leading-relaxed", children: paso.desc })] })] }) }), paso.n !== "4" && (_jsx("div", { className: "hidden md:block absolute top-1/2 -right-4 -translate-y-1/2 z-20", children: _jsx(ArrowRight, { className: "w-6 h-6 text-slate-200" }) }))] }, paso.n))) })] }), _jsxs("div", { className: "grid md:grid-cols-2 gap-8", children: [_jsxs(Card, { className: "p-10 rounded-[3rem] border-none bg-emerald-500 text-white space-y-6 shadow-lg shadow-emerald-200", children: [_jsxs("h3", { className: "text-3xl font-black italic uppercase leading-none tracking-tighter", children: ["As\u00ED de f\u00E1cil es tener ", _jsx("br", {}), " tu eSIM Amigo"] }), _jsx("ul", { className: "space-y-4", children: [
                                    "Todo 100% en línea",
                                    "Sin acudir al Centro de Atención a Clientes",
                                    "Activación inmediata desde tu smartphone"
                                ].map((item, i) => (_jsxs("li", { className: "flex items-center gap-3 font-bold text-emerald-950", children: [_jsx("div", { className: "w-2 h-2 bg-emerald-950 rounded-full" }), item] }, i))) })] }), _jsxs(Card, { className: "p-10 rounded-[3rem] border-none bg-slate-900 text-white relative overflow-hidden flex flex-col justify-center", children: [_jsxs("div", { className: "relative z-10 space-y-4", children: [_jsxs("h3", { className: "text-3xl font-black italic uppercase leading-none tracking-tighter text-blue-400", children: ["La eSIM que se adapta ", _jsx("br", {}), " a tu estilo de vida"] }), _jsxs("p", { className: "text-sm font-medium text-slate-400 leading-relaxed", children: ["Cambia de equipo, viaja, trabaja desde cualquier lugar y mant\u00E9n tu l\u00EDnea contigo siempre disponible.", _jsx("span", { className: "block mt-4 text-white font-black italic uppercase tracking-widest text-xs", children: "Con eSIM Telcel, t\u00FA tienes el control." })] })] }), _jsx(Globe2, { className: "absolute -right-10 -bottom-10 w-48 h-48 text-blue-500 opacity-10" })] })] })] }));
};
