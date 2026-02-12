
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorPatients: React.FC = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPatients = 1240; // Simulado según la imagen

  const patients = [
    { name: 'Juan Perez', id: '87.654.321', insurance: 'OSDE 310', iColor: 'text-blue-600 bg-blue-50 border-blue-100', lastVisit: '24 Oct 2023', img: 'https://i.pravatar.cc/100?u=juan' },
    { name: 'Maria Gonzalez', id: '12.345.678', insurance: 'Swiss Medical', iColor: 'text-red-600 bg-red-50 border-red-100', lastVisit: '10 Sep 2023', initial: 'MG' },
    { name: 'Carlos Ruiz', id: '44.556.677', insurance: 'PAMI', iColor: 'text-green-600 bg-green-50 border-green-100', lastVisit: '12 Oct 2023', img: 'https://i.pravatar.cc/100?u=carlos' },
    { name: 'Sofia Mendez', id: '99.887.766', insurance: 'Particular', iColor: 'text-slate-600 bg-slate-50 border-slate-100', lastVisit: '20 Oct 2023', initial: 'SM' },
    { name: 'Ana Lopez', id: '11.223.344', insurance: 'Galeno Oro', iColor: 'text-blue-800 bg-blue-100/50 border-blue-200', lastVisit: '05 Ago 2023', initial: 'AL' },
  ];

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," 
      + "Paciente,DNI,Seguro,Ultima Visita\n"
      + patients.map(p => `${p.name},${p.id},${p.insurance},${p.lastVisit}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "reporte_pacientes_clinica_ayacucho.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const nextPage = () => {
    if (currentPage * itemsPerPage < totalPatients) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="space-y-6 md:space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-10">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div className="w-full">
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Listado de Pacientes</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-sm md:text-base">Gestión integral de historias clínicas y afiliaciones.</p>
        </div>
        <div className="flex items-center justify-between w-full lg:w-auto gap-4">
           <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl border border-green-100 dark:border-green-800 shadow-sm shrink-0">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-widest">Base de Datos OK</span>
           </div>
           <button className="material-symbols-outlined p-2.5 text-slate-400 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl relative shadow-sm shrink-0">
              notifications
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
           </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
        <div className="flex-1 relative group">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-800 transition-colors">search</span>
          <input className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 shadow-sm transition-all text-sm md:text-base" placeholder="Buscar por Nombre o DNI..." />
        </div>
        <button 
          onClick={handleExport}
          className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-900 dark:text-white flex items-center justify-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
        >
          <span className="material-symbols-outlined text-lg">ios_share</span>
          <span className="hidden md:inline">Exportar Reporte</span>
          <span className="md:hidden">Exportar</span>
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[1.8rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto w-full">
           <table className="w-full text-left border-collapse min-w-[850px]">
             <thead>
               <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                 <th className="px-6 md:px-10 py-6">PACIENTE</th>
                 <th className="px-6 md:px-10 py-6">DNI / IDENTIFICACIÓN</th>
                 <th className="px-6 md:px-10 py-6 text-center">SEGURO PRINCIPAL</th>
                 <th className="px-6 md:px-10 py-6">ÚLTIMA VISITA</th>
                 <th className="px-6 md:px-10 py-6 text-right">ACCIONES</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
               {patients.map((p, i) => (
                 <tr key={i} className="hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-all group">
                   <td className="px-6 md:px-10 py-6 md:py-8">
                     <div className="flex items-center gap-4 md:gap-5">
                       {p.img ? (
                         <img src={p.img} className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] object-cover ring-2 ring-white dark:ring-slate-800 shadow-sm shrink-0" alt={p.name} />
                       ) : (
                         <div className="w-10 h-10 md:w-12 md:h-12 rounded-[1rem] bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 flex items-center justify-center font-black text-[10px] md:text-xs shrink-0 uppercase">
                           {p.initial}
                         </div>
                       )}
                       <div className="min-w-0">
                         <p className="text-sm font-black text-slate-900 dark:text-white leading-none truncate uppercase tracking-tight">{p.name}</p>
                         <p className="text-[9px] md:text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-1.5 whitespace-nowrap">45 años • Masc.</p>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 md:px-10 py-6 md:py-8">
                     <div className="flex items-center gap-3 text-sm font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">
                       <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-base">badge</span>
                       {p.id}
                     </div>
                   </td>
                   <td className="px-6 md:px-10 py-6 md:py-8 text-center">
                      <span className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border whitespace-nowrap ${p.iColor}`}>
                         {p.insurance}
                      </span>
                   </td>
                   <td className="px-6 md:px-10 py-6 md:py-8">
                     <p className="text-sm font-black text-slate-900 dark:text-white whitespace-nowrap">{p.lastVisit}</p>
                   </td>
                   <td className="px-6 md:px-10 py-6 md:py-8 text-right">
                      <div className="flex justify-end gap-2 md:gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                         <button 
                          onClick={() => navigate('/doctor/historias')}
                          className="p-2 md:p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-800 dark:hover:text-blue-400 transition-all shadow-sm"
                         >
                            <span className="material-symbols-outlined text-xl">visibility</span>
                         </button>
                         <button 
                          onClick={() => navigate('/doctor/agenda')}
                          className="p-2 md:p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-800 dark:hover:text-blue-400 transition-all shadow-sm"
                         >
                            <span className="material-symbols-outlined text-xl">calendar_add_on</span>
                         </button>
                      </div>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
        </div>
        
        <div className="p-6 md:p-10 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 bg-slate-50/30 dark:bg-slate-800/10">
           <p className="text-xs md:text-sm font-bold text-slate-400 dark:text-slate-500 italic tracking-tight">
             Mostrando {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, totalPatients)} de {totalPatients.toLocaleString()} pacientes registrados
           </p>
           <div className="flex gap-4">
              <button 
                onClick={prevPage}
                disabled={currentPage === 1}
                className="p-2.5 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:bg-white dark:hover:bg-slate-700 transition-all shadow-sm disabled:opacity-30 active:scale-95"
              >
                 <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button 
                onClick={nextPage}
                disabled={currentPage * itemsPerPage >= totalPatients}
                className="p-2.5 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm active:scale-95"
              >
                 <span className="material-symbols-outlined">chevron_right</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorPatients;
