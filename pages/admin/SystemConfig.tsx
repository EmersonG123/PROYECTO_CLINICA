
import React, { useState, useRef, useEffect } from 'react';

// Helper para oscurecer colores (para estados hover)
const adjustColor = (color: string, amount: number) => {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}

const SystemConfig: React.FC = () => {
  const [env, setEnv] = useState('Producción');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const colorPrimaryRef = useRef<HTMLInputElement>(null);
  const colorSecondaryRef = useRef<HTMLInputElement>(null);

  // Estado: Información Institucional
  const [instData, setInstData] = useState({
    name: 'Clínica Ayacucho',
    ruc: '20601234567',
    phone: '(066) 31-2020',
    email: 'contacto@clinicaayacucho.pe',
    address: 'Jr. Asamblea 123, Ayacucho, Perú',
    logoPreview: null as string | null
  });

  // Estado: Branding y Colores
  const [theme, setTheme] = useState({
    primary: '#1e3a8a',
    secondary: '#16a34a',
    mode: 'light'
  });

  // Estado: Gestión de Tarifas
  const [tariffs, setTariffs] = useState([
    { id: 1, code: '001', name: 'Consulta Medicina General', price: 50.00, category: 'Consultas' },
    { id: 2, code: '002', name: 'Consulta Especializada', price: 80.00, category: 'Consultas' },
    { id: 3, code: '003', name: 'Hemograma Completo', price: 35.00, category: 'Laboratorio' },
    { id: 4, code: '004', name: 'Ecografía Abdominal', price: 120.00, category: 'Imágenes' },
    { id: 5, code: '005', name: 'Rayos X Torax', price: 60.00, category: 'Imágenes' },
  ]);

  // Cargar configuración guardada al iniciar
  useEffect(() => {
    const savedConfig = localStorage.getItem('clinic_system_config');
    if (savedConfig) {
      try {
        const parsed = JSON.parse(savedConfig);
        if (parsed.instData) setInstData(parsed.instData);
        if (parsed.theme) {
            setTheme(parsed.theme);
            // Aplicar tema visualmente si existe
            applyDynamicTheme(parsed.theme.primary, parsed.theme.secondary);
        }
        if (parsed.tariffs) setTariffs(parsed.tariffs);
      } catch (e) {
        console.error("Error cargando configuración", e);
      }
    }
  }, []);

  const applyDynamicTheme = (primary: string, secondary: string) => {
    const styleId = 'dynamic-theme-styles';
    let styleTag = document.getElementById(styleId);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = styleId;
      document.head.appendChild(styleTag);
    }

    // Sobrescribimos las clases de Tailwind usadas comúnmente en la app
    // Esto permite "tematizar" sin eyectar Tailwind ni cambiar todas las clases manualmente.
    const css = `
      .bg-blue-800 { background-color: ${primary} !important; }
      .bg-blue-900 { background-color: ${adjustColor(primary, -20)} !important; }
      .hover\\:bg-blue-900:hover { background-color: ${adjustColor(primary, -20)} !important; }
      .text-blue-800 { color: ${primary} !important; }
      .border-blue-800 { border-color: ${primary} !important; }
      .ring-blue-800 { --tw-ring-color: ${primary} !important; }
      
      .bg-green-600 { background-color: ${secondary} !important; }
      .text-green-600 { color: ${secondary} !important; }
      .border-green-600 { border-color: ${secondary} !important; }
    `;
    styleTag.innerHTML = css;
  };

  const handleSaveAll = () => {
    const configToSave = {
      instData,
      theme,
      tariffs
    };
    localStorage.setItem('clinic_system_config', JSON.stringify(configToSave));
    
    // Aplicar cambios visuales inmediatamente
    applyDynamicTheme(theme.primary, theme.secondary);
    
    alert("¡Configuración guardada y aplicada exitosamente! Los cambios de marca y tarifas se han actualizado.");
  };

  const handleLogoClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setInstData({ ...instData, logoPreview: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTariffChange = (id: number, field: string, value: string | number) => {
    setTariffs(tariffs.map(t => t.id === id ? { ...t, [field]: value } : t));
  };

  const removeTariff = (id: number) => {
    if(confirm("¿Eliminar este servicio del tarifario?")) {
      setTariffs(tariffs.filter(t => t.id !== id));
    }
  };

  const addTariff = () => {
    const newId = Math.max(...tariffs.map(t => t.id), 0) + 1;
    setTariffs([...tariffs, { id: newId, code: `00${newId}`, name: 'Nuevo Servicio', price: 0.00, category: 'General' }]);
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
            <span>Inicio</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span>Admin</span>
            <span className="material-symbols-outlined text-sm">chevron_right</span>
            <span className="text-blue-800 dark:text-blue-400">Configuración</span>
          </div>
          <h1 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">Configuración del Sistema</h1>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 bg-slate-50 dark:bg-slate-900/30 p-2 rounded-[2rem]">
         <p className="text-slate-500 font-medium max-w-3xl px-6 py-2">
           Gestione la identidad visual, datos institucionales y el tarifario base de la clínica. Los cambios impactan en todos los módulos inmediatamente.
         </p>
         <div className="flex gap-4 px-6 pb-4 lg:pb-0">
            <button 
                onClick={handleSaveAll}
                className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center gap-3"
            >
               <span className="material-symbols-outlined text-lg">save</span>
               Guardar Cambios Globales
            </button>
         </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* COLUMNA IZQUIERDA */}
        <div className="space-y-10">
            
            {/* Información de la Institución */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 rounded-2xl flex items-center justify-center shadow-sm">
                     <span className="material-symbols-outlined text-2xl font-bold">domain</span>
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Información Institucional</h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Datos legales para facturación y reportes</p>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NOMBRE COMERCIAL</label>
                     <input 
                        value={instData.name} 
                        onChange={(e) => setInstData({...instData, name: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-800 outline-none transition-all" 
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                     <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">RUC / REGISTRO FISCAL</label>
                        <input 
                            value={instData.ruc} 
                            onChange={(e) => setInstData({...instData, ruc: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-800 outline-none" 
                        />
                     </div>
                     <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">TELÉFONO PRINCIPAL</label>
                        <input 
                            value={instData.phone} 
                            onChange={(e) => setInstData({...instData, phone: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-800 outline-none" 
                        />
                     </div>
                  </div>
                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CORREO CONTACTO</label>
                     <input 
                        value={instData.email} 
                        onChange={(e) => setInstData({...instData, email: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-800 outline-none" 
                     />
                  </div>
                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DIRECCIÓN LEGAL</label>
                     <div className="relative">
                        <input 
                            value={instData.address} 
                            onChange={(e) => setInstData({...instData, address: e.target.value})}
                            className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl pl-12 pr-6 py-4 font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-800 outline-none" 
                        />
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">location_on</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* Branding y Apariencia (Modificado para color picker y logo) */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
               <div className="flex items-center gap-5">
                  <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-400 rounded-2xl flex items-center justify-center shadow-sm">
                     <span className="material-symbols-outlined text-2xl font-bold">palette</span>
                  </div>
                  <div>
                     <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Branding y Estilos</h3>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Identidad visual y colores del sistema</p>
                  </div>
               </div>

               {/* Logo Upload */}
               <div className="flex items-center gap-8 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-3xl border border-slate-100 dark:border-slate-800">
                  <div 
                    onClick={handleLogoClick}
                    className="w-24 h-24 bg-white dark:bg-slate-900 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-600 flex items-center justify-center relative overflow-hidden group cursor-pointer hover:border-blue-500 transition-colors"
                  >
                     <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                     {instData.logoPreview ? (
                        <img src={instData.logoPreview} className="w-full h-full object-contain p-2" alt="Logo Preview" />
                     ) : (
                        <div className="text-center">
                            <span className="material-symbols-outlined text-slate-300 text-3xl">image</span>
                        </div>
                     )}
                     <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <span className="material-symbols-outlined text-white">edit</span>
                     </div>
                  </div>
                  <div className="flex-1 space-y-2">
                     <h5 className="font-black text-sm uppercase tracking-tight text-slate-900 dark:text-white">Logotipo Principal</h5>
                     <p className="text-xs text-slate-400 leading-relaxed">Formato recomendado: PNG transparente o SVG. Tamaño óptimo: 512x512px.</p>
                     <button onClick={handleLogoClick} className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest hover:underline">Cambiar archivo</button>
                  </div>
               </div>

               <div className="space-y-6">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PERSONALIZACIÓN DE COLORES</p>
                  <div className="grid grid-cols-2 gap-6">
                     {/* Color Primario Picker */}
                     <div className="flex flex-col gap-3">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Color Primario (Botones, Header)</label>
                        <div 
                            className="h-14 w-full rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center px-4 cursor-pointer hover:shadow-lg transition-all relative overflow-hidden"
                            onClick={() => colorPrimaryRef.current?.click()}
                            style={{ backgroundColor: theme.primary }}
                        >
                            <input 
                                ref={colorPrimaryRef}
                                type="color" 
                                value={theme.primary} 
                                onChange={(e) => setTheme({...theme, primary: e.target.value})}
                                className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                            />
                            <span className="bg-white/90 dark:bg-black/50 px-2 py-1 rounded text-xs font-bold font-mono ml-auto pointer-events-none shadow-sm">{theme.primary}</span>
                        </div>
                     </div>

                     {/* Color Secundario Picker */}
                     <div className="flex flex-col gap-3">
                        <label className="text-[9px] font-bold text-slate-500 uppercase">Color Secundario (Éxito, Acentos)</label>
                        <div 
                            className="h-14 w-full rounded-2xl border border-slate-200 dark:border-slate-700 flex items-center px-4 cursor-pointer hover:shadow-lg transition-all relative overflow-hidden"
                            onClick={() => colorSecondaryRef.current?.click()}
                            style={{ backgroundColor: theme.secondary }}
                        >
                            <input 
                                ref={colorSecondaryRef}
                                type="color" 
                                value={theme.secondary} 
                                onChange={(e) => setTheme({...theme, secondary: e.target.value})}
                                className="absolute opacity-0 inset-0 w-full h-full cursor-pointer"
                            />
                            <span className="bg-white/90 dark:bg-black/50 px-2 py-1 rounded text-xs font-bold font-mono ml-auto pointer-events-none shadow-sm">{theme.secondary}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
        </div>

        {/* COLUMNA DERECHA */}
        <div className="space-y-10">
            
            {/* Gestión de Tarifas (Nueva Sección) */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-8 h-fit">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5">
                     <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 rounded-2xl flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-2xl font-bold">price_check</span>
                     </div>
                     <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Tarifario Base</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Precios por defecto de servicios</p>
                     </div>
                  </div>
                  <button onClick={addTariff} className="w-10 h-10 bg-slate-50 dark:bg-slate-800 rounded-xl flex items-center justify-center text-slate-600 dark:text-white hover:bg-blue-50 dark:hover:bg-blue-900/30 hover:text-blue-800 transition-all shadow-sm">
                     <span className="material-symbols-outlined font-black">add</span>
                  </button>
               </div>

               <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-2 space-y-3">
                  {tariffs.map((tariff) => (
                    <div key={tariff.id} className="group flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 rounded-2xl hover:border-blue-200 transition-all">
                       <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center text-[10px] font-black text-slate-400 uppercase shrink-0 border border-slate-100 dark:border-slate-700">
                          {tariff.code}
                       </div>
                       <div className="flex-1 min-w-0 grid grid-cols-1 gap-2">
                          <input 
                            value={tariff.name}
                            onChange={(e) => handleTariffChange(tariff.id, 'name', e.target.value)}
                            className="bg-transparent border-none p-0 text-sm font-black text-slate-900 dark:text-white focus:ring-0 w-full truncate"
                            placeholder="Nombre del servicio"
                          />
                          <input 
                            value={tariff.category}
                            onChange={(e) => handleTariffChange(tariff.id, 'category', e.target.value)}
                            className="bg-transparent border-none p-0 text-[10px] font-bold text-slate-400 uppercase focus:ring-0 w-full"
                            placeholder="CATEGORÍA"
                          />
                       </div>
                       <div className="flex flex-col items-end gap-1">
                          <div className="flex items-center bg-white dark:bg-slate-900 rounded-lg px-2 border border-slate-200 dark:border-slate-600 focus-within:border-blue-500">
                             <span className="text-[10px] font-black text-slate-400 mr-1">S/</span>
                             <input 
                                type="number"
                                value={tariff.price}
                                onChange={(e) => handleTariffChange(tariff.id, 'price', parseFloat(e.target.value))}
                                className="bg-transparent border-none p-1 text-sm font-black text-slate-900 dark:text-white focus:ring-0 w-16 text-right"
                             />
                          </div>
                          <button onClick={() => removeTariff(tariff.id)} className="text-[9px] font-bold text-red-400 hover:text-red-600 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Eliminar</button>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <p className="text-[10px] font-bold text-slate-400 italic">Total: {tariffs.length} servicios registrados</p>
                  <button className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest hover:underline">Importar CSV</button>
               </div>
            </div>

            {/* Configuración Fiscal */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 space-y-10">
                <div className="flex items-center gap-5">
                    <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-2xl flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-2xl font-bold">receipt_long</span>
                    </div>
                    <div>
                        <h3 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">Fiscal y Facturación</h3>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Conexión SUNAT y moneda</p>
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="bg-slate-50 dark:bg-slate-800/40 p-6 rounded-3xl border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined">sync</span>
                            </div>
                            <div>
                            <p className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Estado SUNAT</p>
                            <p className="text-[10px] font-medium text-green-600 uppercase">Conectado (OSE)</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button onClick={() => setEnv('Pruebas')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${env === 'Pruebas' ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-white text-slate-400 border-slate-100'}`}>Beta</button>
                            <button onClick={() => setEnv('Producción')} className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest border transition-all ${env === 'Producción' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-white text-slate-400 border-slate-100'}`}>Prod</button>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">IGV (%)</label>
                            <input className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none" defaultValue="18" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase ml-1">Moneda</label>
                            <select className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white outline-none appearance-none">
                                <option>Soles (PEN)</option>
                                <option>Dólares (USD)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};

export default SystemConfig;
