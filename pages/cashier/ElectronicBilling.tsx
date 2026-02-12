
import React from 'react';

const ElectronicBilling: React.FC = () => {
  const documents = [
    { type: 'F', number: 'F001-0004521', date: '27/10/2023', time: '10:42 AM', client: 'Seguros Rimac S.A.', ruc: '20100034567', total: 'S/ 450.00', status: 'Aceptado', sColor: 'bg-green-50 text-green-600 border-green-100', icon: 'bg-blue-50 text-blue-600' },
    { type: 'B', number: 'B001-0008821', date: '27/10/2023', time: '09:15 AM', client: 'Juan Pérez Rodríguez', ruc: 'DNI: 45889922', total: 'S/ 85.00', status: 'Aceptado', sColor: 'bg-green-50 text-green-600 border-green-100', icon: 'bg-purple-50 text-purple-600' },
    { type: 'F', number: 'F001-0004522', date: '27/10/2023', time: '08:30 AM', client: 'Clínica Dental Sonrisas', ruc: 'RUC: 20556677889', total: 'S/ 1,200.00', status: 'Pendiente', sColor: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: 'bg-blue-50 text-blue-600' },
    { type: 'B', number: 'B001-0008820', date: '26/10/2023', time: '18:20 PM', client: 'Maria Fernanda Lopez', ruc: 'DNI: 09988776', total: 'S/ 45.00', status: 'Rechazado', sColor: 'bg-red-50 text-red-600 border-red-100', icon: 'bg-purple-50 text-purple-600', rejected: true },
    { type: 'F', number: 'F001-0004520', date: '26/10/2023', time: '16:15 PM', client: 'Laboratorios Medical Corp', ruc: 'RUC: 20456677112', total: 'S/ 2,450.00', status: 'Aceptado', sColor: 'bg-green-50 text-green-600 border-green-100', icon: 'bg-blue-50 text-blue-600' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Facturación Electrónica</h1>
          <p className="text-slate-500 font-medium mt-2 flex items-center gap-2">
             Gestión de comprobantes emitidos
             <span className="px-3 py-0.5 bg-green-50 text-green-600 border border-green-100 rounded-full text-[9px] font-black flex items-center gap-1.5 uppercase">
                <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                Conectado a SUNAT
             </span>
          </p>
        </div>
        
        <div className="relative group w-full max-w-md">
           <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">search</span>
           <input className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-[1.2rem] pl-14 pr-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 shadow-xl shadow-blue-800/5 transition-all" placeholder="Buscar por N° Comprobante, Clie..." />
           <div className="p-3 absolute right-2 top-1/2 -translate-y-1/2 text-slate-400">
              <span className="material-symbols-outlined text-xl">notifications</span>
           </div>
        </div>
      </div>

      {/* Filters Bar (Imagen 6) */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 space-y-8">
         <div className="flex flex-wrap items-center gap-6">
            <button className="bg-white border-2 border-slate-100 dark:bg-slate-800 dark:border-slate-700 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-3">
               <span className="material-symbols-outlined text-lg">filter_alt</span>
               Filtros
            </button>
            <div className="bg-slate-50 border border-slate-100 px-6 py-3 rounded-xl flex items-center gap-3">
               <span className="material-symbols-outlined text-slate-400">calendar_today</span>
               <span className="text-[11px] font-black uppercase text-slate-900">Octubre 2023</span>
            </div>
            <div className="ml-auto">
               <button className="bg-white border-2 border-slate-100 px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-900 flex items-center gap-3 hover:bg-slate-50 transition-all">
                  <span className="material-symbols-outlined text-lg">download</span>
                  Exportar Reporte
               </button>
            </div>
         </div>

         {/* Document Table (Imagen 6/7/8) */}
         <div className="overflow-x-auto pt-4">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-8 py-6">TIPO</th>
                     <th className="px-8 py-6">NÚMERO</th>
                     <th className="px-8 py-6">FECHA EMISIÓN</th>
                     <th className="px-8 py-6">CLIENTE</th>
                     <th className="px-8 py-6 text-center">MONTO TOTAL</th>
                     <th className="px-8 py-6 text-center">ESTADO SUNAT</th>
                     <th className="px-8 py-6 text-right">ACCIONES</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {documents.map((doc, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 transition-all group">
                       <td className="px-8 py-8">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-xs ${doc.icon}`}>
                             {doc.type}
                          </div>
                       </td>
                       <td className="px-8 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{doc.number}</p>
                       </td>
                       <td className="px-8 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{doc.date}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{doc.time}</p>
                       </td>
                       <td className="px-8 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{doc.client}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{doc.ruc}</p>
                       </td>
                       <td className="px-8 py-8 text-center">
                          <p className="text-base font-black text-slate-900 dark:text-white">{doc.total}</p>
                       </td>
                       <td className="px-8 py-8 text-center">
                          <div className="flex justify-center">
                             <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 ${doc.sColor}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${doc.status === 'Rechazado' ? 'bg-red-500' : doc.status === 'Pendiente' ? 'bg-yellow-500' : 'bg-green-500'}`}></span>
                                {doc.status}
                             </span>
                          </div>
                       </td>
                       <td className="px-8 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex justify-end gap-3">
                             <button className="p-2 text-slate-400 hover:text-blue-800"><span className="material-symbols-outlined text-xl">picture_as_pdf</span></button>
                             <button className="p-2 text-slate-400 hover:text-blue-800"><span className="material-symbols-outlined text-xl">code</span></button>
                             {doc.rejected ? (
                               <button className="p-2 text-slate-400 hover:text-red-600"><span className="material-symbols-outlined text-xl">refresh</span></button>
                             ) : (
                               <button className="p-2 text-slate-300 hover:text-slate-400"><span className="material-symbols-outlined text-xl">block</span></button>
                             )}
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between pt-10">
            <p className="text-sm font-bold text-slate-400 italic tracking-tight">Mostrando 1 a 5 de 128 resultados</p>
            <div className="flex gap-4">
               <button className="p-2.5 border-2 border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50 transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
               <button className="p-2.5 border-2 border-slate-100 rounded-xl text-slate-400 hover:bg-slate-50 transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ElectronicBilling;
