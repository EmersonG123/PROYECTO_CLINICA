
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CashOpening: React.FC = () => {
  const navigate = useNavigate();
  const [yapeEnabled, setYapeEnabled] = useState(true);
  const [izipayEnabled, setIzipayEnabled] = useState(true);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="w-full max-w-5xl space-y-12">
        {/* Header Identidad */}
        <div className="flex justify-between items-center w-full px-4">
           <div className="flex items-center gap-4">
              <div className="bg-blue-800 text-white p-2.5 rounded-xl flex items-center justify-center shadow-lg">
                <span className="material-symbols-outlined text-2xl font-bold">add_box</span>
              </div>
              <span className="font-black text-slate-900 text-2xl tracking-tighter uppercase">Clínica Ayacucho</span>
           </div>
           <div className="flex items-center gap-6">
              <div className="text-right">
                 <p className="text-sm font-black text-slate-900 leading-none">Juan Pérez</p>
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Cajero - Turno Mañana</p>
              </div>
              <img src="https://i.pravatar.cc/150?u=juan" className="w-12 h-12 rounded-xl object-cover ring-2 ring-white shadow-md" alt="User" />
              <button onClick={() => navigate('/')} className="bg-white border border-slate-200 px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-900 flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all">
                 <span className="material-symbols-outlined text-lg">logout</span>
                 Cerrar Sesión
              </button>
           </div>
        </div>

        {/* Título y Subtítulo */}
        <div className="text-center md:text-left space-y-2">
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">Apertura de Caja</h1>
           <p className="text-slate-500 font-medium text-lg">Inicie su turno verificando los datos e ingresando los saldos iniciales.</p>
        </div>

        {/* Info Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-800 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined font-black">person</span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Responsable</p>
                 <p className="text-lg font-black text-slate-900 uppercase">Juan Pérez</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined font-black">calendar_today</span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Fecha</p>
                 <p className="text-lg font-black text-slate-900 uppercase">15 Oct, 2023</p>
              </div>
           </div>
           <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-800 flex items-center justify-center shrink-0">
                 <span className="material-symbols-outlined font-black">schedule</span>
              </div>
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Hora Inicio</p>
                 <p className="text-lg font-black text-slate-900 uppercase">07:58 AM</p>
              </div>
           </div>
        </div>

        {/* Central Content Card */}
        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-blue-900/5 p-12 space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-slate-400">
                    <span className="material-symbols-outlined text-lg">payments</span>
                    <label className="text-[11px] font-black uppercase tracking-widest">Saldo Inicial en Efectivo (S/)</label>
                 </div>
                 <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">S/</span>
                    <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-5 text-2xl font-black text-slate-900 focus:bg-white focus:border-blue-800 transition-all outline-none" placeholder="0.00" />
                 </div>
              </div>
              <div className="space-y-4">
                 <div className="flex items-center gap-3 text-slate-400">
                    <span className="material-symbols-outlined text-lg">savings</span>
                    <label className="text-[11px] font-black uppercase tracking-widest">Fondo para Sencillo (S/)</label>
                 </div>
                 <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-bold">S/</span>
                    <input type="text" className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-5 text-2xl font-black text-slate-900 focus:bg-white focus:border-blue-800 transition-all outline-none" placeholder="0.00" />
                 </div>
              </div>
           </div>

           <div className="pt-8 border-t border-slate-50">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Habilitar Cobros Digitales</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-2xl font-bold">qr_code_2</span>
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Yape</p>
                          <p className="text-[10px] font-medium text-slate-500 uppercase">QR y transferencias</p>
                       </div>
                    </div>
                    <button onClick={() => setYapeEnabled(!yapeEnabled)} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${yapeEnabled ? 'bg-blue-800' : 'bg-slate-300'}`}>
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${yapeEnabled ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>
                 <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-5">
                       <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center shadow-sm">
                          <span className="material-symbols-outlined text-2xl font-bold">credit_card</span>
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900 uppercase tracking-tight">Izipay</p>
                          <p className="text-[10px] font-medium text-slate-500 uppercase">Tarjetas y Contactless</p>
                       </div>
                    </div>
                    <button onClick={() => setIzipayEnabled(!izipayEnabled)} className={`w-14 h-8 rounded-full relative transition-all duration-300 ${izipayEnabled ? 'bg-blue-800' : 'bg-slate-300'}`}>
                       <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 ${izipayEnabled ? 'right-1' : 'left-1'}`}></div>
                    </button>
                 </div>
              </div>
           </div>

           <div className="flex justify-end pt-4">
              <button onClick={() => navigate('/cashier')} className="bg-blue-800 hover:bg-blue-900 text-white px-12 py-5 rounded-[1.5rem] font-black text-base uppercase tracking-widest shadow-2xl shadow-blue-900/30 active:scale-95 transition-all flex items-center gap-3">
                 <span className="material-symbols-outlined text-xl">verified</span>
                 Confirmar Apertura
              </button>
           </div>
        </div>

        {/* Disclaimer Final */}
        <p className="text-center text-slate-400 text-xs font-medium max-w-2xl mx-auto leading-relaxed">
           Al confirmar la apertura, se registrará la hora exacta y se habilitará el sistema para el <br />
           cobro de servicios médicos. Asegúrese de contar con el efectivo físico declarado.
        </p>
      </div>
    </div>
  );
};

export default CashOpening;
