
import React, { useState, useMemo } from 'react';

const ClinicalHistoryArchive: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'recientes' | 'mis'>('recientes');
  const [selectedPatientId, setSelectedPatientId] = useState('87.654.321');
  const [showNewConsultModal, setShowNewConsultModal] = useState(false);
  const [activeTimelineFilter, setActiveTimelineFilter] = useState('Todo');
  const [selectedSubTab, setSelectedSubTab] = useState('Cronología');

  // Base de datos de pacientes simulada
  const [patients] = useState([
    { id: '87.654.321', name: 'Juan Perez Rodriguez', age: 45, sex: 'M', blood: 'O+', time: '10:00 AM', status: 'Activo' },
    { id: '12.345.678', name: 'Maria Gonzalez Paz', age: 28, sex: 'F', blood: 'A-', time: 'Ayer', status: 'Activo' },
    { id: '99.887.766', name: 'Sofia Mendez Soto', age: 34, sex: 'F', blood: 'B+', time: '22 Oct', status: 'Inactivo' },
    { id: '44.556.677', name: 'Carlos Ruiz Garcia', age: 52, sex: 'M', blood: 'O-', time: '20 Oct', status: 'Activo' },
  ]);

  const currentPatient = useMemo(() => 
    patients.find(p => p.id === selectedPatientId) || patients[0]
  , [selectedPatientId, patients]);

  const filteredPatients = useMemo(() => {
    return patients.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      p.id.includes(searchTerm)
    );
  }, [searchTerm, patients]);

  // Historial dinámico
  const [timelineItems, setTimelineItems] = useState([
    { 
      id: 1,
      type: 'Consulta Cardiología', 
      date: '24 Oct 2023, 10:00 AM', 
      doctor: 'Dr. Alejandro Vargas', 
      isToday: true,
      evolution: 'Paciente refiere mejora tras ajuste de dosis. Presión arterial controlada en 120/80.',
      treatment: ['Losartán 50mg', 'Control en 30 días'],
      diagnosis: 'I10 - Hipertensión esencial',
      category: 'Consultas'
    },
    { 
      id: 2,
      type: 'Resultados Laboratorio', 
      date: '23 Oct 2023, 08:30 AM', 
      isLab: true,
      category: 'Labs',
      labResults: [
        { name: 'Colesterol Total', val: '190 mg/dL', trend: 'stable' },
        { name: 'Glucosa Basal', val: '95 mg/dL', trend: 'stable' }
      ]
    },
    {
      id: 3,
      type: 'Imagenología',
      date: '15 Oct 2023',
      category: 'Imágenes',
      evolution: 'Radiografía de tórax PA sin hallazgos patológicos agudos.',
      doctor: 'Dr. Roberto Gomez'
    }
  ]);

  const [form, setForm] = useState({
    evolution: '',
    diagnosis: '',
    treatment: ''
  });

  const handleSaveConsultation = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      type: 'Consulta General',
      date: new Date().toLocaleString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
      doctor: 'Dr. Alejandro Vargas',
      isToday: true,
      evolution: form.evolution,
      treatment: form.treatment.split('\n').filter(t => t.trim() !== ''),
      diagnosis: form.diagnosis,
      category: 'Consultas'
    };
    setTimelineItems([newItem, ...timelineItems]);
    setShowNewConsultModal(false);
    setForm({ evolution: '', diagnosis: '', treatment: '' });
    setSelectedSubTab('Cronología');
    alert("Consulta registrada en la Historia Clínica del paciente.");
  };

  const filteredTimeline = timelineItems.filter(item => 
    activeTimelineFilter === 'Todo' || item.category === activeTimelineFilter
  );

  const renderTabContent = () => {
    switch (selectedSubTab) {
      case 'Resumen':
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm space-y-6">
                <h4 className="font-black text-slate-900 dark:text-white uppercase text-xs tracking-widest border-b border-slate-50 pb-4">Últimos Signos Vitales</h4>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Presión Arterial</p>
                    <p className="text-xl font-black text-blue-800 dark:text-blue-400">120/80 mmHg</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Frecuencia</p>
                    <p className="text-xl font-black text-blue-800 dark:text-blue-400">72 LPM</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">Temperatura</p>
                    <p className="text-xl font-black text-blue-800 dark:text-blue-400">36.5 °C</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase">IMC</p>
                    <p className="text-xl font-black text-blue-800 dark:text-blue-400">24.2</p>
                  </div>
                </div>
              </div>
              <div className="bg-red-50/30 dark:bg-red-900/10 p-8 rounded-[2rem] border border-red-100 dark:border-red-900/30 space-y-6">
                <h4 className="font-black text-red-800 dark:text-red-400 uppercase text-xs tracking-widest border-b border-red-100 pb-4 flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">warning</span> Alergias Críticas
                </h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">Penicilina</span>
                  <span className="px-4 py-2 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest">AINEs</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Recetas':
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
             <div className="flex justify-between items-center mb-4">
                <h4 className="font-black text-slate-900 dark:text-white uppercase text-sm tracking-widest">Tratamiento Actual</h4>
                <button className="bg-blue-800 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-900 transition-all flex items-center gap-2">
                   <span className="material-symbols-outlined text-sm">add_circle</span> Nueva Receta
                </button>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { name: 'Losartán 50mg', dose: '1 tableta c/12h', duration: 'Permanente', icon: 'medication' },
                  { name: 'Metformina 850mg', dose: '1 tableta c/almuerzo', duration: '3 meses', icon: 'pill' }
                ].map((med, i) => (
                  <div key={i} className="p-6 bg-white dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 flex items-center justify-between group hover:border-blue-800 transition-all">
                     <div className="flex items-center gap-5">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-2xl flex items-center justify-center">
                           <span className="material-symbols-outlined text-2xl">{med.icon}</span>
                        </div>
                        <div>
                           <p className="font-black text-slate-900 dark:text-white text-sm uppercase">{med.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{med.dose}</p>
                        </div>
                     </div>
                     <button className="material-symbols-outlined text-slate-300 hover:text-red-500" onClick={() => confirm("¿Desea suspender este medicamento?")}>block</button>
                  </div>
                ))}
             </div>
          </div>
        );
      case 'Laboratorio':
        return (
          <div className="space-y-8 animate-in fade-in duration-300">
             <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                   <thead>
                      <tr className="bg-slate-50 dark:bg-slate-800 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-700">
                         <th className="px-8 py-5">Examen</th>
                         <th className="px-8 py-5 text-center">Resultado</th>
                         <th className="px-8 py-5 text-right">Acción</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                      {[
                        { name: 'Hemoglobina', val: '14.2 g/dL', status: 'Normal' },
                        { name: 'Glucosa', val: '115 mg/dL', status: 'Elevado', color: 'text-red-600' }
                      ].map((lab, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-all">
                           <td className="px-8 py-6 text-sm font-black text-slate-900 dark:text-white uppercase">{lab.name}</td>
                           <td className={`px-8 py-6 text-sm font-black text-center ${lab.color || 'text-slate-900'}`}>{lab.val}</td>
                           <td className="px-8 py-6 text-right">
                              <button className="text-blue-800 font-black text-[10px] uppercase tracking-widest hover:underline">Ver PDF</button>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        );
      default:
        return (
          <div className="relative space-y-10 animate-in fade-in duration-300">
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-800"></div>
            {filteredTimeline.map((item) => (
              <div key={item.id} className="relative pl-12">
                <div className={`absolute left-0 top-1.5 w-6 h-6 rounded-full border-4 border-white dark:border-slate-900 ${item.isLab ? 'bg-purple-600' : 'bg-blue-800'} shadow-sm z-10`}></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
                    <h5 className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">
                      {item.type} 
                      {item.isToday && <span className="ml-2 px-2 py-0.5 bg-blue-50 text-blue-800 text-[8px] uppercase font-black rounded border border-blue-100">HOY</span>}
                    </h5>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">{item.date}</span>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 p-8 shadow-sm space-y-6 group hover:border-blue-200 transition-all">
                    {item.isLab ? (
                      <div className="flex items-center gap-8">
                        <div className="w-14 h-14 rounded-2xl bg-purple-50 dark:bg-purple-900/30 text-purple-800 dark:text-purple-400 flex items-center justify-center shrink-0 shadow-sm"><span className="material-symbols-outlined text-3xl">science</span></div>
                        <div className="flex-1">
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Análisis Realizados</p>
                            <div className="mt-4 flex gap-4">
                              {item.labResults?.map((res, i) => (
                                <div key={i} className="px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
                                    <p className="text-[9px] font-black uppercase mb-1 text-slate-400">{res.name}</p>
                                    <p className="text-lg font-black text-slate-900 dark:text-white">{res.val}</p>
                                </div>
                              ))}
                            </div>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 flex items-center justify-center shrink-0"><span className="material-symbols-outlined text-lg">stethoscope</span></div>
                            <div className="min-w-0">
                              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{item.doctor}</p>
                              <p className="text-[9px] font-black text-blue-800 uppercase tracking-widest mt-0.5">{item.diagnosis || 'Consulta Rutinaria'}</p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic border-l-2 border-slate-100 pl-4">"{item.evolution}"</p>
                        {item.treatment && (
                          <div className="flex flex-wrap gap-3">
                              {item.treatment.map((t, i) => (
                                <span key={i} className="px-4 py-2 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-[10px] font-black uppercase rounded-xl border border-slate-100 flex items-center gap-2">
                                  <span className="material-symbols-outlined text-sm">check_circle</span> {t}
                                </span>
                              ))}
                          </div>
                        )}
                      </>
                    )}
                </div>
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col lg:h-[calc(100vh-140px)] animate-in fade-in duration-500 overflow-hidden">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8 shrink-0">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Historia Clínica Digital</h1>
          <p className="text-slate-500 font-medium mt-2">Acceso completo al expediente electrónico del paciente.</p>
        </div>
        <div className="flex items-center gap-4">
           <button 
            onClick={() => window.print()}
            className="p-3 bg-white dark:bg-slate-800 border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-800 transition-all"
           >
              <span className="material-symbols-outlined">print</span>
           </button>
           <button 
             onClick={() => setShowNewConsultModal(true)}
             className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all flex items-center gap-3"
           >
              <span className="material-symbols-outlined">add</span>
              Registrar Evolución
           </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-8 overflow-hidden min-h-0">
        {/* Sidebar de Pacientes */}
        <div className="lg:w-80 flex flex-col bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm shrink-0 overflow-hidden">
          <div className="p-6 space-y-6">
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
              <input 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-11 pr-4 py-3 text-sm font-bold outline-none focus:ring-2 focus:ring-blue-800 dark:text-white" 
                placeholder="Nombre o DNI..." 
              />
            </div>
            <div className="flex gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
               <button onClick={() => setActiveTab('recientes')} className={`flex-1 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'recientes' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`}>Recientes</button>
               <button onClick={() => setActiveTab('mis')} className={`flex-1 py-2.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'mis' ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-400'}`}>Mis Pacientes</button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 pb-6 space-y-2 custom-scrollbar">
             {filteredPatients.map((p) => (
               <div 
                key={p.id} 
                onClick={() => setSelectedPatientId(p.id)}
                className={`p-5 rounded-[1.8rem] flex items-center gap-4 cursor-pointer transition-all border ${selectedPatientId === p.id ? 'bg-blue-50/50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800 ring-2 ring-blue-800/5' : 'bg-white dark:bg-slate-900 hover:bg-slate-50 border-transparent'}`}
               >
                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-blue-800 text-[10px] shrink-0">
                     {p.name.split(' ').map(n => n[0]).join('').substring(0,2)}
                  </div>
                  <div className="flex-1 min-w-0">
                     <p className="text-xs font-black text-slate-900 dark:text-white truncate uppercase">{p.name}</p>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">DNI: {p.id}</p>
                  </div>
               </div>
             ))}
          </div>
          
          {/* Botones de navegación "deslizantes" */}
          <div className="p-6 border-t border-slate-50 dark:border-slate-800 flex justify-between items-center bg-slate-50/30">
             <button className="p-2 border-2 border-slate-100 rounded-xl text-slate-300 hover:text-blue-800 transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Página 1</span>
             <button className="p-2 border-2 border-slate-100 rounded-xl text-slate-300 hover:text-blue-800 transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>

        {/* Contenido del Expediente */}
        <div className="flex-1 bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm flex flex-col overflow-hidden">
           <div className="p-10 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row items-center gap-10 bg-slate-50/30">
              <img src={`https://i.pravatar.cc/150?u=${selectedPatientId}`} className="w-24 h-24 rounded-[2.5rem] object-cover shadow-xl border-4 border-white dark:border-slate-800" alt="Patient" />
              <div className="flex-1 text-center lg:text-left">
                 <div className="flex flex-col lg:flex-row items-center gap-4 mb-3">
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">{currentPatient.name}</h2>
                    <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black uppercase rounded-lg border border-green-100">Activo</span>
                 </div>
                 <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span><span className="material-symbols-outlined text-sm align-middle mr-1">person</span> {currentPatient.age} Años</span>
                    <span><span className="material-symbols-outlined text-sm align-middle mr-1">badge</span> {currentPatient.id}</span>
                    <span><span className="material-symbols-outlined text-sm align-middle mr-1">bloodtype</span> {currentPatient.blood}</span>
                 </div>
              </div>
           </div>

           <div className="px-10 border-b border-slate-50 dark:border-slate-800 flex gap-10 overflow-x-auto hide-scrollbar shrink-0">
              {['Cronología', 'Resumen', 'Recetas', 'Laboratorio'].map((t) => (
                <button 
                  key={t} 
                  onClick={() => setSelectedSubTab(t)}
                  className={`py-6 text-[11px] font-black uppercase tracking-[0.2em] relative transition-all whitespace-nowrap ${selectedSubTab === t ? 'text-blue-800 dark:text-blue-400' : 'text-slate-400 hover:text-slate-600'}`}
                >
                   {t}
                   {selectedSubTab === t && <span className="absolute bottom-0 left-0 right-0 h-1 bg-blue-800 rounded-t-full shadow-[0_-4px_10px_rgba(30,64,175,0.2)]"></span>}
                </button>
              ))}
           </div>

           <div className="flex-1 overflow-y-auto p-10 bg-slate-50/20 dark:bg-slate-950/20 custom-scrollbar">
              <div className="flex items-center justify-between mb-10">
                 <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{selectedSubTab}</h3>
                 {selectedSubTab === 'Cronología' && (
                    <div className="flex gap-2 p-1 bg-white dark:bg-slate-800 border border-slate-100 rounded-xl">
                       {['Todo', 'Consultas', 'Labs', 'Imágenes'].map(f => (
                         <button 
                          key={f} 
                          onClick={() => setActiveTimelineFilter(f)}
                          className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTimelineFilter === f ? 'bg-blue-800 text-white shadow-lg' : 'text-slate-400'}`}
                         >
                           {f}
                         </button>
                       ))}
                    </div>
                 )}
              </div>

              {renderTabContent()}
           </div>
        </div>
      </div>

      {/* Modal Nueva Consulta */}
      {showNewConsultModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <div className="bg-blue-800 p-8 text-white flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl font-black">add_notes</span>
                    <h4 className="text-xl font-black uppercase tracking-tight">Nueva Evolución Médica</h4>
                 </div>
                 <button onClick={() => setShowNewConsultModal(false)} className="hover:bg-white/10 p-2 rounded-xl transition-all"><span className="material-symbols-outlined">close</span></button>
              </div>
              <form onSubmit={handleSaveConsultation} className="p-10 space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Evolución Médica</label>
                    <textarea 
                       required value={form.evolution} onChange={(e) => setForm({...form, evolution: e.target.value})}
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl p-6 font-medium text-sm text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 min-h-[120px]" 
                       placeholder="Describa el estado actual..."
                    />
                 </div>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Diagnóstico (CIE-10)</label>
                       <input 
                         required value={form.diagnosis} onChange={(e) => setForm({...form, diagnosis: e.target.value})}
                         className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-6 py-4 font-bold text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-800" 
                         placeholder="Ej: I10"
                       />
                    </div>
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Plan Terapéutico</label>
                       <input 
                         required value={form.treatment} onChange={(e) => setForm({...form, treatment: e.target.value})}
                         className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-6 py-4 font-bold text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-800" 
                         placeholder="Indicaciones..."
                       />
                    </div>
                 </div>
                 <div className="flex justify-end gap-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                    <button type="button" onClick={() => setShowNewConsultModal(false)} className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Cancelar</button>
                    <button type="submit" className="bg-blue-800 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Guardar en HC</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalHistoryArchive;
