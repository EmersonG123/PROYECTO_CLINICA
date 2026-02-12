
import React, { useState, useRef } from 'react';

const CashierSettings: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profile, setProfile] = useState({
    name: 'Ana Maria Ramos',
    role: 'Cajero Senior #04',
    email: 'a.ramos@clinicaayacucho.pe',
    photo: 'https://i.pravatar.cc/150?u=cashier'
  });

  const [sunatNotif, setSunatNotif] = useState(true);
  const [autoRound, setAutoRound] = useState(false);
  const [printerStatus, setPrinterStatus] = useState('online');

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

  const handleSave = () => {
    alert("¡Configuración guardada! Todos los cambios se han sincronizado con el servidor central.");
  };

  const handlePrintTest = () => {
    alert("Enviando ticket de prueba a la impresora térmica... \nVerifique el estado del papel.");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Configuración de Caja</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Personalización de terminal, periféricos y perfil operativo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Columna Izquierda: Perfil y Seguridad */}
        <div className="lg:col-span-8 space-y-8">
           <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                 <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">account_circle</span>
                 <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Perfil Operativo</h3>
              </div>
              <div className="p-10 flex flex-col md:flex-row items-center gap-10">
                 <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                    <img src={profile.photo} className="w-28 h-28 rounded-3xl object-cover ring-4 ring-slate-50 dark:ring-slate-800 shadow-lg group-hover:scale-105 transition-transform" alt="Perfil" />
                    <div className="absolute inset-0 bg-blue-900/40 rounded-3xl opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                       <span className="material-symbols-outlined text-white text-xl font-black">photo_camera</span>
                    </div>
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handlePhotoUpload} />
                 </div>
                 <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
                    <div className="space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Completo</p>
                       <input 
                        value={profile.name} 
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" 
                       />
                    </div>
                    <div className="space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ID de Cajero</p>
                       <div className="px-5 py-3 bg-slate-100 dark:bg-slate-800 rounded-xl font-bold text-slate-400 dark:text-slate-500 text-sm border border-slate-200 dark:border-slate-700">#04 - ADMISIÓN</div>
                    </div>
                    <div className="md:col-span-2 space-y-1.5">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Correo Electrónico</p>
                       <input 
                        value={profile.email} 
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800" 
                       />
                    </div>
                 </div>
              </div>
           </section>

           <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                 <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">settings_input_component</span>
                 <h3 className="text-lg font-black uppercase tracking-tight text-slate-900 dark:text-white">Periféricos y Terminal</h3>
              </div>
              <div className="p-10 space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Impresora Térmica Predeterminada</label>
                       <div className="flex items-center gap-4">
                          <select className="flex-1 bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-sm dark:text-white outline-none">
                             <option>Epson TM-T88VI (USB: 001)</option>
                             <option>Bixolon SRP-350III (Eth: 192.168.1.50)</option>
                          </select>
                          <button 
                            onClick={handlePrintTest}
                            className="p-3 bg-white dark:bg-slate-700 border border-slate-100 dark:border-slate-600 rounded-xl text-blue-800 dark:text-blue-400 hover:bg-blue-50 transition-all shadow-sm"
                          >
                             <span className="material-symbols-outlined font-black">print</span>
                          </button>
                       </div>
                       <div className="flex items-center gap-2 mt-2 px-1">
                          <span className={`w-1.5 h-1.5 rounded-full ${printerStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                          <span className="text-[10px] font-black uppercase text-slate-400">Estado: Online / Papel OK</span>
                       </div>
                    </div>

                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Terminal POS (Integrado)</label>
                       <div className="relative">
                          <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-5 py-3.5 font-bold text-sm dark:text-white outline-none appearance-none pr-12">
                             <option>Izipay Cloud Terminal #402</option>
                             <option>Niubiz Virtual POS #092</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none">expand_more</span>
                       </div>
                    </div>
                 </div>
              </div>
           </section>
        </div>

        {/* Columna Derecha: Preferencias del Sistema */}
        <div className="lg:col-span-4 space-y-8">
           <section className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
              <h4 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Preferencias de Sistema</h4>
              
              <div className="space-y-8">
                 <div className="flex items-center justify-between">
                    <div className="pr-4">
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight">Notificaciones SUNAT</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1">Alertar fallos en el envío inmediato de boletas.</p>
                    </div>
                    <button 
                      onClick={() => setSunatNotif(!sunatNotif)}
                      className={`w-14 h-8 rounded-full relative transition-all duration-300 ${sunatNotif ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${sunatNotif ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>

                 <div className="flex items-center justify-between">
                    <div className="pr-4">
                       <p className="text-xs font-black text-slate-900 dark:text-white uppercase leading-tight">Redondeo Automático</p>
                       <p className="text-[10px] font-medium text-slate-400 mt-1">Ajustar centavos en pagos en efectivo (Ley 29571).</p>
                    </div>
                    <button 
                      onClick={() => setAutoRound(!autoRound)}
                      className={`w-14 h-8 rounded-full relative transition-all duration-300 ${autoRound ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-700'}`}
                    >
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${autoRound ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>

              <div className="pt-8 border-t border-slate-50 dark:border-slate-800 space-y-6">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seguridad de Sesión</p>
                 <button className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                    <span className="material-symbols-outlined text-lg">lock</span>
                    Cambiar PIN de Acceso
                 </button>
              </div>
           </section>

           <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
              <div className="relative z-10 flex items-center gap-4">
                 <span className="material-symbols-outlined text-blue-400">info</span>
                 <h4 className="text-sm font-black uppercase tracking-widest">Soporte TI</h4>
              </div>
              <p className="text-[11px] text-white/50 leading-relaxed font-medium">¿Problemas con el POS o impresora? Contacte al anexo interno <span className="text-blue-400 font-black">#882</span> o envíe un ticket directo.</p>
              <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Generar Ticket TI</button>
           </div>

           <div className="flex flex-col gap-4 pt-4">
              <button 
                onClick={handleSave}
                className="bg-blue-800 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/40 active:scale-95 transition-all"
              >
                Guardar Todos los Ajustes
              </button>
              <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-red-500 transition-colors">Restablecer valores predeterminados</button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CashierSettings;
