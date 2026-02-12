
import React from 'react';

const LabDashboard: React.FC = () => {
  const kpis = [
    { title: 'Muestras Totales', value: '1,482', trend: '+12% vs ayer', icon: 'bloodtype', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Pendientes de Validación', value: '124', alert: '18 requieren atención', icon: 'pending_actions', color: 'text-orange-600', bg: 'bg-orange-50' },
    { title: 'Urgencias Activas', value: '07', sub: 'Tiempo crítico', icon: 'emergency', color: 'text-red-600', bg: 'bg-red-50' },
    { title: 'TAT Promedio', value: '42m', trend: 'Mejora vs semana anterior', icon: 'timer', color: 'text-green-600', bg: 'bg-green-50' }
  ];

  const tests = [
    { name: 'Bioquímica', value: 842, width: '84%' },
    { name: 'Hematología', value: 615, width: '61%' },
    { name: 'Microbiología', value: 489, width: '48%' },
    { name: 'Inmunología', value: 324, width: '32%' },
    { name: 'Coagulación', value: 186, width: '18%' },
    { name: 'Otros', value: 98, width: '9%' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Dashboard Ejecutivo</h1>
          <p className="text-slate-500 font-medium mt-1">Resumen operativo en tiempo real.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-3 rounded-xl flex items-center gap-3">
           <span className="material-symbols-outlined text-slate-400">calendar_today</span>
           <span className="text-sm font-bold text-slate-900 dark:text-white">Hoy, 24 Mayo 2024</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-[2rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm relative group overflow-hidden">
             <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{kpi.title}</p>
                  <h4 className="text-4xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter">{kpi.value}</h4>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center shadow-sm transition-transform group-hover:scale-110`}>
                   <span className="material-symbols-outlined text-2xl">{kpi.icon}</span>
                </div>
             </div>
             <div className="flex items-center gap-2">
                {kpi.trend && <span className="text-[10px] font-bold text-green-600 uppercase flex items-center gap-1"><span className="material-symbols-outlined text-xs">trending_up</span> {kpi.trend}</span>}
                {kpi.alert && <span className="text-[10px] font-bold text-red-600 uppercase flex items-center gap-1"><span className="material-symbols-outlined text-xs">error</span> {kpi.alert}</span>}
                {kpi.sub && <span className="text-[10px] font-bold text-red-600 uppercase flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span> {kpi.sub}</span>}
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-10">
           {/* Volumen de Pruebas */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-12">
                 <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Volumen de Pruebas por Especialidad</h3>
                 <select className="bg-slate-50 border-none rounded-xl text-xs font-bold px-4 py-2">
                    <option>Últimos 30 días</option>
                 </select>
              </div>
              <div className="space-y-8">
                 {tests.map((spec, i) => (
                   <div key={i} className="flex items-center gap-6">
                      <span className="w-28 text-[11px] font-black text-slate-500 uppercase">{spec.name}</span>
                      <div className="flex-1 h-6 bg-slate-50 rounded-full overflow-hidden flex items-center relative">
                         <div className="h-full bg-blue-800 rounded-full transition-all duration-1000" style={{ width: spec.width }}></div>
                      </div>
                      <span className="w-12 text-[11px] font-black text-slate-900 text-right">{spec.value}</span>
                   </div>
                 ))}
              </div>
           </div>

           {/* Productividad Semanal */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-12">
                 <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Productividad Semanal</h3>
                 <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-blue-800 rounded-full"></span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Procesadas</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
                       <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Validadas</span>
                    </div>
                 </div>
              </div>
              <div className="h-64 flex items-end justify-between px-4 pb-4 border-b border-l border-slate-100 relative">
                 <svg className="absolute bottom-0 left-0 w-full h-full p-4" viewBox="0 0 1000 100" preserveAspectRatio="none">
                    <path d="M0,80 Q100,60 200,90 T400,70 T600,40 T800,80 T1000,50" fill="none" stroke="#1e40af" strokeWidth="4" />
                    <path d="M0,90 Q100,70 200,95 T400,80 T600,60 T800,90 T1000,70" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="8" />
                 </svg>
              </div>
           </div>
        </div>

        <div className="xl:col-span-4 space-y-10">
           {/* Alertas de Equipos (Imagen 1) */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-3 mb-8">
                 <span className="material-symbols-outlined text-orange-500">warning</span>
                 <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Alertas de Equipos</h4>
              </div>
              <div className="space-y-4">
                 <div className="p-6 bg-red-50 rounded-3xl border border-red-100">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-red-500 shrink-0">
                          <span className="material-symbols-outlined">settings</span>
                       </div>
                       <div>
                          <p className="font-black text-xs text-slate-900">Sysmex XN-1000</p>
                          <p className="text-[10px] font-medium text-red-600 mt-1 leading-relaxed">Mantenimiento preventivo vencido</p>
                          <button className="text-[9px] font-black text-red-700 uppercase tracking-widest mt-3 hover:underline">Solicitar técnico</button>
                       </div>
                    </div>
                 </div>
                 <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                    <div className="flex items-start gap-4">
                       <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-orange-500 shrink-0">
                          <span className="material-symbols-outlined">opacity</span>
                       </div>
                       <div>
                          <p className="font-black text-xs text-slate-900">Roche Cobas c501</p>
                          <p className="text-[10px] font-medium text-orange-600 mt-1 leading-relaxed">Reactivo Glucosa (GLU) &lt; 15%</p>
                          <button className="text-[9px] font-black text-orange-700 uppercase tracking-widest mt-3 hover:underline">Reponer ahora</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Resultados Críticos (Imagen 1) */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <div className="flex items-center justify-between mb-8">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-red-600">notifications_active</span>
                    <h4 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-xs">Resultados Críticos</h4>
                 </div>
                 <span className="bg-red-600 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black">3</span>
              </div>
              <div className="space-y-6">
                 {[
                   { name: 'MARÍA RODRÍGUEZ', test: 'Glucemia en ayunas', val: '42 mg/dL', time: '14:20' },
                   { name: 'JUAN PÉREZ', test: 'Potasio (K+)', val: '6.8 mEq/L', time: '14:05' },
                   { name: 'ANA GARCÍA', test: 'Hemoglobina', val: '7.2 g/dL', time: '13:45' }
                 ].map((c, i) => (
                   <div key={i} className="flex justify-between items-start border-b border-slate-50 pb-4">
                      <div>
                         <p className="font-black text-[11px] text-slate-900">{c.name}</p>
                         <p className="text-[10px] font-medium text-slate-400 mt-0.5">{c.test}</p>
                      </div>
                      <div className="text-right">
                         <p className="text-[10px] font-bold text-slate-400 mb-1">{c.time}</p>
                         <p className="font-black text-[11px] text-red-600">{c.val}</p>
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-4 text-[10px] font-black text-blue-800 uppercase tracking-widest hover:bg-slate-50 rounded-2xl transition-all">Ver todos los avisos</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LabDashboard;
