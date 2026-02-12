
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NurseEvaluation: React.FC = () => {
  const navigate = useNavigate();
  const [manchester, setManchester] = useState(3);
  const [weight, setWeight] = useState(70.0);
  const [height, setHeight] = useState(1.75);

  const imc = (weight / (height * height)).toFixed(1);

  const manchesterLevels = [
    { id: 1, name: 'Reanimación', color: 'bg-red-50 text-red-600 border-red-100', active: 'bg-red-600 text-white ring-4 ring-red-100' },
    { id: 2, name: 'Emergencia', color: 'bg-orange-50 text-orange-600 border-orange-100', active: 'bg-orange-500 text-white ring-4 ring-orange-100' },
    { id: 3, name: 'Urgencia', color: 'bg-yellow-50 text-yellow-700 border-yellow-100', active: 'bg-yellow-400 text-white ring-4 ring-yellow-100' },
    { id: 4, name: 'Estándar', color: 'bg-green-50 text-green-600 border-green-100', active: 'bg-green-500 text-white ring-4 ring-green-100' },
    { id: 5, name: 'No Urgente', color: 'bg-blue-50 text-blue-600 border-blue-100', active: 'bg-blue-500 text-white ring-4 ring-blue-100' }
  ];

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in duration-500 pb-32">
      {/* Header Contexto */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
              <span>Triaje</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-slate-900 dark:text-white">Nueva Evaluación</span>
           </div>
           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Nueva Evaluación de Triaje</h1>
           <div className="flex items-center gap-2 text-blue-800 dark:text-blue-400 text-sm font-black uppercase tracking-widest bg-blue-50 dark:bg-blue-900/30 px-4 py-2 rounded-xl w-fit border border-blue-100 dark:border-blue-800">
              <span className="w-1.5 h-1.5 bg-blue-800 rounded-full animate-pulse"></span>
              Paciente: Juan Pérez (34 años) — ID: 892301
           </div>
        </div>
        <button onClick={() => navigate('/nurse/historial')} className="bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 flex items-center gap-3">
           <span className="material-symbols-outlined">history</span>
           Historial Médico
        </button>
      </div>

      <div className="space-y-10">
        {/* 1. Signos Vitales */}
        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-12 space-y-10">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-3xl font-black">monitor_heart</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">1. Signos Vitales</h3>
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10">
              {[
                { label: 'Presión Arterial', unit: 'mmHg', placeholder: '120/80' },
                { label: 'Frecuencia Cardíaca', unit: 'LPM', placeholder: '80' },
                { label: 'Frec. Respiratoria', unit: 'RPM', placeholder: '18' },
                { label: 'Saturación (SpO2)', unit: '%', placeholder: '98' },
                { label: 'Temperatura', unit: '°C', placeholder: '36.5' },
              ].map((s, i) => (
                <div key={i} className="space-y-3">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{s.label}</label>
                   <div className="relative group">
                      <input className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-2xl text-slate-900 focus:bg-white focus:border-blue-800 outline-none transition-all" placeholder={s.placeholder} />
                      <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">{s.unit}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 2. Antropometría */}
        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-12 space-y-10">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-purple-50 text-purple-800 rounded-2xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-3xl font-black">body_system</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">2. Antropometría</h3>
           </div>

           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-end">
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Peso</label>
                 <div className="relative">
                    <input type="number" value={weight} onChange={(e) => setWeight(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-2xl text-slate-900 focus:bg-white focus:border-blue-800 outline-none transition-all" />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">kg</span>
                 </div>
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Talla</label>
                 <div className="relative">
                    <input type="number" step="0.01" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 font-black text-2xl text-slate-900 focus:bg-white focus:border-blue-800 outline-none transition-all" />
                    <span className="absolute right-6 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">m</span>
                 </div>
              </div>
              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-[2.5rem] p-8 flex items-center justify-between border border-slate-100 dark:border-slate-800">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ÍNDICE DE MASA CORPORAL (IMC)</p>
                    <div className="flex items-baseline gap-3">
                       <h4 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">{imc}</h4>
                       <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black uppercase rounded-lg">Peso Normal</span>
                    </div>
                 </div>
                 <div className="w-32 h-3 bg-slate-200 rounded-full relative overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-blue-400 via-green-400 to-red-500 w-full opacity-30"></div>
                    <div className="absolute top-0 bottom-0 w-1 bg-slate-900 shadow-xl" style={{ left: '45%' }}></div>
                 </div>
              </div>
           </div>
        </section>

        {/* 3. Categorización de Urgencia (Manchester) */}
        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-12 space-y-10">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-3xl font-black">emergency</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">3. Categorización de Urgencia (Manchester)</h3>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {manchesterLevels.map((lvl) => (
                <button 
                  key={lvl.id} 
                  onClick={() => setManchester(lvl.id)}
                  className={`relative p-8 rounded-[2.5rem] border-2 transition-all flex flex-col items-center gap-6 group ${
                    manchester === lvl.id ? lvl.active : 'bg-slate-50 border-slate-100 text-slate-400 hover:border-blue-200'
                  }`}
                >
                   <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-2xl shadow-inner ${manchester === lvl.id ? 'bg-white/20' : 'bg-white text-slate-400'}`}>
                      {lvl.id}
                   </div>
                   <span className={`text-xs font-black uppercase tracking-widest ${manchester === lvl.id ? 'text-white' : 'text-slate-600'}`}>{lvl.name}</span>
                   {manchester === lvl.id && (
                     <div className="absolute -top-3 -right-3 w-8 h-8 bg-white text-blue-800 rounded-full flex items-center justify-center shadow-xl animate-in zoom-in duration-300">
                        <span className="material-symbols-outlined text-lg font-black">check</span>
                     </div>
                   )}
                </button>
              ))}
           </div>
        </section>

        {/* 4. Alertas de Salud */}
        <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-12 space-y-10">
           <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center">
                 <span className="material-symbols-outlined text-3xl font-black">notification_important</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">4. Alertas de Salud</h3>
           </div>
           
           <div className="relative group">
              <textarea className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-10 font-bold text-lg text-slate-900 placeholder:text-slate-300 outline-none focus:bg-white focus:border-blue-800 transition-all min-h-[150px]" placeholder="Ingrese cualquier síntoma crítico o alerta relevante..."></textarea>
           </div>
        </section>
      </div>

      {/* Footer Acciones */}
      <div className="fixed bottom-0 left-72 right-0 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl border-t border-slate-100 dark:border-slate-800 p-8 flex items-center justify-between z-40">
         <button onClick={() => navigate(-1)} className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-red-500 transition-colors px-10 py-5">Cancelar</button>
         <button 
           onClick={() => navigate('/nurse/espera')}
           className="bg-blue-800 hover:bg-blue-900 text-white px-14 py-5 rounded-[1.5rem] font-black text-base uppercase tracking-widest shadow-2xl shadow-blue-900/30 flex items-center gap-4 active:scale-95 transition-all"
         >
            Finalizar y Enviar a Médico
            <span className="material-symbols-outlined text-xl">send</span>
         </button>
      </div>
    </div>
  );
};

export default NurseEvaluation;
