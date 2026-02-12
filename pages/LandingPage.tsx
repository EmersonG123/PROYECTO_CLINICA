
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Chatbot from '../components/Chatbot';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const doctors = [
    { 
      name: 'Dr. Juan Pérez', 
      spec: 'CARDIOLOGÍA', 
      cmp: '54321', 
      img: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400', 
      icon: 'favorite', 
      iconBg: 'bg-[#f85252]', 
      specColor: 'text-[#f85252]',
      tag: 'ALTA ESPECIALIDAD'
    },
    { 
      name: 'Dra. María Lopez', 
      spec: 'PEDIATRÍA', 
      cmp: '67890', 
      img: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400', 
      icon: 'sentiment_satisfied', 
      iconBg: 'bg-[#4caf50]', 
      specColor: 'text-[#4caf50]'
    },
    { 
      name: 'Dr. Carlos Ruiz', 
      spec: 'MEDICINA GENERAL', 
      cmp: '11223', 
      img: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400', 
      icon: 'medical_services', 
      iconBg: 'bg-[#448aff]', 
      specColor: 'text-[#448aff]'
    },
    { 
      name: 'Dra. Ana Torres', 
      spec: 'GINECOLOGÍA', 
      cmp: '44556', 
      img: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400', 
      icon: 'female', 
      iconBg: 'bg-[#e91e63]', 
      specColor: 'text-[#e91e63]'
    }
  ];

  const specialtiesList = [
    { name: 'Medicina General', desc: 'Diagnóstico integral y tratamiento de enfermedades comunes para toda la familia.', icon: 'stethoscope', color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Pediatría', desc: 'Cuidado especializado para el desarrollo saludable de bebés, niños y adolescentes.', icon: 'child_care', color: 'text-green-600', bg: 'bg-green-50' },
    { name: 'Ginecología', desc: 'Atención integral para la salud femenina, control prenatal y planificación familiar.', icon: 'female', color: 'text-pink-600', bg: 'bg-pink-50' },
    { name: 'Cardiología', desc: 'Prevención, diagnóstico y tratamiento de enfermedades del corazón y sistema circulatorio.', icon: 'favorite', color: 'text-red-600', bg: 'bg-red-50' },
    { name: 'Laboratorio', desc: 'Análisis clínicos precisos con equipos modernos y resultados digitales rápidos.', icon: 'biotech', color: 'text-purple-600', bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-all duration-700 selection:bg-blue-600 selection:text-white overflow-x-hidden">
      
      {/* Navbar con Menú Hamburguesa */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl py-3 shadow-lg' : 'bg-transparent py-8'}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => navigate('/')}>
            <div className="bg-blue-600 text-white p-2 rounded-xl shadow-lg group-hover:rotate-12 transition-transform">
              <span className="material-symbols-outlined text-xl md:text-2xl font-black">add_box</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-slate-900 dark:text-white text-lg md:text-xl tracking-tighter uppercase italic leading-none">Clínica Ayacucho</span>
              <span className="text-[8px] font-black text-blue-600 dark:text-blue-400 tracking-[0.3em] uppercase mt-1">Salud Digital Avanzada</span>
            </div>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {['Inicio', 'Especialidades', 'Médicos'].map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase() === 'médicos' ? 'staff' : item.toLowerCase())} className="text-slate-500 dark:text-slate-400 hover:text-blue-600 text-[10px] font-black uppercase tracking-widest transition-all">
                {item}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button onClick={toggleTheme} className="w-10 h-10 rounded-xl glass flex items-center justify-center text-slate-500 dark:text-blue-400 transition-transform hover:scale-110">
              <span className="material-symbols-outlined text-lg">{isDarkMode ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button onClick={() => navigate('/login')} className="hidden sm:block bg-[#1e3a8a] text-white px-8 py-2.5 rounded-lg text-[10px] font-bold uppercase tracking-widest shadow-md active:scale-95 transition-all">
              Acceso
            </button>
            
            {/* Botón Hamburguesa Móvil */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-12 h-12 flex flex-col items-center justify-center gap-1.5 bg-blue-50 dark:bg-slate-800 rounded-xl transition-all active:scale-90"
            >
              <div className={`w-6 h-1 bg-blue-900 dark:bg-blue-400 rounded-full transition-all ${isMobileMenuOpen ? 'rotate-45 translate-y-2.5' : ''}`}></div>
              <div className={`w-6 h-1 bg-blue-900 dark:bg-blue-400 rounded-full transition-all ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
              <div className={`w-6 h-1 bg-blue-900 dark:bg-blue-400 rounded-full transition-all ${isMobileMenuOpen ? '-rotate-45 -translate-y-2.5' : ''}`}></div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay - Drawer lateral */}
      <div className={`fixed inset-0 z-[60] bg-slate-950/60 backdrop-blur-sm lg:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute top-0 right-0 h-full w-[85%] max-w-sm bg-white dark:bg-slate-900 shadow-2xl p-10 flex flex-col gap-10 transition-transform duration-500 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center border-b border-slate-50 dark:border-slate-800 pb-6">
            <span className="font-black text-blue-800 dark:text-blue-400 uppercase italic tracking-widest">Navegación</span>
            <button onClick={() => setIsMobileMenuOpen(false)} className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex flex-col gap-8">
            {['Inicio', 'Especialidades', 'Staff'].map(item => (
              <button key={item} onClick={() => scrollToSection(item.toLowerCase() === 'staff' ? 'staff' : item.toLowerCase())} className="text-3xl font-black text-slate-900 dark:text-white text-left uppercase italic tracking-tighter hover:text-blue-700 transition-colors">
                {item}
              </button>
            ))}
          </div>
          <div className="mt-auto space-y-4">
             <button onClick={() => navigate('/login')} className="w-full bg-blue-800 text-white py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-900/20">Iniciar Sesión</button>
             <button onClick={() => navigate('/register')} className="w-full border-2 border-slate-100 dark:border-slate-800 py-5 rounded-[1.5rem] font-black uppercase tracking-widest text-sm text-slate-900 dark:text-white">Registrarse</button>
          </div>
        </div>
      </div>

      {/* Hero Section con EFECTO DINÁMICO (TIPO GIF MÉDICO) */}
      <section id="inicio" className="relative pt-44 md:pt-64 pb-32 overflow-hidden px-6 md:px-8 bg-slate-50/20 dark:bg-transparent">
        {/* Luces de fondo dinámicas */}
        <div className="absolute top-1/4 left-10 w-48 h-48 bg-blue-400/20 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-indigo-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-12 animate-in fade-in slide-in-from-left duration-1000 z-10">
            <div className="inline-flex items-center gap-4 bg-white dark:bg-blue-600/10 px-5 py-2 rounded-full border border-blue-100 dark:border-blue-600/20 shadow-sm">
               <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-ping"></span>
               <span className="text-[11px] font-black text-blue-900 dark:text-blue-300 uppercase tracking-[0.2em]">TECNOLOGÍA MÉDICA DE VANGUARDIA</span>
            </div>
            <h1 className="text-7xl md:text-[6rem] font-black text-slate-900 dark:text-white leading-[0.85] tracking-tighter uppercase">
              La Salud <br />
              <span className="text-blue-600 italic">Redefinida</span> <br />
              Digitalmente.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 font-medium max-w-lg leading-relaxed">
              Diagnósticos precisos apoyados en IA y la mejor atención humana de la región.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4">
              <button onClick={() => navigate('/register')} className="bg-blue-600 hover:bg-blue-700 text-white px-12 py-6 rounded-[2rem] font-black shadow-[0_25px_50px_-12px_rgba(37,99,235,0.3)] active:scale-95 transition-all text-sm uppercase tracking-widest flex items-center justify-center gap-4 group">
                RESERVAR MI CITA
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
              </button>
            </div>
          </div>

          {/* COMPOSICIÓN DINÁMICA TIPO GIF (Ref. Visual Médico Tecnológico) */}
          <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
            <div className="relative z-10 aspect-[4/3.2] rounded-[4rem] overflow-hidden shadow-[0_60px_100px_-20px_rgba(0,0,0,0.3)] border-[12px] border-white dark:border-slate-900 group">
              <img 
                src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=1200" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
                alt="Alta tecnología médica" 
              />
              
              {/* Capa de Efecto GIF: Línea de Escaneo Láser */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-400/80 shadow-[0_0_15px_#60a5fa] animate-[scan_4s_linear_infinite] z-20"></div>
              
              {/* Capa de Filtro Médico */}
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent mix-blend-overlay"></div>
              
              {/* Elementos UI Holográficos Flotantes */}
              <div className="absolute top-10 right-10 flex flex-col gap-3">
                 <div className="bg-blue-600/90 backdrop-blur-md p-3 rounded-xl animate-float">
                    <span className="material-symbols-outlined text-white text-xl font-black">biotech</span>
                 </div>
                 <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl animate-float [animation-delay:0.5s]">
                    <span className="material-symbols-outlined text-blue-600 text-xl font-black">vital_signs</span>
                 </div>
              </div>
            </div>
            
            {/* Badge Flotante "CALIDAD MÉDICA" perfeccionado */}
            <div className="absolute -bottom-12 -left-12 glass p-10 rounded-[3rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] z-30 max-w-[300px] animate-float border border-white/50 flex flex-col gap-6">
               <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/50 rounded-[1.5rem] flex items-center justify-center text-blue-600 dark:text-blue-300 shadow-inner">
                    <span className="material-symbols-outlined text-4xl font-black">verified</span>
                  </div>
                  <div>
                    <p className="text-[12px] font-black text-slate-900 dark:text-white uppercase leading-none tracking-wider">CERTIFICACIÓN</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-1.5 uppercase tracking-widest">Estándares SUSALUD</p>
                  </div>
               </div>
               <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full w-[98%] animate-[progress_3s_ease-out_infinite] shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
               </div>
            </div>

            {/* Elemento Decorativo: ADN Animado */}
            <div className="absolute -top-16 -right-16 w-48 h-48 opacity-10 dark:opacity-20 pointer-events-none rotate-12">
               <span className="material-symbols-outlined text-[10rem] font-thin animate-pulse">helix</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección: Nuestras Especialidades (Imagen Proporcionada) */}
      <section id="especialidades" className="py-40 px-6 md:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24 space-y-6">
             <h2 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Nuestras Especialidades</h2>
             <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-3xl mx-auto">
                Contamos con un equipo multidisciplinario listo para atenderte en diversas áreas de la salud con la más alta tecnología.
             </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {specialtiesList.map((spec, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-[0_15px_40px_-20px_rgba(0,0,0,0.05)] hover:shadow-2xl transition-all duration-500 group flex flex-col h-full">
                 <div className={`w-16 h-16 ${spec.bg} dark:bg-slate-800 ${spec.color} rounded-2xl flex items-center justify-center mb-8 shadow-sm group-hover:scale-110 transition-transform`}>
                    <span className="material-symbols-outlined text-4xl font-black">{spec.icon}</span>
                 </div>
                 <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-tight">{spec.name}</h4>
                 <p className="text-slate-400 dark:text-slate-500 font-medium text-xs leading-relaxed mb-10 flex-1">
                    {spec.desc}
                 </p>
                 <button onClick={() => navigate('/register')} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${spec.color} group/btn`}>
                    Ver más
                    <span className="material-symbols-outlined text-sm font-black group-hover/btn:translate-x-1 transition-transform">east</span>
                 </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección: Ventajas Digitales */}
      <section className="py-32 px-6 md:px-8 bg-slate-50/50 dark:bg-slate-900/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20">
            <div className="space-y-4">
               <p className="text-blue-800 dark:text-blue-400 font-black uppercase text-[11px] tracking-[0.3em]">TECNOLOGÍA MÉDICA</p>
               <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Nuestras Ventajas Digitales</h2>
               <p className="text-slate-500 dark:text-slate-400 font-medium text-lg max-w-2xl leading-relaxed mt-6">
                Hemos modernizado la experiencia de salud para brindarte comodidad, rapidez y seguridad en cada paso de tu atención.
               </p>
            </div>
            <button onClick={() => scrollToSection('especialidades')} className="text-blue-800 dark:text-blue-400 font-black uppercase tracking-widest text-[11px] flex items-center gap-2 group whitespace-nowrap">
              Ver todos los servicios
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">east</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-800 dark:text-blue-400 mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl font-black">folder_shared</span>
               </div>
               <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-none">Historia Clínica Digital</h4>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
                Accede a tus resultados, diagnósticos y recetas electrónicas desde tu celular en cualquier momento y lugar.
               </p>
            </div>
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-16 h-16 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-700 dark:text-green-400 mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl font-black">payments</span>
               </div>
               <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-none">Pago Seguro</h4>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
                Aceptamos todos los métodos de pago digitales. Yape, Plin y todas las tarjetas de crédito y débito.
               </p>
               <div className="flex gap-2 mt-6">
                  <div className="w-8 h-5 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  <div className="w-8 h-5 bg-slate-100 dark:bg-slate-800 rounded"></div>
                  <div className="w-8 h-5 bg-slate-100 dark:bg-slate-800 rounded"></div>
               </div>
            </div>
            <div className="bg-white dark:bg-slate-900 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all group">
               <div className="w-16 h-16 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600 dark:text-orange-400 mb-8 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-4xl font-black">wifi_off</span>
               </div>
               <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-4 leading-none">Modo Offline</h4>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-sm">
                Nuestra atención no se detiene. Contamos con sistemas de respaldo locales para garantizar tu atención sin internet.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Médicos Section con SUPERPOSICIÓN EXACTA */}
      <section id="staff" className="py-40 px-6 md:px-8 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
             <div className="space-y-4">
                <p className="text-blue-700 dark:text-blue-400 font-black uppercase text-[12px] tracking-[0.4em] italic">Excelencia Médica Garantizada</p>
                <h2 className="text-6xl md:text-7xl font-black text-slate-900 dark:text-white tracking-tighter uppercase leading-none">Nuestros Médicos</h2>
             </div>
             <button className="bg-slate-50 dark:bg-slate-900 px-8 py-4 rounded-2xl text-blue-800 dark:text-blue-400 font-black uppercase tracking-widest text-[11px] flex items-center gap-3 group border border-slate-100 dark:border-slate-800">
                Ver Directorio Completo 
                <span className="material-symbols-outlined group-hover:translate-x-2 transition-transform">east</span>
             </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {doctors.map((doc, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 rounded-[3rem] border border-slate-100 dark:border-slate-800 shadow-[0_40px_80px_-25px_rgba(0,0,0,0.06)] hover:shadow-2xl transition-all duration-500 group flex flex-col h-full relative">
                <div className="relative p-5">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-md">
                    <img src={doc.img} alt={doc.name} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 group-hover:rotate-1" />
                    {doc.tag && (
                      <div className="absolute top-5 left-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur px-5 py-2.5 rounded-2xl shadow-xl border border-white/50">
                        <p className="text-[10px] font-black text-blue-800 dark:text-blue-300 uppercase tracking-widest">{doc.tag}</p>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </div>
                  <div className={`absolute bottom-[-1.5rem] right-12 w-16 h-16 ${doc.iconBg} text-white rounded-2xl flex items-center justify-center border-[7px] border-white dark:border-slate-900 shadow-2xl z-20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                     <span className="material-symbols-outlined text-3xl font-black">{doc.icon}</span>
                  </div>
                </div>
                <div className="p-10 pt-12 space-y-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-2 text-center sm:text-left">
                    <h4 className="font-black text-3xl text-slate-900 dark:text-white tracking-tight leading-none uppercase italic">{doc.name}</h4>
                    <p className={`text-[13px] font-black uppercase tracking-[0.25em] mt-4 ${doc.specColor}`}>{doc.spec}</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-2 uppercase tracking-widest opacity-60">Reg. CMP: {doc.cmp}</p>
                  </div>
                  <button onClick={() => navigate('/register')} className="w-full bg-[#1e4db7] hover:bg-blue-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-4 shadow-xl active:scale-95 transition-all mt-4 group">
                     <span className="material-symbols-outlined text-xl font-black group-hover:rotate-12 transition-transform">calendar_month</span>
                     Agendar Cita
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner CTA Final */}
      <section className="py-20 px-6 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900 via-[#1e3a8a] to-[#1e4db7] rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_50px_100px_-20px_rgba(30,58,138,0.4)] relative overflow-hidden">
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
             <div className="relative z-10 space-y-4 text-center md:text-left">
                <h3 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase leading-none">¿Listo para mejorar tu salud?</h3>
                <p className="text-blue-100 font-medium text-lg md:text-xl">Reserva tu cita hoy mismo con nuestros especialistas calificados.</p>
             </div>
             <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button onClick={() => navigate('/register')} className="bg-white hover:bg-blue-50 text-blue-900 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl transition-all active:scale-95 whitespace-nowrap">
                  Reservar Cita Online
                </button>
                <button className="bg-blue-950/40 hover:bg-blue-950/60 backdrop-blur-md text-white border border-white/20 px-10 py-5 rounded-2xl font-black text-sm uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-3 whitespace-nowrap">
                  <span className="material-symbols-outlined text-xl">call</span>
                  Llamar (066) 31-2020
                </button>
             </div>
          </div>
        </div>
      </section>

      {/* Footer corporativo */}
      <footer className="py-24 px-8 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-950">
         <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-16">
            <div className="flex items-center gap-5">
               <div className="bg-blue-700 text-white p-2.5 rounded-2xl shadow-xl">
                  <span className="material-symbols-outlined text-2xl">add_box</span>
               </div>
               <div className="flex flex-col">
                  <span className="font-black text-slate-900 dark:text-white text-2xl tracking-tighter uppercase italic leading-none">Clínica Ayacucho</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] mt-2">Tecnología para tu bienestar</span>
               </div>
            </div>
            
            <div className="flex gap-12">
               {['Privacidad', 'Términos', 'Soporte'].map(l => <a key={l} href="#" className="text-[11px] font-black uppercase text-slate-400 hover:text-blue-800 dark:hover:text-blue-400 transition-colors tracking-[0.2em]">{l}</a>)}
            </div>
            
            <p className="text-[10px] font-black text-slate-300 dark:text-slate-800 uppercase tracking-[0.6em]">© 2024 AYACUCHO CLINIC GROUP</p>
         </div>
      </footer>

      <Chatbot />
      
      {/* Estilos específicos para animaciones tipo GIF */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
        @keyframes progress {
          0% { width: 0%; opacity: 1; }
          50% { width: 98%; opacity: 1; }
          80% { width: 98%; opacity: 0; }
          100% { width: 0%; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
