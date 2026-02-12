
import React from 'react';

const PendingPayments: React.FC = () => {
  const transactions = [
    { patient: 'Juan Pérez', dni: '45889922', service: 'Consulta Cardiología', order: '#12345', amount: 'S/ 50.00', method: 'Yape', mColor: 'text-purple-600 bg-purple-50', reason: 'Rejected Yape', rDesc: 'Captura de pantalla ilegible', rColor: 'text-red-600' },
    { patient: 'María Lopez', dni: '77441122', service: 'Ecografía Doppler', order: '#12348', amount: 'S/ 120.00', method: 'Tarjeta', mColor: 'text-blue-800 bg-blue-50', reason: 'Network Timeout', rDesc: 'Error de comunicación con POS', rColor: 'text-orange-600', icon: 'rss_feed' },
    { patient: 'Carlos Ruiz', dni: '10203040', service: 'Perfil Lipídico', order: '#12350', amount: 'S/ 85.00', method: 'Transferencia', mColor: 'text-cyan-600 bg-cyan-50', reason: 'Verificación Pendiente', rDesc: 'Confirmación bancaria retrasada', rColor: 'text-yellow-600', icon: 'hourglass_empty' },
    { patient: 'Ana Gómez', dni: '99887766', service: 'Resonancia Magnética', order: '#12352', amount: 'S/ 450.00', method: 'Tarjeta', mColor: 'text-blue-800 bg-blue-50', reason: 'Fondos Insuficientes', rDesc: 'Rechazo por emisor', rColor: 'text-red-600', icon: 'no_sim' },
    { patient: 'Luis Suarez', dni: '33445566', service: 'Consulta Pediatría', order: '#12355', amount: 'S/ 60.00', method: 'Yape', mColor: 'text-purple-600 bg-purple-50', reason: 'Monto Incompleto', rDesc: 'Recibido: S/ 50.00, Faltante: S/ 10.00', rColor: 'text-yellow-600', icon: 'warning' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Pagos Pendientes / Validación</h1>
          <p className="text-slate-500 font-medium mt-2">Gestión de transacciones observadas</p>
        </div>
        <div className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400">
           <span className="material-symbols-outlined text-xl">notifications</span>
        </div>
      </div>

      {/* Tabs & Search (Imagen 3) */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex gap-4 p-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1.5rem]">
            <button className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white shadow-xl">Todos</button>
            <button className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2">Pendientes <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-[8px] font-black">3</span></button>
            <button className="px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all flex items-center gap-2">Rechazados <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded text-[8px] font-black">2</span></button>
         </div>

         <div className="flex gap-4 flex-1 max-w-2xl justify-end">
            <div className="relative group w-full">
               <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
               <input className="w-full bg-white border-2 border-slate-50 dark:bg-slate-900 dark:border-slate-800 rounded-[1.2rem] pl-12 pr-12 py-3.5 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all" placeholder="Buscar por Paciente, DNI o Nro Operación..." />
               <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 pointer-events-none">
                  <span className="bg-slate-50 px-1.5 py-0.5 rounded text-[8px] font-black text-slate-300">⌘K</span>
               </div>
            </div>
            <button className="bg-white border-2 border-slate-50 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-900 flex items-center gap-2 hover:bg-slate-50">
               <span className="material-symbols-outlined text-lg">filter_list</span>
               Filtrar
            </button>
            <button className="bg-white border-2 border-slate-50 px-8 py-3.5 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-900 flex items-center gap-2 hover:bg-slate-50">
               <span className="material-symbols-outlined text-lg">ios_share</span>
               Exportar
            </button>
         </div>
      </div>

      {/* Table (Imagen 3/4) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-10 py-6">PACIENTE</th>
                     <th className="px-10 py-6">SERVICIO</th>
                     <th className="px-10 py-6">MONTO</th>
                     <th className="px-10 py-6 text-center">MÉTODO</th>
                     <th className="px-10 py-6">MOTIVO DE OBSERVACIÓN</th>
                     <th className="px-10 py-6 text-right">ACCIONES</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {transactions.map((tr, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 transition-all group">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center font-black text-blue-800 text-xs">
                                {tr.patient.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{tr.patient}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">DNI: {tr.dni}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-tight">{tr.service}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Orden {tr.order}</p>
                       </td>
                       <td className="px-10 py-8">
                          <p className="text-lg font-black text-slate-900 dark:text-white">{tr.amount}</p>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex justify-center">
                             <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${tr.mColor}`}>
                                <span className="material-symbols-outlined text-sm">{tr.method === 'Yape' ? 'qr_code_2' : tr.method === 'Tarjeta' ? 'credit_card' : 'account_balance'}</span>
                                {tr.method}
                             </span>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-start gap-4">
                             <span className={`material-symbols-outlined text-xl mt-0.5 ${tr.rColor}`}>{tr.icon || 'error'}</span>
                             <div>
                                <p className={`text-[11px] font-black uppercase tracking-widest leading-none ${tr.rColor}`}>{tr.reason}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-1.5 leading-relaxed">{tr.rDesc}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex justify-end gap-3">
                             <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-blue-800 flex items-center justify-center transition-all"><span className="material-symbols-outlined">visibility</span></button>
                             <button className="w-10 h-10 rounded-xl bg-slate-50 text-slate-400 hover:text-green-600 flex items-center justify-center transition-all"><span className="material-symbols-outlined">check</span></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-400 italic tracking-tight">Mostrando 1 a 5 de 5 resultados</p>
            <div className="flex gap-4">
               <button className="px-8 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Anterior</button>
               <button className="px-8 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white bg-white dark:bg-slate-800 shadow-sm hover:bg-slate-50 transition-all">Siguiente</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default PendingPayments;
