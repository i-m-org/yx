import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Smartphone, ArrowRightLeft, CheckCircle2, Wifi, Lock, Cloud, RefreshCw, Info } from "lucide-react";
export const LineaEsim = () => {
    const [metodo, setMetodo] = useState('mismo');
    const requisitos = [
        { icon: _jsx(Smartphone, { className: "w-4 h-4" }), text: "iPhone con iOS 17.4 o superior" },
        { icon: _jsx(Cloud, { className: "w-4 h-4" }), text: "iCloud vinculado" },
        { icon: _jsx(Lock, { className: "w-4 h-4" }), text: "Código de bloqueo activo" },
        { icon: _jsx(Wifi, { className: "w-4 h-4" }), text: "Conexión WiFi estable" },
        { icon: _jsx(CheckCircle2, { className: "w-4 h-4" }), text: "Línea Telcel activa" },
    ];
    return (_jsxs("div", { className: "space-y-10 animate-in fade-in slide-in-from-right-4 duration-500", children: [_jsxs("div", { className: "text-center max-w-3xl mx-auto space-y-4", children: [_jsx("h2", { className: "text-4xl font-black italic uppercase tracking-tighter text-slate-900 leading-none", children: "Transferencia r\u00E1pida a eSIM" }), _jsx("p", { className: "text-slate-500 font-medium italic", children: "Cambia tu SIM f\u00EDsica a eSIM directamente desde tu dispositivo. R\u00E1pido, seguro y sin costo." })] }), _jsx(Card, { className: "p-6 rounded-[2.5rem] border-none bg-blue-50/50 flex flex-wrap justify-center gap-6 border border-blue-100", children: requisitos.map((req, i) => (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "text-blue-600", children: req.icon }), _jsx("span", { className: "text-[10px] font-black uppercase tracking-tight text-slate-600", children: req.text })] }, i))) }), _jsxs("div", { className: "flex justify-center gap-4", children: [_jsx("button", { onClick: () => setMetodo('mismo'), className: `px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${metodo === 'mismo' ? 'bg-[#002f6c] text-white shadow-xl scale-105' : 'bg-white text-slate-400 border border-slate-100'}`, children: "En tu mismo iPhone" }), _jsx("button", { onClick: () => setMetodo('nuevo'), className: `px-8 py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${metodo === 'nuevo' ? 'bg-[#002f6c] text-white shadow-xl scale-105' : 'bg-white text-slate-400 border border-slate-100'}`, children: "En tu nuevo iPhone" })] }), _jsx("div", { className: "max-w-4xl mx-auto", children: metodo === 'mismo' ? (_jsx("div", { className: "space-y-6 animate-in fade-in slide-in-from-left-4 duration-300", children: _jsxs("div", { className: "bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100", children: [_jsxs("h3", { className: "text-xl font-black italic uppercase text-[#002f6c] mb-6 flex items-center gap-2", children: [_jsx(RefreshCw, { className: "w-5 h-5" }), " De SIM f\u00EDsica a eSIM (Mismo equipo)"] }), _jsx("div", { className: "grid gap-4", children: [
                                    "Entra a Configuración > Red celular",
                                    "Selecciona tu línea y elige “Convertir en eSIM”",
                                    "Pulsa nuevamente en “Convertir en eSIM”",
                                    "Espera a que se active tu nueva eSIM",
                                    "Cuando finalice el proceso, selecciona “Listo”",
                                    "Retira la SIM física y reinicia tu iPhone"
                                ].map((step, idx) => (_jsxs("div", { className: "flex gap-4 items-start p-3 hover:bg-slate-50 rounded-xl transition-colors", children: [_jsx("span", { className: "w-6 h-6 rounded-full bg-slate-900 text-white text-[10px] font-black flex items-center justify-center shrink-0", children: idx + 1 }), _jsx("p", { className: "text-sm font-bold text-slate-700", children: step })] }, idx))) })] }) })) : (_jsx("div", { className: "space-y-6 animate-in fade-in slide-in-from-right-4 duration-300", children: _jsxs("div", { className: "bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100", children: [_jsxs("h3", { className: "text-xl font-black italic uppercase text-[#002f6c] mb-2 flex items-center gap-2", children: [_jsx(ArrowRightLeft, { className: "w-5 h-5" }), " Transferencia a otro iPhone"] }), _jsx("p", { className: "text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 italic", children: "Pasa tu l\u00EDnea al instante sin c\u00F3digos QR ni visitas al CAC" }), _jsx("div", { className: "grid md:grid-cols-2 gap-x-8 gap-y-2", children: [
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
                                ].map((step, idx) => (_jsxs("div", { className: "flex gap-3 items-start p-2 border-b border-slate-50", children: [_jsx("span", { className: "w-5 h-5 rounded-full bg-blue-600 text-white text-[9px] font-black flex items-center justify-center shrink-0", children: idx + 1 }), _jsx("p", { className: "text-[12px] font-bold text-slate-600 leading-tight", children: step })] }, idx))) })] }) })) }), _jsx("div", { className: "flex justify-center", children: _jsxs("div", { className: "bg-slate-900 text-white px-8 py-4 rounded-full flex items-center gap-3 shadow-2xl", children: [_jsx(Info, { className: "text-blue-400 w-5 h-5" }), _jsx("p", { className: "text-[10px] font-black uppercase tracking-[0.2em]", children: "\u00A1Y listo! Ya eres parte de la revoluci\u00F3n eSIM" })] }) })] }));
};
