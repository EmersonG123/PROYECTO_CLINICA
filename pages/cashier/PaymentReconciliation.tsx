
import React from 'react';

const PaymentReconciliation: React.FC = () => {
  const passages = [
    { method: 'Yape / Plin', category: 'Billetera Digital', transactions: 12, system: 'S/ 450.00', confirmed: 'S/ 420.00', diff: '- S/ 30.00', status: 'Discrepancia', sColor: 'bg-red-50 text-red-600 border-red-100', icon: 'qr_code_2', iColor: 'text-purple-600 bg-purple-50', showDetail: true },
    { method: 'POS Visa / MC', category: 'Terminal #01', transactions: 24, system: 'S/ 2,300.00', confirmed: 'S/ 2,300.00', diff: '0.00', status: 'Conciliado', sColor: 'bg-green-50 text-green-600 border-green-100', icon: 'credit_card', iColor: 'text-blue-800 bg-blue-50' },
    { method: 'Efectivo', category: 'Caja Chica', transactions: 45, system: 'S/ 2,100.00', confirmed: 'S/ 2,100.00', diff: '0.00', status: 'Conciliado', sColor: 'bg-green-50 text-green-600 border-green-100', icon: 'payments', iColor: 'text-green-600 bg-green-50', hasDrop: true }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Conciliación de Pagos</h1>
          <p className="text-slate-500 font-medium mt-2">Control diario y detección de discrepancias</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-6 py-2.5 rounded-2xl flex items-center gap-3">
              <span className="material-symbols-outlined text-slate-400">calendar_today</span>
              <span className="text-sm font-black text-slate-900 dark:text-white">24 Oct, 2023</span>
           </div>
           <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
           </button>
        </div>
      </div>

      {/* Overview Cards (Imagen 5) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Sistema (Caja)</p>
            <h4 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">S/ 4,850.00</h4>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400 uppercase tracking-widest border border-slate-100">Registrado Automáticamente</div>
            <div className="absolute top-8 right-8 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
               <span className="material-symbols-outlined text-3xl font-black">barcode</span>
            </div>
         </div>
         <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm relative group">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Total Confirmado</p>
            <h4 className="text-5xl font-black text-green-600 tracking-tighter uppercase leading-none">S/ 4,820.00</h4>
            <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 bg-green-50 rounded-lg text-[9px] font-black text-green-600 uppercase tracking-widest border border-green-100">Verificado en Bancos/Efectivo</div>
            <div className="absolute top-8 right-8 w-14 h-14 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-inner">
               <span className="material-symbols-outlined text-2xl font-black">check</span>
            </div>
         </div>
         <div className="bg-red-50/50 p-10 rounded-[2.5rem] border border-red-100 relative group overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-red-100/50 rounded-full blur-3xl"></div>
            <p className="text-[11px] font-black text-red-600 uppercase tracking-widest mb-4">Discrepancias</p>
            <h4 className="text-5xl font-black text-red-600 tracking-tighter uppercase leading-none">- S/ 30.00</h4>
            <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mt-6 flex items-center gap-2">
               <span className="material-symbols-outlined text-sm">error</span>
               1 Pendiente de Revisión
            </p>
            <div className="absolute top-8 right-8 w-14 h-14 text-red-100">
               <span className="material-symbols-outlined text-5xl font-black opacity-20">warning</span>
            </div>
         </div>
      </div>

      {/* Summary Table (Imagen 5) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
               <span className="material-symbols-outlined text-blue-800">analytics</span>
               Resumen por Pasarela de Pago
            </h3>
            <div className="flex gap-4">
               <button className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900"><span className="material-symbols-outlined text-lg">ios_share</span> Exportar</button>
               <button className="bg-blue-800 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Guardar Cierre</button>
            </div>
         </div>
         
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-10 py-6">MÉTODO DE PAGO</th>
                     <th className="px-10 py-6 text-center">TRANSACCIONES</th>
                     <th className="px-10 py-6 text-center">MONTO SISTEMA</th>
                     <th className="px-10 py-6 text-center">MONTO CONFIRMADO</th>
                     <th className="px-10 py-6 text-center">DIFERENCIA</th>
                     <th className="px-10 py-6 text-center">ESTADO</th>
                     <th className="px-10 py-6 text-right">ACCIONES</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {passages.map((p, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 transition-all group">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-6">
                             <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${p.iColor}`}>
                                <span className="material-symbols-outlined text-2xl font-bold">{p.icon}</span>
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{p.method}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{p.category}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-center font-black text-slate-900">{p.transactions}</td>
                       <td className="px-10 py-8 text-center text-sm font-bold text-slate-500">{p.system}</td>
                       <td className="px-10 py-8 text-center">
                          {p.showDetail ? (
                             <div className="relative inline-flex items-center bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 font-black text-sm text-slate-900">
                                <span className="text-[8px] text-slate-400 mr-2 uppercase">S/</span>
                                {p.confirmed.split(' ')[1]}
                             </div>
                          ) : (
                             <p className="font-black text-sm text-slate-900">{p.confirmed}</p>
                          )}
                       </td>
                       <td className="px-10 py-8 text-center">
                          <p className={`text-sm font-black ${p.diff.includes('-') ? 'text-red-600' : 'text-green-600'}`}>{p.diff}</p>
                       </td>
                       <td className="px-10 py-8 text-center">
                          <div className="flex justify-center">
                             <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 ${p.sColor}`}>
                                <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                                {p.status}
                                {p.hasDrop && <span className="material-symbols-outlined text-xs">expand_more</span>}
                             </span>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <div className="flex justify-end">
                             {p.showDetail ? (
                               <button className="px-5 py-2.5 bg-white border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-800 shadow-sm hover:bg-slate-50 transition-all">Ver Detalle</button>
                             ) : (
                               <button className="p-2 text-slate-300 hover:text-slate-900"><span className="material-symbols-outlined">visibility</span></button>
                             )}
                          </div>
                       </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50/50 font-black">
                     <td className="px-10 py-10 text-right uppercase tracking-widest text-[11px] text-slate-400" colSpan={2}>Totales Generales</td>
                     <td className="px-10 py-10 text-center text-lg">S/ 4,850.00</td>
                     <td className="px-10 py-10 text-center text-lg">S/ 4,820.00</td>
                     <td className="px-10 py-10 text-center text-lg text-red-600">- S/ 30.00</td>
                     <td colSpan={2}></td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>

      {/* Importante Panel (Imagen 5 Bottom) */}
      <div className="bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/40 rounded-[2.5rem] p-10 flex gap-8 items-start">
         <div className="w-12 h-12 rounded-full bg-blue-800 text-white flex items-center justify-center shrink-0 shadow-lg">
            <span className="material-symbols-outlined font-black">info</span>
         </div>
         <div>
            <h5 className="text-sm font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest mb-3">Nota Importante</h5>
            <p className="text-base font-medium text-slate-600 dark:text-slate-400 leading-relaxed">Las discrepancias en Yape deben ser justificadas con el voucher digital antes del cierre de turno de las 8:00 PM. Por favor contacte a administración si el problema persiste.</p>
         </div>
      </div>
    </div>
  );
};

export default PaymentReconciliation;
