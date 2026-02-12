
import React, { useState, useMemo } from 'react';

const ReportsPage: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState('cierre');
  const [outputFormat, setOutputFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const templates = [
    { id: 'cierre', name: 'Cierre de Caja Diario', desc: 'Resumen detallado de ingresos, egresos y...', icon: 'point_of_sale', color: 'text-blue-800 bg-blue-50' },
    { id: 'stats', name: 'Estadísticas de Atenciones', desc: 'Volumen de pacientes atendidos por especialidad...', icon: 'bar_chart', color: 'text-purple-600 bg-purple-50' },
    { id: 'prod', name: 'Productividad Médica', desc: 'Reporte de desempeño por profesional, diagnósticos...', icon: 'medical_services', color: 'text-green-600 bg-green-50' },
    { id: 'ingresos', name: 'Resumen de Ingresos', desc: 'Consolidado financiero mensual por aseguradora...', icon: 'payments', color: 'text-orange-600 bg-orange-50' },
  ];

  const previewData = useMemo(() => {
    if (selectedTemplate === 'cierre') {
        return [
            { time: '08:15 AM', id: 'TX-29381', concept: 'Consulta Cardiología', method: 'Tarjeta', amount: 'S/ 150.00' },
            { time: '08:42 AM', id: 'TX-29382', concept: 'Examen de Sangre Comp.', method: 'Efectivo', amount: 'S/ 85.00' },
            { time: '09:10 AM', id: 'TX-29383', concept: 'Ecografía Abdominal', method: 'Tarjeta', amount: 'S/ 200.00' },
        ];
    }
    return [
        { time: 'N/A', id: 'STAT-001', concept: 'Resumen Estadístico', method: 'Sistemas', amount: 'Calculando...' }
    ];
  }, [selectedTemplate]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      alert(`Reporte "${templates.find(t => t.id === selectedTemplate)?.name}" generado con éxito en formato ${outputFormat.toUpperCase()}.`);
    }, 2000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Reportes y Estadísticas</h1>
        <p className="text-slate-500 font-medium">Genere reportes personalizados para la toma de decisiones basada en datos.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        {/* Templates Selector */}
        <div className="xl:col-span-8 space-y-10">
           <div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight mb-8">Seleccione una Plantilla</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {templates.map(t => (
                   <div 
                    key={t.id} 
                    onClick={() => setSelectedTemplate(t.id)}
                    className={`p-8 rounded-[2.5rem] border-2 cursor-pointer transition-all relative group h-40 flex flex-col justify-between overflow-hidden ${
                      selectedTemplate === t.id 
                      ? 'border-blue-800 bg-blue-50/30 ring-4 ring-blue-800/5' 
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                    }`}
                   >
                      {selectedTemplate === t.id && (
                        <div className="absolute top-4 right-4 w-7 h-7 bg-blue-800 text-white rounded-full flex items-center justify-center shadow-lg animate-in zoom-in duration-300">
                           <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                      )}
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-sm ${t.color}`}>
                         <span className="material-symbols-outlined text-2xl font-bold">{t.icon}</span>
                      </div>
                      <div>
                         <h4 className="font-black text-slate-900 dark:text-white text-base tracking-tight leading-none">{t.name}</h4>
                         <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-2 truncate">{t.desc}</p>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Vista Previa Table (Imagen 2) */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">table_view</span>
                    <h3 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest">
                        Vista Previa: {templates.find(t => t.id === selectedTemplate)?.name}
                    </h3>
                 </div>
                 <span className="px-4 py-1.5 bg-white dark:bg-slate-800 rounded-xl text-[9px] font-black uppercase text-slate-400 border border-slate-100 dark:border-slate-700">Datos preliminares</span>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                          <th className="px-10 py-6">HORA</th>
                          <th className="px-10 py-6">TRANSACCIÓN ID</th>
                          <th className="px-10 py-6">CONCEPTO</th>
                          <th className="px-10 py-6 text-center">MÉTODO</th>
                          <th className="px-10 py-6 text-right">MONTO</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                       {previewData.map((row, i) => (
                         <tr key={i} className="hover:bg-slate-50/50 transition-all">
                            <td className="px-10 py-8 text-sm font-black text-slate-900 dark:text-white">{row.time}</td>
                            <td className="px-10 py-8 text-[11px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest">{row.id}</td>
                            <td className="px-10 py-8 text-sm font-bold text-slate-600 dark:text-slate-300">{row.concept}</td>
                            <td className="px-10 py-8 text-center">
                               <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-500 uppercase tracking-widest border border-slate-200 dark:border-slate-700">{row.method}</span>
                            </td>
                            <td className="px-10 py-8 text-right font-black text-slate-900 dark:text-white">{row.amount}</td>
                         </tr>
                       ))}
                       <tr className="bg-slate-50/50">
                          <td colSpan={4} className="px-10 py-8 text-right text-[11px] font-black text-slate-400 uppercase tracking-widest">Total Parcial</td>
                          <td className="px-10 py-8 text-right text-xl font-black text-blue-800 dark:text-blue-400">S/ 435.00</td>
                       </tr>
                    </tbody>
                 </table>
              </div>
           </div>
        </div>

        {/* Configuration Panel (Imagen 2 Right) */}
        <div className="xl:col-span-4 space-y-10">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 flex flex-col gap-10 sticky top-28">
              <div className="flex items-center gap-4">
                 <span className="material-symbols-outlined text-blue-800 font-black">tune</span>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Configuración</h3>
              </div>

              <div className="space-y-8">
                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">RANGO DE FECHAS</p>
                    <div className="grid grid-cols-2 gap-4">
                       <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-slate-400 ml-1 uppercase">Desde</label>
                          <input type="date" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold" defaultValue="2023-10-25" />
                       </div>
                       <div className="space-y-1.5">
                          <label className="text-[8px] font-black text-slate-400 ml-1 uppercase">Hasta</label>
                          <input type="date" className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs font-bold" defaultValue="2023-10-25" />
                       </div>
                    </div>
                 </div>

                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">SUCURSAL / ÁREA</p>
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-xl px-4 py-3 text-xs font-bold">
                       <option>Sede Principal - Ayacucho</option>
                       <option>Sede Norte</option>
                    </select>
                 </div>

                 <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">FORMATO DE SALIDA</p>
                    <div className="grid grid-cols-2 gap-4">
                       <button 
                        onClick={() => setOutputFormat('pdf')}
                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 group relative transition-all ${outputFormat === 'pdf' ? 'border-red-100 bg-red-50/50' : 'border-slate-50 bg-slate-50/50'}`}
                       >
                          {outputFormat === 'pdf' && (
                             <div className="absolute top-2 right-2 w-4 h-4 bg-red-600 text-white rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                <span className="material-symbols-outlined text-[8px] font-black">check</span>
                             </div>
                          )}
                          <span className="material-symbols-outlined text-red-600 text-3xl">picture_as_pdf</span>
                          <span className="text-[9px] font-black text-red-800 uppercase tracking-widest">Documento PDF</span>
                       </button>
                       <button 
                        onClick={() => setOutputFormat('xlsx')}
                        className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-3 group relative transition-all ${outputFormat === 'xlsx' ? 'border-green-100 bg-green-50/50' : 'border-slate-50 bg-slate-50/50'}`}
                       >
                          {outputFormat === 'xlsx' && (
                             <div className="absolute top-2 right-2 w-4 h-4 bg-green-600 text-white rounded-full flex items-center justify-center animate-in zoom-in duration-300">
                                <span className="material-symbols-outlined text-[8px] font-black">check</span>
                             </div>
                          )}
                          <span className="material-symbols-outlined text-green-600 text-3xl">table_chart</span>
                          <span className="text-[9px] font-black text-green-800 uppercase tracking-widest">Excel .XLSX</span>
                       </button>
                    </div>
                 </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
                 <button 
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-3 active:scale-95 transition-all disabled:opacity-50"
                 >
                    <span className={`material-symbols-outlined text-xl ${isGenerating ? 'animate-spin' : ''}`}>
                        {isGenerating ? 'sync' : 'download_done'}
                    </span>
                    {isGenerating ? 'Generando...' : 'Generar Reporte'}
                 </button>
                 <button onClick={() => alert("Simulando envío de reporte por email...")} className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-900 dark:text-white flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                    <span className="material-symbols-outlined text-lg">send</span>
                    Enviar por Correo
                 </button>
              </div>

              <div className="bg-blue-50/40 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/40 rounded-3xl p-6 flex gap-4">
                 <div className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-base">help</span>
                 </div>
                 <div>
                    <p className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-tight">¿Necesita ayuda?</p>
                    <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed mt-1">Los reportes financieros se actualizan cada 30 minutos. Para datos en tiempo real, contacte a soporte TI.</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
