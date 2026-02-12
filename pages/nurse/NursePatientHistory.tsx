
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NursePatientHistory: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1600px] mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      {/* Breadcrumb e Intro */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
              <span>Triaje</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span>Historial del Paciente</span>
           </div>
           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Juan Pérez</h1>
        </div>
        <div className="flex gap-4">
           <div className="relative group w-64">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
              <input className="w-full bg-white border border-slate-100 rounded-xl pl-11 pr-4 py-2.5 font-bold text-xs" defaultValue="Juan Pérez" />
           </div>
           <button onClick={() => navigate('/nurse/evaluacion')} className="bg-blue-800 text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/10 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">add</span>
              Nueva Atención
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        {/* Main Info Column */}
        <div className="xl:col-span-8 space-y-10">
           {/* Patient Card (Imagen 4 Style) */}
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
              <div className="relative shrink-0">
                 <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-6xl text-slate-300">person</span>
                 </div>
                 <span className="absolute -bottom-1 -right-1 px-3 py-1 bg-green-500 text-white text-[8px] font-black uppercase rounded-lg border-4 border-white shadow-lg">Activo</span>
              </div>

              <div className="flex-1 space-y-6">
                 <div className="flex items-center justify-between">
                    <div>
                       <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Juan Pérez Rodriguez</h2>
                       <p className="text-xs font-bold text-slate-400 mt-2">DNI: 12.345.678 • Paciente desde Enero 2023</p>
                    </div>
                    <div className="flex gap-2">
                       <span className="bg-blue-50 text-blue-800 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-blue-100">Triaje II (Urgente)</span>
                       <button className="p-2 text-slate-300 hover:text-blue-800"><span className="material-symbols-outlined">edit</span></button>
                       <button className="p-2 text-slate-300 hover:text-blue-800"><span className="material-symbols-outlined">share</span></button>
                    </div>
                 </div>

                 <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: 'EDAD', val: '45 años' },
                      { label: 'GRUP. SANG.', val: 'A+' },
                      { label: 'PESO', val: '78.5 kg' },
                      { label: 'TALLA', val: '1.75 m' }
                    ].map((d, i) => (
                      <div key={i} className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-2xl border border-slate-100 dark:border-slate-700">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{d.label}</p>
                         <p className="text-base font-black text-slate-900 dark:text-white">{d.val}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           {/* Tendencias de Signos Vitales (Imagen 4 Chart) */}
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 flex flex-col gap-10">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-50 text-blue-800 rounded-xl flex items-center justify-center">
                       <span className="material-symbols-outlined font-black">insights</span>
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Tendencias de Signos Vitales</h3>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Historial de presión arterial (Sistólica / Diastólica)</p>
                    </div>
                 </div>
                 <div className="flex gap-2 p-1 bg-slate-50 rounded-xl">
                    <button className="px-5 py-2 bg-blue-800 text-white rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Presión</button>
                    <button className="px-5 py-2 text-slate-400 hover:text-slate-900 rounded-lg text-[9px] font-black uppercase tracking-widest">Peso</button>
                    <button className="px-5 py-2 text-slate-400 hover:text-slate-900 rounded-lg text-[9px] font-black uppercase tracking-widest">Glucosa</button>
                 </div>
              </div>

              <div className="h-80 w-full relative flex flex-col justify-between pt-10">
                 {/* Chart Mockup with SVG */}
                 <svg className="w-full h-48 mt-10" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M0,80 Q100,70 200,85 T400,60 T600,75 T800,50 T1000,65" fill="none" stroke="#1e40af" strokeWidth="4" />
                    <path d="M0,90 Q100,85 200,95 T400,80 T600,88 T800,75 T1000,82" fill="none" stroke="#60a5fa" strokeWidth="4" strokeDasharray="8" />
                 </svg>
                 
                 {/* Tooltip Hover Mockup */}
                 <div className="absolute top-1/4 right-[25%] bg-slate-900 text-white p-4 rounded-xl shadow-2xl z-10 animate-in zoom-in-95">
                    <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-2">10 Oct 2023</p>
                    <div className="flex justify-between gap-8 mb-1">
                       <span className="text-[10px] font-bold">Sistólica:</span>
                       <span className="text-[10px] font-black">140 mmHg</span>
                    </div>
                    <div className="flex justify-between gap-8 border-b border-white/10 pb-2 mb-2">
                       <span className="text-[10px] font-bold">Diastólica:</span>
                       <span className="text-[10px] font-black">90 mmHg</span>
                    </div>
                    <p className="text-[10px] font-black text-yellow-400 italic">Hipertensión Leve</p>
                 </div>

                 <div className="flex justify-between text-[9px] font-black text-slate-300 uppercase tracking-[0.4em] px-4">
                    <span>Enero</span>
                    <span>Marzo</span>
                    <span>Mayo</span>
                    <span>Julio</span>
                    <span>Octubre</span>
                 </div>
              </div>

              <div className="flex justify-center gap-10 pt-4 border-t border-slate-50">
                 <div className="flex items-center gap-2.5">
                    <div className="w-8 h-1.5 bg-blue-800 rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Sistólica</span>
                 </div>
                 <div className="flex items-center gap-2.5">
                    <div className="w-8 h-1.5 bg-blue-400 rounded-full"></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Diastólica</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Sidebar Alertas y Timeline */}
        <div className="xl:col-span-4 space-y-10">
           {/* Alergias y Alertas (Imagen 4 Right Top) */}
           <div className="bg-red-50/50 rounded-[3rem] border border-red-100 p-10 space-y-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-red-100">
                 <span className="material-symbols-outlined text-8xl font-black opacity-40">report</span>
              </div>
              <div className="relative z-10 flex items-center gap-4">
                 <span className="material-symbols-outlined text-red-600 font-black text-3xl">error</span>
                 <h3 className="text-xl font-black text-red-800 tracking-tight uppercase">Alergias y Alertas</h3>
              </div>
              <div className="flex flex-wrap gap-3 relative z-10">
                 {['PENICILINA', 'AINEs', 'LÁTEX'].map(a => (
                   <span key={a} className="px-5 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-red-900/20">{a}</span>
                 ))}
              </div>
              <div className="bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-red-100 relative z-10">
                 <p className="text-[11px] font-bold text-red-700 leading-relaxed italic">
                    "Nota crítica: Reacción anafiláctica previa a penicilina reportada en 2018."
                 </p>
              </div>
           </div>

           {/* Línea de Tiempo (Imagen 4 Right Bottom) */}
           <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 flex flex-col gap-10">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-blue-800">timeline</span>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Línea de Tiempo</h3>
                 </div>
                 <button className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Ver Todo</button>
              </div>

              <div className="relative space-y-10 pl-6">
                 <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-slate-100"></div>

                 {/* Item 1 */}
                 <div className="relative pl-10">
                    <div className="absolute left-[-24px] top-1 w-12 h-12 bg-blue-800 text-white rounded-[1.2rem] flex items-center justify-center shadow-lg shadow-blue-900/20 border-4 border-white z-10">
                       <span className="material-symbols-outlined text-xl">clinical_notes</span>
                    </div>
                    <div>
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">12 Oct 2023 • 14:30</span>
                          <span className="px-3 py-1 bg-red-50 text-red-600 text-[8px] font-black uppercase rounded-lg">Urgencias</span>
                       </div>
                       <h5 className="font-black text-slate-900 text-base leading-tight">Cefalea Intensa</h5>
                       <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Dr. Ramirez - Pabellón A</p>
                       <div className="flex gap-10 mt-4">
                          <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase">PRESIÓN</p>
                             <p className="text-sm font-black text-red-600">140/90</p>
                          </div>
                          <div>
                             <p className="text-[8px] font-black text-slate-400 uppercase">TEMP</p>
                             <p className="text-sm font-black text-slate-900">37.2°C</p>
                          </div>
                       </div>
                    </div>
                 </div>

                 {/* Item 2 */}
                 <div className="relative pl-10">
                    <div className="absolute left-[-24px] top-1 w-12 h-12 bg-white text-slate-300 border border-slate-100 rounded-[1.2rem] flex items-center justify-center z-10">
                       <span className="material-symbols-outlined text-xl">medical_information</span>
                    </div>
                    <div>
                       <div className="flex items-center justify-between mb-2">
                          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">05 Ago 2023 • 09:15</span>
                          <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[8px] font-black uppercase rounded-lg">Preventivo</span>
                       </div>
                       <h5 className="font-black text-slate-900 text-base leading-tight">Chequeo Rutina</h5>
                       <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">Enf. Maria Torres - Consultorio 2</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NursePatientHistory;
