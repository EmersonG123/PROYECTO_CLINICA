
import React, { useState } from 'react';

const NurseReports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('daily');
  const [isExporting, setIsExporting] = useState(false);

  // Tipos de reporte disponibles
  const reportTypes = [
    { id: 'daily', title: 'Producción Diaria', icon: 'monitoring', desc: 'Pacientes triados por turno' },
    { id: 'wait', title: 'Tiempos de Espera', icon: 'timer', desc: 'Análisis de demora en atención' },
    { id: 'census', title: 'Censo de Urgencias', icon: 'groups', desc: 'Ocupación de boxes y salas' },
    { id: 'incidents', title: 'Incidencias', icon: 'report_problem', desc: 'Eventos adversos reportados' },
  ];

  const handleExport = (format: string) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Reporte exportado exitosamente en formato ${format.toUpperCase()}`);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Reportes Operativos</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium mt-2">Análisis estadístico y métricas de desempeño del área de enfermería.</p>
        </div>
        <div className="flex gap-4">
           {/* Date Picker Mock */}
           <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-6 py-3 flex items-center gap-4 shadow-sm">
              <span className="material-symbols-outlined text-slate-400">calendar_month</span>
              <div className="flex gap-2 text-sm font-bold text-slate-700 dark:text-slate-300">
                 <span>24 Oct 2023</span>
                 <span className="text-slate-300">-</span>
                 <span>Hoy</span>
              </div>
           </div>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {reportTypes.map((r) => (
            <div 
              key={r.id}
              onClick={() => setSelectedReport(r.id)}
              className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all flex flex-col gap-4 group relative overflow-hidden ${selectedReport === r.id ? 'border-blue-800 bg-blue-50/50 dark:bg-blue-900/20' : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-200'}`}
            >
               <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${selectedReport === r.id ? 'bg-blue-800 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:text-blue-800'}`}>
                  <span className="material-symbols-outlined text-3xl">{r.icon}</span>
               </div>
               <div>
                  <h4 className={`text-lg font-black uppercase tracking-tight ${selectedReport === r.id ? 'text-blue-800 dark:text-blue-400' : 'text-slate-900 dark:text-white'}`}>{r.title}</h4>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{r.desc}</p>
               </div>
               {selectedReport === r.id && (
                  <div className="absolute top-6 right-6 text-blue-800 dark:text-blue-400 animate-in zoom-in">
                     <span className="material-symbols-outlined">check_circle</span>
                  </div>
               )}
            </div>
         ))}
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
         
         {/* Chart / Stats Section */}
         <div className="xl:col-span-8 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10">
               <div className="flex items-center justify-between mb-10">
                  <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-widest">
                     {selectedReport === 'daily' && 'Pacientes Triados por Hora'}
                     {selectedReport === 'wait' && 'Tiempo de Espera Promedio'}
                     {selectedReport === 'census' && 'Ocupación Actual'}
                     {selectedReport === 'incidents' && 'Tipología de Incidentes'}
                  </h3>
                  <button className="text-[10px] font-black text-blue-800 uppercase tracking-widest hover:underline">Ver detalles</button>
               </div>
               
               {/* Visualización Gráfica Mockup */}
               <div className="h-64 w-full flex items-end gap-2 sm:gap-4 relative px-4">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-full h-px bg-slate-50 dark:bg-slate-800"></div>)}
                  </div>
                  
                  {/* Bars */}
                  {[35, 50, 75, 60, 90, 45, 65, 80, 55, 40, 70, 85].map((val, i) => (
                     <div key={i} className="flex-1 flex flex-col justify-end group relative">
                        <div 
                           className="w-full bg-blue-800 rounded-t-xl opacity-80 group-hover:opacity-100 transition-all relative"
                           style={{ height: `${val}%` }}
                        >
                           <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {val} Pacientes
                           </div>
                        </div>
                        <span className="text-[9px] font-black text-slate-300 text-center mt-2">{8 + i}:00</span>
                     </div>
                  ))}
               </div>
            </div>

            {/* Detailed Table */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800">
                  <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Registros Detallados</h3>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead>
                        <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                           <th className="px-8 py-4">Hora</th>
                           <th className="px-8 py-4">Paciente</th>
                           <th className="px-8 py-4">Prioridad</th>
                           <th className="px-8 py-4">Responsable</th>
                           <th className="px-8 py-4 text-right">Tiempo</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                        {[
                           { time: '08:15', name: 'Carlos Ruiz', prio: 'II - Emergencia', nurse: 'Lic. Maria Perez', duration: '12m' },
                           { time: '08:42', name: 'Ana Garcia', prio: 'III - Urgencia', nurse: 'Lic. Sofia Lopez', duration: '18m' },
                           { time: '09:10', name: 'Juan Perez', prio: 'IV - Estándar', nurse: 'Lic. Maria Perez', duration: '5m' },
                           { time: '09:35', name: 'Elena Torres', prio: 'II - Emergencia', nurse: 'Lic. Roberto Gomez', duration: '10m' },
                        ].map((row, i) => (
                           <tr key={i} className="hover:bg-blue-50/20 transition-colors">
                              <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400">{row.time}</td>
                              <td className="px-8 py-6 font-black text-slate-900 dark:text-white">{row.name}</td>
                              <td className="px-8 py-6">
                                 <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase border ${row.prio.includes('II') ? 'bg-orange-50 text-orange-600 border-orange-100' : row.prio.includes('III') ? 'bg-yellow-50 text-yellow-600 border-yellow-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                                    {row.prio}
                                 </span>
                              </td>
                              <td className="px-8 py-6 text-xs font-bold text-slate-500">{row.nurse}</td>
                              <td className="px-8 py-6 text-right font-black text-slate-900 dark:text-white">{row.duration}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Right Sidebar: Summary & Export */}
         <div className="xl:col-span-4 space-y-8">
            <div className="bg-blue-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
               <h3 className="text-xl font-black uppercase tracking-tight relative z-10">Resumen del Turno</h3>
               <div className="space-y-6 mt-8 relative z-10">
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                     <span className="text-xs font-medium text-blue-200 uppercase tracking-widest">Total Pacientes</span>
                     <span className="text-3xl font-black">42</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/10 pb-4">
                     <span className="text-xs font-medium text-blue-200 uppercase tracking-widest">Promedio Espera</span>
                     <span className="text-3xl font-black">14m</span>
                  </div>
                  <div className="flex justify-between items-center">
                     <span className="text-xs font-medium text-blue-200 uppercase tracking-widest">Código Rojo</span>
                     <span className="text-3xl font-black text-red-300">1</span>
                  </div>
               </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-8">
               <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Exportar Datos</h4>
               <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Descargue el reporte completo en el formato deseado para auditoría o análisis externo.
               </p>
               <div className="grid grid-cols-1 gap-4">
                  <button 
                     onClick={() => handleExport('pdf')}
                     disabled={isExporting}
                     className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-red-200 hover:bg-red-50 dark:hover:bg-red-900/20 group transition-all"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
                           <span className="material-symbols-outlined">picture_as_pdf</span>
                        </div>
                        <span className="font-black text-slate-700 dark:text-white text-xs uppercase tracking-widest group-hover:text-red-700">Formato PDF</span>
                     </div>
                     <span className="material-symbols-outlined text-slate-300 group-hover:text-red-500">download</span>
                  </button>
                  
                  <button 
                     onClick={() => handleExport('excel')}
                     disabled={isExporting}
                     className="flex items-center justify-between p-4 rounded-2xl border-2 border-slate-100 dark:border-slate-700 hover:border-green-200 hover:bg-green-50 dark:hover:bg-green-900/20 group transition-all"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
                           <span className="material-symbols-outlined">table_chart</span>
                        </div>
                        <span className="font-black text-slate-700 dark:text-white text-xs uppercase tracking-widest group-hover:text-green-700">Excel / CSV</span>
                     </div>
                     <span className="material-symbols-outlined text-slate-300 group-hover:text-green-500">download</span>
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NurseReports;
