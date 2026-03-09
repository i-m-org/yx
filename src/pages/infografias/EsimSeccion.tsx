import { useState } from 'react'
import { AdquiereEsim } from './esim/AdquiereEsim'
import { LineaEsim } from './esim/LineaEsim'
import { ActivaSinQr } from './esim/ActivaSinQr'

export function EsimSeccion() {
  const [subSeccion, setSubSeccion] = useState('adquiere');

  const menu = [
    { id: 'adquiere', label: 'Adquiere eSIM' },
    { id: 'linea', label: 'Tu Línea' },
    { id: 'activa', label: 'Activa sin QR' }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 space-y-10">
      {/* Sub Menú Horizontal */}
      <div className="flex flex-wrap justify-center gap-2">
        {menu.map(item => (
          <button
            key={item.id}
            onClick={() => setSubSeccion(item.id)}
            className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              subSeccion === item.id 
              ? 'bg-[#002f6c] text-white shadow-lg scale-105' 
              : 'bg-white text-slate-400 hover:bg-slate-50 border border-slate-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Renderizado de Archivos Separados */}
      <div className="min-h-[500px]">
        {subSeccion === 'adquiere' && <AdquiereEsim />}
        {subSeccion === 'linea' && <LineaEsim />}
        {subSeccion === 'activa' && <ActivaSinQr />}
      </div>
    </div>
  )
}

