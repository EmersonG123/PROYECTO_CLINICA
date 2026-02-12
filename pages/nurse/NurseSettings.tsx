
import React from 'react';

const NurseSettings: React.FC = () => {
  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Configuración</h1>
      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-20 border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center text-center">
         <span className="material-symbols-outlined text-7xl text-slate-200 mb-6">settings</span>
         <h4 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Opciones de Sistema</h4>
      </div>
    </div>
  );
};

export default NurseSettings;
