
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardHome: React.FC = () => {
  const navigate = useNavigate();
  const [showDetailModal, setShowDetailModal] = useState(false);
  
  const summaryCards = [
    { title: 'Perfil', desc: 'Mis datos personales', icon: 'person', color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400', path: '/dashboard/perfil' },
    { title: 'Historia Clínica', desc: 'Registros médicos', icon: 'assignment', color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400', path: '/dashboard/historia' },
    { title: 'Citas', desc: 'Gestión de consultas', icon: 'calendar_month', color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400', path: '/dashboard/citas' },
    { title: 'Exámenes', desc: 'Laboratorio e imágenes', icon: 'lab_research', color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400', path: '/dashboard/examenes' },
  ];

  return (
    <div className="space-y-8 lg:space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">Bienvenido, Juan Pérez</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Resumen de tu estado de salud actual.</p>
        </div>
        <button onClick={() => navigate('/dashboard/agendar')} className="w-full sm:w-auto bg-blue-700 hover:bg-blue-800 text-white px-6 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
          <span className="material-symbols-outlined text-xl">add</span>
          Nueva Cita
        </button>
      </div>

      {/* Grid of Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {summaryCards.map((card, idx) => (
          <div key={idx} onClick={() => navigate(card.path)} className="bg-white dark:bg-slate-900 p-6 lg:p-7 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group cursor-pointer">
            <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-6 transition-transform group-hover:scale-110`}>
              <span className="material-symbols-outlined text-2xl">{card.icon}</span>
            </div>
            <h4 className="font-black text-slate-900 dark:text-white text-lg mb-1">{card.title}</h4>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">{card.desc}</p>
          </div>
        ))}
      </div>

      {/* Main Widgets Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Next Appointment Widget */}
        <div className="xl:col-span-2 flex flex-col">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-full">
            <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-600">calendar_month</span>
                <span className="font-black text-slate-900 dark:text-white text-sm">Próxima Cita</span>
              </div>
              <span className="px-3 py-1 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-[10px] font-black rounded-full border border-green-100 dark:border-green-800 uppercase tracking-widest">Confirmada</span>
            </div>
            <div className="p-8 space-y-8 flex-1">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 w-20 h-20 rounded-[2rem] flex flex-col items-center justify-center font-black border border-blue-100 dark:border-blue-800/50">
                  <span className="text-[10px] uppercase opacity-60">OCT</span>
                  <span className="text-3xl leading-none mt-1">24</span>
                </div>
                <div>
                  <h5 className="font-black text-slate-900 dark:text-white text-2xl">Consulta General</h5>
                  <p className="text-sm font-bold text-slate-400 mt-1">Martes, 10:30 AM • Consultorio 304</p>
                </div>
              </div>
              <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center gap-4">
                <img src="https://i.pravatar.cc/100?u=doc1" className="w-14 h-14 rounded-2xl object-cover" alt="Doctor" />
                <div>
                  <p className="font-black text-slate-900 dark:text-white text-base">Dr. Carlos Mendoza</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Especialista Medicina Interna</p>
                </div>
              </div>

              {/* RECORDATORIOS PROGRAMADOS */}
              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col gap-3">
                 <p className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm font-black">notifications_active</span>
                    Recordatorios Programados
                 </p>
                 <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                       <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">24h Antes (SMS)</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <span className="material-symbols-outlined text-green-500 text-lg">check_circle</span>
                       <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase">2h Antes (WhatsApp)</span>
                    </div>
                 </div>
              </div>

              <button onClick={() => setShowDetailModal(true)} className="w-full bg-slate-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 py-4 rounded-2xl font-black transition-all hover:bg-blue-50">Ver detalles e instrucciones</button>
            </div>
          </div>
        </div>

        {/* Right Sidebar Info */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8">
            <h5 className="font-black text-slate-900 dark:text-white text-sm mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-red-500">warning</span> Alergias
            </h5>
            <div className="flex flex-wrap gap-2">
              <span className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-[10px] font-black border border-red-100 dark:border-red-900/50">Penicilina</span>
              <span className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-[10px] font-black border border-red-100 dark:border-red-900/50">Sulfa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Appointment Detail Modal */}
      {showDetailModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <div className="bg-blue-700 p-8 text-white">
                 <div className="flex justify-between items-start">
                    <h4 className="font-black text-xl tracking-tight">Información de Cita</h4>
                    <button onClick={() => setShowDetailModal(false)} className="hover:bg-white/10 p-2 rounded-xl transition-all">
                       <span className="material-symbols-outlined">close</span>
                    </button>
                 </div>
              </div>
              <div className="p-8 space-y-6">
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Especialista</p>
                    <p className="font-black text-slate-900 dark:text-white">Dr. Carlos Mendoza - Medicina Interna</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sede y Consultorio</p>
                    <p className="font-black text-slate-900 dark:text-white">Sede Central - Consultorio 304, Piso 3</p>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Instrucciones</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed font-medium">"Asistir 15 minutos antes con documento de identidad original."</p>
                 </div>
                 <button onClick={() => setShowDetailModal(false)} className="w-full bg-blue-700 text-white py-4 rounded-xl font-black shadow-lg shadow-blue-900/10 active:scale-95 transition-all">Entendido</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DashboardHome;
