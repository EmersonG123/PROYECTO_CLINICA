
import React, { useState, useMemo } from 'react';

const UserManagement: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('Todos los roles');
  
  const [users, setUsers] = useState([
    { id: 1, name: 'Dr. Juan Pérez', email: 'j.perez@ayacucho.cli', role: 'Médico', spec: 'Cardiología', status: 'Activo', lastLogin: 'Hoy, 10:30 AM', dni: '44556677' },
    { id: 2, name: 'Ana Gómez', email: 'a.gomez@ayacucho.cli', role: 'Recepción', spec: 'General', status: 'Activo', lastLogin: 'Ayer, 08:00 AM', dni: '11223344' },
    { id: 3, name: 'Carlos Ruiz', email: 'c.ruiz@ayacucho.cli', role: 'Admin', spec: 'Sistemas', status: 'Activo', lastLogin: 'Hoy, 09:12 AM', dni: '99887766' },
    { id: 4, name: 'Maria Lopez', email: 'm.lopez@ayacucho.cli', role: 'Enfermera', spec: 'Triaje', status: 'Inactivo', lastLogin: 'Hace 3 días', dni: '55667788' },
  ]);

  const [newUser, setNewUser] = useState({ name: '', dni: '', role: 'Médico', spec: '', email: '' });
  const [editingUser, setEditingUser] = useState<any>(null);

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const matchesSearch = u.name.toLowerCase().includes(searchQuery.toLowerCase()) || u.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === 'Todos los roles' || u.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Roles que requieren especificar un área o especialidad
  const ROLES_WITH_SPEC = ['Médico', 'Enfermera', 'Laboratorio'];

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>, isEditing: boolean) => {
    const selectedRole = e.target.value;
    const defaultSpec = ROLES_WITH_SPEC.includes(selectedRole) ? '' : 'Administrativo';
    
    if (isEditing && editingUser) {
      setEditingUser({ ...editingUser, role: selectedRole, spec: defaultSpec });
    } else {
      setNewUser({ ...newUser, role: selectedRole, spec: defaultSpec });
    }
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const userToAdd = {
      id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      spec: newUser.spec || 'General',
      status: 'Activo',
      lastLogin: 'Nunca',
      dni: newUser.dni
    };
    setUsers([...users, userToAdd]);
    setShowAddModal(false);
    setNewUser({ name: '', dni: '', role: 'Médico', spec: '', email: '' });
    alert("Usuario creado exitosamente.");
  };

  const handleEditClick = (user: any) => {
    setEditingUser({ ...user });
    setShowEditModal(true);
  };

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers(users.map(u => u.id === editingUser.id ? editingUser : u));
    setShowEditModal(false);
    setEditingUser(null);
    alert("Datos del usuario actualizados correctamente.");
  };

  const handleDelete = (id: number) => {
    if (confirm("¿Está seguro de eliminar este usuario? Esta acción revocará todos sus accesos inmediatamente.")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const toggleStatus = (id: number) => {
    setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Activo' ? 'Inactivo' : 'Activo' } : u));
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 max-w-[1400px] mx-auto pb-20">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-none">Gestión de Usuarios</h1>
          <p className="text-slate-500 font-medium mt-2">Administre las cuentas, roles y accesos del personal de la clínica.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-blue-800 hover:bg-blue-900 text-white px-10 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-900/30 active:scale-95 transition-all flex items-center gap-3"
        >
          <span className="material-symbols-outlined">person_add</span>
          Agregar Nuevo Usuario
        </button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex-1 w-full max-w-xl relative group">
            <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-slate-300">search</span>
            <input 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl pl-14 pr-6 py-4 font-bold text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-800 transition-all shadow-sm" 
              placeholder="Buscar por nombre, correo o rol..." 
            />
         </div>
         <div className="flex gap-4">
            <select 
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-6 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest text-slate-500 outline-none"
            >
               <option>Todos los roles</option>
               <option>Médico</option>
               <option>Recepción</option>
               <option>Admin</option>
               <option>Enfermera</option>
               <option>Laboratorio</option>
               <option>Caja</option>
            </select>
            <button className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest text-slate-900 dark:text-white flex items-center gap-2 hover:bg-slate-50 transition-all">
               <span className="material-symbols-outlined text-lg">filter_list</span>
               Filtros
            </button>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                     <th className="px-10 py-6">USUARIO</th>
                     <th className="px-10 py-6">ROL / ESPECIALIDAD</th>
                     <th className="px-10 py-6">ÚLTIMO ACCESO</th>
                     <th className="px-10 py-6 text-center">ESTADO</th>
                     <th className="px-10 py-6 text-right">ACCIONES</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-blue-50/20 transition-all group">
                       <td className="px-10 py-8">
                          <div className="flex items-center gap-5">
                             <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-slate-800 flex items-center justify-center font-black text-blue-800 text-xs">
                                {user.name.split(' ').map(n => n[0]).join('')}
                             </div>
                             <div>
                                <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{user.name}</p>
                                <p className="text-[10px] font-bold text-slate-400 mt-1.5">{user.email}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-10 py-8">
                          <span className="px-3 py-1 bg-blue-50 text-blue-800 text-[9px] font-black uppercase rounded-lg border border-blue-100">{user.role}</span>
                          <p className="text-[10px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">{user.spec}</p>
                       </td>
                       <td className="px-10 py-8">
                          <p className="text-sm font-black text-slate-900 dark:text-white leading-none">{user.lastLogin}</p>
                       </td>
                       <td className="px-10 py-8 text-center">
                          <div className="flex justify-center">
                             <button 
                                onClick={() => toggleStatus(user.id)}
                                className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border flex items-center gap-2 ${user.status === 'Activo' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}
                             >
                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Activo' ? 'bg-green-500' : 'bg-slate-300'}`}></span>
                                {user.status}
                             </button>
                          </div>
                       </td>
                       <td className="px-10 py-8 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="flex justify-end gap-3">
                             <button onClick={() => handleEditClick(user)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-blue-800 transition-all shadow-sm"><span className="material-symbols-outlined">edit</span></button>
                             <button onClick={() => handleDelete(user.id)} className="p-2.5 bg-slate-50 dark:bg-slate-800 rounded-xl text-slate-400 hover:text-red-500 transition-all shadow-sm"><span className="material-symbols-outlined">delete</span></button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         <div className="p-10 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
            <p className="text-sm font-bold text-slate-400 italic">Mostrando {filteredUsers.length} de {users.length} resultados</p>
            <div className="flex gap-4">
               <button className="p-2.5 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:bg-slate-50"><span className="material-symbols-outlined">chevron_left</span></button>
               <button className="p-2.5 border-2 border-slate-100 dark:border-slate-800 rounded-xl text-slate-400 hover:bg-slate-50"><span className="material-symbols-outlined">chevron_right</span></button>
            </div>
         </div>
      </div>

      {/* Modal Agregar Usuario */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <div className="bg-blue-800 p-10 text-white flex justify-between items-start">
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight uppercase">Nuevo Staff</h2>
                    <p className="text-blue-100 opacity-60 text-sm font-medium">Asigne credenciales y roles para el nuevo integrante.</p>
                 </div>
                 <button onClick={() => setShowAddModal(false)} className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>
              <form className="p-12 space-y-8" onSubmit={handleAddUser}>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NOMBRES COMPLETOS</label>
                       <input 
                        required
                        value={newUser.name}
                        onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white" placeholder="Ej. Ricardo Silva" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DNI / IDENTIFICACIÓN</label>
                       <input 
                        required
                        value={newUser.dni}
                        onChange={(e) => setNewUser({...newUser, dni: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white" placeholder="Ej. 12345678" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ROL DEL SISTEMA</label>
                       <select 
                        value={newUser.role}
                        onChange={(e) => handleRoleChange(e, false)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white"
                       >
                          <option value="Médico">Médico</option>
                          <option value="Recepción">Recepción</option>
                          <option value="Caja">Caja</option>
                          <option value="Laboratorio">Laboratorio</option>
                          <option value="Admin">Admin</option>
                          <option value="Enfermera">Enfermera</option>
                       </select>
                    </div>
                    {/* Input condicional de especialidad */}
                    {ROLES_WITH_SPEC.includes(newUser.role) && (
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            {newUser.role === 'Médico' ? 'ESPECIALIDAD MÉDICA' : 'ÁREA ASIGNADA'}
                         </label>
                         <input 
                          required
                          value={newUser.spec}
                          onChange={(e) => setNewUser({...newUser, spec: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white" 
                          placeholder={newUser.role === 'Médico' ? 'Ej. Cardiología' : 'Ej. Triaje, Hematología'} 
                         />
                      </div>
                    )}
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CORREO INSTITUCIONAL</label>
                       <input 
                        required
                        type="email" 
                        value={newUser.email}
                        onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white" placeholder="usuario@ayacucho.cli" 
                       />
                    </div>
                 </div>

                 <div className="pt-6 flex gap-4">
                    <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-white border-2 border-slate-100 py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Cancelar</button>
                    <button type="submit" className="flex-1 bg-blue-800 hover:bg-blue-900 text-white py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Crear Usuario</button>
                 </div>
              </form>
           </div>
        </div>
      )}

      {/* Modal Editar Usuario */}
      {showEditModal && editingUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 border border-slate-100 dark:border-slate-800">
              <div className="bg-amber-500 p-10 text-white flex justify-between items-start">
                 <div className="space-y-2">
                    <h2 className="text-3xl font-black tracking-tight uppercase">Editar Usuario</h2>
                    <p className="text-amber-100 opacity-90 text-sm font-medium">Modificando información de: {editingUser.name}</p>
                 </div>
                 <button onClick={() => setShowEditModal(false)} className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 transition-all">
                    <span className="material-symbols-outlined">close</span>
                 </button>
              </div>
              <form className="p-12 space-y-8" onSubmit={handleUpdateUser}>
                 <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NOMBRES COMPLETOS</label>
                       <input 
                        required
                        value={editingUser.name}
                        onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">DNI / IDENTIFICACIÓN</label>
                       <input 
                        required
                        value={editingUser.dni}
                        onChange={(e) => setEditingUser({...editingUser, dni: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white"
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">ROL DEL SISTEMA</label>
                       <select 
                        value={editingUser.role}
                        onChange={(e) => handleRoleChange(e, true)}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white"
                       >
                          <option value="Médico">Médico</option>
                          <option value="Recepción">Recepción</option>
                          <option value="Caja">Caja</option>
                          <option value="Laboratorio">Laboratorio</option>
                          <option value="Admin">Admin</option>
                          <option value="Enfermera">Enfermera</option>
                       </select>
                    </div>
                    {/* Input condicional de especialidad */}
                    {ROLES_WITH_SPEC.includes(editingUser.role) && (
                      <div className="space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                            {editingUser.role === 'Médico' ? 'ESPECIALIDAD MÉDICA' : 'ÁREA ASIGNADA'}
                         </label>
                         <input 
                          required
                          value={editingUser.spec}
                          onChange={(e) => setEditingUser({...editingUser, spec: e.target.value})}
                          className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white"
                         />
                      </div>
                    )}
                    <div className="col-span-2 space-y-2">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CORREO INSTITUCIONAL</label>
                       <input 
                        required
                        type="email" 
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-2xl px-6 py-4 font-bold text-slate-900 dark:text-white"
                       />
                    </div>
                 </div>

                 <div className="pt-6 flex gap-4">
                    <button type="button" onClick={() => setShowEditModal(false)} className="flex-1 bg-white border-2 border-slate-100 py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-widest text-slate-400 hover:bg-slate-50 transition-all">Cancelar</button>
                    <button type="submit" className="flex-1 bg-amber-500 hover:bg-amber-600 text-white py-4.5 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95 transition-all">Guardar Cambios</button>
                 </div>
              </form>
           </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
