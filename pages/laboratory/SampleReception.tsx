
import React, { useState } from 'react';

const SampleReception: React.FC = () => {
  const [selectedOrderId, setSelectedOrderId] = useState('ORD-891');
  const [samples, setSamples] = useState([
    { id: 1, name: 'Hemograma Completo', desc: 'Sangre - Tubo Lila (EDTA)', icon: 'bloodtype', checked: true },
    { id: 2, name: 'Glucosa / Urea', desc: 'Sangre - Tubo Gris', icon: 'opacity', checked: false },
    { id: 3, name: 'Urocultivo', desc: 'Orina - Frasco Estéril', icon: 'science', checked: false }
  ]);

  const orders = [
    { id: '#ORD-891', patient: 'María Rodríguez', priority: 'Alta', time: '15 min', color: 'text-red-600 bg-red-50' },
    { id: '#ORD-892', patient: 'Juan Pérez', priority: 'Media', time: '25 min', color: 'text-orange-600 bg-orange-50' },
    { id: '#ORD-893', patient: 'Ana García', priority: 'Baja', time: '40 min', color: 'text-green-600 bg-green-50' },
    { id: '#ORD-894', patient: 'Carlos Ruiz', priority: 'Alta', time: '5 min', color: 'text-red-600 bg-red-50' },
  ];

  const handleScanOrder = () => {
    const id = prompt("Escanee el código de barras de la orden:");
    if (id) {
      alert(`Orden ${id} detectada. Cargando datos del paciente...`);
      setSelectedOrderId(id.toUpperCase());
    }
  };

  const toggleSample = (id: number) => {
    setSamples(prev => prev.map(s => s.id === id ? { ...s, checked: !s.checked } : s));
  };

  const handlePrint = () => {
    alert("Enviando etiquetas a la impresora térmica de laboratorio...");
  };

  const handleRegisterEntry = () => {
    const pendingCount = samples.filter(s => !s.checked).length;
    if (pendingCount > 0) {
      if (!confirm(`Hay ${pendingCount} muestras sin marcar. ¿Desea registrar el ingreso parcial?`)) return;
    }
    alert(`Ingreso de orden ${selectedOrderId} registrado correctamente. Las muestras han sido derivadas a sus respectivas áreas.`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Recepción de Muestras</h1>
          <p className="text-slate-500 font-medium mt-1">Gestione la recepción, etiquetado y distribución de muestras biológicas.</p>
        </div>
        <button 
          onClick={handleScanOrder}
          className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-2xl font-black shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3"
        >
          <span className="material-symbols-outlined">barcode_scanner</span>
          Escanear Orden
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Pendientes', val: '12', trend: '+2', color: 'text-green-600' },
          { label: 'Urgentes', val: '3', trend: '+1', color: 'text-red-600' },
          { label: 'Procesadas Hoy', val: '45', trend: '+15%', color: 'text-green-600' },
          { label: 'Tiempo Prom.', val: '8m', trend: '-1m', color: 'text-green-600' }
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-between">
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                <div className="flex items-baseline gap-2 mt-2">
                   <h4 className="text-3xl font-black text-slate-900 dark:text-white">{stat.val}</h4>
                   <span className={`text-[10px] font-bold ${stat.color}`}>{stat.trend}</span>
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
         <div className="xl:col-span-7 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col h-[650px]">
            <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
               <h3 className="font-black text-slate-900 dark:text-white uppercase tracking-widest text-sm">Cola de Trabajo</h3>
               <div className="flex gap-2">
                  <button className="p-2 text-slate-400 hover:text-blue-800"><span className="material-symbols-outlined">filter_list</span></button>
               </div>
            </div>
            <div className="overflow-y-auto hide-scrollbar">
               <table className="w-full text-left">
                  <thead>
                     <tr className="bg-slate-50 dark:bg-slate-800/50 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                        <th className="px-8 py-5">Orden</th>
                        <th className="px-8 py-5">Paciente</th>
                        <th className="px-8 py-5">Urgencia</th>
                        <th className="px-8 py-5">Tiempo</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                     {orders.map((o) => (
                       <tr 
                         key={o.id} 
                         onClick={() => setSelectedOrderId(o.id.replace('#',''))}
                         className={`cursor-pointer transition-all ${selectedOrderId === o.id.replace('#','') ? 'bg-blue-50/50 dark:bg-blue-900/20' : 'hover:bg-slate-50 dark:hover:bg-slate-800/30'}`}
                       >
                          <td className="px-8 py-6 font-black text-sm text-blue-800 dark:text-blue-400">{o.id}</td>
                          <td className="px-8 py-6 font-black text-slate-900 dark:text-white text-sm uppercase">{o.patient}</td>
                          <td className="px-8 py-6">
                             <span className={`px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest border ${o.color}`}>{o.priority}</span>
                          </td>
                          <td className="px-8 py-6 text-sm font-bold text-slate-400">{o.time}</td>
                       </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         <div className="xl:col-span-5 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-xl p-10 flex flex-col gap-8">
               <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                       {orders.find(o => o.id.includes(selectedOrderId))?.patient || 'Seleccione Orden'}
                    </h4>
                    <p className="text-sm font-bold text-slate-400 mt-1 uppercase">ID: 44.201.202 • 34 Años</p>
                  </div>
                  <span className="bg-blue-50 dark:bg-blue-900/40 text-blue-800 dark:text-blue-400 text-[10px] px-3 py-1 rounded-full font-black uppercase tracking-widest">#{selectedOrderId}</span>
               </div>

               <div>
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center justify-between">
                     Muestras Requeridas
                     <span className="text-[9px] lowercase font-medium">Marque al recibir</span>
                  </h5>
                  <div className="space-y-4">
                     {samples.map((m) => (
                       <div 
                        key={m.id} 
                        onClick={() => toggleSample(m.id)}
                        className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between cursor-pointer group ${m.checked ? 'border-blue-800 bg-blue-50/20 dark:bg-blue-900/10' : 'border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30'}`}
                       >
                          <div className="flex items-center gap-5">
                             <div className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all ${m.checked ? 'bg-blue-800 border-blue-800' : 'border-slate-300 bg-white dark:bg-slate-700'}`}>
                                {m.checked && <span className="material-symbols-outlined text-white text-lg font-black">check</span>}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 dark:text-white">{m.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-0.5">{m.desc}</p>
                             </div>
                          </div>
                          <span className={`material-symbols-outlined text-xl ${m.checked ? 'text-blue-800' : 'text-slate-300'}`}>{m.icon}</span>
                       </div>
                     ))}
                  </div>
               </div>

               <div className="space-y-6 pt-4">
                  <h5 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Vista Previa de Etiquetas</h5>
                  <div className="grid grid-cols-2 gap-4">
                     {[1, 2].map(i => (
                        <div key={i} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 p-6 rounded-2xl text-center space-y-3 relative group">
                           <div className="h-8 w-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center rounded">
                              <div className="flex gap-[1.5px] px-4">
                                 {Array.from({length: 15}).map((_, i) => <div key={i} className={`w-[2px] bg-slate-900 dark:bg-slate-300 ${i%4===0?'h-6':'h-4'}`}></div>)}
                              </div>
                           </div>
                           <div className="text-[8px] font-black text-slate-900 dark:text-slate-200 uppercase tracking-tighter">
                              <p>M. RODRIGUEZ</p>
                              <p className="mt-1 text-slate-400 font-bold">#{selectedOrderId}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4 pt-4">
                  <button onClick={handlePrint} className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-slate-50">
                     <span className="material-symbols-outlined">print</span>
                     Imprimir
                  </button>
                  <button onClick={handleRegisterEntry} className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 transition-all">
                     <span className="material-symbols-outlined">how_to_reg</span>
                     Registrar
                  </button>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default SampleReception;
