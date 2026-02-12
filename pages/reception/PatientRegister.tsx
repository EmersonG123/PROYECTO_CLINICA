
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PatientRegister: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isValidatingDni, setIsValidatingDni] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsRegistered(true);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const simulateDniValidation = () => {
    setIsValidatingDni(true);
    setTimeout(() => setIsValidatingDni(false), 1500);
  };

  // Pantalla de Registro Exitoso
  if (isRegistered) {
    return (
      <div className="max-w-4xl mx-auto py-10 animate-in zoom-in-95 duration-500 text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mb-8 shadow-[0_20px_50px_rgba(34,197,94,0.3)] border-[8px] border-white dark:border-slate-800">
          <span className="material-symbols-outlined text-5xl font-black">check</span>
        </div>
        
        <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase mb-4">¡Registro Exitoso!</h2>
        <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-lg mb-12">
          El paciente ha sido afiliado correctamente al sistema de la Clínica Ayacucho.
        </p>

        <div className="bg-white dark:bg-slate-900 w-full rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-12 text-left space-y-10 mb-12">
          <div className="flex items-center gap-6 pb-8 border-b border-slate-50 dark:border-slate-800">
             <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-800 dark:text-blue-400 font-black text-xl shadow-sm">
                JP
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">PACIENTE REGISTRADO</p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Juan Pérez Rodríguez</h4>
             </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NÚMERO DNI</p>
                <p className="text-base font-black text-slate-900 dark:text-white uppercase tracking-tight">45889922</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">NRO. HISTORIA</p>
                <p className="text-base font-black text-blue-800 dark:text-blue-400 uppercase tracking-tight">#HC-2024-0931</p>
             </div>
             <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ESTADO AFILIACIÓN</p>
                <span className="px-3 py-1 bg-green-50 text-green-600 text-[10px] font-black rounded-lg border border-green-100 uppercase tracking-widest">Activo</span>
             </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-2xl">
           <button 
             onClick={() => navigate('/reception/citas/nueva')}
             className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
           >
              <span className="material-symbols-outlined">calendar_add_on</span>
              Agendar Cita Ahora
           </button>
           <button className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-5 rounded-2xl font-black text-xs uppercase tracking-widest text-slate-900 dark:text-white flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
              <span className="material-symbols-outlined">print</span>
              Imprimir Carnet
           </button>
        </div>

        <button 
          onClick={() => navigate('/reception/pacientes')}
          className="mt-12 text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-blue-800 transition-colors flex items-center gap-2"
        >
           <span className="material-symbols-outlined text-sm">arrow_back</span>
           Volver al Listado de Pacientes
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500 pb-32">
      {/* Breadcrumb compatible con la imagen */}
      <div className="flex items-center gap-2 text-slate-400 text-xs font-medium mb-6">
        <span>Inicio</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span>Pacientes</span>
        <span className="material-symbols-outlined text-sm">chevron_right</span>
        <span className="text-slate-900 dark:text-white font-bold">Nuevo Registro</span>
      </div>

      {/* Título de la Sección */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            {currentStep === 1 ? "Registro de Paciente" : 
             currentStep === 2 ? "Registro de Paciente - MINSA (Opcional)" : 
             "Validación Biométrica"}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-base uppercase tracking-widest">
            {currentStep === 1 && "Paso 1 de 3: Datos Personales"}
            {currentStep === 2 && "Paso 2 de 3: Filiación MINSA"}
            {currentStep === 3 && "Paso 3 de 3: Biometría (Opcional)"}
          </p>
        </div>
        
        <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-5 py-2.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-sm">
           <span className="material-symbols-outlined text-slate-400 text-base">schedule</span>
           <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Guardado hace 5 min</span>
        </div>
      </div>

      {/* Stepper Visual (Imagen Style) */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center w-full max-w-2xl justify-between relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 -translate-y-[1.8rem]"></div>
          
          {/* Step 1 */}
          <div className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep === 1 ? 'bg-blue-800 text-white shadow-lg' : currentStep > 1 ? 'bg-green-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
              <span className="material-symbols-outlined text-xl">{currentStep > 1 ? 'check' : 'person'}</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep === 1 ? 'text-blue-800 border-b-2 border-blue-800 pb-1' : currentStep > 1 ? 'text-green-600' : 'text-slate-400'}`}>1. Datos Personales</span>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep === 2 ? 'bg-blue-800 text-white shadow-lg' : currentStep > 2 ? 'bg-green-500 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>
              <span className="material-symbols-outlined text-xl">description</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep === 2 ? 'text-blue-800 border-b-2 border-blue-800 pb-1' : 'text-slate-400'}`}>2. Filiación MINSA</span>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${currentStep === 3 ? 'bg-blue-800 text-white shadow-lg' : 'bg-slate-100 text-slate-400'}`}>
              <span className="material-symbols-outlined text-xl">fingerprint</span>
            </div>
            <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep === 3 ? 'text-blue-800 border-b-2 border-blue-800 pb-1' : 'text-slate-400'}`}>3. Biometría</span>
          </div>
        </div>
      </div>

      {/* Contenido Dinámico */}
      <div className="min-h-[450px]">
        {currentStep === 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-[1.5rem] border border-slate-200 dark:border-slate-800 p-12 shadow-sm space-y-12 animate-in slide-in-from-left-4 duration-500">
             {/* DNI */}
             <div className="max-w-md space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Documento de Identidad (DNI) <span className="text-red-500">*</span></label>
                <div className="relative group">
                  <input type="text" maxLength={8} className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all pr-14" placeholder="Ingrese 8 dígitos" />
                  <button onClick={simulateDniValidation} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-slate-50 dark:bg-slate-700 rounded-xl flex items-center justify-center text-blue-800 hover:bg-blue-50 transition-all">
                    {isValidatingDni ? <div className="w-4 h-4 border-2 border-blue-800 border-t-transparent rounded-full animate-spin"></div> : <span className="material-symbols-outlined font-black">search</span>}
                  </button>
                </div>
                <p className="text-[10px] font-medium text-slate-400 ml-1">Haga clic en la lupa para validar.</p>
             </div>

             {/* Nombres y Apellidos */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2.5">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Nombres <span className="text-red-500">*</span></label>
                   <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 font-bold outline-none focus:border-blue-800 transition-all" />
                </div>
                <div className="space-y-2.5">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Apellido Paterno <span className="text-red-500">*</span></label>
                   <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 font-bold outline-none focus:border-blue-800 transition-all" />
                </div>
                <div className="space-y-2.5">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Apellido Materno <span className="text-red-500">*</span></label>
                   <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 font-bold outline-none focus:border-blue-800 transition-all" />
                </div>
             </div>

             {/* Datos Extra */}
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-2.5">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Fecha de Nacimiento <span className="text-red-500">*</span></label>
                   <div className="relative">
                      <input type="date" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 font-bold outline-none focus:border-blue-800 transition-all appearance-none" />
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">calendar_month</span>
                   </div>
                </div>
                <div className="space-y-2.5">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Sexo <span className="text-red-500">*</span></label>
                   <div className="relative">
                      <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 font-bold outline-none focus:border-blue-800 transition-all appearance-none">
                         <option>Seleccionar</option>
                         <option>Masculino</option>
                         <option>Femenino</option>
                         <option>Otro</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                   </div>
                </div>
                <div className="space-y-2.5">
                   <label className="text-sm font-bold text-slate-700 dark:text-slate-300">Celular <span className="text-red-500">*</span></label>
                   <input type="tel" className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3.5 font-bold outline-none focus:border-blue-800 transition-all" placeholder="999 999 999" />
                </div>
             </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
             {/* Bloque 1: Datos Sociodemográficos */}
             <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 dark:border-slate-800">
                   <h3 className="font-black text-slate-900 dark:text-white text-lg">Datos Sociodemográficos</h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Grado de Instrucción <span className="text-slate-400 font-normal">(Opcional)</span></label>
                      <div className="relative">
                         <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-medium text-slate-700 dark:text-white appearance-none outline-none">
                            <option>Seleccione</option>
                            <option>Primaria Completa</option>
                            <option>Secundaria Completa</option>
                            <option>Superior Técnico</option>
                            <option>Superior Universitario</option>
                         </select>
                         <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Ocupación <span className="text-slate-400 font-normal">(Opcional)</span></label>
                      <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-medium text-slate-700 outline-none" placeholder="Ej. Ingeniero, Estudiante, Comerciante" />
                   </div>
                </div>
             </div>

             {/* Bloque 2: Lugar de Nacimiento (Ubigeo) */}
             <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 dark:border-slate-800">
                   <h3 className="font-black text-slate-900 dark:text-white text-lg">Lugar de Nacimiento (Ubigeo)</h3>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                   <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Departamento <span className="text-slate-400 font-normal">(Opcional)</span></label>
                      <div className="relative">
                         <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-medium text-slate-700 dark:text-white appearance-none outline-none">
                            <option>Seleccione Departamento</option>
                            <option>Ayacucho</option>
                            <option>Lima</option>
                         </select>
                         <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Provincia <span className="text-slate-400 font-normal">(Opcional)</span></label>
                      <div className="relative">
                         <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-medium text-slate-700 dark:text-white appearance-none outline-none">
                            <option>Seleccione Provincia</option>
                         </select>
                         <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                   </div>
                   <div className="space-y-3">
                      <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Distrito <span className="text-slate-400 font-normal">(Opcional)</span></label>
                      <div className="relative">
                         <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-medium text-slate-700 dark:text-white appearance-none outline-none">
                            <option>Seleccione Distrito</option>
                         </select>
                         <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                      </div>
                   </div>
                </div>

                <div className="p-8 pt-0 space-y-8">
                   <div className="space-y-6">
                      <h4 className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-widest">Residencia Actual</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Dirección Actual <span className="text-slate-400 font-normal">(Opcional)</span></label>
                            <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-medium text-slate-700 outline-none" placeholder="Av. Independencia 123, Urb. Mariscal Cáceres" />
                         </div>
                         <div className="space-y-3">
                            <label className="text-sm font-bold text-slate-500 dark:text-slate-400">Referencia <span className="text-slate-400 font-normal">(Opcional)</span></label>
                            <input className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 font-medium text-slate-700 outline-none" placeholder="Frente al Parque Sucre" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 shadow-sm py-20 px-10 flex flex-col items-center justify-center space-y-10 animate-in zoom-in-95 duration-500 text-center">
             <div className="w-32 h-32 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-800 dark:text-blue-400 shadow-xl">
                <span className="material-symbols-outlined text-6xl font-black">fingerprint</span>
             </div>
             <div className="space-y-3">
                <h4 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Validación Biométrica (Opcional)</h4>
                <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto font-medium leading-relaxed">
                   Puede capturar la huella dactilar ahora para mayor seguridad, o bien omitir este paso y finalizar el registro.
                </p>
             </div>
             <button className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-14 py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest shadow-2xl active:scale-95 transition-all">
                Iniciar Captura
             </button>
          </div>
        )}
      </div>

      {/* Footer de Acciones (Calco de imagen) */}
      <div className="mt-10 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 p-8 rounded-b-[2rem] flex items-center justify-between fixed bottom-0 left-72 right-0 shadow-[0_-10px_30px_rgba(0,0,0,0.05)] z-40">
        <button 
          onClick={() => currentStep > 1 ? handleBack() : navigate('/reception/pacientes')} 
          className="text-sm font-bold text-slate-400 hover:text-red-500 transition-colors px-4 py-2"
        >
          {currentStep > 1 ? "Volver Atrás" : "Cancelar"}
        </button>
        
        <div className="flex gap-4">
          <button className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white px-8 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
            Guardar borrador
          </button>
          
          <button 
            onClick={handleNext}
            className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-900/10 active:scale-95 transition-all flex items-center gap-3"
          >
            {currentStep === 3 ? "Finalizar Registro" : "Siguiente Paso"}
            <span className="material-symbols-outlined text-lg">
               {currentStep === 3 ? "done_all" : "arrow_forward"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientRegister;
