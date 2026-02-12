
import React, { useState, useMemo } from 'react';

const HistoryControl: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [movements] = useState([
    { date: '24/10/2023', time: '11:42 AM', type: 'Ingreso', category: 'Venta Servicios', patient: 'María Rodríguez', amount: 170.00, method: 'Tarjeta Visa', status: 'Confirmado', sColor: 'bg-green-50 text-green-600 border-green-100' },
    { date: '24/10/2023', time: '11:30 AM', type: 'Egreso', category: 'Caja Chica', patient: 'Suministros IT', amount: 45.00, method: 'Efectivo', status: 'Autorizado', sColor: 'bg-blue-50 text-blue-600 border-blue-100' },
    { date: '24/10/2023', time: '10:55 AM', type: 'Ingreso', category: 'Venta Farmacia', patient: 'Juan Pérez', amount: 32.50, method: 'Yape', status: 'Confirmado', sColor: 'bg-green-50 text-green-600 border-green-100' },
    { date: '24/10/2023', time: '10:40 AM', type: 'Ingreso', category: 'Consulta Médica', patient: 'Ana García', amount: 50.00, method: 'Efectivo', status: 'Confirmado', sColor: 'bg-green-50 text-green-600 border-green-100' },
    { date: '24/10/2023', time: '09:20 AM', type: 'Ingreso', category: 'Laboratorio', patient: 'Carlos Ruiz', amount: 120.00, method: 'Tarjeta Mastercard', status: 'Confirmado', sColor: 'bg-green-50 text-green-600 border-green-100' },
    { date: '24/10/2023', time: '08:15 AM', type: 'Ingreso', category: 'Odontología', patient: 'Luis Torres', amount: 250.00, method: 'Plin', status: 'Confirmado', sColor: 'bg-green-50 text-green-600 border-green-100' },
  ]);

  const filteredMovements = useMemo(() => {
    return movements.filter(m => 
      m.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.method.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, movements]);

  const totalPages = Math.ceil(filteredMovements.length / itemsPerPage);
  const currentData = filteredMovements.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleXReport = () => {
    alert("Generando Reporte X (Parcial)... \nEl documento se ha enviado a la cola de impresión de la terminal #04.");
  };

  const handleZReport = () => {
    if(confirm("¿Está seguro de realizar el Cierre Z? \nEsta acción cerrará el turno fiscal actual y enviará el consolidado a SUNAT.")) {
      alert("Cierre Z completado exitosamente. Turno finalizado.");
    }
  };

  const handleExport = () => {
    alert("Exportando historial de movimientos en formato Excel (.xlsx)...");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Historial y Control</h1>
          <p className="text-slate-500 font-medium mt-2">Seguimiento detallado de flujos de caja en el turno</p>
        </div>
        <div className="flex gap-4 w-full sm:w-auto">
           <button 
            onClick={handleXReport}
            className="flex-1 sm:flex-none bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 px-6 py-3 rounded-xl font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm"
           >
              <span className="material-symbols-outlined">print</span>
              X de Caja
           </button>
           <button 
            onClick={handleZReport}
            className="flex-1 sm:flex-none bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10 active:scale-95 transition-all"
           >
              Cierre Z
           </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
         <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-slate-50/30 dark:bg-slate-800/30">
            <div className="flex flex-wrap gap-4 w-full lg:w-auto">
               <div className="bg-white dark:bg-slate-900 px-5 py-2.5 rounded-xl border border-slate-100 dark:border-slate-700 flex items-center gap-3 shadow-sm">
                  <span className="material-symbols-outlined text-slate-400 text-sm">calendar_today</span>
                  <span className="text-[11px] font-black uppercase text-slate-900 dark:text-white">Hoy, 24 Oct</span>
               </div>
               <div className="relative flex-1 lg:flex-none lg:w-80 group">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-800 transition-colors">search</span>
                  <input 
                    value={searchQuery}
                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                    className="w-full bg-white dark:bg-slate-900 border-none rounded-xl pl-11 pr-4 py-3 text-sm font-bold shadow-sm outline-none focus:ring-2 focus:ring-blue-800 dark:text-white transition-all" 
                    placeholder="Buscar paciente o concepto..." 
                  />
               </div>
            </div>
            <button 
              onClick={handleExport}
              className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest hover:underline flex items-center justify-center gap-2"
            >
               <span className="material-symbols-outlined text-lg">download</span>
               Descargar Reporte Completo
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[1000px]">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-10 py-6">FECHA / HORA</th>
                     <th className="px-10 py-6">TIPO</th>
                     <th className="px-10 py-6">CONCEPTO / PACIENTE</th>
                     <th className="px-10 py-6 text-center">MÉTODO</th>
                     <th className="px-10 py-6 text-center">MONTO</th>
                     <th className="px-10 py-6 text-right">ESTADO</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {currentData.length > 0 ? currentData.map((m, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-all group">
                       <td className="px-10 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white">{m.date}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{m.time}</p>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${m.type === 'Ingreso' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                             {m.type}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{m.category}</p>
                          <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-widest">Atiende a: {m.patient}</p>
                       </td>
                       <td className="px-10 py-8 text-center">
                          <div className="flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-tight">
                             <span className="material-symbols-outlined text-sm">{m.method.includes('Tarjeta') ? 'credit_card' : m.method === 'Yape' ? 'qr_code_2' : 'payments'}</span>
                             {m.method}
                          </div>
                       </td>
                       <td className="px-10 py-8 text-center">
                          <p className={`text-lg font-black ${m.type === 'Ingreso' ? 'text-slate-900 dark:text-white' : 'text-red-600'}`}>
                             {m.type === 'Egreso' ? '-' : ''} S/ {m.amount.toFixed(2)}
                          </p>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${m.sColor}`}>
                             {m.status}
                          </span>
                       </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan={6} className="px-10 py-24 text-center">
                         <span className="material-symbols-outlined text-slate-200 text-6xl">search_off</span>
                         <p className="text-slate-400 font-black uppercase text-xs tracking-widest mt-4">No se encontraron movimientos que coincidan</p>
                      </td>
                    </tr>
                  )}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-10 bg-slate-50/20 dark:bg-slate-800/10">
            <div className="flex flex-wrap justify-center lg:justify-start gap-10">
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Entradas</p>
                  <p className="text-xl font-black text-green-600 tracking-tighter">S/ 4,850.00</p>
               </div>
               <div className="space-y-1">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Total Salidas</p>
                  <p className="text-xl font-black text-red-600 tracking-tighter">S/ 45.00</p>
               </div>
               <div className="space-y-1 border-l border-slate-200 dark:border-slate-700 pl-10">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Neto Actual</p>
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">S/ 4,805.00</p>
               </div>
            </div>
            <div className="flex items-center gap-4">
               <p className="text-[10px] font-bold text-slate-400 uppercase mr-2">Página {currentPage} de {totalPages || 1}</p>
               <button 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2.5 border-2 border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all disabled:opacity-20"
               >
                 <span className="material-symbols-outlined">chevron_left</span>
               </button>
               <button 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2.5 border-2 border-slate-100 dark:border-slate-700 rounded-xl text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-all disabled:opacity-20"
               >
                 <span className="material-symbols-outlined">chevron_right</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default HistoryControl;
