import { useState } from 'react'
// Importamos todos tus archivos de la carpeta oferta
import { PortabilidadSeccion } from './oferta/PortabilidadSeccion'
import { AmigoKitSeccion } from './oferta/AmigoKitSeccion'
import { AmigoVieneConTodo } from './oferta/AmigoVieneConTodo'
import { ChipExpressSeccion } from './oferta/ChipExpressSeccion'
import { InternetAmigoSeccion } from './oferta/InternetAmigoSeccion'
import { InternetPorTiempoSeccion } from './oferta/InternetPorTiempoSeccion'
import { TelcelInfografia } from './oferta/TelcelInfografia'

export function OfertaComercialSeccion() {
  const [subTab, setSubTab] = useState('portabilidad');

  const menuInterno = [
    { id: 'portabilidad', label: 'Portabilidad' },
    { id: 'viene-con-todo', label: 'Viene con Todo' },
    { id: 'amigo-kit', label: 'Amigo Kit' },
    { id: 'chip-express', label: 'Chip Express' },
    { id: 'internet', label: 'Internet Amigo' },
    { id: 'tiempo', label: 'Por Tiempo' },
    { id: 'resumen', label: 'Infografía' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 space-y-8">
      {/* Sub-navegación interna de Oferta Comercial */}
      <div className="flex flex-wrap justify-center gap-2 pb-4 border-b border-slate-100">
        {menuInterno.map((item) => (
          <button
            key={item.id}
            onClick={() => setSubTab(item.id)}
            className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-tighter transition-all ${
              subTab === item.id
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200 scale-105'
                : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Renderizado Condicional de los archivos de la carpeta /oferta */}
      <div className="min-h-[600px] animate-in fade-in duration-500">
        {subTab === 'portabilidad' && <PortabilidadSeccion />}
        {subTab === 'viene-con-todo' && <AmigoVieneConTodo />}
        {subTab === 'amigo-kit' && <AmigoKitSeccion />}
        {subTab === 'chip-express' && <ChipExpressSeccion />}
        {subTab === 'internet' && <InternetAmigoSeccion />}
        {subTab === 'tiempo' && <InternetPorTiempoSeccion />}
        {subTab === 'resumen' && <TelcelInfografia />}
      </div>
    </div>
  );
}