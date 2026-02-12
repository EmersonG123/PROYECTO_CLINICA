
import React, { useState, useMemo } from 'react';

const ExamsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewGraph, setViewGraph] = useState<any>(null);

  const exams = useMemo(() => [
    { id: 1, date: '24 Oct 2023', time: '08:30 AM', name: 'Hemograma Completo', category: 'Sangre Total', lab: 'Laboratorio Central', certified: true, icon: 'bloodtype', iconColor: 'text-red-500', iconBg: 'bg-red-50' },
    { id: 2, date: '20 Oct 2023', time: '09:15 AM', name: 'Glucosa en Suero', category: 'Química Sanguínea', lab: 'Laboratorio Central', certified: true, icon: 'opacity', iconColor: 'text-blue-500', iconBg: 'bg-blue-50' },
    { id: 3, date: '15 Sep 2023', time: '14:00 PM', name: 'Ecografía Abdominal', category: 'Imágenes Diagnósticas', lab: 'Imágenes Ayacucho', certified: true, icon: 'pregnant_woman', iconColor: 'text-purple-500', iconBg: 'bg-purple-50' },
    { id: 4, date: '10 Ago 2023', time: '10:30 AM', name: 'Perfil Lipídico', category: 'Química Sanguínea', lab: 'Laboratorio Central', certified: true, icon: 'biotech', iconColor: 'text-orange-500', iconBg: 'bg-orange-50' },
    { id: 5, date: '05 Jun 2023', time: '11:00 AM', name: 'Rayos X Tórax PA', category: 'Radiología', lab: 'Imágenes Ayacucho', certified: true, icon: 'radiology', iconColor: 'text-slate-600', iconBg: 'bg-slate-100' },
  ], []);

  const filteredExams = useMemo(() => {
    if (!searchTerm) return exams;
    return exams.filter(e => e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.category.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, exams]);

  const handleDownload = (exam: any) => {
    const element = document.createElement("a");
    const file = new Blob([`Resultado de Examen: ${exam.name}\nFecha: ${exam.date}\nLaboratorio: ${exam.lab}\nCertificado: SI`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `Resultado_${exam.name.replace(/\s+/g, '_')}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Exámenes y Resultados</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Consulte sus resultados de laboratorio e informes de imágenes médicas.</p>
        </div>
        <div className="flex gap-4">
          <div className="relative group">
            <input 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-12 py-3 text-sm font-bold text-slate-900 dark:text-white w-[300px] focus:ring-blue-500 border-2 transition-colors" 
              placeholder="Buscar examen..."
            />
            <span className="material-symbols-outlined absolute left-4 top-3 text-slate-400 group-focus-within:text-blue-500 transition-colors">search</span>
          </div>
          <button className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
            <span className="material-symbols-outlined text-lg">tune</span>
            Filtrar
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
              <th className="px-8 py-5">Fecha</th>
              <th className="px-8 py-5">Examen</th>
              <th className="px-8 py-5">Laboratorio</th>
              <th className="px-8 py-5">Certificación</th>
              <th className="px-8 py-5 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
            {filteredExams.length > 0 ? filteredExams.map((exam) => (
              <tr key={exam.id} className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-slate-900 dark:text-white">{exam.date}</p>
                  <p className="text-[10px] font-bold text-slate-400">{exam.time}</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${exam.iconBg} dark:bg-blue-900/20 ${exam.iconColor} rounded-2xl flex items-center justify-center shrink-0 transition-colors`}>
                      <span className="material-symbols-outlined text-2xl">{exam.icon}</span>
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm leading-tight">{exam.name}</h5>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{exam.category}</p>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400">{exam.lab}</td>
                <td className="px-8 py-6">
                  {exam.certified && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[9px] font-black rounded-full border border-green-100 dark:border-green-800 w-fit">
                      <span className="material-symbols-outlined text-sm">verified</span>
                      Firmado Digitalmente
                    </span>
                  )}
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => setViewGraph(exam)}
                      className="bg-blue-50 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-100 dark:hover:bg-blue-900 transition-all flex items-center gap-2"
                    >
                       <span className="material-symbols-outlined text-base">show_chart</span>
                       Ver Gráfico
                    </button>
                    <button 
                      onClick={() => handleDownload(exam)}
                      className="bg-blue-700 text-white p-2 rounded-xl hover:bg-blue-800 transition-all shadow-md flex items-center justify-center"
                    >
                       <span className="material-symbols-outlined text-xl">download</span>
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-8 py-20 text-center">
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">No se encontraron exámenes para "{searchTerm}"</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        <div className="p-8 flex justify-between items-center border-t border-slate-50 dark:border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mostrando {filteredExams.length} de {exams.length} resultados</p>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-700 transition-all">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="w-10 h-10 rounded-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center text-slate-400 hover:text-blue-700 transition-all">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>

      {/* Graph Modal Placeholder */}
      {viewGraph && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] p-10 shadow-2xl overflow-hidden animate-in zoom-in-95">
              <div className="flex justify-between items-start mb-10">
                <div>
                   <h4 className="font-black text-2xl text-slate-900 dark:text-white">{viewGraph.name}</h4>
                   <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Evolución Histórica</p>
                </div>
                <button onClick={() => setViewGraph(null)} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-400 hover:text-red-500 transition-all">
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>
              
              <div className="h-64 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border-2 border-dashed border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-10 text-center">
                 <span className="material-symbols-outlined text-6xl text-slate-200 dark:text-slate-700 mb-4">analytics</span>
                 <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Gráfico Evolutivo Mockup</p>
                 <p className="text-slate-400 text-[10px] mt-2 max-w-xs">Aquí se mostraría la curva de valores del paciente a lo largo del tiempo.</p>
              </div>

              <div className="mt-10 flex justify-end">
                <button onClick={() => setViewGraph(null)} className="bg-blue-700 text-white px-8 py-3 rounded-xl font-black shadow-lg">Cerrar Visualización</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ExamsPage;
