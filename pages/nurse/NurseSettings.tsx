
import React, { useState, useRef } from 'react';

const NurseSettings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState({
    name: 'Lic. Maria Perez',
    role: 'Enfermera Jefe',
    email: 'm.perez@clinicaayacucho.pe',
    phone: '987 654 321',
    cep: 'CEP-54321', // Colegio de Enfermeros del Perú
    area: 'Triaje / Emergencia',
    photo: 'https://i.pravatar.cc/100?u=nurse1'
  });

  const [notifications, setNotifications] = useState({
    newPatient: true,
    codeRed: true,
    shiftReminders: false,
    labResults: true
  });

  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });

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
    alert("Perfil profesional actualizado correctamente.");
  };

  const handleUpdateSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwords.new !== passwords.confirm) {
      alert("Error: Las nuevas contraseñas no coinciden.");
      return;
    }
    alert("Contraseña actualizada exitosamente.");
    setPasswords({ current: '', new: '', confirm: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Configuración de Enfermería</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Gestión de perfil profesional, alertas de triaje y seguridad.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

        {/* Columna Izquierda: Perfil y Datos Profesionales */}
        <div className="lg:col-span-8 space-y-8">
          {/* Tarjeta de Perfil */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">badge</span>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Ficha Personal</h3>
            </div>
            <div className="p-10 flex flex-col md:flex-row items-center gap-10">
              <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                <img src={profile.photo} className="w-32 h-32 rounded-3xl object-cover ring-4 ring-slate-50 dark:ring-slate-800 shadow-xl group-hover:scale-105 transition-transform" alt="Perfil" />
                <div className="absolute inset-0 bg-blue-900/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <span className="material-symbols-outlined text-white text-2xl font-black">photo_camera</span>
                </div>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
              </div>

              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</p>
                  <input
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nro. CEP (Colegiatura)</p>
                  <input
                    value={profile.cep}
                    onChange={(e) => setProfile({ ...profile, cep: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</p>
                  <input
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teléfono de Contacto</p>
                  <input
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
                <div className="md:col-span-2 flex justify-end pt-4">
                  <button onClick={handleSaveProfile} className="bg-blue-800 text-white px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg active:scale-95 transition-all">Guardar Cambios</button>
                </div>
              </div>
            </div>
          </section>

          {/* Seguridad */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-slate-50/30 dark:bg-slate-800/20">
              <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">lock</span>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Seguridad de Acceso</h3>
            </div>
            <form onSubmit={handleUpdateSecurity} className="p-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña Actual</label>
                <input type="password" value={passwords.current} onChange={e => setPasswords({ ...passwords, current: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                <input type="password" value={passwords.new} onChange={e => setPasswords({ ...passwords, new: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="Min. 8 caracteres" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar</label>
                <input type="password" value={passwords.confirm} onChange={e => setPasswords({ ...passwords, confirm: e.target.value })} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" placeholder="••••••••" />
              </div>
              <div className="md:col-span-3 flex justify-end pt-2">
                <button type="submit" className="bg-slate-900 dark:bg-white dark:text-slate-900 text-white px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-all">Actualizar Clave</button>
              </div>
            </form>
          </section>
        </div>

        {/* Columna Derecha: Preferencias y Turno */}
        <div className="lg:col-span-4 space-y-8">

          {/* Info de Turno */}
          <div className="bg-blue-800 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
            <div className="relative z-10 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/20">
                  <span className="material-symbols-outlined text-white">schedule</span>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest">Turno Actual</h4>
                  <p className="text-blue-200 text-xs font-medium">En curso</p>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Horario</span>
                  <span className="font-black text-sm">07:00 - 19:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Área</span>
                  <span className="font-black text-sm">Emergencia</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-200">Estado</span>
                  <span className="bg-green-500 text-white px-2 py-0.5 rounded text-[9px] font-black uppercase">Activo</span>
                </div>
              </div>

              <button className="w-full bg-white text-blue-900 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Solicitar Cambio de Turno</button>
            </div>
          </div>

          {/* Notificaciones */}
          <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-8">
            <div className="flex items-center gap-3 border-b border-slate-50 dark:border-slate-800 pb-6">
              <span className="material-symbols-outlined text-orange-500 font-black">notifications_active</span>
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Alertas y Sonidos</h4>
            </div>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight">Nuevo Paciente</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">Alerta sonora al ingresar a lista.</p>
                </div>
                <button onClick={() => setNotifications({ ...notifications, newPatient: !notifications.newPatient })} className={`w-12 h-7 rounded-full relative transition-all duration-300 ${notifications.newPatient ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${notifications.newPatient ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight text-red-600">Código Rojo</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">Notificación crítica intrusiva.</p>
                </div>
                <button onClick={() => setNotifications({ ...notifications, codeRed: !notifications.codeRed })} className={`w-12 h-7 rounded-full relative transition-all duration-300 ${notifications.codeRed ? 'bg-red-600' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${notifications.codeRed ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight">Resultados Lab.</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">Aviso cuando laboratorio finaliza.</p>
                </div>
                <button onClick={() => setNotifications({ ...notifications, labResults: !notifications.labResults })} className={`w-12 h-7 rounded-full relative transition-all duration-300 ${notifications.labResults ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 ${notifications.labResults ? 'right-1' : 'left-1'}`}></div>
                </button>
              </div>
            </div>
          </section>

          <button className="w-full text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors py-2 flex items-center justify-center gap-2">
            <span className="material-symbols-outlined text-lg">logout</span>
            Cerrar Sesión en Dispositivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default NurseSettings;
