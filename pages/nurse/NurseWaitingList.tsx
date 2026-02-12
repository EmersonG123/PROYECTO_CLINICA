
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NurseWaitingList: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Todos');

  const stats = [
    { label: 'Total en Espera', val: '12', trend: '+2', icon: 'groups' },
    { label: 'Tiempo Promedio', val: '15', unit: 'min', icon: 'timer' },
    { label: 'Emergencia', val: '4', sub: 'Prioridad Alta', icon: 'emergency', accent: true },
    { label: 'Consulta Externa', val: '8', icon: 'medical_services' },
  ];

  const patients = [
    { name: 'María Rodríguez', dni: '74839201', age: '34 Años', origin: 'Emergencia', dest: 'Medicina General', doc: 'Dr. Villavicencio', status: 'Pagado', sColor: 'bg-green-50 text-green-600 border-green-100', oColor: 'bg-red-50 text-red-600 border-red-100', icon: 'MR' },
    { name: 'Juan Pérez', dni: '10293847', age: '45 Años', origin: 'Consulta', dest: 'Cardiología', doc: 'Dra. Mendez', status: 'Pagado', sColor: 'bg-green-50 text-green-600 border-green-100', oColor: 'bg-blue-50 text-blue-600 border-blue-100', icon: 'JP' },
    { name: 'Ana García', dni: '48572019', age: '29 Años', origin: 'Consulta', dest: 'Ginecología', doc: 'Dr. Soto', status: 'Pagado', sColor: 'bg-green-50 text-green-600 border-green-100', oColor: 'bg-blue-50 text-blue-600 border-blue-100', icon: 'AG' },
    { name: 'Carlos López', dni: '09182736', age: '62 Años', origin: 'Emergencia', dest: 'Traumatología', doc: 'Dr. Quispe', status: 'Pendiente', sColor: 'bg-orange-50 text-orange-600 border-orange-100', oColor: 'bg-red-50 text-red-600 border-red-100', icon: 'CL' },
    { name: 'Luisa Mendoza', dni: '56473829', age: '50 Años', origin: 'Consulta', dest: 'Medicina Interna', doc: 'Dr. Gomez', status: 'Pagado', sColor: 'bg-green-50 text-green-600 border-green-100', oColor: 'bg-blue-50 text-blue-600 border-blue-100', icon: 'LM' },
    { name: 'Jorge Quispe', dni: '82736451', age: '22 Años', origin: 'Emergencia', dest: 'Cirugía', doc: 'Dr. Paredes', status: 'Pagado', sColor: 'bg-green-50 text-green-600 border-green-100', oColor: 'bg-red-50 text-red-600 border-red-100', icon: 'JQ' },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <div className="flex items-center gap-3 text-slate-400 text-xs font-black uppercase tracking-widest mb-4">
              <span>Triaje</span>
              <span className="material-symbols-outlined text-sm">chevron_right</span>
              <span className="text-slate-900 dark:text-white">Lista de Espera</span>
           </div>
           <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Lista de Espera - Triaje</h1>
           <p className="text-slate-500 font-medium text-lg mt-4 max-w-3xl">Gestión de pacientes en espera para evaluación inicial y clasificación.</p>
        </div>
        <div className="flex gap-4">
           <button className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 px-8 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 dark:text-slate-300 flex items-center gap-3">
              <span className="material-symbols-outlined">filter_alt</span>
              Filtros
           </button>
           <button className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3">
              <span className="material-symbols-outlined">person_add</span>
              Nuevo Paciente
           </button>
        </div>
      </div>

      {/* Mini KPIs (Imagen 2 Row) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-6 group hover:shadow-lg transition-all overflow-hidden relative">
             <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-800 transition-all">
                <span className="material-symbols-outlined text-3xl">{s.icon}</span>
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                <div className="flex items-baseline gap-2">
                   <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">{s.val}</h4>
                   {s.unit && <span className="text-sm font-black text-slate-400 uppercase">{s.unit}</span>}
                   {s.trend && <span className="text-[10px] font-bold text-green-600 uppercase bg-green-50 px-2 py-0.5 rounded-md border border-green-100 ml-2">{s.trend}</span>}
                </div>
                {s.accent && <span className="text-[9px] font-black text-red-500 uppercase tracking-widest mt-2 flex items-center gap-1"><span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span> {s.sub}</span>}
             </div>
             {s.accent && <div className="absolute top-0 right-0 w-2 h-full bg-red-100"></div>}
          </div>
        ))}
      </div>

      {/* Table Section (Imagen 2) */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
         <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-wrap items-center justify-between gap-8 bg-slate-50/30">
            <div className="flex gap-2">
               {['Todos', 'Emergencia', 'Consulta', 'Verificados'].map(tab => (
                 <button 
                  key={tab} 
                  onClick={() => setActiveTab(tab)}
                  className={`px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-xl' : 'text-slate-400 hover:bg-slate-50'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
            <div className="flex items-center gap-4">
               <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ORDENAR POR:</span>
               <div className="relative">
                  <select className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-6 py-3 font-bold text-xs appearance-none outline-none pr-10">
                     <option>Hora de Llegada</option>
                     <option>Urgencia</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">expand_more</span>
               </div>
            </div>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-10 py-6">PACIENTE</th>
                     <th className="px-10 py-6">ORIGEN</th>
                     <th className="px-10 py-6">DESTINO / ESPECIALIDAD</th>
                     <th className="px-10 py-6">ESTADO DE PAGO</th>
                     <th className="px-10 py-6 text-right">ACCIÓN</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {patients.map((p, i) => (
                    <tr key={i} className="hover:bg-blue-50/20 transition-all group">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-black text-blue-800 text-xs">
                                {p.icon}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{p.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">DNI: {p.dni} • {p.age}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 w-fit ${p.oColor}`}>
                             <span className="w-1.5 h-1.5 bg-current rounded-full"></span>
                             {p.origin}
                          </span>
                       </td>
                       <td className="px-10 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{p.dest}</p>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1.5">{p.doc}</p>
                       </td>
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-3">
                             <div className={`w-5 h-5 rounded-full flex items-center justify-center ${p.status === 'Pagado' ? 'bg-green-500 text-white' : 'bg-orange-500 text-white'}`}>
                                <span className="material-symbols-outlined text-[10px] font-black">{p.status === 'Pagado' ? 'check' : 'hourglass_empty'}</span>
                             </div>
                             <div>
                                <p className={`text-[10px] font-black uppercase tracking-widest ${p.status === 'Pagado' ? 'text-green-600' : 'text-orange-600'}`}>{p.status}</p>
                                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-[0.1em]">{p.status === 'Pagado' ? 'IZIPAY' : 'VERIFICAR'}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-right">
                          <button 
                            onClick={() => navigate('/nurse/evaluacion')}
                            className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-xl shadow-blue-900/10 active:scale-95 transition-all"
                          >
                            Atender
                          </button>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>

         <div className="p-10 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-400 italic">Mostrando 1 a 6 de 12 pacientes</p>
            <div className="flex gap-4">
               <button className="px-8 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Anterior</button>
               <button className="px-8 py-3.5 border-2 border-slate-100 dark:border-slate-800 rounded-2xl text-[11px] font-black uppercase tracking-widest text-slate-900 dark:text-white bg-white dark:bg-slate-800 shadow-sm hover:bg-slate-50 transition-all">Siguiente</button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default NurseWaitingList;
