
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageAppointments: React.FC = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApp, setSelectedApp] = useState<any>(null);

  const appointments = [
    { id: '1', patient: 'Juan Pérez Rodríguez', dni: '45889922', specialty: 'Cardiología', doctor: 'Dr. Ricardo Silva', date: '24 Oct, 2023', time: '10:30 AM', status: 'Confirmada', sColor: 'bg-green-600 text-white border-green-700' },
    { id: '2', patient: 'María Fernanda López', dni: '74839201', specialty: 'Pediatría', doctor: 'Dra. Ana Torres', date: '24 Oct, 2023', time: '11:15 AM', status: 'Pendiente', sColor: 'bg-amber-500 text-white border-amber-600' },
    { id: '3', patient: 'Carlos Ruiz García', dni: '10293847', specialty: 'Ginecología', doctor: 'Dr. Carlos Mendoza', date: '25 Oct, 2023', time: '09:00 AM', status: 'Confirmada', sColor: 'bg-green-600 text-white border-green-700' },
    { id: '4', patient: 'Ana Lucía García', dni: '48572019', specialty: 'Medicina General', doctor: 'Dra. Elena Ramos', date: '25 Oct, 2023', time: '16:30 PM', status: 'Cancelada', sColor: 'bg-red-600 text-white border-red-700' },
    { id: '5', patient: 'Miguel Torres Solis', dni: '09182736', specialty: 'Cardiología', doctor: 'Dr. Ricardo Silva', date: '26 Oct, 2023', time: '08:45 AM', status: 'Confirmada', sColor: 'bg-green-600 text-white border-green-700' },
  ];

  const filteredAppointments = useMemo(() => {
    return appointments.filter(app => {
      const matchesSearch = app.patient.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           app.dni.includes(searchQuery) ||
                           app.doctor.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = activeFilter === 'Todas' || app.status === activeFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, activeFilter]);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none italic">Gestión de Citas</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm">Control centralizado de la agenda médica y validación de pacientes.</p>
        </div>
        <button 
          onClick={() => navigate('/reception/citas/nueva')}
          className="bg-[#1e3a8a] hover:bg-blue-900 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3"
        >
          <span className="material-symbols-outlined font-black">calendar_add_on</span>
          Nueva Cita
        </button>
      </div>

      <div className="flex flex-col xl:flex-row items-center justify-between gap-8">
        <div className="flex gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[1.5rem] shadow-sm w-full xl:w-auto overflow-x-auto hide-scrollbar">
          {['Todas', 'Pendientes', 'Confirmadas', 'Canceladas'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeFilter === filter ? 'bg-slate-900 text-white shadow-xl dark:bg-blue-800' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="flex gap-4 flex-1 max-w-3xl justify-end w-full">
          <div className="relative group w-full">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-blue-800 font-bold">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-[1.2rem] pl-14 pr-12 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all shadow-sm" 
              placeholder="DNI, Paciente o Médico..." 
            />
          </div>
          <button onClick={() => alert("Mostrando calendario de filtrado...")} className="bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-3 hover:bg-slate-50 transition-all shrink-0">
            <span className="material-symbols-outlined text-blue-600 font-black">calendar_today</span>
            Fecha
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-900/60 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                <th className="px-10 py-6">Paciente</th>
                <th className="px-10 py-6 text-center">DNI</th>
                <th className="px-10 py-6">Especialidad</th>
                <th className="px-10 py-6">Médico</th>
                <th className="px-10 py-6">Fecha / Hora</th>
                <th className="px-10 py-6 text-center">Estado</th>
                <th className="px-10 py-6 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredAppointments.length > 0 ? filteredAppointments.map((app) => (
                <tr key={app.id} className="hover:bg-blue-50/20 dark:hover:bg-blue-900/10 transition-all group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center font-black text-blue-800 dark:text-blue-400 text-xs shadow-sm uppercase">
                        {app.patient.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{app.patient}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Asegurado</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 px-3 py-1.5 rounded-lg border border-transparent dark:border-slate-700">
                      {app.dni}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <span className="text-[11px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest bg-blue-50 dark:bg-blue-900/40 px-3 py-1.5 rounded-lg border border-blue-100 dark:border-blue-800/50">
                      {app.specialty}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-black text-slate-900 dark:text-white leading-none uppercase">{app.doctor}</p>
                    <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1.5">Especialista Principal</p>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2 text-slate-900 dark:text-white font-black text-xs uppercase">
                        <span className="material-symbols-outlined text-blue-600 text-sm font-black">calendar_today</span>
                        {app.date}
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                        <span className="material-symbols-outlined text-amber-500 text-sm font-black">schedule</span>
                        {app.time}
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border-2 flex items-center gap-2 w-fit ${app.sColor}`}>
                        <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
                        {app.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => setSelectedApp(app)} 
                        className="w-10 h-10 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all flex items-center justify-center shadow-lg active:scale-90 border-2 border-white/20"
                        title="Ver Detalles"
                      >
                        <span className="material-symbols-outlined text-xl font-bold">visibility</span>
                      </button>
                      <button 
                        onClick={() => alert(`Editando cita de ${app.patient}`)} 
                        className="w-10 h-10 rounded-xl bg-amber-500 text-white hover:bg-amber-600 transition-all flex items-center justify-center shadow-lg active:scale-90 border-2 border-white/20"
                        title="Editar Cita"
                      >
                        <span className="material-symbols-outlined text-xl font-bold">edit</span>
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={7} className="px-10 py-24 text-center">
                    <p className="text-slate-400 font-black uppercase text-xs tracking-widest italic">No se encontraron resultados</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Cita Funcional */}
      {selectedApp && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <div className="bg-[#1e3a8a] p-8 text-white flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl text-white font-black">event_available</span>
                    <h4 className="font-black text-xl uppercase tracking-tight italic">Información de Cita</h4>
                 </div>
                 <button onClick={() => setSelectedApp(null)} className="hover:bg-white/10 p-2 rounded-xl transition-all">
                    <span className="material-symbols-outlined font-black">close</span>
                 </button>
              </div>
              <div className="p-10 space-y-10">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center font-black text-blue-800 text-lg shadow-inner uppercase">
                       {selectedApp.patient.charAt(0)}
                    </div>
                    <div>
                       <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase leading-none tracking-tight">{selectedApp.patient}</h3>
                       <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-widest">DNI: {selectedApp.dni}</p>
                    </div>
                 </div>
                 <div className="grid grid-cols-2 gap-8 border-y border-slate-50 dark:border-slate-800 py-8 text-center">
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Especialidad</p>
                       <p className="text-sm font-black text-blue-800 dark:text-blue-400 uppercase">{selectedApp.specialty}</p>
                    </div>
                    <div className="space-y-1">
                       <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hora de Atención</p>
                       <p className="text-sm font-black text-slate-900 dark:text-white uppercase">{selectedApp.time}</p>
                    </div>
                 </div>
                 <button onClick={() => setSelectedApp(null)} className="w-full bg-[#1e3a8a] text-white py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Cerrar Detalle</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ManageAppointments;
