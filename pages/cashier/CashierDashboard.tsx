
import React from 'react';

const CashierDashboard: React.FC = () => {
  const kpis = [
    { title: 'Ingresos Totales (Hoy)', value: 'S/ 4,250.00', trend: '+12% vs ayer', icon: 'payments', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Efectivo en Caja', value: 'S/ 1,850.00', sub: 'Base inicial: S/ 200.00', icon: 'attach_money', color: 'text-green-600', bg: 'bg-green-50' },
    { title: 'Pagos Digitales', value: 'S/ 2,400.00', sub: 'Tarjetas + QR (Yape/Plin)', icon: 'qr_code_2', color: 'text-purple-600', bg: 'bg-purple-50' },
    { title: 'Transacciones Exitosas', value: '48', alert: '2 Anulaciones pendientes', icon: 'receipt_long', color: 'text-orange-600', bg: 'bg-orange-50' }
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none uppercase">Dashboard & Resumen Operativo</h1>
          <p className="text-slate-500 font-medium mt-2">Vista general del turno actual - Caja 04</p>
        </div>
        <div className="flex items-center gap-6">
           <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Fecha: 24 Oct, 2023</p>
              <p className="text-sm font-black text-blue-800 uppercase mt-0.5">Turno: Mañana</p>
           </div>
           <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 relative">
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
           </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-sm relative group">
             <div className="flex justify-between items-start mb-6">
                <div className="space-y-1">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed max-w-[120px]">{kpi.title}</p>
                   <h4 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter mt-2">{kpi.value}</h4>
                </div>
                <div className={`w-12 h-12 rounded-2xl ${kpi.bg} ${kpi.color} flex items-center justify-center shadow-sm`}>
                   <span className="material-symbols-outlined text-2xl font-bold">{kpi.icon}</span>
                </div>
             </div>
             {kpi.trend && <p className="text-[9px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">trending_up</span> {kpi.trend}</p>}
             {kpi.sub && <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{kpi.sub}</p>}
             {kpi.alert && <p className="text-[9px] font-black text-red-600 uppercase tracking-widest flex items-center gap-1.5"><span className="material-symbols-outlined text-xs">error</span> {kpi.alert}</p>}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
        {/* Chart Area */}
        <div className="xl:col-span-8 bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm p-10 flex flex-col h-[600px]">
           <div className="flex items-center justify-between mb-12">
              <h3 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest flex items-center gap-3">
                 <span className="material-symbols-outlined text-blue-800">bar_chart</span>
                 Resumen de Ingresos por Medio de Pago
              </h3>
              <div className="px-5 py-2 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-400">Turno Actual</div>
           </div>

           <div className="flex-1 flex flex-col justify-end">
              <div className="grid grid-cols-4 gap-12 h-64 items-end px-10">
                 {[
                   { label: 'Efectivo', val: '65%', color: 'bg-green-500' },
                   { label: 'Tarjetas', val: '85%', color: 'bg-blue-800' },
                   { label: 'Billeteras', val: '45%', color: 'bg-purple-600' },
                   { label: 'Seguros', val: '30%', color: 'bg-slate-300' }
                 ].map((bar, i) => (
                   <div key={i} className="flex flex-col items-center gap-4">
                      <div className="w-full bg-slate-50 rounded-t-2xl relative group overflow-hidden" style={{ height: bar.val }}>
                         <div className={`absolute inset-0 ${bar.color} opacity-90 group-hover:opacity-100 transition-opacity`}></div>
                      </div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{bar.label}</span>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Sidebar panels */}
        <div className="xl:col-span-4 space-y-8">
           {/* Cierre de Jornada (Imagen 1) */}
           <div className="bg-blue-800 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-blue-900/40">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
              <div className="relative z-10 space-y-6">
                 <h4 className="text-2xl font-black tracking-tight leading-none">Cierre de Jornada</h4>
                 <p className="text-blue-100/60 text-sm font-medium leading-relaxed">Verifique que todos los comprobantes estén emitidos antes de proceder.</p>
                 
                 <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 flex items-center justify-between border border-white/10">
                    <div>
                       <p className="text-[9px] font-black text-blue-200 uppercase tracking-[0.2em] mb-1">Cuadre actual</p>
                       <p className="text-lg font-black uppercase">OK</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[9px] font-black text-blue-200 uppercase tracking-[0.2em] mb-1">17:45 PM</p>
                       <span className="material-symbols-outlined text-blue-200">lock</span>
                    </div>
                 </div>

                 <button className="w-full bg-white text-blue-800 py-5 rounded-2xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                    <span className="material-symbols-outlined text-xl">history</span>
                    Realizar Cierre de Caja
                 </button>
              </div>
           </div>

           {/* Alertas Facturación SUNAT (Imagen 1) */}
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex items-center gap-4">
                 <span className="material-symbols-outlined text-orange-600">warning</span>
                 <h4 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-widest">Alertas Facturación SUNAT</h4>
              </div>
              <div className="p-8 space-y-8">
                 {[
                   { icon: 'error', color: 'text-red-600', bg: 'bg-red-50', title: 'Boleta B001-458 Rechazada', desc: 'Error de conexión con servicio SUNAT. Reintentar.', action: 'Ver detalle' },
                   { icon: 'schedule', color: 'text-yellow-600', bg: 'bg-yellow-50', title: '3 Facturas Pendientes de Envío', desc: 'Cola de envío programada para 18:00.' },
                   { icon: 'info', color: 'text-blue-600', bg: 'bg-blue-50', title: 'Nota de Crédito Generada', desc: 'NC001-23 asociada a Factura F001-992.' }
                 ].map((alert, i) => (
                   <div key={i} className="flex gap-5">
                      <div className={`w-10 h-10 rounded-xl ${alert.bg} ${alert.color} flex items-center justify-center shrink-0`}>
                         <span className="material-symbols-outlined text-xl">{alert.icon}</span>
                      </div>
                      <div className="space-y-1">
                         <p className="text-xs font-black text-slate-900 dark:text-white leading-tight">{alert.title}</p>
                         <p className="text-[11px] font-medium text-slate-400 leading-relaxed">{alert.desc}</p>
                         {alert.action && <button className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-widest hover:underline mt-1">{alert.action}</button>}
                      </div>
                   </div>
                 ))}
                 <button className="w-full py-4 text-[10px] font-black text-blue-800 uppercase tracking-[0.2em] border-t border-slate-50 mt-4 hover:bg-slate-50 transition-all">Ver todas las alertas</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CashierDashboard;
