
import React, { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';

const CashierLayout: React.FC = () => {
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

  const navItems = [
    { name: 'Dashboard', path: '/cashier', icon: 'dashboard', exact: true },
    { name: 'Cobro de Servicios', path: '/cashier/cobros', icon: 'point_of_sale' },
    { name: 'Pagos Pendientes', path: '/cashier/pendientes', icon: 'pending_actions' },
    { name: 'Conciliación de Pagos', path: '/cashier/conciliacion', icon: 'account_balance_wallet' },
    { name: 'Facturación SUNAT', path: '/cashier/facturacion', icon: 'description' },
    { name: 'Historial y Control', path: '/cashier/historial', icon: 'history' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 flex font-sans transition-colors duration-300">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col transition-transform duration-300 lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-8 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="bg-blue-800 text-white p-2.5 rounded-xl flex items-center justify-center shadow-lg">
              <span className="material-symbols-outlined text-2xl font-bold">add_box</span>
            </div>
            <div>
              <span className="font-black text-slate-900 dark:text-white text-base tracking-tighter block leading-none uppercase">Clínica Ayacucho</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Panel Caja</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-6 py-10 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.exact}
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
          <button onClick={() => navigate('/cashier/configuracion')} className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-blue-800 text-[10px] font-black uppercase tracking-widest transition-colors mb-2">
            <span className="material-symbols-outlined text-lg">settings</span>
            Configuración
          </button>
          
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 flex items-center gap-4 border border-slate-100 dark:border-slate-800">
            <img src="https://i.pravatar.cc/100?u=cashier" className="w-10 h-10 rounded-xl object-cover" alt="Ana Maria" />
            <div className="min-w-0">
               <p className="text-xs font-black text-slate-900 dark:text-white truncate">Ana Maria</p>
               <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Cajero #04</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 lg:ml-72 flex flex-col min-h-screen">
        <header className="h-20 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-6 lg:px-10 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500">
              <span className="material-symbols-outlined text-xl">menu</span>
            </button>
            <div className="flex items-center gap-2 text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">
               <span>Caja</span>
               <span className="material-symbols-outlined text-sm">chevron_right</span>
               <span className="text-blue-800 dark:text-blue-400">Panel Central</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 transition-colors hover:text-blue-800">
              <span className="material-symbols-outlined text-xl">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>

            <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-500 font-black text-[10px] uppercase tracking-widest border border-slate-200 dark:border-slate-800 flex items-center gap-3 hover:bg-red-50 hover:text-red-500 transition-all">
              <span className="material-symbols-outlined text-lg font-bold">logout</span>
              Salir
            </button>
          </div>
        </header>

        <main className="p-6 lg:p-10 flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default CashierLayout;
