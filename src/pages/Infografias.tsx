import { useState } from "react";
import { MainLayout } from "@/components/sidebar";
import { OfertaComercialSeccion } from './infografias/OfertaComercialSeccion';
import { EsquemasCobroSeccion } from './infografias/EsquemasCobroSeccion';
import { EsimSeccion } from './infografias/EsimSeccion';

export default function InfografiasPage() {

  const [seccion, setSeccion] = useState(1);

  const tabs = [
    { id: 1, label: 'Oferta Comercial' },
    { id: 2, label: 'Esquemas de Cobro' },
    { id: 3, label: 'Esim' }
  ];

  return (
    <MainLayout>

      <div className="min-h-screen bg-[#fcfcfc] antialiased text-slate-900 font-sans">

        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-md shadow-2xl rounded-full p-1.5 border border-slate-200 flex gap-1 max-w-[95vw] overflow-x-auto no-scrollbar">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSeccion(tab.id)}
              className={`px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                seccion === tab.id
                  ? 'bg-[#002f6c] text-white shadow-lg'
                  : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>

        <main className="pt-28 pb-20">
          <div className="container mx-auto">
            {seccion === 1 && <OfertaComercialSeccion />}
            {seccion === 2 && <EsquemasCobroSeccion />}
            {seccion === 3 && <EsimSeccion />}
          </div>
        </main>

      </div>

    </MainLayout>
  );
}
