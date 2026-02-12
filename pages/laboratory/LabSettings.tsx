
import React, { useState, useRef } from 'react';

const LabSettings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Estado para el perfil técnico
  const [profile, setProfile] = useState({
    name: 'Ana María Suárez López',
    cmp: 'CBP-892310',
    email: 'a.suarez@ayacucho.cli',
    photo: 'https://i.pravatar.cc/200?u=lab1'
  });

  // Estado para notificaciones
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifCritical, setNotifCritical] = useState(true);
  const [reactiveThreshold, setReactiveThreshold] = useState(15);
  
  // Estado para equipos (dinámico)
  const [equipments, setEquipments] = useState([
    { id: 1, name: 'Sysmex XN-1000', type: 'Hematología', status: 'Operativo', lastMaint: '15/04/2024' },
    { id: 2, name: 'Roche Cobas c501', type: 'Bioquímica', status: 'Requiere Calibración', lastMaint: '20/05/2024', alert: true },
    { id: 3, name: 'Mindray BC-5000', type: 'Hematología', status: 'Stand-by', lastMaint: '10/01/2024' }
  ]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddEquipment = () => {
    const name = prompt("Ingrese el nombre del nuevo equipo:");
    if (name) {
      const newEq = {
        id: Date.now(),
        name,
        type: 'General',
        status: 'Pendiente',
        lastMaint: new Date().toLocaleDateString('es-ES'),
      };
      setEquipments(prev => [...prev, newEq]);
    }
  };

  const handleEditEquipment = (id: number) => {
    const eq = equipments.find(e => e.id === id);
    const newName = prompt(`Editar nombre del equipo:`, eq?.name);
    if (newName) {
      setEquipments(prev => prev.map(e => e.id === id ? { ...e, name: newName } : e));
    }
  };

  const handleChangePin = () => {
    const currentPin = prompt("Ingrese su PIN actual:");
    if (currentPin) {
      const newPin = prompt("Ingrese su nuevo PIN de firma:");
      if (newPin && newPin.length >= 4) {
        alert("PIN de firma digital actualizado correctamente.");
      } else {
        alert("Error: El PIN debe tener al menos 4 dígitos.");
      }
    }
  };

  const handleReset = () => {
    if (confirm("¿Estás seguro de restablecer los ajustes a los valores por defecto?")) {
      setNotifEmail(true);
      setNotifCritical(true);
      setReactiveThreshold(15);
      alert("Ajustes restablecidos.");
    }
  };

  const handleSave = () => {
    // Simulación de guardado
    alert("¡Configuración guardada! Los cambios se han aplicado a su perfil de laboratorio.");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase">Configuración de Laboratorio</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Gestión de parámetros técnicos, equipos y preferencias del personal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Lado Izquierdo: General & Equipos */}
        <div className="lg:col-span-8 space-y-8">
           {/* Perfil Técnico */}
           <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                 <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-bold">account_circle</span>
                 <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Perfil Técnico</h3>
              </div>
              <div className="p-10 flex flex-col md:flex-row items-center gap-10">
                 <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <img src={profile.photo} className="w-28 h-28 rounded-3xl object-cover ring-4 ring-slate-50 dark:ring-slate-800 shadow-lg group-hover:scale-105 transition-transform" alt="Perfil" />
                    <div className="absolute inset-0 bg-blue-900/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <span className="material-symbols-outlined text-white text-xl">photo_camera</span>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                 </div>
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nombre Completo</p>
                       <input 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="text-base font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-blue-800 outline-none"
                       />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Nro. Colegiatura</p>
                       <input 
                        value={profile.cmp} 
                        onChange={(e) => setProfile({...profile, cmp: e.target.value})}
                        className="text-base font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-blue-800 outline-none"
                       />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Correo Electrónico</p>
                       <input 
                        value={profile.email} 
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="text-base font-black text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-2 w-full focus:ring-2 focus:ring-blue-800 outline-none"
                       />
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Firma Digital</p>
                       <div className="flex items-center gap-2">
                          <span className="px-2.5 py-1 bg-green-50 text-green-700 text-[9px] font-black rounded-lg border border-green-100 uppercase tracking-widest">Vinculada</span>
                          <button className="text-[9px] font-black text-blue-800 hover:underline uppercase">Actualizar Certificado</button>
                       </div>
                    </div>
                 </div>
              </div>
           </section>

           {/* Gestión de Equipos Interconectados */}
           <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-bold">settings_input_component</span>
                    <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Equipos de Análisis</h3>
                 </div>
                 <button 
                  onClick={handleAddEquipment}
                  className="bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-400 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all"
                 >
                    Añadir Equipo
                 </button>
              </div>
              <div className="p-8 space-y-4">
                 {equipments.map((eq) => (
                   <div key={eq.id} className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-100 dark:border-slate-700 group hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-6">
                         <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${eq.alert ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-800'} dark:bg-slate-800`}>
                            <span className="material-symbols-outlined text-2xl">{eq.type === 'Hematología' ? 'bloodtype' : 'science'}</span>
                         </div>
                         <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{eq.name}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{eq.type} • Mantenimiento: {eq.lastMaint}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border ${eq.alert ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
                            {eq.status}
                         </span>
                         <button 
                          onClick={() => handleEditEquipment(eq.id)}
                          className="material-symbols-outlined text-slate-300 hover:text-blue-800 transition-colors"
                         >
                            tune
                         </button>
                         <button 
                          onClick={() => { if(confirm("¿Eliminar equipo?")) setEquipments(prev => prev.filter(e => e.id !== eq.id)) }}
                          className="material-symbols-outlined text-slate-300 hover:text-red-500 transition-colors"
                         >
                            delete
                         </button>
                      </div>
                   </div>
                 ))}
              </div>
           </section>
        </div>

        {/* Lado Derecho: Alertas & Preferencias */}
        <div className="lg:col-span-4 space-y-8">
           {/* Preferencias de Alerta */}
           <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Alertas de Notificación</h4>
              
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="pr-4">
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase">Resultados Críticos</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1">Aviso inmediato por SMS/Push.</p>
                    </div>
                    <button onClick={() => setNotifCritical(!notifCritical)} className={`w-12 h-6 rounded-full relative transition-all ${notifCritical ? 'bg-blue-800' : 'bg-slate-200'}`}>
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${notifCritical ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="pr-4">
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase">Resumen por Correo</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1">Reporte diario al cierre.</p>
                    </div>
                    <button onClick={() => setNotifEmail(!notifEmail)} className={`w-12 h-6 rounded-full relative transition-all ${notifEmail ? 'bg-blue-800' : 'bg-slate-200'}`}>
                       <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all ${notifEmail ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-50 dark:border-slate-800 space-y-6">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Umbral de Reactivos</p>
                 <div className="space-y-3">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-400">
                       <span>Alertar cuando quede menos de:</span>
                       <span className="text-blue-800 dark:text-blue-400 font-black">{reactiveThreshold}%</span>
                    </div>
                    <input 
                      type="range" min="5" max="50" step="5"
                      value={reactiveThreshold}
                      onChange={(e) => setReactiveThreshold(Number(e.target.value))}
                      className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-blue-800" 
                    />
                 </div>
              </div>
           </section>

           {/* Seguridad de Firma */}
           <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <div className="relative z-10 flex items-center gap-4">
                 <span className="material-symbols-outlined text-blue-400">lock_reset</span>
                 <h4 className="text-sm font-black uppercase tracking-widest">Seguridad de Firma</h4>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed font-medium">Actualice su PIN de firma digital cada 90 días para cumplir con la normativa de seguridad de datos clínicos.</p>
              <button 
                onClick={handleChangePin}
                className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Cambiar PIN Digital
              </button>
           </section>

           <div className="flex justify-end gap-4 pt-4">
              <button 
                onClick={handleReset}
                className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-6 py-2 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                Restablecer
              </button>
              <button 
                onClick={handleSave} 
                className="bg-blue-800 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all"
              >
                Guardar Ajustes
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default LabSettings;
