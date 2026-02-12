
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AppointmentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Mock "Current Time" for reprogramming logic: Oct 23, 2023
  const MOCK_NOW = new Date('2023-10-23T10:30:00').getTime();

  const appointments = [
    { id: 1, doc: 'Dr. Carlos Mendoza', spec: 'Medicina Interna', status: 'Confirmada', dateStr: '24 Oct 2023, 10:30 AM', dateObj: new Date('2023-10-24T10:30:00'), loc: 'Consultorio 304, Piso 3', icon: 'person', color: 'blue' },
    { id: 2, doc: 'Dra. Maria Rodriguez', spec: 'Cardiología', status: 'Pendiente', dateStr: '05 Nov 2023, 09:00 AM', dateObj: new Date('2023-11-05T09:00:00'), loc: 'Consultorio 201, Piso 2', icon: 'psychiatry', color: 'purple' },
  ];

  const handleReprogram = (app: any) => {
    const appTime = app.dateObj.getTime();
    const diffHours = (appTime - MOCK_NOW) / (1000 * 60 * 60);

    if (diffHours < 24) {
      alert("Lo sentimos, solo se puede reprogramar con al menos 24 horas de anticipación. Por favor, comuníquese con soporte.");
    } else {
      alert(`Iniciando flujo de reprogramación para la cita con ${app.doc}.`);
      navigate('/dashboard/agendar');
    }
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Gestión de Citas</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Administre sus consultas médicas y revise su historial.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/agendar')}
          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-900/10 active:scale-95 transition-all"
        >
          <span className="material-symbols-outlined text-xl">add_circle</span>
          Agendar Nueva Cita
        </button>
      </div>

      <div className="border-b border-slate-100 dark:border-slate-800 flex gap-8">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`pb-4 text-sm font-black transition-all ${activeTab === 'upcoming' ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Próximas Citas
        </button>
        <button 
          onClick={() => setActiveTab('history')}
          className={`pb-4 text-sm font-black transition-all ${activeTab === 'history' ? 'text-blue-700 dark:text-blue-400 border-b-2 border-blue-700' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Historial de Citas
        </button>
      </div>

      {activeTab === 'upcoming' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {appointments.map(app => (
            <div key={app.id} className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col transition-colors">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex gap-5 items-center justify-between">
                 <div className="flex gap-5 items-center">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${app.color === 'blue' ? 'bg-blue-50 text-blue-700' : 'bg-purple-50 text-purple-700'}`}>
                        <span className="material-symbols-outlined text-3xl">{app.icon}</span>
                    </div>
                    <div>
                        <h4 className="font-black text-slate-900 dark:text-white text-lg">{app.doc}</h4>
                        <p className="text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest mt-0.5">{app.spec}</p>
                    </div>
                 </div>
                 <div className="text-right">
                    <span className={`inline-block px-2.5 py-1 text-[9px] font-black rounded-md border uppercase tracking-widest ${
                        app.status === 'Confirmada' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                    }`}>
                        {app.status}
                    </span>
                    <div className="mt-2 flex items-center gap-1.5 text-[9px] font-black text-green-600 uppercase tracking-widest">
                       <span className="material-symbols-outlined text-xs">notifications_active</span>
                       Recordatorios OK
                    </div>
                 </div>
              </div>
              <div className="p-8 space-y-6 flex-1">
                 <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-slate-400">calendar_today</span>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">FECHA Y HORA</p>
                       <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{app.dateStr}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <span className="material-symbols-outlined text-slate-400">location_on</span>
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">UBICACIÓN</p>
                       <p className="text-sm font-black text-slate-900 dark:text-white mt-0.5">{app.loc}</p>
                    </div>
                 </div>
              </div>
              <div className="p-6 bg-slate-50/50 dark:bg-slate-800/20 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                 <button 
                  onClick={() => handleReprogram(app)}
                  className="bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-600 transition-all"
                 >
                    <span className="material-symbols-outlined text-lg">event_repeat</span>
                    Reprogramar
                 </button>
                 <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 flex items-center justify-center shrink-0">
                       <span className="material-symbols-outlined text-base">help</span>
                    </div>
                    <p className="text-[10px] font-black text-slate-400 max-w-[100px] leading-tight">Solicitar Soporte</p>
                 </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                <th className="px-8 py-5">Fecha</th>
                <th className="px-8 py-5">Doctor</th>
                <th className="px-8 py-5">Especialidad</th>
                <th className="px-8 py-5">Estado</th>
                <th className="px-8 py-5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              <tr className="hover:bg-slate-50/30 dark:hover:bg-slate-800/30 transition-all group">
                <td className="px-8 py-6">
                  <p className="text-sm font-black text-slate-900 dark:text-white">12 Sep 2023</p>
                  <p className="text-[10px] font-bold text-slate-400">14:00 PM</p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 flex items-center justify-center text-[10px] font-black">LR</div>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">Dr. Luis Ramirez</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-sm font-bold text-slate-500 dark:text-slate-400">Oftalmología</td>
                <td className="px-8 py-6">
                  <span className="flex items-center gap-1.5 px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black rounded-full border border-green-100 dark:border-green-800 w-fit">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                    Completada
                  </span>
                </td>
                <td className="px-8 py-6 text-right">
                  <button onClick={() => alert("Mostrando detalle de cita pasada...")} className="p-2 text-slate-400 hover:text-blue-700 transition-all">
                    <span className="material-symbols-outlined text-xl">description</span>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AppointmentsPage;
