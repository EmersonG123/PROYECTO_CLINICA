
import React from 'react';

const AdminDashboard: React.FC = () => {
  const activityLogs = [
    { time: '10:42 AM', user: 'Dr. Juan Pérez', action: 'Actualizó Historia Clínica #8492', icon: 'edit_note', color: 'bg-blue-100 text-blue-600' },
    { time: '10:30 AM', user: 'Ana Gómez (Recepción)', action: 'Registró nuevo paciente', icon: 'person_add', color: 'bg-green-100 text-green-600' },
    { time: '10:15 AM', user: 'Sistema', action: 'Copia de seguridad automática completada', icon: 'backup', color: 'bg-purple-100 text-purple-600' },
    { time: '09:55 AM', user: 'Carlos Ruiz (Admin)', action: 'Modificó permisos de usuario', icon: 'security', color: 'bg-orange-100 text-orange-600' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-7xl mx-auto pb-10">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Panel de Control</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Visión general del estado del sistema y operaciones.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl border border-green-100 dark:border-green-800">
           <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest">Sistema Operativo</span>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Usuarios Online', val: '45', color: 'text-blue-600', icon: 'group', trend: '+12% vs ayer' },
          { label: 'Citas Hoy', val: '124', color: 'text-purple-600', icon: 'calendar_today', trend: '95% confirmadas' },
          { label: 'Transacciones', val: 'S/ 12k', color: 'text-green-600', icon: 'payments', trend: 'Cierre parcial' },
          { label: 'Alertas', val: '0', color: 'text-slate-600', icon: 'check_circle', trend: 'Todo en orden' }
        ].map((k, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col justify-between group hover:shadow-md transition-all">
             <div className="flex justify-between items-start">
                <div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{k.label}</p>
                   <p className={`text-4xl font-black ${k.color} dark:text-white mt-2 tracking-tighter`}>{k.val}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 text-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                   <span className="material-symbols-outlined">{k.icon}</span>
                </div>
             </div>
             <div className="mt-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{k.trend}</p>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* System Health */}
         <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 flex flex-col">
            <div className="flex items-center justify-between mb-8">
               <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest">Rendimiento del Servidor</h3>
               <button className="text-blue-600 text-[10px] font-black uppercase tracking-widest hover:underline">Ver detalles</button>
            </div>
            
            <div className="space-y-8 flex-1 justify-center flex flex-col">
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                     <span>CPU Usage</span>
                     <span>24%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-600 w-[24%] rounded-full shadow-lg shadow-blue-600/30"></div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                     <span>Memory (RAM)</span>
                     <span>58%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-600 w-[58%] rounded-full shadow-lg shadow-purple-600/30"></div>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold text-slate-500">
                     <span>Storage (SSD)</span>
                     <span>42%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                     <div className="h-full bg-green-500 w-[42%] rounded-full shadow-lg shadow-green-500/30"></div>
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-50 dark:border-slate-800 flex gap-6">
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Database: Connected</span>
               </div>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">API Gateway: Online</span>
               </div>
            </div>
         </div>

         {/* Recent Activity */}
         <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8">
            <h3 className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6">Actividad Reciente</h3>
            <div className="space-y-6">
               {activityLogs.map((log, i) => (
                  <div key={i} className="flex gap-4 relative">
                     {i !== activityLogs.length - 1 && <div className="absolute left-[18px] top-10 bottom-[-10px] w-0.5 bg-slate-100 dark:bg-slate-800"></div>}
                     <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${log.color}`}>
                        <span className="material-symbols-outlined text-lg">{log.icon}</span>
                     </div>
                     <div>
                        <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">{log.action}</p>
                        <p className="text-[10px] font-medium text-slate-400 mt-1">{log.user} • {log.time}</p>
                     </div>
                  </div>
               ))}
            </div>
            <button className="w-full mt-8 py-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
               Ver historial completo
            </button>
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
