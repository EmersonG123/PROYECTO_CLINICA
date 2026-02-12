
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'bot' | 'user';
  text: string;
  time: string;
  type?: 'emergency' | 'standard';
}

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'bot', 
      text: '¡Hola! Soy Ayi, tu asistente médico inteligente de Clínica Ayacucho. ¿Cómo puedo ayudarte hoy?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEmergencyEvent = () => {
      setIsEmergency(true);
      setIsOpen(true);
      const emergencyMsg: Message = {
        role: 'bot',
        text: '⚠️ ALERTA: Protocolo de emergencia activo. He notificado al equipo de guardia. Mantenga la calma, por favor.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'emergency'
      };
      setMessages(prev => [...prev, emergencyMsg]);
    };

    window.addEventListener('open-emergency-chat', handleEmergencyEvent);
    return () => window.removeEventListener('open-emergency-chat', handleEmergencyEvent);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (text: string = inputValue) => {
    const msg = text.trim();
    if (!msg) return;
    
    setMessages(prev => [...prev, { role: 'user', text: msg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputValue('');
    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      let responseText = 'Entendido. Estoy procesando su consulta para brindarle la mejor orientación médica.';
      
      if (isEmergency) {
        responseText = 'El equipo de urgencias está en camino. Un paramédico está monitoreando esta conexión.';
      } else if (msg.toLowerCase().includes('cita') || msg.toLowerCase().includes('agendar')) {
        responseText = 'Para agendar una cita, puede usar el botón "AGENDAR CITA" en la página principal o ingresar a su panel de paciente.';
      }

      setMessages(prev => [...prev, { 
        role: 'bot', 
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    }, 1500);
  };

  const quickActions = [
    { label: 'Citas', icon: 'calendar_month' },
    { label: 'Especialistas', icon: 'medical_services' },
    { label: 'Ubicación', icon: 'location_on' }
  ];

  return (
    <>
      {/* Botón Flotante con Icono Médico Atractivo */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[60]">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className={`group relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#00E676] hover:bg-[#00C853] text-slate-900 rounded-2xl shadow-2xl transition-all duration-500 active:scale-90 ${isOpen ? 'opacity-0 scale-90 pointer-events-none' : 'opacity-100 scale-100'}`}
        >
          <span className="material-symbols-outlined text-3xl font-black">clinical_notes</span>
          {/* Badge de actividad */}
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 border-[3px] border-white dark:border-slate-900 rounded-full animate-pulse"></span>
        </button>
      </div>

      {/* Ventana de Chat: Tamaño controlado y botón X visible */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[70] w-[calc(100vw-3rem)] sm:w-[380px] md:w-[420px] max-h-[80vh] h-[600px] bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-500">
          
          {/* Header con botón cerrar (X) prominente */}
          <div className={`${isEmergency ? 'bg-red-600' : 'bg-blue-600'} p-6 md:p-8 text-white relative shrink-0 shadow-lg`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30">
                  <span className="material-symbols-outlined text-2xl font-black">{isEmergency ? 'emergency' : 'smart_toy'}</span>
                </div>
                <div>
                  <h4 className="font-black text-lg md:text-xl tracking-tighter uppercase italic leading-none">{isEmergency ? 'Emergencia' : 'Asistente Ayi'}</h4>
                  <div className="flex items-center gap-2 mt-1.5 opacity-80">
                     <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></span>
                     <p className="text-[9px] font-black uppercase tracking-widest">En Línea • IA 4.0</p>
                  </div>
                </div>
              </div>
              
              {/* Botón X para cerrar - Corregido y visible */}
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-600 flex items-center justify-center transition-all border border-white/20 active:scale-90 group"
                title="Cerrar Asistente"
              >
                 <span className="material-symbols-outlined font-black text-xl group-hover:rotate-90 transition-transform">close</span>
              </button>
            </div>
          </div>

          {/* Área de Mensajes */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 custom-scrollbar bg-slate-50/30 dark:bg-slate-950/30" ref={scrollRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-in fade-in slide-in-from-bottom-2 duration-500`}>
                <div className={`max-w-[85%] px-5 py-4 rounded-2xl md:rounded-3xl text-[13px] font-semibold leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-blue-600 text-white rounded-tr-none' 
                  : msg.type === 'emergency' 
                    ? 'bg-red-50 text-red-700 border border-red-100 rounded-tl-none font-bold italic'
                    : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-100 dark:border-slate-700 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-2 px-1">{msg.time}</span>
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-2 px-6 py-4 bg-white dark:bg-slate-800 rounded-full w-20 shadow-sm border border-slate-100 dark:border-slate-700">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
              </div>
            )}
          </div>

          {/* Input Footer */}
          <div className="p-6 md:p-8 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-white/5">
            {!isEmergency && (
              <div className="flex gap-3 mb-6 overflow-x-auto hide-scrollbar pb-1">
                {quickActions.map(action => (
                  <button 
                    key={action.label}
                    onClick={() => handleSend(action.label)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 hover:text-blue-700 hover:bg-white transition-all whitespace-nowrap shadow-sm"
                  >
                    <span className="material-symbols-outlined text-base">{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800 rounded-2xl pl-5 pr-2 py-2 border border-slate-200 dark:border-slate-700 shadow-inner focus-within:bg-white dark:focus-within:bg-slate-800 focus-within:ring-2 focus-within:ring-blue-600/10 transition-all">
              <input 
                type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-transparent border-none focus:ring-0 text-[13px] font-bold py-2 placeholder:text-slate-400 dark:text-white"
              />
              <button 
                onClick={() => handleSend()} 
                disabled={!inputValue.trim()} 
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-blue-600 text-white shadow-lg active:scale-90 disabled:opacity-30 transition-all"
              >
                <span className="material-symbols-outlined text-xl font-bold">send</span>
              </button>
            </div>
            <p className="text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.5em] text-center mt-6 italic">Ayi Health AI • v.4.2</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
