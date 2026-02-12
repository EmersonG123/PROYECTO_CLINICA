
import React, { useState, useEffect } from 'react';

const SettingsPage: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [passForm, setPassForm] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (passForm.next !== passForm.confirm) {
      alert("Error: Las nuevas contraseñas no coinciden. Verifique.");
      return;
    }
    
    setIsUpdating(true);
    setTimeout(() => {
        setIsUpdating(false);
        alert("¡Éxito! Contraseña institucional actualizada.");
        setShowPasswordModal(false);
        setPassForm({ current: '', next: '', confirm: '' });
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none italic">Configuración del Sistema</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-sm uppercase tracking-widest leading-none mt-2">Gestión de perfil y seguridad del staff</p>
      </div>

      <div className="space-y-8">
        
        {/* SECCIÓN: Perfil del Usuario */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">account_circle</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Ficha de Recepcionista</h3>
          </div>
          <div className="p-10 flex flex-col md:flex-row items-center gap-12">
            <div className="relative group">
              <div className="w-32 h-32 rounded-full overflow-hidden ring-8 ring-slate-50 dark:ring-slate-800 shadow-xl">
                <img src="https://i.pravatar.cc/200?u=marta" className="w-full h-full object-cover" alt="Perfil" />
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center shadow-lg border-4 border-white dark:border-slate-900">
                <span className="material-symbols-outlined text-sm font-black">photo_camera</span>
              </button>
            </div>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 w-full">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">NOMBRE COMPLETO</p>
                <p className="text-base font-black text-slate-900 dark:text-white uppercase">Marta García Ramos</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ROL DE USUARIO</p>
                <p className="text-base font-black text-blue-800 dark:text-blue-400 uppercase italic">Recepción Principal</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECCIÓN: Preferencias */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">visibility</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Preferencias Visuales</h3>
          </div>
          <div className="p-10 flex items-center justify-between">
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight italic">Modo Oscuro del Sistema</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">Mejora la legibilidad durante el turno noche.</p>
            </div>
            <button 
              onClick={toggleTheme}
              className={`w-14 h-8 rounded-full relative transition-all duration-300 ${isDarkMode ? 'bg-[#1e3a8a]' : 'bg-slate-200'}`}
            >
              <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${isDarkMode ? 'right-1' : 'left-1'}`}></div>
            </button>
          </div>
        </section>

        {/* SECCIÓN: Seguridad */}
        <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4 bg-slate-50/50 dark:bg-slate-800/40">
            <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">shield</span>
            <h3 className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white">Seguridad de Cuenta</h3>
          </div>
          <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Contraseña Maestra</p>
              <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">Actualizada recientemente</p>
            </div>
            <button 
              onClick={() => setShowPasswordModal(true)}
              className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-3 shadow-xl active:scale-95 transition-all"
            >
              <span className="material-symbols-outlined text-lg font-black">lock_reset</span>
              Actualizar Contraseña
            </button>
          </div>
        </section>
      </div>

      {/* Modal Cambio de Contraseña */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-md rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <div className="bg-[#1e3a8a] p-8 text-white flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-3xl font-black">security</span>
                    <h4 className="font-black text-xl uppercase tracking-tight">Nueva Contraseña</h4>
                 </div>
                 <button onClick={() => setShowPasswordModal(false)} className="hover:bg-white/10 p-2 rounded-xl transition-all"><span className="material-symbols-outlined">close</span></button>
              </div>
              <form onSubmit={handleUpdatePassword} className="p-10 space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Contraseña Actual</label>
                    <input type="password" required value={passForm.current} onChange={(e) => setPassForm({...passForm, current: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nueva Contraseña</label>
                    <input type="password" required value={passForm.next} onChange={(e) => setPassForm({...passForm, next: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Confirmar</label>
                    <input type="password" required value={passForm.confirm} onChange={(e) => setPassForm({...passForm, confirm: e.target.value})} className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" />
                 </div>
                 <button type="submit" disabled={isUpdating} className="w-full bg-[#1e3a8a] text-white py-5 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl active:scale-95 flex items-center justify-center gap-2">
                    {isUpdating ? 'Actualizando...' : 'Confirmar Cambio'}
                 </button>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
