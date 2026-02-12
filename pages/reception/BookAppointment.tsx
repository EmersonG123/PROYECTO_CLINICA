
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookAppointment: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Agendar, 2: Éxito (Ticket)
  const [selectedDoctor, setSelectedDoctor] = useState(1);
  const [selectedTime, setSelectedTime] = useState('09:30');
  const [selectedDay, setSelectedDay] = useState(11);

  if (step === 2) {
    return (
      <div className="max-w-4xl mx-auto py-10 animate-in zoom-in-95 duration-500 text-center">
        <div className="flex flex-col items-center gap-6 mb-12">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-4xl font-black">check</span>
          </div>
          <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">¡Cita Programada Exitosamente!</h2>
          <p className="text-slate-500 font-medium max-w-sm">La orden de pago ha sido generada lista para imprimir.</p>
        </div>

        {/* El Ticket (Clon de la captura) */}
        <div className="bg-white dark:bg-slate-900 w-full max-w-[450px] mx-auto rounded-[1rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-100 dark:border-slate-800 overflow-hidden relative">
          <div className="absolute -left-3 top-1/2 w-6 h-6 bg-[#F8FAFC] dark:bg-slate-950 rounded-full border border-slate-100 dark:border-slate-800"></div>
          <div className="absolute -right-3 top-1/2 w-6 h-6 bg-[#F8FAFC] dark:bg-slate-950 rounded-full border border-slate-100 dark:border-slate-800"></div>
          
          <div className="p-12 space-y-8 flex flex-col items-center">
            <div className="bg-blue-800 text-white p-2.5 rounded-xl shadow-lg">
              <span className="material-symbols-outlined text-2xl font-bold">add_box</span>
            </div>
            
            <div className="text-center space-y-1">
              <h4 className="font-black text-slate-900 dark:text-white text-xl tracking-tighter uppercase">Clínica Ayacucho</h4>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Av. Libertad 452, Ayacucho</p>
              <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">RUC: 20601234567</p>
            </div>

            <div className="w-full border-t border-dashed border-slate-200 dark:border-slate-800 pt-6">
              <h5 className="font-black text-slate-900 dark:text-white text-lg uppercase tracking-tight">Orden de Pago</h5>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">#OP-2024-8392</p>
              <p className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-widest">14 OCT, 2024 - 10:30 AM</p>
            </div>

            <div className="w-full space-y-6 pt-6 border-t border-dashed border-slate-200 dark:border-slate-800">
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">PACIENTE</p>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1 uppercase">Juan Pérez Rodríguez</p>
                <p className="text-[9px] font-bold text-slate-500 mt-0.5">DNI: 45829102</p>
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ESPECIALIDAD</p>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1 uppercase">Cardiología</p>
              </div>
              <div className="text-left">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">ESPECIALISTA</p>
                <p className="text-sm font-black text-slate-900 dark:text-white mt-1 uppercase">Dr. Ricardo Silva</p>
              </div>
            </div>

            <div className="w-full bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl flex flex-col items-center justify-center border border-slate-100 dark:border-slate-700">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total a Pagar</p>
               <p className="text-4xl font-black text-blue-800 dark:text-blue-400 tracking-tighter uppercase">S/ 50.00</p>
            </div>

            <div className="flex flex-col items-center gap-2 pt-4">
              <div className="h-14 w-full bg-white flex items-center justify-center">
                 <div className="flex gap-0.5">
                   {Array.from({length: 30}).map((_, i) => (
                     <div key={i} className={`h-10 w-[1px] bg-slate-900 ${i % 3 === 0 ? 'w-[2px]' : ''} ${i % 5 === 0 ? 'h-12' : ''}`}></div>
                   ))}
                 </div>
              </div>
              <p className="text-[10px] font-black text-slate-400 tracking-[0.5em]">0918273645</p>
            </div>
            
            <div className="w-full pt-4 border-t border-dashed border-slate-200 text-center">
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">----------------------------------------------------</p>
            </div>
          </div>
        </div>

        <div className="mt-12 space-y-4">
           <button className="w-full max-w-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-slate-50 transition-all shadow-sm">
             <span className="material-symbols-outlined text-lg">print</span>
             Imprimir Ticket
           </button>
           
           <div className="flex gap-4 w-full max-w-sm mx-auto">
             <button className="flex-1 bg-blue-800 text-white py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 active:scale-95 transition-all">
               <span className="material-symbols-outlined text-lg">point_of_sale</span>
               Pagar en Caja
             </button>
             <button className="flex-1 bg-white dark:bg-slate-900 border-2 border-green-100 dark:border-green-900/40 text-green-700 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-green-50 transition-all">
               <span className="material-symbols-outlined text-lg">qr_code_2</span>
               Pagar en Línea
             </button>
           </div>

           <button onClick={() => navigate('/reception')} className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-8 hover:text-blue-800 transition-colors flex items-center justify-center gap-2 mx-auto">
             <span className="material-symbols-outlined text-sm">arrow_back</span>
             Volver al Dashboard
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center gap-3 text-slate-400 text-[11px] font-black uppercase tracking-widest">
         <span>Inicio</span>
         <span className="material-symbols-outlined text-sm">chevron_right</span>
         <span>Citas</span>
         <span className="material-symbols-outlined text-sm">chevron_right</span>
         <span className="text-blue-800">Nueva Cita</span>
      </div>

      <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Programar Cita</h1>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        <div className="xl:col-span-8 space-y-8">
          
          {/* 1. Buscar Paciente */}
          <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-black text-base shadow-lg shadow-blue-900/20">1</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Buscar Paciente</h3>
            </div>
            
            <div className="space-y-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">search</span>
                <input className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl pl-16 pr-6 py-4.5 font-semibold text-slate-900 dark:text-white focus:border-blue-500 outline-none transition-all" defaultValue="45890123" />
              </div>
              
              <div className="p-6 rounded-[2.5rem] bg-blue-50/30 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-6">
                 <div className="flex items-center gap-5">
                    <div className="w-16 h-16 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-blue-800 shadow-sm">
                       <span className="material-symbols-outlined text-3xl">person</span>
                    </div>
                    <div>
                       <h4 className="font-black text-slate-900 dark:text-white text-lg">Juan Pérez Rodríguez</h4>
                       <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">DNI: 45890123 • Edad: 34 años • Seguro: RIMAC</p>
                    </div>
                 </div>
                 <button className="text-blue-800 dark:text-blue-400 text-[11px] font-black uppercase tracking-widest hover:underline transition-all">Cambiar</button>
              </div>
            </div>
          </section>

          {/* 2. Especialidad y Especialista */}
          <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-black text-base shadow-lg shadow-blue-900/20">2</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Especialidad y Especialista</h3>
            </div>

            <div className="space-y-8">
              <div className="max-w-md space-y-2.5">
                <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialidad</label>
                <div className="relative">
                  <select className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white appearance-none outline-none focus:border-blue-500 transition-all">
                    <option>Cardiología</option>
                    <option>Pediatría</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">expand_more</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Especialistas Disponibles</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { id: 1, name: 'Dr. Carlos Mendoza', cmp: '88291', img: 'https://i.pravatar.cc/150?u=doc1' },
                    { id: 2, name: 'Dra. Ana Torres', cmp: '10293', img: 'https://i.pravatar.cc/150?u=doc2' }
                  ].map(doc => (
                    <div 
                      key={doc.id} 
                      onClick={() => setSelectedDoctor(doc.id)}
                      className={`p-6 rounded-[2.5rem] border-2 cursor-pointer transition-all flex items-center gap-5 relative overflow-hidden ${
                        selectedDoctor === doc.id 
                        ? 'border-blue-800 bg-blue-50/30 shadow-md ring-2 ring-blue-800/10' 
                        : 'border-slate-100 dark:border-slate-800 hover:border-slate-200'
                      }`}
                    >
                      <div className="relative">
                        <img src={doc.img} className="w-16 h-16 rounded-2xl object-cover shadow-sm" alt={doc.name} />
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-[3.5px] border-white dark:border-slate-900 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <p className="font-black text-slate-900 dark:text-white text-base leading-none">{doc.name}</p>
                        <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-tight">CMP: {doc.cmp}</p>
                        <div className="flex items-center gap-1.5 mt-2.5">
                           <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                           <span className="text-[9px] font-black text-green-600 uppercase tracking-widest">Disponible</span>
                        </div>
                      </div>
                      {selectedDoctor === doc.id && (
                        <div className="absolute top-4 right-4 w-7 h-7 bg-blue-800 text-white rounded-full flex items-center justify-center">
                          <span className="material-symbols-outlined text-sm font-bold">check</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 3. Fecha y Hora */}
          <section className="bg-white dark:bg-slate-900 rounded-[2rem] border border-slate-200 dark:border-slate-800 p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center font-black text-base shadow-lg shadow-blue-900/20">3</div>
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Fecha y Hora</h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 pt-4">
              <div className="space-y-8">
                <div className="flex items-center justify-between mb-4 px-2">
                  <h4 className="font-black text-slate-900 dark:text-white text-lg tracking-tight">Octubre 2023</h4>
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><span className="material-symbols-outlined">chevron_left</span></button>
                    <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all"><span className="material-symbols-outlined">chevron_right</span></button>
                  </div>
                </div>
                <div className="grid grid-cols-7 text-center gap-y-6">
                  {['Do','Lu','Ma','Mi','Ju','Vi','Sa'].map(d => <span key={d} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>)}
                  {Array.from({length: 14}).map((_, i) => {
                    const d = 29 + i > 31 ? (29+i)-31 : 29+i;
                    return (
                      <button 
                        key={i} 
                        onClick={() => setSelectedDay(d)}
                        className={`w-11 h-11 mx-auto rounded-xl flex items-center justify-center text-sm font-bold transition-all ${
                          d === selectedDay ? 'bg-blue-800 text-white shadow-xl scale-110' : d < 11 && i > 2 ? 'text-slate-300 dark:text-slate-700 pointer-events-none' : 'text-slate-900 dark:text-white hover:bg-blue-50 dark:hover:bg-slate-800'
                        }`}
                      >
                        {d}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-10">
                <h4 className="font-black text-slate-900 dark:text-white text-[11px] uppercase tracking-widest border-l-4 border-blue-800 pl-4">Horarios Disponibles</h4>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-5">MAÑANA</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['09:00','09:30','10:00','10:30','11:00'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-4 rounded-xl text-xs font-black transition-all border-2 ${
                          selectedTime === t 
                          ? 'bg-blue-800 text-white border-blue-800 shadow-lg' 
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-100 dark:border-slate-700 hover:border-blue-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-5">TARDE</p>
                  <div className="grid grid-cols-3 gap-3">
                    {['15:00','15:30','16:00'].map(t => (
                      <button 
                        key={t}
                        onClick={() => setSelectedTime(t)}
                        className={`py-4 rounded-xl text-xs font-black transition-all border-2 ${
                          selectedTime === t 
                          ? 'bg-blue-800 text-white border-blue-800 shadow-lg' 
                          : 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white border-slate-100 dark:border-slate-700 hover:border-blue-200'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Resumen de Cita - Panel Lateral (Imagen 4 Clon) */}
        <div className="xl:col-span-4">
           <div className="bg-[#1A1A1A] dark:bg-slate-900 rounded-[2rem] border border-slate-800 overflow-hidden sticky top-28 shadow-2xl">
              <div className="p-8 space-y-8">
                 <h3 className="text-2xl font-black text-white tracking-tight">Resumen de Cita</h3>
                 <p className="text-sm font-medium text-slate-400 leading-relaxed -mt-6">Verifique los detalles antes de generar la orden.</p>
                 
                 <div className="space-y-8 pt-4">
                    <div className="flex gap-5">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                         <span className="material-symbols-outlined">person</span>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">PACIENTE</p>
                          <p className="text-base font-black text-white mt-1">Juan Pérez Rodríguez</p>
                       </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                         <span className="material-symbols-outlined">medical_services</span>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">SERVICIO</p>
                          <p className="text-base font-black text-white mt-1">Consulta Cardiológica</p>
                          <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase">Dr. Carlos Mendoza</p>
                       </div>
                    </div>
                    <div className="flex gap-5">
                       <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400">
                         <span className="material-symbols-outlined">calendar_month</span>
                       </div>
                       <div>
                          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">FECHA Y HORA</p>
                          <p className="text-base font-black text-white mt-1">Mié, 11 Oct 2023</p>
                          <p className="text-xs font-black text-slate-400 mt-1 uppercase tracking-widest">{selectedTime} AM</p>
                       </div>
                    </div>
                 </div>

                 <div className="pt-10 border-t border-white/5 flex flex-col items-end">
                    <div className="flex items-baseline gap-3">
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total a Pagar</p>
                    </div>
                    <div className="flex items-baseline gap-2">
                       <span className="text-4xl font-black text-blue-500 tracking-tighter uppercase">S/ 80.00</span>
                       <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Inc. IGV</span>
                    </div>
                 </div>

                 <div className="space-y-4 pt-4">
                   <button 
                    onClick={() => setStep(2)}
                    className="w-full bg-blue-700 hover:bg-blue-600 text-white py-5 rounded-[1rem] font-black shadow-xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-3"
                   >
                      <span className="material-symbols-outlined font-bold text-lg">payments</span>
                      Generar Orden de Pago
                   </button>
                   <button className="w-full text-slate-500 font-black uppercase text-[11px] tracking-widest hover:text-white transition-colors py-2">Cancelar</button>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
