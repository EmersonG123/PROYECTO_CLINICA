
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookingFlow: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1: Selección, 2: Confirmar (Pago), 3: Éxito
  const [selectedDoctor, setSelectedDoctor] = useState(1);
  const [selectedDay, setSelectedDay] = useState(14);
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [paymentMethod, setPaymentMethod] = useState('Tarjeta');

  const doctors = [
    { id: 1, name: 'Dr. Juan Pérez', spec: 'Cardiólogo Intervencioni...', rating: 4.8, reviews: 120, img: 'https://i.pravatar.cc/150?u=doc1' },
    { id: 2, name: 'Dra. María Gómez', spec: 'Cardiología Clínica', rating: 4.2, reviews: 85, img: 'https://i.pravatar.cc/150?u=doc2' },
    { id: 3, name: 'Dr. Luis Torres', spec: 'Cirugía Cardiovascular', rating: 5.0, reviews: 45, img: 'https://i.pravatar.cc/150?u=doc3' }
  ];

  const morningTimes = ['08:00 AM', '08:30 AM', '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'];
  const afternoonTimes = ['02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'];

  const currentDoctor = doctors.find(d => d.id === selectedDoctor) || doctors[0];

  return (
    <div className="max-w-[1440px] mx-auto animate-in fade-in duration-500 pb-20">
      {/* Header con Stepper (Imagen 1/2/3 Top) */}
      <div className="flex items-center justify-between mb-10 px-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-800 text-white p-2 rounded-lg shadow-md">
            <span className="material-symbols-outlined text-xl font-bold">add_box</span>
          </div>
          <div>
            <h2 className="font-black text-slate-900 dark:text-white text-lg tracking-tight leading-none uppercase">Clínica Ayacucho</h2>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Portal del Paciente</p>
          </div>
        </div>

        <div className="flex items-center gap-14 mr-10">
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step >= 1 ? 'bg-green-500 text-white' : 'bg-slate-200 text-slate-400'}`}>
              {step > 1 ? <span className="material-symbols-outlined text-sm">check</span> : '1'}
            </div>
            <span className={`text-xs font-bold ${step === 1 ? 'text-blue-800' : 'text-slate-400'}`}>Selección</span>
          </div>
          <div className="w-12 h-px bg-slate-200"></div>
          <div className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black ${step >= 2 ? (step > 2 ? 'bg-green-500 text-white' : 'bg-blue-800 text-white') : 'bg-slate-200 text-slate-400'}`}>
              {step > 2 ? <span className="material-symbols-outlined text-sm">check</span> : '2'}
            </div>
            <span className={`text-xs font-bold ${step === 2 ? 'text-blue-800' : 'text-slate-400'}`}>Confirmar</span>
          </div>
        </div>
        
        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
           <span className="material-symbols-outlined">person</span>
        </div>
      </div>

      {step === 1 && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Col Izquierda: Especialidad y Médicos (Imagen 1) */}
          <div className="xl:col-span-3 space-y-6">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-black text-slate-900 dark:text-white text-sm mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-blue-800">medical_services</span>
                Especialidad
              </h3>
              <div className="relative">
                <select className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-3.5 font-bold text-slate-700 appearance-none outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Cardiología</option>
                  <option>Pediatría</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">expand_more</span>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-6 shadow-sm">
              <h3 className="font-black text-slate-900 dark:text-white text-sm">Seleccionar Médico</h3>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 mb-6">3 especialistas disponibles</p>
              
              <div className="space-y-4">
                {doctors.map(doc => (
                  <div 
                    key={doc.id} 
                    onClick={() => setSelectedDoctor(doc.id)}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-3 relative ${
                      selectedDoctor === doc.id ? 'border-blue-800 bg-blue-50/20 shadow-sm' : 'border-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <img src={doc.img} className="w-12 h-12 rounded-lg object-cover" alt={doc.name} />
                    <div className="flex-1 min-w-0">
                      <p className="font-black text-slate-900 dark:text-white text-[11px] truncate">{doc.name}</p>
                      <p className="text-[9px] font-medium text-slate-400 truncate">{doc.spec}</p>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({length: 5}).map((_, i) => (
                          <span key={i} className={`material-symbols-outlined text-[10px] ${i < Math.floor(doc.rating) ? 'text-yellow-400' : 'text-slate-200'}`}>star</span>
                        ))}
                        <span className="text-[9px] font-bold text-slate-400">({doc.rating})</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${selectedDoctor === doc.id ? 'border-blue-800 bg-blue-800' : 'border-slate-300'}`}>
                      {selectedDoctor === doc.id && <div className="w-1.5 h-1.5 bg-white rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Col Centro: Calendario (Imagen 1) */}
          <div className="xl:col-span-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 p-10 shadow-sm">
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-xl font-black text-slate-900 dark:text-white">Septiembre 2023</h3>
              <div className="flex gap-2">
                <button className="w-10 h-10 border border-slate-100 rounded-xl text-slate-400 flex items-center justify-center hover:bg-slate-50"><span className="material-symbols-outlined text-sm">chevron_left</span></button>
                <button className="w-10 h-10 border border-slate-100 rounded-xl text-slate-400 flex items-center justify-center hover:bg-slate-50"><span className="material-symbols-outlined text-sm">chevron_right</span></button>
              </div>
            </div>
            
            <div className="grid grid-cols-7 gap-y-12 text-center">
              {['DOM','LUN','MAR','MIÉ','JUE','VIE','SÁB'].map(d => <span key={d} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{d}</span>)}
              {Array.from({length: 30}).map((_, i) => {
                const day = i + 1;
                return (
                  <button 
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`w-14 h-14 mx-auto rounded-full flex flex-col items-center justify-center relative transition-all ${
                      selectedDay === day 
                      ? 'bg-blue-800 text-white shadow-2xl scale-110' 
                      : 'text-slate-900 dark:text-white hover:bg-blue-50'
                    }`}
                  >
                    <span className="text-base font-black">{day}</span>
                    {[13, 16, 19].includes(day) && (
                      <div className={`absolute bottom-2.5 w-1 h-1 rounded-full ${day === 13 ? 'bg-blue-600' : 'bg-green-500'}`}></div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="mt-20 pt-10 border-t border-slate-50 flex justify-center gap-12">
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 bg-blue-800 rounded-full"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Seleccionado</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 bg-slate-100 rounded-full"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Disponible</span>
              </div>
              <div className="flex items-center gap-2.5">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hoy</span>
              </div>
            </div>
          </div>

          {/* Col Derecha: Horarios (Imagen 1) */}
          <div className="xl:col-span-3">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm h-full flex flex-col overflow-hidden">
              <div className="p-8 space-y-10 flex-1">
                <div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">Horarios disponibles</h3>
                  <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">calendar_month</span>
                    Jueves, 14 de Septiembre
                  </p>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                      <span className="material-symbols-outlined text-sm">light_mode</span>
                      <span className="text-[9px] font-black uppercase tracking-widest">Mañana</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {morningTimes.map(t => (
                        <button 
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 rounded-xl text-[11px] font-black transition-all ${
                            selectedTime === t ? 'bg-blue-800 text-white shadow-lg' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-blue-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 text-slate-400 mb-4">
                      <span className="material-symbols-outlined text-sm">wb_twilight</span>
                      <span className="text-[9px] font-black uppercase tracking-widest">Tarde</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {afternoonTimes.map(t => (
                        <button 
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`py-3 rounded-xl text-[11px] font-black transition-all ${
                            selectedTime === t ? 'bg-blue-800 text-white shadow-lg' : 'bg-slate-50 text-slate-600 border border-slate-100 hover:border-blue-200'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-slate-50/30 border-t border-slate-50 space-y-6">
                <div className="flex justify-between items-baseline">
                  <p className="text-xs font-bold text-slate-400">Costo Consulta:</p>
                  <p className="text-2xl font-black text-slate-900 dark:text-white">S/ 150.00</p>
                </div>
                <button 
                  onClick={() => setStep(2)}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white py-5 rounded-2xl font-black shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  Siguiente
                  <span className="material-symbols-outlined font-black">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-7xl mx-auto">
          {/* Pagar Reserva (Imagen 2 Left) */}
          <div className="lg:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
            <div className="p-12 space-y-12">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">Pagar Reserva</h3>
                  <p className="text-base text-slate-500 font-medium mt-1">Elige tu método de pago preferido para finalizar.</p>
                </div>
                <div className="bg-slate-50 px-5 py-2.5 rounded-xl border border-slate-100 flex items-center gap-2">
                   <span className="text-xs font-black text-slate-400 italic tracking-widest uppercase">izipay</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-5">
                {[
                  { id: 'Yape', icon: 'qr_code_2', color: 'bg-purple-600' },
                  { id: 'Plin', icon: 'qr_code_2', color: 'bg-cyan-500' },
                  { id: 'Tarjeta', icon: 'credit_card', color: 'bg-blue-900' }
                ].map(method => (
                  <button 
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-8 rounded-[2rem] border-2 transition-all flex flex-col items-center gap-4 ${
                      paymentMethod === method.id ? 'border-blue-800 bg-blue-50/20 ring-4 ring-blue-800/10' : 'border-slate-50 hover:border-slate-200'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white ${method.color} shadow-lg`}>
                      <span className="material-symbols-outlined text-3xl font-bold">{method.icon}</span>
                    </div>
                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">{method.id}</span>
                  </button>
                ))}
              </div>

              <div className="space-y-8 pt-6">
                <div className="space-y-2.5">
                  <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Número de tarjeta</label>
                  <div className="relative">
                    <span className="material-symbols-outlined absolute left-6 top-1/2 -translate-y-1/2 text-slate-400">credit_card</span>
                    <input className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] pl-16 pr-14 py-4.5 font-bold text-slate-900 outline-none focus:border-blue-800 transition-all" placeholder="0000 0000 0000 0000" />
                    <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-300">contactless</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-10">
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">Fecha de Vencimiento</label>
                    <input className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-6 py-4.5 font-bold text-slate-900 outline-none focus:border-blue-800 transition-all" placeholder="MM / AA" />
                  </div>
                  <div className="space-y-2.5">
                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest ml-1">CVV</label>
                    <div className="relative">
                      <input className="w-full bg-white border-2 border-slate-100 rounded-[1.5rem] px-6 py-4.5 font-bold text-slate-900 outline-none focus:border-blue-800 transition-all" placeholder="123" />
                      <span className="material-symbols-outlined absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 text-sm">help</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={() => setStep(3)}
                  className="w-full bg-blue-800 hover:bg-blue-900 text-white py-5 rounded-[1.5rem] font-black shadow-2xl shadow-blue-900/30 active:scale-95 transition-all text-lg mt-8"
                >
                  Pagar S/ 150.00
                </button>
              </div>
            </div>
            <div className="p-8 bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between border-t border-slate-100">
               <div className="flex items-center gap-3 text-slate-400">
                  <span className="material-symbols-outlined text-base">lock</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">Pago encriptado con seguridad de nivel bancario</span>
               </div>
               <div className="flex gap-4 opacity-40">
                  <div className="w-10 h-6 bg-slate-400 rounded-sm"></div>
                  <div className="w-10 h-6 bg-slate-400 rounded-sm"></div>
               </div>
            </div>
          </div>

          {/* Resumen de Cita (Imagen 2 Right) */}
          <div className="lg:col-span-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 space-y-10 sticky top-28">
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Resumen de Cita</h3>
              
              <div className="space-y-8">
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">person</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Especialista</p>
                    <p className="text-base font-black text-slate-900 dark:text-white mt-1">Dr. Ricardo Palma</p>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-widest leading-none">Cardiología - Medicina Interna</p>
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="w-12 h-12 bg-blue-50 text-blue-800 rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <span className="material-symbols-outlined text-2xl">calendar_today</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha y Hora</p>
                    <p className="text-base font-black text-slate-900 dark:text-white mt-1">Jueves, 24 de Octubre</p>
                    <p className="text-[11px] font-bold text-slate-500 mt-1 uppercase tracking-widest leading-none">10:30 AM - Sede Principal</p>
                  </div>
                </div>
              </div>

              <div className="pt-10 border-t border-slate-100 space-y-4">
                 <div className="flex justify-between text-sm font-bold text-slate-500">
                    <span>Consulta Médica</span>
                    <span>S/ 150.00</span>
                 </div>
                 <div className="flex justify-between text-sm font-bold text-slate-500">
                    <span>Comisión de reserva</span>
                    <span className="text-blue-600">S/ 0.00</span>
                 </div>
                 <div className="flex justify-between items-baseline pt-6">
                    <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Total a pagar</p>
                    <p className="text-4xl font-black text-blue-800 tracking-tighter">S/ 150.00</p>
                 </div>
              </div>

              <div className="bg-blue-50/50 p-6 rounded-[2rem] flex gap-4 text-blue-800 border border-blue-100">
                 <span className="material-symbols-outlined text-xl">info</span>
                 <p className="text-[11px] font-medium leading-relaxed">Puedes reprogramar tu cita sin costo hasta 24 horas antes del horario seleccionado.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="max-w-4xl mx-auto space-y-12 animate-in zoom-in-95 duration-700 text-center pt-10">
          <div className="space-y-6">
            <div className="w-24 h-24 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-[0_20px_50px_rgba(34,197,94,0.3)] border-[8px] border-white">
              <span className="material-symbols-outlined text-5xl font-black">check</span>
            </div>
            <h2 className="text-5xl font-black text-slate-900 dark:text-white tracking-tighter">¡Cita Reservada Exitosamente!</h2>
            <p className="text-slate-500 font-medium max-w-lg mx-auto text-lg leading-relaxed">Su pago de S/ 150.00 ha sido procesado correctamente y tu cita ha sido agendada en nuestro sistema.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-sm p-12 max-w-2xl mx-auto text-left space-y-10">
            <div className="flex items-center gap-4">
               <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-xl flex items-center justify-center shadow-sm">
                 <span className="material-symbols-outlined text-2xl font-bold">notifications_active</span>
               </div>
               <h4 className="font-black text-slate-900 dark:text-white text-xl">Notificaciones enviadas</h4>
            </div>
            <div className="space-y-4">
               <div className="bg-green-50/50 p-6 rounded-2xl flex items-center gap-5 border border-green-100">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-base font-black">check</span>
                  </div>
                  <p className="text-base font-bold text-slate-700 dark:text-slate-300">Correo electrónico enviado a <span className="font-black text-slate-900">paciente@email.com</span></p>
               </div>
               <div className="bg-green-50/50 p-6 rounded-2xl flex items-center gap-5 border border-green-100">
                  <div className="w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-base font-black">check</span>
                  </div>
                  <p className="text-base font-bold text-slate-700 dark:text-slate-300">Mensaje de WhatsApp enviado al <span className="font-black text-slate-900">+51 987 654 321</span></p>
               </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden max-w-2xl mx-auto text-left">
             <div className="bg-blue-800 p-8 flex items-center gap-4 text-white">
                <span className="material-symbols-outlined font-black">receipt_long</span>
                <span className="font-black text-base uppercase tracking-widest">Resumen de la Cita</span>
             </div>
             <div className="p-12 space-y-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="flex gap-6">
                      <div className="w-16 h-16 bg-blue-50 text-blue-800 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-sm">
                         <span className="material-symbols-outlined text-4xl">person</span>
                      </div>
                      <div>
                         <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">ESPECIALISTA</p>
                         <p className="text-xl font-black text-slate-900 dark:text-white mt-1">Dr. Ricardo Palma</p>
                         <p className="text-xs font-bold text-slate-500 mt-1">Cardiología - Medicina Interna</p>
                      </div>
                   </div>
                   <div className="flex gap-6">
                      <div className="w-16 h-16 bg-blue-50 text-blue-800 rounded-[1.5rem] flex items-center justify-center shrink-0 shadow-sm">
                         <span className="material-symbols-outlined text-4xl">calendar_today</span>
                      </div>
                      <div>
                         <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">FECHA Y HORA</p>
                         <p className="text-xl font-black text-slate-900 dark:text-white mt-1">Jueves, 24 de Octubre</p>
                         <p className="text-xs font-bold text-slate-500 mt-1">10:30 AM - Sede Principal</p>
                      </div>
                   </div>
                </div>

                <div className="pt-12 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-8">
                   <div className="space-y-3 text-center md:text-left">
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Monto Pagado: <span className="font-black text-blue-800 ml-2 text-lg">S/ 150.00</span></p>
                      <p className="text-[12px] font-bold text-slate-400 uppercase tracking-widest">Código de Reserva: <span className="font-black text-slate-900 ml-2">AY-849201</span></p>
                   </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   <button className="w-full bg-blue-800 text-white py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 shadow-2xl active:scale-95 transition-all text-sm">
                      <span className="material-symbols-outlined font-black">download</span>
                      Descargar Ticket PDF
                   </button>
                   <button onClick={() => setStep(1)} className="w-full border-2 border-slate-100 text-slate-700 py-5 rounded-[1.5rem] font-black flex items-center justify-center gap-3 hover:bg-slate-50 active:scale-95 transition-all text-sm">
                      <span className="material-symbols-outlined font-black">calendar_add_on</span>
                      Agendar otra cita
                   </button>
                </div>
             </div>
          </div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">¿Necesitas ayuda? Contáctanos al (01) 456-7890 o vía WhatsApp.</p>
        </div>
      )}

      {/* Footer Branding (Imagen Success) */}
      <footer className="mt-20 py-12 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-6 text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-4">
         <div className="flex items-center gap-3">
            <div className="bg-slate-100 p-1.5 rounded-lg">
              <span className="material-symbols-outlined text-lg">local_hospital</span>
            </div>
            <span>© 2023 Clínica Ayacucho. Todos los derechos reservados.</span>
         </div>
         <div className="flex gap-10">
            <a href="#" className="hover:text-blue-800 transition-colors">Términos y Condiciones</a>
            <a href="#" className="hover:text-blue-800 transition-colors">Políticas de Privacidad</a>
            <a href="#" className="hover:text-blue-800 transition-colors">Libro de Reclamaciones</a>
         </div>
      </footer>
    </div>
  );
};

export default BookingFlow;
