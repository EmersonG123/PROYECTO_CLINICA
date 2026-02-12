
import React, { useState, useRef } from 'react';

const ResultManagement: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSigned, setIsSigned] = useState(false);
  const [isReleased, setIsReleased] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleStepAction = (step: number) => {
    if (step === 2) alert("Iniciando validación técnica de parámetros...");
    setCurrentStep(step);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
      alert(`Archivo "${file.name}" cargado correctamente.`);
      if (currentStep < 3) setCurrentStep(3);
    }
  };

  const handleSign = () => {
    if (currentStep < 2) {
      alert("Primero debe completar la validación técnica.");
      return;
    }
    setIsSigned(true);
    setCurrentStep(3);
    alert("Documento firmado digitalmente con éxito.");
  };

  const handleRelease = () => {
    if (!isSigned) {
      alert("No se puede liberar un resultado sin firma digital.");
      return;
    }
    setCurrentStep(4);
    setIsReleased(true);
    alert("Resultados liberados al portal del paciente y médico.");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Resultados de Laboratorio</h1>
          <p className="text-slate-500 font-medium mt-1">Flujo de trabajo para generación, firma y liberación de informes.</p>
        </div>
        <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-8 py-3.5 rounded-2xl font-black text-sm flex items-center gap-3 hover:bg-slate-50 transition-all dark:text-white">
          <span className="material-symbols-outlined">history</span>
          Historial de Envío
        </button>
      </div>

      {/* Stepper Interactivo */}
      <div className="flex items-center gap-6 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-x-auto hide-scrollbar">
         {[
           { id: 1, name: 'Procesamiento', icon: 'biotech' },
           { id: 2, name: 'Validación', icon: 'fact_check' },
           { id: 3, name: 'Firma Digital', icon: 'edit_square' },
           { id: 4, name: 'Liberación', icon: 'send' }
         ].map((s, i) => (
           <React.Fragment key={i}>
              <div 
                onClick={() => !isReleased && handleStepAction(s.id)}
                className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all shrink-0 cursor-pointer ${
                currentStep === s.id ? 'bg-blue-800 text-white shadow-xl shadow-blue-900/20' : 
                currentStep > s.id ? 'text-green-600 bg-green-50/50 dark:bg-green-900/20' : 'text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'
              }`}>
                 <span className={`material-symbols-outlined text-lg ${currentStep > s.id ? 'font-bold' : ''}`}>
                   {currentStep > s.id ? 'check_circle' : s.icon}
                 </span>
                 <span className="text-[10px] font-black uppercase tracking-widest">{s.id}. {s.name}</span>
              </div>
              {i < 3 && <span className="material-symbols-outlined text-slate-300 dark:text-slate-700 shrink-0">chevron_right</span>}
           </React.Fragment>
         ))}
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden">
         <div className="p-10 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-50 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-800/10">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left w-full md:w-auto">
               <div className={`w-20 h-20 rounded-full flex items-center justify-center shadow-inner shrink-0 ${isReleased ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                  <span className="material-symbols-outlined text-4xl font-black">{isReleased ? 'check' : 'hourglass_top'}</span>
               </div>
               <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                    {isReleased ? 'Informe Liberado' : currentStep === 1 ? 'En Procesamiento' : currentStep === 2 ? 'En Validación' : 'Pendiente de Firma'}
                  </h3>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mt-1.5 text-sm font-medium text-slate-400 uppercase tracking-widest">
                     <span className="font-black text-blue-800 dark:text-blue-400">#ORD-891</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
                     <span>Carlos Ruiz</span>
                     <span className="w-1 h-1 bg-slate-300 rounded-full hidden md:block"></span>
                     <span>Bioquímica Sanguínea</span>
                  </div>
               </div>
            </div>
            <div className="text-center md:text-right space-y-2">
               <button onClick={() => setCurrentStep(2)} className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all border border-slate-200 dark:border-slate-700">Validar Ahora</button>
            </div>
         </div>

         <div className="p-12 grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 space-y-10 relative group">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <span className="material-symbols-outlined text-blue-800 dark:text-blue-400">description</span>
                     <h5 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Generar Documento</h5>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">v1.0 {isSigned ? 'Final' : 'Borrador'}</span>
               </div>
               
               <div className="aspect-[3/4] bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center p-12 text-center group-hover:shadow-xl transition-all overflow-hidden">
                  <div className="w-full h-full bg-slate-50/50 dark:bg-slate-800/20 border border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center gap-4 p-8 relative">
                     {isSigned && (
                       <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-4 border-blue-800/20 text-blue-800/20 text-4xl font-black uppercase rotate-[-25deg] pointer-events-none select-none p-4 tracking-[0.2em]">
                         FIRMADO
                       </div>
                     )}
                     <div className="w-24 h-32 bg-slate-200/50 dark:bg-slate-700/50 rounded flex flex-col gap-2 p-3">
                        <div className="h-1.5 w-full bg-slate-300 dark:bg-slate-600 rounded"></div>
                        <div className="h-1.5 w-full bg-slate-300 dark:bg-slate-600 rounded"></div>
                        <div className="h-1.5 w-3/4 bg-slate-300 dark:bg-slate-600 rounded"></div>
                        <div className="mt-auto h-4 w-4 bg-blue-500/20 rounded-full self-end"></div>
                     </div>
                     <p className="text-[11px] font-bold text-slate-400 dark:text-slate-500 leading-relaxed max-w-[200px]">Vista previa del informe técnico generado automáticamente.</p>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  <button className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all">
                     <span className="material-symbols-outlined">visibility</span>
                     Ver PDF
                  </button>
                  <button 
                    onClick={handleSign}
                    disabled={isSigned}
                    className={`py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl transition-all active:scale-95 ${
                      isSigned ? 'bg-green-600 text-white shadow-green-900/10' : 'bg-blue-800 text-white shadow-blue-900/10'
                    }`}
                  >
                     <span className="material-symbols-outlined">{isSigned ? 'verified' : 'ink_pen'}</span>
                     {isSigned ? 'Firmado' : 'Firmar PDF'}
                  </button>
               </div>
            </div>

            {/* Arrastrar Archivo Funcional */}
            <div className="bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] p-10 flex flex-col h-full space-y-10">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                     <span className="material-symbols-outlined text-blue-800 dark:text-blue-400">upload_file</span>
                     <h5 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Subir Archivo Externo</h5>
                  </div>
               </div>

               <div 
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => { e.preventDefault(); handleFileUpload({ target: { files: e.dataTransfer.files } } as any); }}
                  className="flex-1 flex flex-col items-center justify-center bg-white dark:bg-slate-900 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-[2.5rem] p-12 text-center group cursor-pointer hover:border-blue-500 hover:bg-blue-50/10 transition-all"
               >
                  <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" />
                  <div className="w-20 h-20 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center text-blue-800 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                     <span className="material-symbols-outlined text-4xl">cloud_upload</span>
                  </div>
                  <h6 className="font-black text-lg text-slate-900 dark:text-white uppercase tracking-tight">{uploadedFile || 'Arrastra tu archivo aquí'}</h6>
                  <p className="text-sm font-medium text-slate-400 mt-2">o haz clic para buscar en tu equipo</p>
               </div>

               <div className="bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-3xl flex gap-6 text-blue-800 dark:text-blue-400 border border-blue-100 dark:border-blue-800">
                  <span className="material-symbols-outlined text-2xl shrink-0">info</span>
                  <p className="text-[11px] font-medium leading-relaxed opacity-80 uppercase tracking-widest">Para adjuntar escaneos manuales o resultados de terceros.</p>
               </div>
            </div>
         </div>

         <div className="p-10 bg-slate-50/30 dark:bg-slate-800/20 border-t border-slate-50 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8">
            <button onClick={() => { setCurrentStep(1); setIsSigned(false); setIsReleased(false); }} className="text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] hover:text-red-500 transition-colors">Anular Proceso</button>
            <div className="flex gap-4 w-full md:w-auto">
               <button 
                  onClick={handleRelease}
                  disabled={!isSigned || isReleased}
                  className={`flex-1 md:flex-none px-14 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-4 active:scale-95 transition-all ${
                    !isSigned ? 'bg-slate-300 text-slate-500 cursor-not-allowed opacity-50' : 
                    isReleased ? 'bg-green-600 text-white' : 'bg-blue-800 text-white shadow-blue-900/20'
                  }`}
               >
                  {isReleased ? 'Liberado Exitosamente' : 'Liberar Resultados'}
                  <span className="material-symbols-outlined text-xl">{isReleased ? 'done_all' : 'arrow_forward'}</span>
               </button>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ResultManagement;
