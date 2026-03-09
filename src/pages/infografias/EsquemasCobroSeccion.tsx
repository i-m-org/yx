import { useState } from 'react'
// Importamos los nuevos mini-componentes
import { SinLimite } from './esquemas/SinLimite'
import { PorSegundo } from './esquemas/PorSegundo'
import { OptimoPlus } from './esquemas/OptimoPlus'
import { MasInformacion } from './esquemas/MasInformacion'

export function EsquemasCobroSeccion() {
  const [subSeccion, setSubSeccion] = useState('sinlimite');

  const menu = [
    { id: 'sinlimite', label: 'Amigo Sin Límite' },
    { id: 'segundo', label: 'Amigo por Segundo' },
    { id: 'optimo', label: 'Óptimo Plus Sin Frontera' },
    { id: 'info', label: '+ Información' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-12">
      {/* Menú de sub-navegación */}
      <div className="flex flex-wrap justify-center gap-2">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setSubSeccion(item.id)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              subSeccion === item.id 
              ? 'bg-[#002f6c] text-white shadow-xl scale-105' 
              : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Renderizado Dinámico */}
      <div className="min-h-[600px] pb-10">
        {subSeccion === 'sinlimite' && <SinLimite />}
        {subSeccion === 'segundo' && <PorSegundo />}
        {subSeccion === 'optimo' && <OptimoPlus />}
        {subSeccion === 'info' && <MasInformacion />}
      </div>
    </div>
  )
}
