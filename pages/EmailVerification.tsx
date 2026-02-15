import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { insforge } from '../lib/insforge';

const EmailVerification: React.FC = () => {
    const navigate = useNavigate();
    const [status, setStatus] = useState<'verifying' | 'success' | 'error' | 'idle'>('idle');
    const [message, setMessage] = useState('Ingresa el código que enviamos a tu correo.');
    const [otp, setOtp] = useState('');
    const [loading, setLoading] = useState(false);

    // Detect if we are in instruction mode (post-registration)
    const searchParams = new URLSearchParams(window.location.search);
    const mode = searchParams.get('mode');
    const paramEmail = searchParams.get('email');

    // Use state for email to allow editing if missing or incorrect
    const [emailInput, setEmailInput] = useState(paramEmail || '');

    const isInstruction = mode === 'instruction';

    useEffect(() => {
        const hash = window.location.hash;
        const hasToken = hash.includes('access_token') || hash.includes('type=recovery') || hash.includes('type=signup');

        if (hasToken) {
            setStatus('verifying');
            setMessage('Verificando enlace...');
            const verifyLink = async () => {
                try {
                    // @ts-ignore
                    const { data, error } = await insforge.auth.getUser();
                    if (error) throw error;
                    if (data?.user) {
                        setStatus('success');
                        setMessage('¡Correo verificado exitosamente!');
                        setTimeout(() => navigate('/dashboard'), 3000);
                    }
                } catch (err: any) {
                    setStatus('error');
                    setMessage(err.message || 'El enlace no es válido.');
                }
            };
            verifyLink();
        } else if (isInstruction) {
            setStatus('idle');
            setMessage(`Hemos enviado un código a ${paramEmail || 'tu correo'}. Ingrésalo abajo para continuar.`);
        } else {
            // Default state if accessed directly
            setStatus('idle');
        }
    }, [navigate, isInstruction, paramEmail]);

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!emailInput) {
            alert("Por favor ingresa tu correo electrónico.");
            return;
        }
        if (!otp) {
            alert("Por favor ingresa el código de verificación.");
            return;
        }

        setLoading(true);
        setStatus('verifying');
        setMessage('Validando código...');

        try {
            // @ts-ignore
            const { data, error } = await insforge.auth.verifyEmail({
                email: emailInput,
                otp: otp
            });

            if (error) throw error;

            if (data?.user) {
                setStatus('success');
                setMessage('¡Código correcto! Entrando...');
                setTimeout(() => navigate('/dashboard'), 2000);
            }
        } catch (err: any) {
            console.error(err);
            setStatus('error');
            setMessage(err.message || 'Código inválido o expirado.');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-6">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-12 max-w-md w-full text-center shadow-xl border border-slate-100 dark:border-slate-800 animate-in fade-in zoom-in-95 duration-500">

                {/* Icon Logic */}
                <div className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6 ${status === 'success' ? 'bg-green-100 text-green-600' :
                        status === 'error' ? 'bg-red-100 text-red-600' :
                            'bg-blue-100 text-blue-600'
                    }`}>
                    <span className="material-symbols-outlined text-4xl font-black">
                        {status === 'success' ? 'check_circle' :
                            status === 'error' ? 'error' : 'mark_email_read'}
                    </span>
                </div>

                <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight mb-2">
                    Verificación de Cuenta
                </h2>

                <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 text-sm">
                    {message}
                </p>

                {/* OTP Form - Show if not successful yet */}
                {status !== 'success' && (
                    <form onSubmit={handleVerifyOtp} className="space-y-4 mb-6">

                        {/* Email Input - Always visible but maybe read-only if param is present? 
                             Let's make it editable just in case user made a typo or param is missing. 
                         */}
                        <div className="space-y-2">
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                placeholder="Tu correo electrónico"
                                className="w-full bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 font-bold text-slate-900 dark:text-white focus:border-blue-600 outline-none transition-all text-sm"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <input
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="Código 6 dígitos"
                                className="w-full text-center bg-slate-50 dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-2xl py-4 text-2xl font-black tracking-[0.5em] text-slate-900 dark:text-white focus:border-blue-600 outline-none transition-all uppercase"
                                maxLength={6}
                                required
                            />
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Revisa tu bandeja de entrada</p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !otp || !emailInput}
                            className="w-full bg-blue-800 hover:bg-blue-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-900/20 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Verificando...' : 'Validar Código'}
                        </button>
                    </form>
                )}

                {status === 'success' && (
                    <div className="w-full bg-green-50 dark:bg-green-900/30 border border-green-100 dark:border-green-800 rounded-xl p-4 mb-6 animate-in slide-in-from-bottom-2">
                        <p className="text-green-700 dark:text-green-300 font-bold text-sm">¡Todo listo! Redirigiendo...</p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="mb-6">
                        <button
                            type="button"
                            onClick={() => setStatus('idle')} // Let user try again
                            className="text-blue-600 dark:text-blue-400 font-bold text-xs hover:underline"
                        >
                            Intentar nuevamente
                        </button>
                    </div>
                )}

                <div className="text-center">
                    <button
                        onClick={() => navigate('/login')}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-[10px] font-black uppercase tracking-widest transition-colors"
                    >
                        Volver al Inicio de Sesión
                    </button>
                </div>
            </div>

            <p className="mt-12 text-[10px] font-black text-slate-300 dark:text-slate-700 uppercase tracking-[0.5em]">
                © 2026 CLÍNICA AYACUCHO
            </p>
        </div>
    );
};

export default EmailVerification;
