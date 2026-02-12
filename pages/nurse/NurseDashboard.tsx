
import React from 'react';

const NurseDashboard: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      <div className="flex justify-between items-center">
         <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Dashboard Operativo</h1>
      </div>

      {/* KPI Cards (Imagen 1) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Triados', val: '42', trend: '+5% hoy', color: 'text-slate-900', icon: 'assignment', bg: 'bg-white' },
          { label: 'Pendientes', val: '8', trend: 'Tiempo prom: 12m', color: 'text-slate-900', icon: 'hourglass_empty', bg: 'bg-white' },
          { label: 'En Proceso', val: '3', users: true, color: 'text-slate-900', icon: 'clinical_notes', bg: 'bg-white' },
          { label: 'Alertas de Tiempo', val: '2', trend: 'Pacientes > 15m', color: 'text-red-600', icon: 'warning', bg: 'bg-red-50/50', border: 'border-red-100', alert: true }
        ].map((k, i) => (
          <div key={i} className={`${k.bg} ${k.border || 'border-slate-100'} dark:bg-slate-900 p-8 rounded-[2rem] border shadow-sm flex flex-col relative overflow-hidden group`}>
             <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 dark:bg-slate-800 opacity-40 rounded-bl-full -z-10 group-hover:scale-110 transition-transform"></div>
             <p className={`text-[10px] font-black uppercase tracking-widest ${k.alert ? 'text-red-600' : 'text-slate-400'}`}>{k.alert && <span className="material-symbols-outlined text-[10px] mr-1 align-middle">warning</span>}{k.label}</p>
             <div className="flex items-baseline gap-4 mt-2">
                <h4 className={`text-4xl font-black ${k.color} dark:text-white tracking-tighter`}>{k.val}</h4>
                {k.trend && <span className={`text-[10px] font-bold ${k.alert ? 'text-slate-500' : 'text-green-600'} uppercase tracking-tight`}>{k.trend}</span>}
             </div>
             {k.users && (
               <div className="flex items-center gap-1.5 mt-4">
                  <div className="flex -space-x-3">
                     {[1,2,3].map(u => <img key={u} src={`https://i.pravatar.cc/100?u=${u}`} className="w-7 h-7 rounded-full border-2 border-white ring-1 ring-slate-100" />)}
                  </div>
               </div>
             )}
             {k.alert && <button className="mt-4 bg-white border border-slate-100 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-50 self-start">Ver lista</button>}
             <div className="absolute top-8 right-8 opacity-5">
                <span className="material-symbols-outlined text-5xl font-black">{k.icon}</span>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        {/* Gráfico de Prioridades (Imagen 1 Left) */}
        <div className="xl:col-span-4 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
           <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-widest">Resumen de Prioridades</h3>
              <button className="material-symbols-outlined text-slate-400">more_horiz</button>
           </div>
           <div className="p-10 flex flex-col items-center">
              <div className="relative w-64 h-64 mb-10">
                 <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" strokeWidth="12" />
                    {/* Mock of segments */}
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#EF4444" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="240" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#F97316" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="200" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#FACC15" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="150" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22C55E" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="80" />
                    <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3B82F6" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="30" />
                 </svg>
                 <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black text-slate-900 dark:text-white leading-none">53</span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">TOTAL</span>
                 </div>
              </div>

              <div className="w-full grid grid-cols-2 gap-y-6 gap-x-10">
                 {[
                   { label: 'I - Resucitación', val: '5', color: 'bg-red-500' },
                   { label: 'II - Emergencia', val: '13', color: 'bg-orange-500' },
                   { label: 'III - Urgencia', val: '16', color: 'bg-yellow-400' },
                   { label: 'IV - Estándar', val: '14', color: 'bg-green-500' },
                   { label: 'V - No Urgente', val: '5', color: 'bg-blue-500' }
                 ].map((p, i) => (
                   <div key={i} className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                         <div className={`w-1.5 h-3 rounded-full ${p.color}`}></div>
                         <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase leading-tight">{p.label} <span className="text-slate-900 dark:text-white">({p.val})</span></span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Próximos Turnos (Imagen 1 Right) */}
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
           <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Próximos 3 Turnos</h3>
                 <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[10px] font-black uppercase rounded-lg">En espera</span>
              </div>
              <button className="text-[11px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest hover:underline">Ver todos</button>
           </div>
           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                       <th className="px-8 py-6">TICKET</th>
                       <th className="px-8 py-6">PACIENTE</th>
                       <th className="px-8 py-6">PRIORIDAD</th>
                       <th className="px-8 py-6">TIEMPO ESPERA</th>
                       <th className="px-8 py-6 text-right">ACCIÓN</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                    {[
                      { id: 'A-042', name: 'Carlos Rodriguez', symp: 'Dolor torácico', priority: 'II - Emergencia', pColor: 'bg-orange-50 text-orange-600 border-orange-100', wait: '18 min', wAlert: true },
                      { id: 'B-103', name: 'Ana Lopez', symp: 'Fiebre alta', priority: 'III - Urgencia', pColor: 'bg-yellow-50 text-yellow-700 border-yellow-100', wait: '12 min' },
                      { id: 'A-043', name: 'Miguel Torres', symp: 'Traumatismo leve', priority: 'IV - Estándar', pColor: 'bg-green-50 text-green-700 border-green-100', wait: '5 min' }
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50/50 transition-all group">
                         <td className="px-8 py-8">
                            <div className="bg-slate-100 dark:bg-slate-800 w-14 h-14 rounded-xl flex flex-col items-center justify-center font-black text-slate-900 dark:text-white text-xs">
                               <span>{row.id.split('-')[0]}</span>
                               <span className="text-base -mt-1">{row.id.split('-')[1]}</span>
                            </div>
                         </td>
                         <td className="px-8 py-8">
                            <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{row.name}</p>
                            <p className="text-[10px] font-medium text-slate-400 mt-1.5 italic">{row.symp}</p>
                         </td>
                         <td className="px-8 py-8">
                            <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${row.pColor}`}>
                               <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                               {row.priority}
                            </span>
                         </td>
                         <td className="px-8 py-8">
                            <div className={`flex items-center gap-3 text-sm font-black ${row.wAlert ? 'text-red-600' : 'text-slate-900 dark:text-white'}`}>
                               <span className={`material-symbols-outlined text-lg ${row.wAlert ? 'animate-pulse' : ''}`}>schedule</span>
                               {row.wait}
                            </div>
                         </td>
                         <td className="px-8 py-8 text-right">
                            <button className={`px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest transition-all shadow-lg active:scale-95 ${i === 0 ? 'bg-blue-800 text-white shadow-blue-900/20' : 'bg-white border-2 border-slate-100 text-slate-900'}`}>Llamar</button>
                         </td>
                      </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      </div>

      {/* Banner Código Rojo (Imagen 1 Bottom) */}
      <div className="bg-blue-800 dark:bg-slate-900 rounded-[2.5rem] border border-blue-900 p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-[0_40px_80px_-20px_rgba(30,64,175,0.4)] relative overflow-hidden group">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
            <div className="w-20 h-20 bg-white/10 backdrop-blur-md rounded-[2rem] flex items-center justify-center border border-white/20">
               <span className="material-symbols-outlined text-4xl text-white font-black">emergency</span>
            </div>
            <div className="space-y-3 text-center md:text-left">
               <h3 className="text-3xl font-black text-white tracking-tight uppercase leading-none">¿Nuevo paciente en estado crítico?</h3>
               <p className="text-blue-100 font-medium text-lg max-w-2xl leading-relaxed">
                  Inicia un protocolo de triaje rápido para emergencias de nivel I (Rojo) sin pasar por la admisión regular.
               </p>
            </div>
         </div>
         <button className="relative z-10 bg-white hover:bg-red-50 text-red-600 px-10 py-5 rounded-[1.5rem] font-black text-base uppercase tracking-widest shadow-2xl flex items-center gap-4 active:scale-95 transition-all">
            <span className="material-symbols-outlined text-2xl font-black">emergency_share</span>
            Activar Código Rojo
         </button>
      </div>
    </div>
  );
};

export default NurseDashboard;
