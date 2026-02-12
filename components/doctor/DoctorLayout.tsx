
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

const DoctorLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  const navItems = [
    { name: 'Centro de Trabajo', path: '/doctor', icon: 'dashboard', exact: true },
    { name: 'Agenda Mensual', path: '/doctor/agenda', icon: 'calendar_month' },
    { name: 'Pacientes', path: '/doctor/pacientes', icon: 'group' },
    { name: 'Historias Clínicas', path: '/doctor/historias', icon: 'assignment' },
    { name: 'Configuración', path: '/doctor/configuracion', icon: 'settings' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex font-sans transition-colors duration-300">
      {/* Sidebar - Responsivo */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-800 text-white p-2.5 rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-2xl font-bold">add_box</span>
            </div>
            <div>
              <span className="font-black text-slate-900 dark:text-white text-base tracking-tighter block leading-none uppercase">Clínica Ayacucho</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Panel Médico</span>
            </div>
          </div>
          <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden p-2 text-slate-400 hover:text-red-500 transition-colors">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="p-6">
           <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100 dark:border-slate-800 shadow-sm">
              <img src="https://i.pravatar.cc/100?u=doc1" className="w-10 h-10 rounded-xl object-cover ring-2 ring-white dark:ring-slate-800" alt="Dr Vargas" />
              <div className="min-w-0">
                 <p className="text-sm font-black text-slate-900 dark:text-white truncate uppercase tracking-tight">Dr. A. Vargas</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Cardiología</p>
              </div>
           </div>
        </div>

        <nav className="flex-1 px-6 space-y-2 overflow-y-auto pb-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => 
                `flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ${
                  isActive 
                  ? 'bg-blue-800 text-white font-bold shadow-xl shadow-blue-800/20' 
                  : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white'
                }`
              }
            >
              <span className="material-symbols-outlined text-2xl">{item.icon}</span>
              <span className="text-sm font-semibold">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-8 border-t border-slate-100 dark:border-slate-800">
          <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-500 dark:text-slate-400 hover:text-red-500 text-[10px] font-black uppercase tracking-widest transition-colors">
            <span className="material-symbols-outlined text-lg">logout</span>
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Area con Header Mobile */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen w-full overflow-x-hidden">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 hover:bg-blue-50 transition-colors">
              <span className="material-symbols-outlined">menu</span>
            </button>
            <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] hidden sm:flex">
               <span>Médico</span>
               <span className="material-symbols-outlined text-sm">chevron_right</span>
               <span className="text-blue-800 dark:text-blue-400">
                 {navItems.find(i => i.path === location.pathname || (i.exact && location.pathname === '/doctor'))?.name}
               </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button onClick={toggleTheme} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 border border-slate-100 dark:border-slate-700 transition-colors hover:text-blue-800">
              <span className="material-symbols-outlined text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 relative">
               <span className="material-symbols-outlined text-xl">notifications</span>
               <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
            </button>
          </div>
        </header>

        <main className="p-4 md:p-6 lg:p-10 flex-1 w-full max-w-[100vw]">
          <Outlet />
        </main>
      </div>

      {/* Overlay del menú móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-slate-950/40 z-40 lg:hidden backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default DoctorLayout;
