
import React, { useState, useMemo } from 'react';

const ResultArchive: React.FC = () => {
  const [searchDni, setSearchDni] = useState('');
  const [searchName, setSearchName] = useState('');
  const [searchType, setSearchType] = useState('Todos');

  const archives = [
    { date: '24 Oct, 2023', order: '#LAB-8842', patient: 'Juan Diaz', dni: '34123456', exam: 'Hemograma Completo', resp: 'Lic. Ana María Suarez', status: 'Entregado', sColor: 'bg-green-50 text-green-600 border-green-100' },
    { date: '24 Oct, 2023', order: '#LAB-8841', patient: 'Maria Rodriguez', dni: '28987654', exam: 'Perfil Lipídico', resp: 'Lic. Ana María Suarez', status: 'Archivado', sColor: 'bg-slate-50 text-slate-500 border-slate-100' },
    { date: '23 Oct, 2023', order: '#LAB-8839', patient: 'Carlos Perez', dni: '12345678', exam: 'Glucosa en Ayunas', resp: 'Lic. Roberto Gomez', status: 'Entregado', sColor: 'bg-green-50 text-green-600 border-green-100' },
    { date: '23 Oct, 2023', order: '#LAB-8835', patient: 'Sofia Lopez', dni: '40112233', exam: 'Uroanálisis Completo', resp: 'Lic. Ana María Suarez', status: 'Entregado', sColor: 'bg-green-50 text-green-600 border-green-100' },
    { date: '22 Oct, 2023', order: '#LAB-8820', patient: 'Elena Torres', dni: '32555777', exam: 'Panel Tiroideo', resp: 'Lic. Roberto Gomez', status: 'Archivado', sColor: 'bg-slate-50 text-slate-500 border-slate-100' }
  ];

  const filteredArchives = useMemo(() => {
    return archives.filter(a => {
      const matchDni = a.dni.includes(searchDni);
      const matchName = a.patient.toLowerCase().includes(searchName.toLowerCase());
      const matchType = searchType === 'Todos' || a.exam.toLowerCase().includes(searchType.toLowerCase());
      return matchDni && matchName && matchType;
    });
  }, [searchDni, searchName, searchType]);

  const handleClear = () => {
    setSearchDni('');
    setSearchName('');
    setSearchType('Todos');
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Archivo de Resultados</h1>
          <p className="text-slate-500 font-medium mt-1">Historial de exámenes y reportes entregados.</p>
        </div>
        <button className="bg-white dark:bg-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-slate-50 transition-all">
          <span className="material-symbols-outlined">download</span>
          Exportar CSV
        </button>
      </div>

      {/* Filtros Funcionales */}
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2.5">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DNI del Paciente</label>
               <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">badge</span>
                  <input 
                    value={searchDni} onChange={(e) => setSearchDni(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="Buscar DNI..." 
                  />
               </div>
            </div>
            <div className="space-y-2.5">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre</label>
               <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">person</span>
                  <input 
                    value={searchName} onChange={(e) => setSearchName(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="Nombre del paciente..." 
                  />
               </div>
            </div>
            <div className="space-y-2.5">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Rango de Fechas</label>
               <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">calendar_today</span>
                  <input type="date" className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" />
               </div>
            </div>
            <div className="space-y-2.5">
               <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Tipo de Examen</label>
               <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">science</span>
                  <select 
                    value={searchType} onChange={(e) => setSearchType(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-10 py-4 font-bold text-slate-900 dark:text-white appearance-none outline-none focus:ring-2 focus:ring-blue-800"
                  >
                     <option>Todos</option>
                     <option>Hemograma</option>
                     <option>Perfil Lipídico</option>
                     <option>Glucosa</option>
                     <option>Uroanálisis</option>
                  </select>
               </div>
            </div>
         </div>

         <div className="flex justify-end gap-5">
            <button onClick={handleClear} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors">Limpiar Filtros</button>
            <button className="bg-blue-800 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10 flex items-center gap-3">
               <span className="material-symbols-outlined">search</span>
               Buscar Resultados
            </button>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-10 py-6">Fecha</th>
                     <th className="px-10 py-6">Orden #</th>
                     <th className="px-10 py-6">Paciente</th>
                     <th className="px-10 py-6">Examen</th>
                     <th className="px-10 py-6">Bioquímico Responsable</th>
                     <th className="px-10 py-6 text-right">Estado</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredArchives.map((a, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-all group">
                       <td className="px-10 py-7 text-sm font-black text-slate-900 dark:text-white">{a.date}</td>
                       <td className="px-10 py-7 text-[11px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest">{a.order}</td>
                       <td className="px-10 py-7">
                          <div className="flex items-center gap-4">
                             <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center font-black text-xs">
                                {a.patient.charAt(0)}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{a.patient}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">DNI: {a.dni}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-7 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">{a.exam}</td>
                       <td className="px-10 py-7 text-sm font-bold text-slate-500 dark:text-slate-400 uppercase">{a.resp}</td>
                       <td className="px-10 py-7 text-right">
                          <span className={`px-4 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${a.sColor}`}>
                             {a.status}
                          </span>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-10 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/20">
            <p className="text-sm font-bold text-slate-400 italic">Mostrando {filteredArchives.length} resultados filtrados</p>
            <div className="flex gap-4">
               <button className="px-6 py-3 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-blue-800 transition-all">Anterior</button>
               <button className="px-6 py-3 border border-slate-100 dark:border-slate-700 rounded-xl text-[10px] font-black uppercase text-slate-900 dark:text-white bg-white dark:bg-slate-800 shadow-sm hover:bg-slate-50">Siguiente</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ResultArchive;
