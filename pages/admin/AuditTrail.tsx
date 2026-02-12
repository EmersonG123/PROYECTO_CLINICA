
import React, { useState, useMemo } from 'react';

const AuditTrail: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLogId, setSelectedLogId] = useState(82910);
  const [currentPage, setCurrentPage] = useState(1);

  const logs = [
    { id: 82910, date: '24 Oct 2023', time: '14:45:22', user: 'Dr. Juan Pérez', role: 'Médico General', action: 'Modificación HCE', module: 'Historia Clínica', icon: 'edit_note', color: 'text-orange-600 bg-orange-50', ip: '192.168.1.105', session: 'sess_8912aa901', oldVal: '[NULL]', newVal: '"Hipertensión Arterial Primaria (I10)"' },
    { id: 82911, date: '24 Oct 2023', time: '14:30:15', user: 'Ana Gomez', role: 'Recepción', action: 'Consulta de Agenda', module: 'Citas', icon: 'visibility', color: 'text-blue-600 bg-blue-50', ip: '192.168.1.42', session: 'sess_9021bb304', oldVal: 'Visualización', newVal: 'Consulta completa' },
    { id: 82912, date: '24 Oct 2023', time: '12:15:00', user: 'Carlos Ruiz', role: 'Admin IT', action: 'Cambio de Permisos', module: 'Seguridad', icon: 'report', color: 'text-red-600 bg-red-50', ip: '10.0.0.5', session: 'sess_1122cc556', oldVal: 'Rol: Recepción', newVal: 'Rol: Admin' },
    { id: 82913, date: '24 Oct 2023', time: '09:12:44', user: 'Maria Lopez', role: 'Enfermera', action: 'Inicio de Sesión Exitoso', module: 'Acceso', icon: 'login', color: 'text-green-600 bg-green-50', ip: '192.168.1.88', session: 'sess_3344dd778', oldVal: 'Login', newVal: 'Success' },
    { id: 82914, date: '23 Oct 2023', time: '18:05:10', user: 'Sofia Lima', role: 'Laboratorio', action: 'Carga de Resultados', module: 'Lab', icon: 'upload_file', color: 'text-purple-600 bg-purple-50', ip: '192.168.2.12', session: 'sess_5566ee990', oldVal: 'Pendiente', newVal: 'Archivo cargado: Hemograma.pdf' },
  ];

  const filteredLogs = useMemo(() => {
    return logs.filter(log => 
      log.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.module.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const selectedLog = useMemo(() => logs.find(l => l.id === selectedLogId) || logs[0], [selectedLogId]);

  const handleExport = () => {
    alert("Exportando registros de auditoría en formato CSV...");
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1600px] mx-auto">
      <div className="space-y-4">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Auditoría y Trazabilidad</h1>
        <p className="text-slate-500 font-medium max-w-2xl">Registro detallado de actividades del sistema para garantizar la seguridad clínica y el cumplimiento normativo.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
        {/* Tabla de Logs */}
        <div className="xl:col-span-8 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden flex flex-col">
              <div className="p-8 border-b border-slate-50 dark:border-slate-800 flex flex-wrap items-center justify-between gap-6">
                 <div className="relative group w-full max-w-xs">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-300">search</span>
                    <input 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl pl-11 pr-4 py-2.5 text-xs font-bold" placeholder="Buscar por usuario, acción..." 
                    />
                 </div>
                 <div className="flex gap-4">
                    <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-xs font-black uppercase px-4 py-2.5 outline-none">
                       <option>Todos los módulos</option>
                       <option>Historia Clínica</option>
                       <option>Citas</option>
                       <option>Seguridad</option>
                       <option>Acceso</option>
                    </select>
                    <button className="bg-slate-50 dark:bg-slate-800 px-5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-black uppercase text-slate-600">
                       <span className="material-symbols-outlined text-lg">calendar_today</span>
                       Últimos 30 días
                    </button>
                    <button onClick={handleExport} className="bg-white border-2 border-slate-100 px-5 py-2.5 rounded-xl flex items-center gap-3 text-xs font-black uppercase text-slate-900 hover:bg-slate-50 transition-all">
                       <span className="material-symbols-outlined text-lg">ios_share</span>
                       Exportar CSV
                    </button>
                 </div>
              </div>

              <div className="overflow-x-auto">
                 <table className="w-full text-left">
                    <thead>
                       <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                          <th className="px-10 py-6">FECHA / HORA</th>
                          <th className="px-10 py-6">USUARIO</th>
                          <th className="px-10 py-6">ACCIÓN REALIZADA</th>
                          <th className="px-10 py-6">MÓDULO</th>
                       </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                       {filteredLogs.map((log, i) => (
                         <tr 
                          key={log.id} 
                          onClick={() => setSelectedLogId(log.id)}
                          className={`hover:bg-blue-50/20 transition-all cursor-pointer relative ${selectedLogId === log.id ? 'bg-blue-50/40' : ''}`}
                         >
                            {selectedLogId === log.id && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-800"></div>}
                            <td className="px-10 py-8">
                               <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{log.date}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase mt-1.5">{log.time}</p>
                            </td>
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-4">
                                  <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-blue-800 text-xs shrink-0">
                                     {log.user.split(' ').map(n => n[0]).join('')}
                                  </div>
                                  <div>
                                     <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{log.user}</p>
                                     <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{log.role}</p>
                                  </div>
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <div className="flex items-center gap-4">
                                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${log.color}`}>
                                     <span className="material-symbols-outlined text-base">{log.icon}</span>
                                  </div>
                                  <p className="text-sm font-black text-slate-900 dark:text-white">{log.action}</p>
                               </div>
                            </td>
                            <td className="px-10 py-8">
                               <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-[9px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest border border-slate-200 dark:border-slate-700">{log.module}</span>
                            </td>
                         </tr>
                       ))}
                       {filteredLogs.length === 0 && (
                         <tr>
                           <td colSpan={4} className="px-10 py-20 text-center text-slate-400 font-bold uppercase text-xs tracking-widest">Sin resultados para la búsqueda</td>
                         </tr>
                       )}
                    </tbody>
                 </table>
              </div>

              <div className="p-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                 <p className="text-sm font-bold text-slate-400 italic">Mostrando {filteredLogs.length} logs filtrados</p>
                 <div className="flex gap-2">
                    <button 
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                      className="p-2.5 rounded-xl border border-slate-100 text-slate-400 disabled:opacity-20"
                    >
                      <span className="material-symbols-outlined">chevron_left</span>
                    </button>
                    <div className="flex gap-1">
                       <button className="w-8 h-8 bg-blue-800 text-white rounded-lg text-xs font-black">1</button>
                       <button className="w-8 h-8 hover:bg-slate-100 rounded-lg text-xs font-black">2</button>
                    </div>
                    <button 
                      onClick={() => setCurrentPage(currentPage + 1)}
                      className="p-2.5 rounded-xl border border-slate-100 text-slate-400"
                    >
                      <span className="material-symbols-outlined">chevron_right</span>
                    </button>
                 </div>
              </div>
           </div>
        </div>

        {/* Panel Detalle (Imagen 1 Right) */}
        <div className="xl:col-span-4 space-y-8">
           <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-2xl p-10 flex flex-col gap-10">
              <div className="flex justify-between items-start">
                 <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined text-blue-800 text-3xl font-black">manage_search</span>
                    <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Detalle del Log #{selectedLog.id}</h3>
                 </div>
                 <button onClick={() => alert("Cerrando panel lateral...")} className="p-2 text-slate-300 hover:text-slate-900 transition-colors"><span className="material-symbols-outlined">close</span></button>
              </div>

              <div className="grid grid-cols-2 gap-x-12 gap-y-8 pb-10 border-b border-slate-50 dark:border-slate-800">
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">USUARIO</p>
                    <div className="flex items-center gap-3">
                       <div className="w-6 h-6 rounded-full bg-blue-100 text-[8px] flex items-center justify-center font-black">{selectedLog.user.split(' ').map(n => n[0]).join('')}</div>
                       <p className="text-xs font-black text-slate-900 dark:text-white">{selectedLog.user}</p>
                    </div>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">IP ORIGEN</p>
                    <p className="text-xs font-black text-slate-900 dark:text-white">{selectedLog.ip}</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">ID SESIÓN</p>
                    <p className="text-[10px] font-bold text-slate-400 break-all">{selectedLog.session}</p>
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">HORA EVENTO</p>
                    <p className="text-xs font-black text-slate-900 dark:text-white">{selectedLog.time}</p>
                 </div>
              </div>

              <div className="space-y-8">
                 <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-orange-600">history</span>
                    <h4 className="font-black text-sm uppercase tracking-widest text-slate-900 dark:text-white">Cambios Registrados</h4>
                 </div>
                 
                 <div className="bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 border border-slate-100 dark:border-slate-800 space-y-4">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Atributo Modificado</p>
                    <div className="space-y-4">
                       <div className="flex items-center gap-4">
                          <span className="text-[9px] font-black text-red-500 uppercase w-16">ANTERIOR</span>
                          <div className="flex-1 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl border border-red-100 dark:border-red-900/40 font-mono text-[10px] text-red-700">{selectedLog.oldVal}</div>
                       </div>
                       <div className="flex justify-center -my-2">
                          <span className="material-symbols-outlined text-slate-200">arrow_downward</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <span className="text-[9px] font-black text-green-500 uppercase w-16">NUEVO</span>
                          <div className="flex-1 bg-green-50 dark:bg-green-900/20 p-3 rounded-xl border border-green-100 dark:border-green-900/40 font-mono text-[10px] text-green-700">{selectedLog.newVal}</div>
                       </div>
                    </div>
                 </div>

                 <div className="bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/40 rounded-3xl p-6 flex gap-4">
                    <span className="material-symbols-outlined text-blue-600">info</span>
                    <div>
                       <p className="text-[10px] font-black text-blue-800 dark:text-blue-400 uppercase tracking-tight">Análisis de Integridad</p>
                       <p className="text-[11px] font-medium text-slate-600 dark:text-slate-400 leading-relaxed mt-1">Este evento cumple con los protocolos de seguridad. Firma digital validada: OK.</p>
                    </div>
                 </div>
              </div>

              <div className="pt-10 border-t border-slate-50 flex gap-4">
                 <button onClick={() => window.print()} className="flex-1 bg-white border-2 border-slate-100 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-600 hover:bg-slate-50 transition-all">Imprimir Detalle</button>
                 <button onClick={() => alert("Reporte enviado al Oficial de Seguridad.")} className="flex-1 bg-slate-900 text-white px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Reportar Incidente</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
