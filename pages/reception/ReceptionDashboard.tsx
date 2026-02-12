
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ReceptionDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = [
    { title: 'En Espera', value: '12', icon: 'person_search', color: 'bg-blue-600', trend: '+2 desde las 8am' },
    { title: 'Atendidos Hoy', value: '45', icon: 'check_circle', color: 'bg-green-500', trend: '85% del objetivo' },
    { title: 'Citas Hoy', value: '64', icon: 'calendar_month', color: 'bg-purple-600', trend: '12 pendientes' },
    { title: 'Triaje', value: '4', icon: 'vital_signs', color: 'bg-orange-500', trend: 'Urgencia: 1' }
  ];

  const queueData = [
    { id: 1, name: 'Juan Pérez', insurance: 'RIMAC', dni: '12345678', time: '10:00', doc: 'Dr. Silva', status: 'En Triaje', color: 'bg-amber-600 text-white border-amber-700', detail: 'Paciente con dolor abdominal agudo.' },
    { id: 2, name: 'Maria Rodriguez', insurance: 'Particular', dni: '87654321', time: '10:15', doc: 'Dra. Lopez', status: 'Esperando', color: 'bg-slate-600 text-white border-slate-700', detail: 'Control post-operatorio.' },
    { id: 3, name: 'Carlos Gomez', insurance: 'Pacífico', dni: '11223344', time: '10:30', doc: 'Dr. Silva', status: 'Con Doctor', color: 'bg-green-600 text-white border-green-700', detail: 'Evaluación cardiológica.' },
    { id: 4, name: 'Ana Diaz', insurance: 'SIS', dni: '44332211', time: '10:45', doc: 'Dra. Lopez', status: 'Esperando', color: 'bg-slate-600 text-white border-slate-700', detail: 'Chequeo rutinario.' },
  ];

  const filteredQueue = useMemo(() => {
    return queueData.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.dni.includes(searchQuery)
    );
  }, [searchQuery]);

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase italic">Panel de Recepción</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-sm uppercase tracking-widest leading-none">Control de flujo en tiempo real</p>
        </div>
        <button 
          onClick={() => navigate('/reception/pacientes/nuevo')}
          className="bg-[#1e3a8a] hover:bg-blue-900 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3 uppercase tracking-widest text-[11px]"
        >
          <span className="material-symbols-outlined font-black">person_add</span>
          Nuevo Registro
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative overflow-hidden group">
             <div className={`absolute top-0 right-0 w-24 h-24 ${stat.color} opacity-[0.05] rounded-bl-full`}></div>
             <div className={`w-12 h-12 rounded-2xl ${stat.color} text-white flex items-center justify-center shadow-lg mb-6 group-hover:scale-110 transition-transform`}>
                <span className="material-symbols-outlined text-2xl font-bold">{stat.icon}</span>
             </div>
             <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{stat.title}</p>
             <h4 className="text-4xl font-black text-slate-900 dark:text-white mt-1 tracking-tighter">{stat.value}</h4>
             <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-4 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                {stat.trend}
             </p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-900/60 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
        <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/40">
           <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="font-black text-slate-900 dark:text-white text-xs uppercase tracking-widest">Cola de Atención Activa</span>
           </div>
           <div className="relative group">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">search</span>
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white dark:bg-slate-800 border-none rounded-xl pl-9 pr-4 py-2.5 text-xs font-bold text-slate-900 dark:text-white outline-none w-48 focus:w-64 transition-all shadow-inner" 
                placeholder="Filtrar por DNI o Nombre..." 
              />
           </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/20 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5">Paciente</th>
                <th className="px-8 py-5 text-center">Hora</th>
                <th className="px-8 py-5">Doctor / Especialidad</th>
                <th className="px-8 py-5 text-center">Estado</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredQueue.map((item) => (
                <tr key={item.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-blue-800 dark:text-blue-400 text-xs shadow-sm">
                         {item.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{item.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5">DNI: {item.dni}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                     <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{item.time}</p>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Mañana</p>
                  </td>
                  <td className="px-8 py-6">
                     <p className="text-sm font-black text-[#1e3a8a] dark:text-blue-400 uppercase leading-none">{item.doc}</p>
                     <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5">Cardiología</p>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <div className="flex justify-center">
                       <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border-2 shadow-sm ${item.color}`}>
                         {item.status}
                       </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                     <div className="flex items-center justify-end gap-3">
                        <button 
                          onClick={() => setSelectedPatient(item)}
                          className="px-4 py-2 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all border border-transparent hover:border-blue-200"
                        >
                           Ver Detalles
                        </button>
                        <button 
                          onClick={() => alert(`Acciones para ${item.name}:\n- Reasignar Doctor\n- Cancelar Turno\n- Priorizar`)}
                          className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 hover:text-blue-800 transition-all flex items-center justify-center border border-slate-100 dark:border-slate-700 active:scale-90"
                        >
                           <span className="material-symbols-outlined text-lg">more_vert</span>
                        </button>
                     </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Ver Detalles Funcional */}
      {selectedPatient && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <div className="bg-[#1e3a8a] p-8 text-white flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl font-black">clinical_notes</span>
                    <h4 className="font-black text-xl uppercase tracking-tight italic">Ficha de Cola</h4>
                 </div>
                 <button onClick={() => setSelectedPatient(null)} className="hover:bg-white/10 p-2 rounded-xl transition-all">
                    <span className="material-symbols-outlined font-black">close</span>
                 </button>
              </div>
              <div className="p-10 space-y-8">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center font-black text-blue-800 text-xl shadow-inner uppercase">
                       {selectedPatient.name.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase leading-none tracking-tight">{selectedPatient.name}</h3>
                       <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">DNI: {selectedPatient.dni}</p>
                    </div>
                 </div>
                 <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Motivo / Notas</p>
                    <p className="text-xs font-bold text-slate-600 dark:text-slate-300 italic leading-relaxed">"{selectedPatient.detail}"</p>
                 </div>
                 <button onClick={() => setSelectedPatient(null)} className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all uppercase italic">Entendido</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ReceptionDashboard;
