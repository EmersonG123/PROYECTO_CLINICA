
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

interface Service {
  id: number;
  name: string;
  order: string;
  price: number;
  status: string;
  sColor: string;
  icon: string;
  selected: boolean;
}

interface Patient {
  id: string;
  name: string;
  dni: string;
  age: string;
  phone: string;
}

const ServicePOS: React.FC = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta');

  // Pacientes simulados para el buscador
  const patientsDB: Patient[] = [
    { id: 'JP1', name: 'Juan Pérez Rodríguez', dni: '45889922', age: '32', phone: '991 827 364' },
    { id: 'JR2', name: 'Juan Pablo Ramirez', dni: '10293847', age: '40', phone: '988 112 334' },
    { id: 'MG3', name: 'Maria Garcia Lopez', dni: '74839201', age: '28', phone: '955 443 221' }
  ];

  const [currentPatient, setCurrentPatient] = useState<Patient>(patientsDB[0]);

  // Servicios dinámicos
  const [services, setServices] = useState<Service[]>([
    { id: 1, name: 'Consulta Cardiología', order: '#12345 - Dr. Roberto Gómez', price: 50.00, status: 'Pendiente', sColor: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: 'favorite', selected: true },
    { id: 2, name: 'Ecocardiograma Doppler', order: '#12346 - Lab. Imagenología', price: 120.00, status: 'Pendiente', sColor: 'bg-yellow-50 text-yellow-700 border-yellow-100', icon: 'waves', selected: true },
    { id: 3, name: 'Inyección Intramuscular', order: '#12347 - Enfermería', price: 15.00, status: 'Omitido', sColor: 'bg-slate-50 text-slate-400 border-slate-100', icon: 'medical_services', selected: false },
  ]);

  const filteredPatients = useMemo(() => {
    if (!search) return [];
    return patientsDB.filter(p => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.dni.includes(search)
    );
  }, [search]);

  const toggleService = (id: number) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const total = useMemo(() => {
    return services.reduce((acc, curr) => curr.selected ? acc + curr.price : acc, 0);
  }, [services]);

  const subtotal = total / 1.18;
  const igv = total - subtotal;

  const handleSelectPatient = (p: Patient) => {
    setCurrentPatient(p);
    setSearch(p.name);
    setShowResults(false);
  };

  const handleProcessPayment = () => {
    if (total === 0) {
      alert("Por favor seleccione al menos un servicio para cobrar.");
      return;
    }
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2500);
  };

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto py-10 animate-in zoom-in-95 duration-500 text-center">
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(34,197,94,0.3)] border-[8px] border-white dark:border-slate-800">
            <span className="material-symbols-outlined text-5xl font-black">check</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter uppercase">¡Transacción Exitosa!</h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-lg">El pago de S/ {total.toFixed(2)} ha sido procesado y el comprobante electrónico ha sido emitido.</p>
        </div>

        <div className="bg-white dark:bg-slate-900 w-full max-w-[440px] mx-auto rounded-[1rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 overflow-hidden relative mb-12">
           <div className="p-12 space-y-8 flex flex-col items-center">
              <div className="bg-blue-800 text-white p-3 rounded-xl shadow-lg">
                <span className="material-symbols-outlined text-3xl font-bold">add_box</span>
              </div>
              
              <div className="text-center space-y-1">
                <h4 className="font-black text-slate-900 dark:text-white text-xl tracking-tighter uppercase leading-none">Clínica Ayacucho</h4>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-2">Ticket de Pago Nro: #8392-24</p>
              </div>

              <div className="w-full border-y border-dashed border-slate-200 dark:border-slate-800 py-6 space-y-4 text-left">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Paciente</p>
                    <p className="text-sm font-black text-slate-900 dark:text-white uppercase mt-1">{currentPatient.name}</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Atenciones Pagadas</p>
                    <div className="mt-2 space-y-2">
                       {services.filter(s => s.selected).map(s => (
                         <div key={s.id} className="flex justify-between items-center text-xs font-bold text-slate-600 dark:text-slate-400">
                            <span>{s.name}</span>
                            <span>S/ {s.price.toFixed(2)}</span>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-8 rounded-[1.5rem] flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
                 <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Monto Pagado</p>
                 <p className="text-5xl font-black text-blue-800 dark:text-blue-400 tracking-tighter uppercase">S/ {total.toFixed(2)}</p>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-3">Metodo: {paymentMethod}</p>
              </div>

              <div className="flex flex-col items-center gap-2 pt-4 opacity-30 grayscale">
                 <div className="h-10 w-full flex items-center justify-center">
                    <div className="flex gap-[2px]">
                       {Array.from({length: 40}).map((_, i) => <div key={i} className={`w-[2px] bg-slate-900 dark:bg-slate-300 ${i%4===0?'h-8':'h-6'}`}></div>)}
                    </div>
                 </div>
                 <p className="text-[9px] font-black text-slate-400 dark:text-slate-500 tracking-[0.5em]">0918273645</p>
              </div>
           </div>
        </div>

        <div className="flex flex-col items-center gap-4 max-w-sm mx-auto">
           <button onClick={() => window.print()} className="w-full bg-blue-800 hover:bg-blue-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 active:scale-95 transition-all">
              <span className="material-symbols-outlined text-xl font-bold">print</span>
              Imprimir Comprobante
           </button>
           <button onClick={() => { setIsSuccess(false); setSearch(''); setShowResults(false); }} className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all">
              Nueva Orden de Cobro
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {isProcessing && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950/80 backdrop-blur-md transition-all">
           <div className="relative">
              <div className="w-24 h-24 border-[6px] border-blue-800/20 border-t-blue-800 rounded-full animate-spin"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                 <span className="material-symbols-outlined text-blue-800 text-3xl font-black animate-pulse">point_of_sale</span>
              </div>
           </div>
           <h3 className="text-white font-black text-2xl tracking-widest uppercase mt-8 animate-pulse">Validando Pago...</h3>
           <p className="text-blue-200/60 font-bold text-sm uppercase tracking-[0.3em] mt-3">Comunicando con pasarela de pago segura</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="space-y-2">
           <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Selección de Servicios</h1>
           <p className="text-slate-500 dark:text-slate-400 font-medium">Gestione y procese los cobros de atenciones médicas.</p>
        </div>
        
        <div className="relative w-full max-w-lg group">
           <div className="relative z-50">
              <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-blue-800 font-bold">search</span>
              <input 
                value={search} 
                onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
                onFocus={() => setShowResults(true)}
                className="w-full bg-white dark:bg-slate-900 border-2 border-blue-100 dark:border-slate-800 rounded-[1.2rem] pl-14 pr-12 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all shadow-xl shadow-blue-800/5" 
                placeholder="Buscar paciente por Nombre o DNI..."
              />
              {search && (
                <button onClick={() => { setSearch(''); setShowResults(false); }} className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600">close</button>
              )}
           </div>

           {showResults && filteredPatients.length > 0 && (
             <div className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] z-40 overflow-hidden animate-in slide-in-from-top-4 duration-300">
                <div className="p-6 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-slate-800/50">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Pacientes encontrados ({filteredPatients.length})</p>
                </div>
                <div className="p-2 space-y-1">
                   {filteredPatients.map((p) => (
                     <div 
                      key={p.id} 
                      onClick={() => handleSelectPatient(p)}
                      className="flex items-center justify-between p-5 hover:bg-blue-50/40 dark:hover:bg-blue-900/20 rounded-2xl group cursor-pointer transition-all border border-transparent hover:border-blue-100"
                     >
                        <div className="flex items-center gap-5">
                           <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center font-black text-blue-800 dark:text-blue-400 text-xs">
                              {p.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                           </div>
                           <div>
                              <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none">{p.name}</p>
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">DNI: {p.dni}</p>
                           </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-blue-800 transition-colors">chevron_right</span>
                     </div>
                   ))}
                </div>
             </div>
           )}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
         <div className="xl:col-span-8 space-y-10">
            {/* Info del Paciente Seleccionado */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-8 flex flex-col md:flex-row items-center justify-between gap-8 animate-in fade-in duration-500" key={currentPatient.id}>
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-black text-blue-800 dark:text-blue-400 text-base shadow-sm">
                    {currentPatient.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                  </div>
                  <div>
                     <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">{currentPatient.name}</h2>
                     <div className="flex flex-wrap items-center gap-6 text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-2.5">
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">badge</span> DNI: {currentPatient.dni}</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">person</span> {currentPatient.age} Años</span>
                        <span className="flex items-center gap-2"><span className="material-symbols-outlined text-sm">call</span> {currentPatient.phone}</span>
                     </div>
                  </div>
               </div>
               <button onClick={() => { setSearch(''); setShowResults(true); }} className="text-blue-800 dark:text-blue-400 font-black text-[11px] uppercase tracking-[0.2em] px-8 py-3.5 bg-blue-50 dark:bg-blue-900/30 rounded-xl hover:bg-blue-100 transition-all border border-blue-100 dark:border-blue-800 active:scale-95">Cambiar Paciente</button>
            </div>

            {/* Listado de Servicios */}
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
               <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30 dark:bg-slate-800/30">
                  <div className="flex items-center gap-4">
                     <span className="material-symbols-outlined text-blue-800 dark:text-blue-400 font-black">receipt</span>
                     <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Atenciones Pendientes</h3>
                  </div>
                  <span className="px-3 py-1 bg-white dark:bg-slate-900 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-700">Total items: {services.length}</span>
               </div>
               <div className="p-10 space-y-6">
                  {services.map((s) => (
                    <div 
                      key={s.id} 
                      onClick={() => toggleService(s.id)}
                      className={`p-8 rounded-[2rem] border-2 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all cursor-pointer group ${s.selected ? 'border-blue-800 ring-4 ring-blue-800/5 bg-blue-50/10 dark:bg-blue-900/10' : 'border-slate-100 dark:border-slate-800 hover:border-blue-200'}`}
                    >
                       <div className="flex items-center gap-8 w-full sm:w-auto">
                          <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${s.selected ? 'border-blue-800 bg-blue-800' : 'border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950'}`}>
                             {s.selected && <span className="material-symbols-outlined text-white text-base font-black">check</span>}
                          </div>
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${s.selected ? 'bg-blue-800 text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                             <span className="material-symbols-outlined text-3xl font-bold">{s.icon}</span>
                          </div>
                          <div>
                             <p className="text-lg font-black text-slate-900 dark:text-white leading-tight uppercase">{s.name}</p>
                             <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">{s.order}</p>
                             <div className={`mt-3 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest inline-block border ${s.sColor} dark:opacity-80`}>
                                {s.status}
                             </div>
                          </div>
                       </div>
                       <p className="text-3xl font-black text-slate-900 dark:text-white shrink-0">S/ {s.price.toFixed(2)}</p>
                    </div>
                  ))}
               </div>
            </div>
         </div>

         {/* Sidebar Resumen de Cobro */}
         <div className="xl:col-span-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden sticky top-28">
               <div className="p-10 space-y-10">
                  <div className="flex items-center justify-between">
                     <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Resumen de Cobro</h3>
                     <span className="material-symbols-outlined text-slate-300">shopping_cart</span>
                  </div>
                  
                  <div className="space-y-6 pt-4">
                     <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                        <span>Subtotal</span>
                        <span className="text-slate-900 dark:text-white">S/ {subtotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-sm font-bold text-slate-400 uppercase tracking-widest">
                        <span>IGV (18%)</span>
                        <span className="text-slate-900 dark:text-white">S/ {igv.toFixed(2)}</span>
                     </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800/50 p-10 rounded-[2.5rem] flex flex-col items-center justify-center gap-2 border border-slate-100 dark:border-slate-700 shadow-inner">
                     <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Total a Pagar</p>
                     <p className="text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">S/ {total.toFixed(2)}</p>
                  </div>

                  <div className="space-y-6 pt-4">
                     <div className="flex items-center justify-between">
                        <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Método de Pago</h4>
                        <div className="flex items-center gap-3">
                           <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Pago Mixto</span>
                           <div className="w-10 h-5 bg-slate-200 dark:bg-slate-700 rounded-full relative cursor-not-allowed">
                              <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full"></div>
                           </div>
                        </div>
                     </div>
                     <div className="grid grid-cols-3 gap-3">
                        {[
                          { id: 'Efectivo', icon: 'payments', color: 'bg-green-500' },
                          { id: 'Tarjeta', icon: 'credit_card', color: 'bg-blue-800' },
                          { id: 'QR Digital', icon: 'qr_code_2', color: 'bg-purple-600' }
                        ].map(m => (
                          <button 
                            key={m.id} 
                            onClick={() => setPaymentMethod(m.id)}
                            className={`p-5 rounded-[1.8rem] border-2 transition-all flex flex-col items-center gap-3 group ${paymentMethod === m.id ? 'border-blue-800 bg-blue-50/30 dark:bg-blue-900/40 ring-4 ring-blue-800/10' : 'border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-400 hover:border-blue-100'}`}
                          >
                             <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${paymentMethod === m.id ? m.color + ' text-white shadow-lg' : 'bg-slate-50 dark:bg-slate-800 text-slate-400'}`}>
                                <span className="material-symbols-outlined text-2xl">{m.icon}</span>
                             </div>
                             <span className={`text-[10px] font-black uppercase tracking-tighter ${paymentMethod === m.id ? 'text-blue-800 dark:text-blue-400' : ''}`}>{m.id}</span>
                          </button>
                        ))}
                     </div>
                  </div>

                  <button 
                    onClick={handleProcessPayment}
                    className="w-full bg-blue-800 hover:bg-blue-900 text-white py-7 rounded-[2rem] font-black text-xl uppercase tracking-[0.1em] shadow-2xl shadow-blue-900/40 flex items-center justify-center gap-4 active:scale-95 transition-all group"
                  >
                     <span className="material-symbols-outlined text-2xl group-hover:rotate-12 transition-transform">point_of_sale</span>
                     Procesar S/ {total.toFixed(2)}
                  </button>
                  
                  <button className="w-full text-slate-400 hover:text-red-500 font-black uppercase text-[11px] tracking-[0.2em] transition-colors py-2">Anular Orden</button>
               </div>
            </div>
            <div className="mt-8 px-6 py-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800 rounded-2xl flex gap-4">
               <span className="material-symbols-outlined text-blue-800 dark:text-blue-400">info</span>
               <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400 leading-relaxed uppercase tracking-wider">
                  El comprobante electrónico será enviado automáticamente al correo registrado del paciente tras el pago.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default ServicePOS;
