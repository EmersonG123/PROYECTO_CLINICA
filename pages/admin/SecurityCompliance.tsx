
import React, { useState } from 'react';

const SecurityCompliance: React.FC = () => {
  const [twoFactor, setTwoFactor] = useState(true);
  const [deviceTrust, setDeviceTrust] = useState(true);
  const [ipRestricted, setIpRestricted] = useState(false);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [passwordRotation, setPasswordRotation] = useState(90);
  const [sessionTimeout, setSessionTimeout] = useState('30 Minutos');

  const handleSave = () => {
    alert("Políticas de seguridad actualizadas. Se aplicarán a todos los usuarios en el próximo inicio de sesión.");
  };

  const handleManualBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      alert("Copia de seguridad generada y almacenada en el servidor de respaldo (Bóveda Ayacucho-01).");
    }, 3000);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-20">
      {/* Breadcrumb e Intro */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
            <span>Inicio</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span>Admin</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-blue-800">Seguridad y Cumplimiento</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Seguridad y Cumplimiento</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-slate-50 dark:bg-slate-900/30 p-2 rounded-[2rem]">
         <p className="text-slate-500 font-medium max-w-3xl px-6">
           Gestione las políticas de seguridad, auditoría de accesos y cumplimiento normativo (MINSA/SUSALUD) para garantizar la integridad de los datos de la clínica.
         </p>
         <div className="flex gap-4 px-6 pb-4 lg:pb-0">
            <button 
                onClick={() => alert("Redirigiendo a Auditoría...")}
                className="bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 px-6 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 dark:text-slate-300 flex items-center gap-3 hover:bg-slate-50 transition-all"
            >
               <span className="material-symbols-outlined text-lg">history</span>
               Ver Logs de Auditoría
            </button>
            <button 
                onClick={handleSave}
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3"
            >
               <span className="material-symbols-outlined text-lg">save</span>
               Guardar Cambios
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Políticas de Acceso (2FA) */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-sm">
                 <span className="material-symbols-outlined text-2xl font-bold">verified_user</span>
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Políticas de Acceso (2FA)</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Configuración de autenticación multifactor</p>
              </div>
           </div>

           <div className="space-y-8">
              <div className="flex items-center justify-between">
                 <div className="max-w-[70%]">
                    <p className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">Autenticación de Dos Factores (Obligatorio)</p>
                    <p className="text-xs text-slate-400 mt-1">Requiere 2FA para roles administrativos y médicos.</p>
                 </div>
                 <button onClick={() => setTwoFactor(!twoFactor)} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${twoFactor ? 'bg-blue-800' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${twoFactor ? 'right-1' : 'left-1'}`}></div>
                    {twoFactor && <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-white text-[10px] font-bold">check</span>}
                 </button>
              </div>

              <div className="flex items-center justify-between">
                 <div className="max-w-[70%]">
                    <p className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">Confianza en Dispositivos</p>
                    <p className="text-xs text-slate-400 mt-1">Recordar navegadores por 30 días.</p>
                 </div>
                 <button onClick={() => setDeviceTrust(!deviceTrust)} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${deviceTrust ? 'bg-blue-800' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${deviceTrust ? 'right-1' : 'left-1'}`}></div>
                    {deviceTrust && <span className="material-symbols-outlined absolute left-2 top-1/2 -translate-y-1/2 text-white text-[10px] font-bold">check</span>}
                 </button>
              </div>

              <div className="flex items-center justify-between">
                 <div className="max-w-[70%]">
                    <p className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">Restricción de IP</p>
                    <p className="text-xs text-slate-400 mt-1">Permitir acceso solo desde la red interna de la clínica.</p>
                 </div>
                 <button onClick={() => setIpRestricted(!ipRestricted)} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${ipRestricted ? 'bg-blue-800' : 'bg-slate-200'}`}>
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${ipRestricted ? 'right-1' : 'left-1'}`}></div>
                 </button>
              </div>
           </div>
        </div>

        {/* Gestión de Contraseñas */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-2xl flex items-center justify-center shadow-sm">
                 <span className="material-symbols-outlined text-2xl font-bold">password</span>
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Gestión de Contraseñas</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Reglas de complejidad y rotación</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DÍAS PARA ROTACIÓN</label>
                 <div className="relative">
                    <input 
                        type="number" 
                        value={passwordRotation}
                        onChange={(e) => setPasswordRotation(Number(e.target.value))}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 dark:text-white" 
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">Días</span>
                 </div>
              </div>
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">LONGITUD MÍNIMA</label>
                 <div className="relative">
                    <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 dark:text-white" defaultValue="12" />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300 uppercase">Caracteres</span>
                 </div>
              </div>
           </div>

           <div className="space-y-4 pt-4 border-t border-slate-50 dark:border-slate-800">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">REQUISITOS DE COMPLEJIDAD</p>
              {[
                { label: 'Requerir mayúsculas y minúsculas', checked: true },
                { label: 'Requerir al menos un número', checked: true },
                { label: 'Requerir caracteres especiales (!@#$)', checked: true }
              ].map((req, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                   <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${req.checked ? 'bg-blue-800 border-blue-800' : 'border-slate-200'}`}>
                      {req.checked && <span className="material-symbols-outlined text-white text-sm font-bold">check</span>}
                   </div>
                   <span className="text-sm font-bold text-slate-700 dark:text-slate-300 uppercase tracking-tight">{req.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Control de Sesiones */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
           <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center shadow-sm">
                 <span className="material-symbols-outlined text-2xl font-bold">timer</span>
              </div>
              <div>
                 <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Control de Sesiones</h3>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Tiempos de inactividad y expiración</p>
              </div>
           </div>

           <div className="space-y-6">
              <div className="space-y-2.5">
                 <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Cierre de sesión automático (Inactividad)</label>
                 <div className="relative">
                    <select 
                        value={sessionTimeout}
                        onChange={(e) => setSessionTimeout(e.target.value)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white appearance-none outline-none focus:ring-2 focus:ring-blue-800 transition-all"
                    >
                       <option>30 Minutos</option>
                       <option>1 Hora</option>
                       <option>4 Horas</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400">expand_more</span>
                 </div>
                 <p className="text-[10px] font-medium text-slate-400 italic mt-2 ml-1">El usuario será desconectado si no realiza ninguna acción.</p>
              </div>

              <div className="pt-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                 <div>
                    <p className="font-black text-slate-900 dark:text-white text-sm uppercase tracking-tight">Forzar cierre global</p>
                    <p className="text-xs text-slate-400 mt-1">Cierra todas las sesiones activas excepto la actual.</p>
                 </div>
                 <button onClick={() => alert("Simulando cierre de todas las sesiones activas...")} className="px-6 py-3 bg-red-50 text-red-600 border border-red-100 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-red-100 transition-all active:scale-95">Cerrar Todas</button>
              </div>
           </div>
        </div>

        {/* Respaldos de Datos */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                 <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center shadow-sm">
                    <span className="material-symbols-outlined text-2xl font-bold">settings_backup_restore</span>
                 </div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Respaldos de Datos</h3>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Copias de seguridad automáticas</p>
                 </div>
              </div>
              <span className="px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100 flex items-center gap-2">
                 <span className="w-1.5 h-1.5 bg-green-600 rounded-full animate-pulse"></span>
                 Activo
              </span>
           </div>

           <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-[1.5rem] border border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">ÚLTIMO RESPALDO EXITOSO</p>
                 <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Hoy, 02:00 AM</p>
              </div>
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center shadow-lg">
                 <span className="material-symbols-outlined text-sm font-black">check</span>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">FRECUENCIA</label>
                 <div className="relative">
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 dark:text-white appearance-none outline-none">
                       <option>Diario (02:00 AM)</option>
                       <option>Semanal (Domingo)</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">expand_more</span>
                 </div>
              </div>
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RETENCIÓN</label>
                 <div className="relative">
                    <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-slate-900 dark:text-white appearance-none outline-none">
                       <option>90 Días</option>
                       <option>1 Año</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300">expand_more</span>
                 </div>
              </div>
           </div>

           <button 
                onClick={handleManualBackup}
                disabled={isBackingUp}
                className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-900 dark:text-white flex items-center justify-center gap-3 shadow-sm hover:bg-slate-50 transition-all disabled:opacity-50"
           >
              <span className={`material-symbols-outlined text-lg ${isBackingUp ? 'animate-spin' : ''}`}>
                {isBackingUp ? 'sync' : 'cloud_upload'}
              </span>
              {isBackingUp ? 'Generando Copia...' : 'Iniciar Respaldo Manual Ahora'}
           </button>
        </div>
      </div>

      {/* Cumplimiento Normativo Footer (Imagen 2 Bottom) */}
      <div className="bg-slate-50 dark:bg-slate-900/40 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-8 flex flex-col md:flex-row items-center justify-between gap-8 mt-10">
         <div className="flex items-center gap-6">
            <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 shadow-sm">
               <span className="material-symbols-outlined text-3xl">verified_user</span>
            </div>
            <div>
               <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Cumplimiento Normativo</h4>
               <p className="text-sm font-medium text-slate-400 mt-2 uppercase tracking-widest">Estándares MINSA y SUSALUD</p>
            </div>
         </div>
         <button 
            onClick={() => alert("Accediendo a repositorio normativo interno...")}
            className="text-[11px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-[0.2em] hover:underline"
         >
            Ver Documentación Legal
         </button>
      </div>
    </div>
  );
};

export default SecurityCompliance;
