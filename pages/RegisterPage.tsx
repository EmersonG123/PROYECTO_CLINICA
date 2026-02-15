
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { insforge } from '../lib/insforge';

const RegisterPage: React.FC = () => {
   const navigate = useNavigate();
   const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
   const [isValidating, setIsValidating] = useState(false);

   // Form State
   const [dni, setDni] = useState('');
   const [phone, setPhone] = useState('');
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [fullName, setFullName] = useState('');

   const [loading, setLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const [showWelcome, setShowWelcome] = useState(false);

   useEffect(() => {
      if (isDarkMode) {
         document.documentElement.classList.add('dark');
      } else {
         document.documentElement.classList.remove('dark');
      }
   }, [isDarkMode]);

   const toggleTheme = () => {
      const nextMode = !isDarkMode;
      setIsDarkMode(nextMode);
      localStorage.setItem('theme', nextMode ? 'dark' : 'light');
   };

   const handleDniBlur = () => {
      if (dni.length === 8) {
         setIsValidating(true);
         // Simulate DNI lookup
         setTimeout(() => {
            setIsValidating(false);
            setFullName('JUAN PÉREZ RODRÍGUEZ'); // Mocked response
            setShowWelcome(true);
         }, 1500);
      }
   };

   const handleRegister = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
         if (password.length < 6) {
            throw new Error('La contraseña debe tener al menos 6 caracteres.');
         }

         // @ts-ignore - options.data typing might differ in SDK version
         const { data, error } = await insforge.auth.signUp({
            email,
            password,
            options: {
               emailRedirectTo: `${window.location.origin}/verify-email`,
               // @ts-ignore
               data: {
                  full_name: fullName || 'Paciente Nuevo',
                  dni,
                  phone,
                  role: 'patient' // Default role for self-registration
               }
            }
         });

         if (error) throw error;

         if (data) {
            // alert('¡Registro exitoso! ...');
            navigate(`/verify-email?mode=instruction&email=${encodeURIComponent(email)}`);
         }

      } catch (err: any) {
         console.error(err);
         setError(err.message || 'Error al registrar usuario.');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
         {/* Lado Izquierdo: Visual (Split Screen) */}
         <div className="hidden lg:flex w-1/2 relative overflow-hidden bg-blue-800 items-center justify-center p-20">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1500')] bg-cover bg-center mix-blend-overlay opacity-20"></div>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-900 to-transparent"></div>

            <div className="relative z-10 space-y-12 max-w-lg">
               <div className="flex items-center gap-4">
                  <div className="bg-white text-blue-800 p-3 rounded-2xl shadow-2xl">
                     <span className="material-symbols-outlined text-3xl font-black">add_box</span>
                  </div>
                  <span className="font-black text-3xl text-white tracking-tighter uppercase">Clínica Ayacucho</span>
               </div>

               <h2 className="text-6xl font-black text-white leading-tight tracking-tighter">
                  Empieza tu <br />
                  <span className="text-blue-300">viaje de salud</span> <br />
                  con nosotros.
               </h2>

               <div className="space-y-8">
                  <div className="flex items-start gap-6 bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20">
                     <span className="material-symbols-outlined text-blue-300 text-3xl">verified</span>
                     <div>
                        <p className="text-white font-black uppercase text-xs tracking-widest">Validación Oficial</p>
                        <p className="text-blue-100/70 text-sm mt-1 leading-relaxed">Conexión directa con bases de datos nacionales para garantizar tu identidad.</p>
                     </div>
                  </div>
                  <div className="flex items-start gap-6 bg-white/10 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/20">
                     <span className="material-symbols-outlined text-blue-300 text-3xl">lock_open</span>
                     <div>
                        <p className="text-white font-black uppercase text-xs tracking-widest">Acceso Seguro</p>
                        <p className="text-blue-100/70 text-sm mt-1 leading-relaxed">Toda tu información está encriptada bajo estándares internacionales HIPAA.</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         {/* Lado Derecho: Formulario */}
         <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 lg:p-24 relative">
            <button onClick={toggleTheme} className="absolute top-10 right-10 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm text-slate-400">
               <span className="material-symbols-outlined">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>

            <div className="w-full max-w-md space-y-10">
               <div className="flex flex-col gap-2">
                  <h3 className="text-4xl font-black text-slate-900 dark:text-white tracking-tight">Crear Cuenta</h3>
                  <p className="text-slate-500 font-medium">Regístrate en menos de 2 minutos</p>
               </div>

               {error && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold border border-red-100">
                     {error}
                  </div>
               )}

               <form className="space-y-6" onSubmit={handleRegister}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">NÚMERO DNI</label>
                        <div className="relative group">
                           <input
                              required
                              value={dni}
                              onChange={(e) => setDni(e.target.value)}
                              onBlur={handleDniBlur}
                              className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all"
                              placeholder="8 dígitos"
                              maxLength={8}
                           />
                           {isValidating && (
                              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                                 <div className="w-5 h-5 border-2 border-blue-800 border-t-transparent rounded-full animate-spin"></div>
                              </div>
                           )}
                        </div>
                     </div>
                     <div className="space-y-2.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">TELÉFONO</label>
                        <input
                           required
                           value={phone}
                           onChange={(e) => setPhone(e.target.value)}
                           className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all"
                           placeholder="987 654 321"
                        />
                     </div>
                  </div>

                  {showWelcome && (
                     <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-5 rounded-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center shrink-0">
                           <span className="material-symbols-outlined font-black">check</span>
                        </div>
                        <div>
                           <p className="text-[10px] font-black text-green-700 dark:text-green-300 uppercase tracking-widest">DNI Identificado</p>
                           <p className="text-sm font-black text-green-900 dark:text-white">{fullName}</p>
                        </div>
                     </div>
                  )}

                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CORREO ELECTRÓNICO</label>
                     <input
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all"
                        placeholder="tu@email.com"
                     />
                  </div>

                  <div className="space-y-2.5">
                     <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">CREAR CONTRASEÑA</label>
                     <div className="relative">
                        <input
                           required
                           type="password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)}
                           className="w-full bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-2xl px-5 py-4 font-bold text-slate-900 dark:text-white outline-none focus:border-blue-800 transition-all"
                           placeholder="Mín. 6 caracteres"
                        />
                        <div className="flex gap-1 mt-3">
                           <div className={`h-1 flex-1 rounded-full transition-colors ${password.length > 0 ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                           <div className={`h-1 flex-1 rounded-full transition-colors ${password.length > 6 ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                           <div className={`h-1 flex-1 rounded-full transition-colors ${password.length > 10 ? 'bg-blue-800' : 'bg-slate-200 dark:bg-slate-800'}`}></div>
                        </div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1.5">Seguridad: Media</p>
                     </div>
                  </div>

                  <div className="flex items-start gap-4 pt-4">
                     <input required type="checkbox" className="mt-1 w-5 h-5 rounded border-slate-200 text-blue-800 focus:ring-blue-800" />
                     <label className="text-[11px] font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                        Acepto los <a href="#" className="text-blue-800 dark:text-blue-400 font-black hover:underline">Términos de Uso</a> y la <a href="#" className="text-blue-800 dark:text-blue-400 font-black hover:underline">Política de Privacidad</a> de Clínica Ayacucho.
                     </label>
                  </div>

                  <button
                     type="submit"
                     disabled={loading}
                     className="w-full bg-blue-800 hover:bg-blue-900 text-white py-5 rounded-2xl font-black text-base shadow-2xl shadow-blue-900/30 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-4"
                  >
                     {loading ? 'REGISTRANDO...' : 'REGISTRAR MI CUENTA'}
                     <span className="material-symbols-outlined font-black">arrow_forward</span>
                  </button>
               </form>

               <div className="text-center pt-8">
                  <p className="text-sm font-bold text-slate-500">
                     ¿Ya tienes una cuenta? <Link to="/login" className="text-blue-800 dark:text-blue-400 font-black hover:underline ml-1">Inicia Sesión</Link>
                  </p>
               </div>
            </div>

            <div className="mt-auto pt-10 text-[9px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.4em]">
               © 2026 CLÍNICA AYACUCHO • REGISTRO SEGURO
            </div>
         </div>
      </div>
   );
};

export default RegisterPage;
