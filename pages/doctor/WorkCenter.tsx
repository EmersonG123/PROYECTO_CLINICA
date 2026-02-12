
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkCenter: React.FC = () => {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date(2023, 9, 24)); // Octubre 24, 2023

  const initialQueue = [
    { id: '1', time: '09:30 AM', patient: 'Maria Gonzalez', dni: '12.345.678', type: 'Consulta', status: 'En Espera', sColor: 'text-orange-600 bg-orange-50 border-orange-100', active: false },
    { id: '2', time: '10:00 AM', patient: 'Juan Perez', dni: '87.654.321', type: 'Procedimiento', status: 'En Consulta', sColor: 'text-green-600 bg-green-50 border-green-100', active: true },
    { id: '3', time: '10:30 AM', patient: 'Ana Lopez', dni: '11.223.344', type: 'Consulta', status: 'Finalizado', sColor: 'text-slate-400 bg-slate-50 border-slate-100', active: false },
    { id: '4', time: '11:30 AM', patient: 'Sofia Mendez', dni: '99.887.766', type: 'Consulta', status: 'En Espera', sColor: 'text-orange-600 bg-orange-50 border-orange-100', active: false },
  ];

  const [queue, setQueue] = useState(initialQueue);

  // Determinar paciente activo para el banner
  const activePatient = queue.find(p => p.status === 'En Consulta') || queue[0];

  const stats = [
    { title: 'Total Pacientes', value: queue.length.toString(), icon: 'groups', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'En Espera', value: queue.filter(p => p.status === 'En Espera').length.toString(), icon: 'hourglass_empty', color: 'text-orange-500', bg: 'bg-orange-50' },
    { title: 'Finalizados', value: queue.filter(p => p.status === 'Finalizado').length.toString(), icon: 'check_circle', color: 'text-green-500', bg: 'bg-green-50' }
  ];

  const handlePrevDate = () => {
    const prev = new Date(currentDate);
    prev.setDate(currentDate.getDate() - 1);
    setCurrentDate(prev);
  };

  const handleNextDate = () => {
    const next = new Date(currentDate);
    next.setDate(currentDate.getDate() + 1);
    setCurrentDate(next);
  };

  const handleStartConsultation = (id: string) => {
    setQueue(prev => prev.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          status: 'En Consulta', 
          sColor: 'text-green-600 bg-green-50 border-green-100',
          active: true 
        };
      }
      // Si otro estaba en consulta, pasarlo a finalizado (simulación de flujo)
      if (p.status === 'En Consulta') {
        return { 
          ...p, 
          status: 'Finalizado', 
          sColor: 'text-slate-400 bg-slate-50 border-slate-100',
          active: false 
        };
      }
      return p;
    }));
  };

  const handleViewHistory = (patientName: string) => {
    // En una app real pasaríamos el ID del paciente, aquí simulamos navegación
    navigate('/doctor/historias');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const formatShortDate = (date: Date) => {
    return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
           <div className="flex items-center gap-3">
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Centro de Trabajo</h1>
              <span className="hidden sm:inline-flex px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-[10px] font-black uppercase rounded-full border border-blue-100 dark:border-blue-800 flex items-center gap-1.5">
                 <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                 En vivo
              </span>
           </div>
           <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-sm capitalize">{formatDate(currentDate)}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-4 w-full sm:w-auto">
           <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-4 py-2 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm flex-1 sm:flex-none justify-between sm:justify-start">
              <button onClick={handlePrevDate} className="material-symbols-outlined text-slate-400 text-sm hover:text-blue-800 transition-colors">chevron_left</button>
              <span className="text-sm font-bold text-slate-900 dark:text-white min-w-[60px] text-center uppercase">{formatShortDate(currentDate)}</span>
              <button onClick={handleNextDate} className="material-symbols-outlined text-slate-400 text-sm hover:text-blue-800 transition-colors">chevron_right</button>
           </div>
           <div className="flex items-center gap-2 text-green-600 bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-xl border border-green-100 dark:border-green-800 shadow-sm flex-1 sm:flex-none justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-[10px] font-black uppercase tracking-widest">Sistema Online</span>
           </div>
        </div>
      </div>

      {/* Banner Paciente Actual - Actualizado Dinámicamente */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border-l-[8px] md:border-l-[12px] border-blue-800 shadow-xl overflow-hidden p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start lg:items-center justify-between gap-8 animate-in slide-in-from-top-4 duration-500" key={activePatient.id}>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 w-full text-center md:text-left">
           <div className="relative shrink-0">
              <img src={`https://i.pravatar.cc/150?u=${activePatient.id}`} className="w-20 h-20 md:w-24 md:h-24 rounded-[1.8rem] md:rounded-[2rem] object-cover ring-4 ring-slate-50 dark:ring-slate-800 shadow-lg" alt={activePatient.patient} />
              <span className={`absolute -bottom-1 -right-1 w-6 h-6 md:w-7 md:h-7 border-4 border-white dark:border-slate-900 rounded-full ${activePatient.status === 'En Consulta' ? 'bg-green-500' : 'bg-orange-500'}`}></span>
           </div>
           <div className="w-full min-w-0">
              <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-3 mb-3">
                 <span className={`${activePatient.status === 'En Consulta' ? 'bg-blue-50 text-blue-800' : 'bg-slate-50 text-slate-400'} dark:bg-blue-900/40 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800`}>
                   {activePatient.status === 'En Consulta' ? 'Atención Actual' : 'Siguiente en Lista'}
                 </span>
                 <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5 uppercase">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    {activePatient.status === 'En Consulta' ? 'En curso: 15m' : `Cita: ${activePatient.time}`}
                 </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-tight truncate uppercase">{activePatient.patient}</h2>
              <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-tight">DNI: {activePatient.dni} • {activePatient.type}</p>
           </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 w-full md:w-auto">
           <div className="flex gap-4 sm:gap-6 border-b sm:border-b-0 border-slate-100 dark:border-slate-800 pb-4 sm:pb-0 w-full sm:w-auto justify-center">
              <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-800 transition-colors">
                 <span className="material-symbols-outlined text-2xl">prescriptions</span>
                 <span className="text-[8px] font-black uppercase tracking-widest">Recetas</span>
              </button>
              <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-800 transition-colors">
                 <span className="material-symbols-outlined text-2xl">assignment_turned_in</span>
                 <span className="text-[8px] font-black uppercase tracking-widest">Órdenes</span>
              </button>
           </div>
           <button 
             onClick={() => navigate('/doctor/agenda')}
             className="w-full sm:w-auto bg-blue-800 hover:bg-blue-900 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest shadow-2xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
           >
              <span className="material-symbols-outlined text-xl">medical_services</span>
              {activePatient.status === 'En Consulta' ? 'Continuar HCE' : 'Abrir Ficha'}
           </button>
        </div>
      </div>

      {/* Grid de Métricas */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 rounded-[1.8rem] md:rounded-[2.5rem] p-6 md:p-8 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between group hover:shadow-lg transition-all">
            <div>
              <p className="text-[9px] md:text-[11px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest leading-none">{stat.title}</p>
              <h4 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mt-2 tracking-tighter leading-none">{stat.value}</h4>
            </div>
            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[1.5rem] ${stat.bg} dark:bg-slate-800 ${stat.color} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform`}>
              <span className="material-symbols-outlined text-2xl md:text-3xl font-bold">{stat.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Listado de Pacientes */}
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
               <span className="material-symbols-outlined text-slate-900 dark:text-white">list_alt</span>
               <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Cola de Atención</h3>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
               <div className="relative group w-full">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 text-sm">search</span>
                  <input className="w-full lg:w-64 bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 transition-all shadow-sm" placeholder="Buscar paciente..." />
               </div>
            </div>
         </div>
         
         <div className="overflow-x-auto w-full">
            <table className="w-full text-left min-w-[700px]">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-6 md:px-8 py-5">Hora</th>
                     <th className="px-6 md:px-8 py-5">Paciente</th>
                     <th className="px-6 md:px-8 py-5">DNI</th>
                     <th className="px-6 md:px-8 py-5">Tipo</th>
                     <th className="px-10 py-5">Estado</th>
                     <th className="px-6 md:px-8 py-5 text-right">Acciones</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {queue.map((row) => (
                    <tr key={row.id} className={`group hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-all ${row.status === 'En Consulta' ? 'bg-blue-50/40 dark:bg-blue-900/20' : ''}`}>
                       <td className="px-6 md:px-8 py-6 font-black text-sm text-slate-900 dark:text-white whitespace-nowrap">{row.time}</td>
                       <td className="px-6 md:px-8 py-6">
                          <div className="flex items-center gap-4">
                             <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-blue-800 dark:text-blue-400 text-[10px] uppercase shadow-sm shrink-0">
                                {row.patient.split(' ').map(n => n[0]).join('').substring(0,2)}
                             </div>
                             <p className="text-sm font-black text-slate-900 dark:text-white whitespace-nowrap uppercase tracking-tight">{row.patient}</p>
                          </div>
                       </td>
                       <td className="px-6 md:px-8 py-6 text-sm font-bold text-slate-400 dark:text-slate-500 whitespace-nowrap">{row.dni}</td>
                       <td className="px-6 md:px-8 py-6">
                          <span className="px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 text-[9px] font-black uppercase tracking-widest rounded-lg border border-blue-100 dark:border-blue-800 whitespace-nowrap">{row.type}</span>
                       </td>
                       <td className="px-10 py-6">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit whitespace-nowrap ${row.sColor}`}>
                             <span className={`w-1.5 h-1.5 rounded-full ${row.status === 'En Espera' ? 'bg-orange-500' : row.status === 'Finalizado' ? 'bg-slate-300' : 'bg-green-500 animate-pulse'}`}></span>
                             {row.status}
                          </span>
                       </td>
                       <td className="px-6 md:px-8 py-6">
                          <div className="flex justify-end gap-3">
                             <button className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-800 transition-colors shadow-sm"><span className="material-symbols-outlined text-lg">prescriptions</span></button>
                             <button onClick={() => handleViewHistory(row.patient)} className="p-2 bg-slate-50 dark:bg-slate-800 rounded-lg text-slate-400 hover:text-blue-800 transition-colors shadow-sm"><span className="material-symbols-outlined text-lg">assignment</span></button>
                             {row.status === 'En Espera' ? (
                               <button 
                                 onClick={() => handleStartConsultation(row.id)}
                                 className="bg-blue-800 text-white px-4 md:px-5 py-2.5 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest flex items-center gap-2 active:scale-95 transition-all shadow-lg shadow-blue-900/10 whitespace-nowrap"
                               >
                                  <span className="material-symbols-outlined text-sm">play_arrow</span>
                                  Iniciar
                               </button>
                             ) : (
                               <button 
                                 onClick={() => handleViewHistory(row.patient)}
                                 className="text-blue-800 dark:text-blue-400 font-black text-[10px] uppercase tracking-widest hover:underline whitespace-nowrap px-2"
                               >
                                 Historia
                               </button>
                             )}
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default WorkCenter;
