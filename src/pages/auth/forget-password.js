import React, { useState } from 'react';
import Link from 'next/link';
import { authService } from '@/services/authService';
import Alert from '@/components/common/Alert';

// --- Ícones ---
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6 text-gray-400">
        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
    </svg>
);

const SpinnerIcon = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

/**
 * Página para solicitar a redefinição de senha.
 */
export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [message, setMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setStatus('loading');
        setMessage('');

        try {
            await authService.forgotPassword(email);
            setStatus('success');
            setMessage('Se um usuário com este e-mail existir, um link de recuperação foi enviado.');
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Ocorreu um erro. Tente novamente.');
        }
    };

    return (
        <>
            <Alert
                message={status === 'error' ? message : ''}
                type="error"
                onClose={() => setStatus('idle')}
            />
            <Alert
                message={status === 'success' ? message : ''}
                type="success"
                onClose={() => setStatus('idle')}
            />
            <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center font-lato">
                <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                    <div className="logo">
                        <svg viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-800 mx-auto">
                            <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z" />
                        </svg>
                    </div>

                    <h1 className="text-2xl font-montserrat text-gray-900 mt-4">
                        Recuperar Senha
                    </h1>
                    <p className="mt-2 text-gray-600">
                        Digite seu e-mail abaixo e enviaremos um link para você redefinir sua senha.
                    </p>

                    {status !== 'success' ? (
                        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                    <EmailIcon />
                                </span>
                                <input
                                    type="email"
                                    placeholder="Seu e-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full pl-10 pr-3 py-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status === 'loading'}
                                className="w-full flex justify-center items-center gap-2 px-6 py-3 bg-blue-800 text-white font-montserrat rounded-md shadow-md transition-all hover:bg-blue-900 disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <>
                                        <SpinnerIcon />
                                        Enviando...
                                    </>
                                ) : (
                                    'Enviar Link de Recuperação'
                                )}
                            </button>
                        </form>
                    ) : (
                        <div className="mt-8 p-4 bg-green-50 text-green-700 rounded-lg">
                            <p>{message}</p>
                        </div>
                    )}

                    <div className="mt-6">
                        <Link href="/login" className="text-sm text-blue-600 hover:underline">
                            &larr; Voltar para o Login
                        </Link>
                    </div>
                </div>
            </main>
        </>
    );
}
