
import React, { useState, useRef } from 'react';

const DoctorSettings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado del perfil
  const [profile, setProfile] = useState({
    name: 'Alejandro Vargas Lizarzaburu',
    specialty: 'Cardiología Clínica e Intervencionista',
    cmp: '348291',
    email: 'a.vargas@clinicaayacucho.pe',
    photo: 'https://i.pravatar.cc/150?u=doc1'
  });

  // Estado de notificaciones
  const [notifs, setNotifs] = useState({
    agenda: true,
    arrivals: true,
    results: false
  });

  // Estado de seguridad
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = () => {
    alert("¡Perfil profesional actualizado! Los cambios son visibles para el staff y pacientes.");
  };

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Error: Las contraseñas nuevas no coinciden.");
      return;
    }
    alert("Seguridad actualizada. Su contraseña y certificado de firma han sido validados.");
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Mi Configuración</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Personalización de perfil profesional y parámetros del sistema médico.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Lado Izquierdo: Perfil Profesional */}
        <div className="lg:col-span-8 space-y-8">
           <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">person_pin</span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Ficha Profesional</h3>
                 </div>
                 <button onClick={handleSaveProfile} className="bg-blue-800 text-white px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all">Guardar</button>
              </div>
              <div className="p-10 flex flex-col md:flex-row items-center gap-12">
                 <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <img src={profile.photo} className="w-40 h-40 rounded-[3rem] object-cover ring-8 ring-slate-50 dark:ring-slate-800 shadow-2xl transition-transform group-hover:scale-105" alt="Perfil" />
                    <div className="absolute inset-0 bg-blue-900/60 rounded-[3rem] opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                       <span className="material-symbols-outlined text-white text-3xl font-black">photo_camera</span>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                 </div>
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</p>
                       <input value={profile.name} onChange={e => setProfile({...profile, name: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" />
                    </div>
                    <div className="space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidad</p>
                       <input value={profile.specialty} onChange={e => setProfile({...profile, specialty: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" />
                    </div>
                    <div className="space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">N° CMP / Colegiatura</p>
                       <div className="px-5 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-400 text-sm border border-slate-200 dark:border-slate-700">CMP: {profile.cmp}</div>
                    </div>
                    <div className="space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Firma Digital</p>
                       <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-green-50 text-green-700 text-[9px] font-black rounded-lg border border-green-100 uppercase tracking-widest">Certificada</span>
                          <button className="text-[9px] font-black text-blue-800 uppercase hover:underline">Renovar</button>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-slate-50/30">
                 <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">security</span>
                 <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Acceso y Seguridad</h3>
              </div>
              <form onSubmit={handleUpdateSecurity} className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña Actual</label>
                    <input type="password" value={passwords.current} onChange={e => setPasswords({...passwords, current: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="••••••••" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                    <input type="password" value={passwords.new} onChange={e => setPasswords({...passwords, new: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="Min. 8 caracteres" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar</label>
                    <input type="password" value={passwords.confirm} onChange={e => setPasswords({...passwords, confirm: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="••••••••" />
                 </div>
                 <div className="md:col-span-3 flex justify-end pt-4">
                    <button type="submit" className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Actualizar Credenciales</button>
                 </div>
              </form>
           </section>
        </div>

        {/* Lado Derecho: Preferencias */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Alertas Médicas</h4>
              
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight">Agenda Diaria</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1">Resumen matutino por correo.</p>
                    </div>
                    <button onClick={() => setNotifs({...notifs, agenda: !notifs.agenda})} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${notifs.agenda ? 'bg-blue-800' : 'bg-slate-200'}`}>
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${notifs.agenda ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight">Llegada Paciente</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1">Notificación Push al marcar llegada.</p>
                    </div>
                    <button onClick={() => setNotifs({...notifs, arrivals: !notifs.arrivals})} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${notifs.arrivals ? 'bg-blue-800' : 'bg-slate-200'}`}>
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${notifs.arrivals ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div>
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight">Labs Listos</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1">Aviso de carga de resultados.</p>
                    </div>
                    <button onClick={() => setNotifs({...notifs, results: !notifs.results})} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${notifs.results ? 'bg-blue-800' : 'bg-slate-200'}`}>
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${notifs.results ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>
           </section>

           <div className="bg-blue-800 rounded-[3rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <div className="relative z-10 flex items-center gap-4">
                 <span className="material-symbols-outlined text-blue-300">support_agent</span>
                 <h4 className="text-sm font-black uppercase tracking-widest">Soporte Médico</h4>
              </div>
              <p className="text-[11px] text-blue-100/60 leading-relaxed font-medium uppercase tracking-widest">Anexo Interno: <span className="text-white font-black">#772</span></p>
              <button className="w-full bg-white text-blue-800 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Contactar TI</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSettings;
