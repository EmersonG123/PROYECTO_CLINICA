
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = username.toLowerCase();
    if (user.includes('recep')) {
      navigate('/reception');
    } else if (user.includes('medic')) {
      navigate('/doctor');
    } else if (user.includes('labo')) {
      navigate('/laboratory');
    } else if (user.includes('caja')) {
      navigate('/cashier/apertura');
    } else if (user.includes('admin')) {
      navigate('/admin');
    } else if (user.includes('enferm')) {
      navigate('/nurse');
    } else {
      navigate('/dashboard');
    }
  };

  const toggleTheme = () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    localStorage.setItem('theme', nextMode ? 'dark' : 'light');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6 transition-all duration-700 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-800/5 rounded-full blur-[120px]"></div>

      <button 
        onClick={toggleTheme}
        className="absolute top-8 right-8 p-3 rounded-2xl bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 shadow-sm hover:scale-110 transition-all z-50"
      >
        <span className="material-symbols-outlined text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
      </button>

      <div className="w-full max-w-[460px] bg-white dark:bg-slate-900 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.12)] border border-slate-100 dark:border-slate-800/50 overflow-hidden relative z-10 animate-in fade-in zoom-in-95 duration-700">
        <div className="flex flex-col items-center pt-12 pb-8 px-10">
          <div className="w-16 h-16 rounded-2xl bg-[#1e3a8a] text-white flex items-center justify-center mb-6 shadow-[0_15px_30px_-5px_rgba(30,58,138,0.4)]">
            <span className="material-symbols-outlined text-3xl font-black">add_box</span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-3xl font-black tracking-tighter uppercase italic leading-none">Clínica Ayacucho</h2>
          <p className="text-slate-400 dark:text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Sistema de Gestión Integral</p>
        </div>

        <form onSubmit={handleLogin} className="px-10 pb-12 flex flex-col gap-6">
          <div className="space-y-2.5">
            <label className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-2">Usuario / DNI</label>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1e3a8a] transition-colors">person</span>
              <input 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl pl-14 pr-6 py-4.5 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold outline-none focus:border-[#1e3a8a] focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner" 
                placeholder="Ingresa tu documento"
                required
              />
            </div>
          </div>

          <div className="space-y-2.5">
            <div className="flex justify-between items-center px-2">
              <label className="text-slate-500 dark:text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Contraseña</label>
              <button type="button" className="text-[10px] font-black text-[#1e3a8a] dark:text-blue-400 uppercase tracking-widest hover:underline">¿La olvidaste?</button>
            </div>
            <div className="relative group">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#1e3a8a] transition-colors">lock</span>
              <input 
                type={showPassword ? "text" : "password"}
                className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl pl-14 pr-14 py-4.5 text-slate-900 dark:text-white placeholder:text-slate-300 dark:placeholder:text-slate-600 font-bold outline-none focus:border-[#1e3a8a] focus:bg-white dark:focus:bg-slate-800 transition-all shadow-inner" 
                placeholder="••••••••"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-[#1e3a8a] transition-all">
                <span className="material-symbols-outlined text-xl">{showPassword ? "visibility" : "visibility_off"}</span>
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              className="w-full bg-gradient-to-r from-[#1e3a8a] to-[#1e4db7] hover:from-[#152e6d] hover:to-[#1e3a8a] text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_-10px_rgba(30,58,138,0.4)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-4 group"
            >
              Iniciar Sesión
              <span className="material-symbols-outlined text-xl font-bold group-hover:translate-x-1.5 transition-transform">arrow_forward</span>
            </button>
          </div>

          <div className="mt-8 flex flex-col items-center gap-4">
             <p className="text-center text-sm text-slate-500 font-medium">
               ¿No tienes una cuenta aún? <br />
               <Link to="/register" className="text-[#1e3a8a] dark:text-blue-400 font-black uppercase text-[11px] tracking-widest hover:underline mt-2 inline-block">Crea una cuenta de paciente</Link>
             </p>
          </div>
        </form>

        <div className="p-8 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-white/5 flex flex-col items-center">
           <p className="text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.4em] mb-3">Accesos rápidos de prueba</p>
           <div className="flex flex-wrap justify-center gap-2">
              {['Recep', 'Medic', 'Labo', 'Caja', 'Admin'].map(tag => (
                <span key={tag} className="px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-md text-[8px] font-black text-slate-400 uppercase">{tag}</span>
              ))}
           </div>
        </div>
      </div>
      
      <p className="mt-12 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">
        © 2024 CLÍNICA AYACUCHO • SEGURIDAD NIVEL 4
      </p>
    </div>
  );
};

export default LoginPage;
