
import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface Patient {
  id: string;
  name: string;
  dni: string;
  age: string;
  sex: string;
  phone: string;
  status: string;
  regDate: string;
  initial: string;
}

const ManagePatients: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('TODOS');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editForm, setEditForm] = useState<Patient | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  const [patients, setPatients] = useState<Patient[]>([
    { id: '1', name: 'Juan Pérez Rodríguez', dni: '45889922', age: '34', sex: 'MASCULINO', phone: '991 827 364', status: 'ACTIVO', regDate: '12/10/2023', initial: 'JP' },
    { id: '2', name: 'María Fernanda López', dni: '74839201', age: '28', sex: 'FEMENINO', phone: '988 221 002', status: 'ACTIVO', regDate: '14/10/2023', initial: 'ML' },
    { id: '3', name: 'Carlos Ruiz García', dni: '10293847', age: '52', sex: 'MASCULINO', phone: '944 332 110', status: 'INACTIVO', regDate: '05/09/2023', initial: 'CG' },
  ]);

  const filteredPatients = useMemo(() => {
    return patients.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.dni.includes(searchQuery);
      const matchesStatus = activeFilter === 'TODOS' || p.status === activeFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchQuery, activeFilter, patients]);

  const handleOpenEdit = (p: Patient) => {
    setSelectedPatient(p);
    setEditForm({ ...p });
    setIsDirty(false);
  };

  const handleCloseEdit = () => {
    if (isDirty) {
      const confirmClose = window.confirm("Tiene cambios sin guardar en los 'Detalles del Registro'. ¿Está seguro de que desea cerrar el modal?");
      if (!confirmClose) return;
    }
    setSelectedPatient(null);
    setEditForm(null);
    setIsDirty(false);
  };

  const handleInputChange = (field: keyof Patient, value: string) => {
    if (editForm) {
      setEditForm({ ...editForm, [field]: value });
      setIsDirty(true);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editForm) return;
    
    setPatients(prev => prev.map(p => p.id === editForm.id ? editForm : p));
    alert("Registro actualizado con éxito.");
    setIsDirty(false);
    setSelectedPatient(null);
    setEditForm(null);
  };

  return (
    <div className="min-h-full space-y-8 animate-in fade-in duration-500 pb-10">
      {/* Header Sección */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight uppercase">GESTIÓN DE PACIENTES</h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Directorio maestro de pacientes registrados en la clínica.</p>
        </div>
        <button 
          onClick={() => navigate('/reception/pacientes/nuevo')}
          className="bg-[#1d4ed8] hover:bg-blue-700 text-white px-10 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 flex items-center gap-3 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-lg font-black">person_add</span>
          REGISTRAR
        </button>
      </div>

      {/* Barra de Búsqueda y Tabs */}
      <div className="flex flex-col xl:flex-row items-center gap-6">
        <div className="relative group flex-1 w-full">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-blue-500 font-bold group-focus-within:scale-110 transition-transform">search</span>
          <input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 py-4 font-bold text-slate-900 dark:text-white placeholder:text-slate-400 outline-none focus:border-blue-600 transition-all shadow-sm" 
            placeholder="Buscar por DNI o Nombres del Paciente..." 
          />
        </div>

        <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          {['TODOS', 'ACTIVO', 'INACTIVO'].map(filter => (
            <button 
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeFilter === filter ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Tabla con Estilo "Slider" y Diseño de Imagen */}
      <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 dark:shadow-none overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] border-b border-slate-50 dark:border-slate-800">
                <th className="px-10 py-8">PACIENTE</th>
                <th className="px-10 py-8">DNI</th>
                <th className="px-10 py-8 text-center">EDAD</th>
                <th className="px-10 py-8 text-center">SEXO</th>
                <th className="px-10 py-8">TELÉFONO</th>
                <th className="px-10 py-8">FECHA REGISTRO</th>
                <th className="px-10 py-8 text-center">ESTADO</th>
                <th className="px-10 py-8 text-right">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
              {filteredPatients.length > 0 ? filteredPatients.map((p) => (
                <tr key={p.id} className="hover:bg-blue-50/30 dark:hover:bg-blue-900/10 transition-colors group">
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center font-black text-blue-700 dark:text-blue-400 text-xs shadow-sm">
                        {p.initial}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-black text-slate-900 dark:text-white uppercase leading-none truncate">{p.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">ASEGURADO</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-10 py-8">
                    <div className="inline-flex items-center gap-2.5 px-4 py-2 bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-xl">
                      <span className="material-symbols-outlined text-blue-300 dark:text-blue-600 text-lg">badge</span>
                      <span className="text-sm font-black text-slate-700 dark:text-slate-300 tracking-tight">
                        {p.dni}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className="text-sm font-black text-slate-700 dark:text-slate-300">{p.age}</span>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <span className="text-[10px] font-black uppercase text-slate-400 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-100 dark:border-slate-700">
                      {p.sex}
                    </span>
                  </td>
                  <td className="px-10 py-8">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 leading-tight">
                      {p.phone}
                    </p>
                  </td>
                  <td className="px-10 py-8">
                    <div className="flex items-center gap-2.5 text-sm font-bold text-slate-500 dark:text-slate-400">
                       <span className="material-symbols-outlined text-slate-300 text-lg">calendar_today</span>
                       {p.regDate}
                    </div>
                  </td>
                  <td className="px-10 py-8 text-center">
                    <div className="flex justify-center">
                      <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest border flex items-center gap-2.5 w-fit ${
                        p.status === 'ACTIVO' 
                        ? 'bg-green-50 text-green-600 border-green-100' 
                        : 'bg-red-50 text-red-600 border-red-100'
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${p.status === 'ACTIVO' ? 'bg-green-500 shadow-sm' : 'bg-red-500'}`}></span>
                        {p.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-10 py-8 text-right">
                    <button 
                      onClick={() => handleOpenEdit(p)}
                      className="p-3 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-800 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined text-xl">edit_square</span>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="px-10 py-24 text-center">
                    <div className="flex flex-col items-center gap-4 text-slate-300">
                      <span className="material-symbols-outlined text-7xl font-light">person_search</span>
                      <p className="text-sm font-black uppercase tracking-[0.2em]">No se encontraron pacientes registrados</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-8 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between bg-slate-50/30">
          <p className="text-xs font-bold text-slate-400 italic">Desliza para ver más columnas en dispositivos pequeños</p>
          <div className="flex gap-3">
             <button className="p-2 border border-slate-200 rounded-xl text-slate-400 disabled:opacity-30" disabled><span className="material-symbols-outlined">chevron_left</span></button>
             <button className="p-2 border border-slate-200 rounded-xl text-slate-600"><span className="material-symbols-outlined">chevron_right</span></button>
          </div>
        </div>
      </div>

      {/* Modal: Detalles del Registro (Funcional con Confirmación) */}
      {selectedPatient && editForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-500">
            <div className="bg-blue-800 p-10 text-white flex justify-between items-start">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-white text-xl border border-white/20">
                    {editForm.initial}
                  </div>
                  <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase leading-none italic">Detalles del Registro</h2>
                    <p className="text-blue-200/60 font-bold text-[10px] uppercase tracking-[0.3em] mt-2">ID Paciente: #{editForm.id}</p>
                  </div>
               </div>
               <button onClick={handleCloseEdit} className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 transition-all border border-white/10">
                  <span className="material-symbols-outlined font-black">close</span>
               </button>
            </div>

            <form onSubmit={handleSave} className="p-12 space-y-10">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombres y Apellidos</label>
                     <input 
                       value={editForm.name} 
                       onChange={(e) => handleInputChange('name', e.target.value)}
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 transition-all" 
                       required 
                     />
                  </div>
                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Número DNI</label>
                     <input 
                       value={editForm.dni} 
                       onChange={(e) => handleInputChange('dni', e.target.value)}
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 transition-all" 
                       required 
                     />
                  </div>
                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Teléfono</label>
                     <input 
                       value={editForm.phone} 
                       onChange={(e) => handleInputChange('phone', e.target.value)}
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 transition-all" 
                       required 
                     />
                  </div>
                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Estado de Afiliación</label>
                     <select 
                       value={editForm.status} 
                       onChange={(e) => handleInputChange('status', e.target.value)}
                       className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 transition-all appearance-none"
                     >
                        <option value="ACTIVO">ACTIVO</option>
                        <option value="INACTIVO">INACTIVO</option>
                     </select>
                  </div>
               </div>

               <div className="bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[2rem] border border-blue-100 dark:border-blue-900/40 flex gap-6">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-800 rounded-2xl flex items-center justify-center text-blue-800 dark:text-blue-100 shrink-0">
                     <span className="material-symbols-outlined text-2xl">info</span>
                  </div>
                  <p className="text-xs font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
                    Usted está editando información sensible. Todos los cambios quedarán registrados en el sistema de auditoría institucional con su usuario.
                  </p>
               </div>

               <div className="flex gap-6 pt-4">
                  <button 
                    type="button" 
                    onClick={handleCloseEdit} 
                    className="flex-1 bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-700 text-slate-400 dark:text-slate-500 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest hover:text-red-500 transition-all active:scale-95"
                  >
                    Anular Cambios
                  </button>
                  <button 
                    type="submit" 
                    className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/40 active:scale-95 transition-all flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined text-xl">save</span>
                    Guardar Registro
                  </button>
               </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagePatients;
