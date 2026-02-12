
import React, { useState, useMemo } from 'react';

const MedicalHistory: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState('2023');
  const [selectedSpec, setSelectedSpec] = useState('Todas las especialidades');
  const [viewDetail, setViewDetail] = useState<any>(null);

  const historyItems = useMemo(() => [
    { id: 1, date: '24 Oct, 2023', year: '2023', type: 'Consulta Cardiología', spec: 'Cardiología', doc: 'Dr. Carlos Mendoza', color: 'blue', icon: 'cardiology', summary: 'Paciente presenta mejora en presión arterial. Se recomienda continuar con medicación actual.' },
    { id: 2, date: '21 Oct, 2023', year: '2023', type: 'Laboratorio', spec: 'Laboratorio', doc: 'Laboratorio Central', isResult: true, color: 'orange', icon: 'lab_research', summary: 'Resultados dentro de los rangos normales. Hemoglobina estable.' },
    { id: 3, date: '15 Sep, 2023', year: '2023', type: 'Medicina General', spec: 'Medicina General', doc: 'Dra. Ana López', color: 'green', icon: 'stethoscope', summary: 'Chequeo preventivo anual. Se solicita hemograma completo.' },
  ], []);

  const filteredItems = useMemo(() => {
    return historyItems.filter(item => {
      const matchYear = item.year === selectedYear;
      const matchSpec = selectedSpec === 'Todas las especialidades' || item.spec === selectedSpec;
      return matchYear && matchSpec;
    });
  }, [selectedYear, selectedSpec, historyItems]);

  return (
    <div className="space-y-6 md:space-y-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Historia Clínica</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Tu registro cronológico detallado.</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button onClick={() => window.print()} className="flex-1 md:flex-none bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">print</span> Imprimir
          </button>
          <button className="flex-1 md:flex-none bg-blue-700 text-white px-4 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">ios_share</span> Exportar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm p-6 md:p-10">
          <div className="relative space-y-10">
            <div className="absolute left-3.5 top-2 bottom-2 w-0.5 bg-slate-100 dark:bg-slate-800"></div>
            {filteredItems.map((item) => (
              <div key={item.id} className="relative pl-10 md:pl-12">
                <div className={`absolute left-0 top-1.5 w-7 h-7 rounded-full border-4 border-white dark:border-slate-900 shadow-sm ${
                  item.color === 'blue' ? 'bg-blue-600' : item.color === 'orange' ? 'bg-orange-600' : 'bg-green-600'
                }`}></div>
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 mb-2">{item.date}</p>
                <div className="bg-slate-50 dark:bg-slate-800/40 rounded-2xl md:rounded-3xl border border-slate-100 dark:border-slate-700 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 shadow-sm">
                      <span className="material-symbols-outlined text-2xl">{item.icon}</span>
                    </div>
                    <div>
                      <h5 className="font-black text-slate-900 dark:text-white text-sm md:text-base leading-tight">{item.type}</h5>
                      <p className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mt-0.5">{item.doc}</p>
                    </div>
                  </div>
                  <button onClick={() => setViewDetail(item)} className="w-full md:w-auto bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-xl text-[10px] font-black hover:bg-blue-50">
                    Ver Resumen
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-6 md:p-8">
            <h4 className="font-black text-slate-900 dark:text-white text-sm mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-blue-600">filter_list</span> Filtrar Historial
            </h4>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Año</label>
                <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white">
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Especialidad</label>
                <select value={selectedSpec} onChange={(e) => setSelectedSpec(e.target.value)} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-900 dark:text-white">
                  <option value="Todas las especialidades">Todas</option>
                  <option value="Cardiología">Cardiología</option>
                  <option value="Laboratorio">Laboratorio</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {viewDetail && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
             <div className="bg-blue-700 p-6 md:p-8 text-white flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined text-3xl">{viewDetail.icon}</span>
                  <div>
                    <h4 className="font-black text-lg">{viewDetail.type}</h4>
                    <p className="text-[10px] font-bold uppercase opacity-80">{viewDetail.date}</p>
                  </div>
                </div>
                <button onClick={() => setViewDetail(null)} className="p-2 rounded-xl hover:bg-white/10">
                  <span className="material-symbols-outlined">close</span>
                </button>
             </div>
             <div className="p-6 md:p-10 space-y-6">
                <p className="text-sm text-slate-600 dark:text-slate-300 italic leading-relaxed bg-slate-50 dark:bg-slate-800 p-4 rounded-2xl">
                  "{viewDetail.summary}"
                </p>
                <button onClick={() => setViewDetail(null)} className="w-full bg-blue-700 text-white py-4 rounded-xl font-black">Cerrar</button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicalHistory;
