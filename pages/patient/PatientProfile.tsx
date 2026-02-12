
import React, { useState } from 'react';

const PatientProfile: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Juan Carlos Pérez Gómez',
    dni: '45678901',
    age: '35 años',
    sex: 'Masculino',
    phone: '987 654 321',
    address: 'Av. Mariscal Cáceres 123, Ayacucho, Perú',
    emergencyContact: 'María Pérez (Hermana) 999 888 777'
  });

  const [notifs, setNotifs] = useState({
    sms24h: true,
    wa2h: true,
    emailExams: true
  });

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Mi Perfil</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-1">Gestiona tu información personal y recordatorios.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        <div className="xl:col-span-8 space-y-8">
          {/* Personal Info Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">contact_page</span>
                <span className="font-black text-slate-900 dark:text-white text-sm">Datos Personales</span>
              </div>
              {isEditing ? (
                <div className="flex gap-2">
                  <button onClick={() => setIsEditing(false)} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-5 py-2.5 rounded-xl text-xs font-black hover:bg-slate-200 transition-all">Cancelar</button>
                  <button onClick={handleSave} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">Guardar</button>
                </div>
              ) : (
                <button onClick={() => setIsEditing(true)} className="bg-blue-700 text-white px-5 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-blue-800 transition-all shadow-lg shadow-blue-900/20">Editar</button>
              )}
            </div>
            <div className="p-10">
              <div className="flex flex-col md:flex-row gap-12 items-center md:items-start">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-br from-blue-100 to-indigo-200 border-4 border-white dark:border-slate-800 shadow-xl">
                   <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200&h=200" alt="Juan" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-y-8 gap-x-12">
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre</p>
                    {isEditing ? <input name="name" value={profile.name} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm font-bold" /> : <p className="font-black text-slate-900 dark:text-white text-base">{profile.name}</p>}
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Celular</p>
                    {isEditing ? <input name="phone" value={profile.phone} onChange={handleChange} className="w-full bg-slate-50 dark:bg-slate-800 rounded-lg px-3 py-2 text-sm font-bold" /> : <p className="font-black text-slate-900 dark:text-white text-base">{profile.phone}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Background Card */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
            <div className="px-8 py-6 border-b border-slate-50 dark:border-slate-800 flex items-center gap-3">
              <span className="material-symbols-outlined text-blue-600 dark:text-blue-400">health_and_safety</span>
              <span className="font-black text-slate-900 dark:text-white text-sm">Antecedentes Médicos</span>
            </div>
            <div className="p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tipo de Sangre</p>
                <div className="w-16 h-12 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-xl flex items-center justify-center text-blue-700 dark:text-blue-400 font-black text-xl">O+</div>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Alergias</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-full text-xs font-black border border-red-100 dark:border-red-800">Penicilina</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NOTIFICATION PREFERENCES - NUEVA SECCIÓN */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 flex flex-col gap-10">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined font-black">notifications_active</span>
                 </div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Recordatorios</h3>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">24h Antes (SMS)</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest leading-none">Confirmación de asistencia</p>
                    </div>
                    <button onClick={() => setNotifs({...notifs, sms24h: !notifs.sms24h})} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${notifs.sms24h ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs.sms24h ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Horas Antes (WhatsApp)</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest leading-none">Recordatorio de ubicación</p>
                    </div>
                    <button onClick={() => setNotifs({...notifs, wa2h: !notifs.wa2h})} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${notifs.wa2h ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs.wa2h ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-tight">Resultados (Email)</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-widest leading-none">Aviso de exámenes listos</p>
                    </div>
                    <button onClick={() => setNotifs({...notifs, emailExams: !notifs.emailExams})} className={`w-12 h-6 rounded-full relative transition-all duration-300 ${notifs.emailExams ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all ${notifs.emailExams ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>

              <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-3xl flex gap-4 border border-blue-100 dark:border-blue-800/50">
                 <span className="material-symbols-outlined text-blue-600">info</span>
                 <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-widest">
                    Los recordatorios se envían automáticamente al celular registrado: <span className="font-black text-blue-800 dark:text-blue-400">*** *** 321</span>
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
