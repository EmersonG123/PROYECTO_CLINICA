
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorAgenda: React.FC = () => {
  const navigate = useNavigate();
  // Se cambia la fecha inicial a la fecha actual del sistema
  const [viewDate, setViewDate] = useState(new Date()); 
  const today = new Date();

  // Estado local de citas para hacerlas funcionales
  const [appointments, setAppointments] = useState([
    { id: 1, time: '09:00 AM', patient: 'Juan Perez', desc: 'Primera Consulta • Cardiología', status: 'CONFIRMADO', sColor: 'bg-blue-100 text-blue-700 border-blue-200' },
    { id: 2, time: '09:30 AM', patient: 'Maria Gonzalez', desc: 'Control • Resultados Lab', status: 'COMPLETADO', sColor: 'bg-green-100 text-green-700 border-green-200' },
    { id: 3, time: '10:00 AM', patient: 'Carlos Ruiz', desc: 'Consulta Urgente • Dolor Pecho', status: 'EN ESPERA', sColor: 'bg-orange-100 text-orange-700 border-orange-200', active: true },
    { id: 4, time: '10:45 AM', patient: 'Sofia Mendez', desc: 'Chequeo Anual', status: 'PENDIENTE', sColor: 'bg-slate-100 text-slate-500 border-slate-200' },
    { id: 5, time: '11:15 AM', patient: 'Jorge Lopez', desc: 'Seguimiento Post-operatorio', status: 'PENDIENTE', sColor: 'bg-slate-100 text-slate-500 border-slate-200' },
  ]);

  // Cálculos para el calendario dinámico
  const calendarData = useMemo(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    let startDay = firstDayOfMonth.getDay();
    startDay = startDay === 0 ? 6 : startDay - 1;
    const daysInMonth = lastDayOfMonth.getDate();
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const calendarDays = [];
    for (let i = startDay; i > 0; i--) {
      calendarDays.push({ day: prevMonthLastDay - i + 1, currentMonth: false });
    }
    for (let i = 1; i <= daysInMonth; i++) {
      calendarDays.push({ day: i, currentMonth: true });
    }
    const remaining = 42 - calendarDays.length;
    for (let i = 1; i <= remaining; i++) {
      calendarDays.push({ day: i, currentMonth: false });
    }
    return calendarDays;
  }, [viewDate]);

  const handlePrevMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  const handleToday = () => setViewDate(new Date());

  const isToday = (day: number, currentMonth: boolean) => {
    return currentMonth && 
           day === today.getDate() && 
           viewDate.getMonth() === today.getMonth() && 
           viewDate.getFullYear() === today.getFullYear();
  };

  const handleCallPatient = (id: number) => {
    setAppointments(prev => prev.map(app => {
      if (app.id === id) {
        return { ...app, status: 'EN CONSULTA', sColor: 'bg-green-100 text-green-700 border-green-200', active: false };
      }
      return app;
    }));
    alert("Llamando al paciente...");
  };

  const handleViewFile = () => {
    navigate('/doctor/historias');
  };

  const formattedMonth = viewDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Agenda Médica</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1 text-sm">Gestión de turnos y disponibilidad.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
           <div className="flex items-center gap-3 md:gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-4 md:px-6 py-2.5 rounded-2xl shadow-sm justify-between">
              <button onClick={handlePrevMonth} className="material-symbols-outlined text-slate-400 hover:text-blue-800 transition-colors">chevron_left</button>
              <span className="text-sm font-black text-slate-900 dark:text-white whitespace-nowrap capitalize">{formattedMonth}</span>
              <button onClick={handleNextMonth} className="material-symbols-outlined text-slate-400 hover:text-blue-800 transition-colors">chevron_right</button>
           </div>
           <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={handleToday} className="flex-1 sm:flex-none bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border border-blue-100 dark:border-blue-800 shadow-sm active:scale-95 transition-all">Hoy</button>
              <button className="flex-1 sm:flex-none bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center justify-center gap-2 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800">
                 <span className="material-symbols-outlined text-lg">block</span>
                 Bloquear Horario
              </button>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Calendario */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2rem] md:rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
           <div className="grid grid-cols-7 border-b border-slate-50 dark:border-slate-800">
              {['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'].map(d => (
                <div key={d} className="py-4 md:py-6 text-center text-[9px] md:text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest border-r border-slate-50 dark:border-slate-800 last:border-0">{d}</div>
              ))}
           </div>
           <div className="grid grid-cols-7 overflow-hidden">
              {calendarData.map((item, i) => {
                const current = isToday(item.day, item.currentMonth);
                return (
                  <div key={i} className={`h-24 md:h-40 border-r border-b border-slate-50 dark:border-slate-800 p-2 md:p-4 transition-all relative group cursor-pointer hover:bg-blue-50/20 dark:hover:bg-blue-900/10 ${!item.currentMonth ? 'opacity-30' : ''} ${current ? 'bg-blue-50/40 dark:bg-blue-900/20 ring-4 ring-blue-800/10 z-10' : ''}`}>
                     <div className="flex justify-between items-start">
                        <span className={`text-[10px] md:text-sm font-black ${current ? 'text-blue-800 dark:text-blue-400' : 'text-slate-400'}`}>{item.day}</span>
                        {current && <span className="bg-blue-800 text-white px-1.5 md:px-2 py-0.5 text-[7px] md:text-[8px] font-black rounded uppercase">HOY</span>}
                     </div>
                     <div className="mt-auto space-y-1.5">
                        <div className="hidden md:flex text-[10px] font-bold text-slate-500 flex-wrap justify-between">
                           {item.currentMonth && <span>{Math.floor(Math.random() * 10)} Turnos</span>}
                        </div>
                        {item.currentMonth && (
                          <div className="h-1 md:h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                             <div className={`h-full ${current ? 'bg-blue-800' : 'bg-slate-300'} rounded-full transition-all duration-1000`} style={{ width: current ? '70%' : '30%' }}></div>
                          </div>
                        )}
                        {item.currentMonth && (
                          <div className="md:hidden flex justify-center gap-0.5 mt-1">
                             <div className="w-1 h-1 rounded-full bg-blue-800"></div>
                             <div className="w-1 h-1 rounded-full bg-blue-800 opacity-50"></div>
                          </div>
                        )}
                     </div>
                  </div>
                );
              })}
           </div>
        </div>

        {/* Detalle del Día */}
        <div className="lg:col-span-4 space-y-6">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col">
              <div className="p-6 md:p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/10">
                 <h3 className="text-lg md:text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Citas para hoy</h3>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    {today.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
                 </span>
              </div>

              <div className="p-6 md:p-8 grid grid-cols-2 gap-4">
                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">TOTAL TURNOS</p>
                    <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-none mt-1">{appointments.length}</p>
                 </div>
                 <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
                    <p className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest">POR ATENDER</p>
                    <p className="text-xl md:text-2xl font-black text-blue-800 dark:text-blue-400 leading-none mt-1">{appointments.filter(a => a.status === 'PENDIENTE' || a.status === 'EN ESPERA').length}</p>
                 </div>
              </div>

              <div className="px-6 md:px-8 pb-8 space-y-4 max-h-[550px] overflow-y-auto hide-scrollbar">
                 {appointments.map((app, i) => (
                   <div key={app.id} className={`p-5 md:p-6 rounded-[1.8rem] md:rounded-[2rem] border-2 flex flex-col gap-4 relative overflow-hidden transition-all shadow-sm ${app.active || app.status === 'EN CONSULTA' ? 'border-blue-800 ring-2 ring-blue-800/5 bg-blue-50/10 dark:bg-blue-900/10' : 'border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-900'}`}>
                      <div className="flex justify-between items-start">
                         <span className="text-sm md:text-base font-black text-slate-900 dark:text-white tracking-tight">{app.time}</span>
                         <span className={`px-2.5 py-1 text-[7px] md:text-[8px] font-black uppercase tracking-widest rounded-lg border whitespace-nowrap ${app.sColor}`}>{app.status}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <img src={`https://i.pravatar.cc/100?u=${app.patient}`} className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover shadow-sm shrink-0" alt={app.patient} />
                         <div className="min-w-0">
                            <p className="text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-tight">{app.patient}</p>
                            <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 mt-1 uppercase truncate leading-none">{app.desc}</p>
                         </div>
                      </div>
                      <div className="flex gap-2">
                         {app.status === 'EN ESPERA' || app.active ? (
                           <button onClick={() => handleCallPatient(app.id)} className="flex-1 bg-blue-800 text-white py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest shadow-lg shadow-blue-900/10 flex items-center justify-center gap-2 active:scale-95">
                              <span className="material-symbols-outlined text-sm">play_arrow</span>
                              Llamar
                           </button>
                         ) : (
                           <button onClick={handleViewFile} className="flex-1 border-2 border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400 py-3 rounded-xl font-black text-[9px] md:text-[10px] uppercase tracking-widest hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Ver Ficha</button>
                         )}
                         <button className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 dark:bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center hover:text-slate-900 dark:hover:text-white shadow-sm shrink-0"><span className="material-symbols-outlined text-lg">more_vert</span></button>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="p-8 bg-blue-50/30 dark:bg-blue-900/10 border-t border-slate-50 dark:border-slate-800 text-center">
                 <p className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-[0.2em]">Los turnos se asignan automáticamente</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAgenda;
