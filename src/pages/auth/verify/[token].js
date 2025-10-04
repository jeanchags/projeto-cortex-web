import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { authService } from '@/services/authService';

// --- Ícones de Status ---
const SpinnerIcon = () => (
    <svg className="animate-spin h-16 w-16 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SuccessIcon = () => (
    <svg className="h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const ErrorIcon = () => (
    <svg className="h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


/**
 * Página dinâmica para verificação de e-mail.
 * Processa o token da URL e exibe o status da operação.
 */
export default function EmailVerificationPage() {
    const router = useRouter();
    const { token } = router.query;

    const [status, setStatus] = useState('verificando'); // 'verificando', 'sucesso', 'erro'
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (token) {
            const verifyToken = async () => {
                try {
                    await authService.verifyEmailToken(token);
                    setStatus('sucesso');
                } catch (err) {
                    setErrorMessage(err.message || 'Ocorreu um erro desconhecido.');
                    setStatus('erro');
                }
            };
            verifyToken();
        }
    }, [token]);

    const renderContent = () => {
        switch (status) {
            case 'verificando':
                return (
                    <>
                        <SpinnerIcon />
                        <h1 className="text-3xl font-montserrat text-gray-900 mt-4">Verificando...</h1>
                        <p className="mt-3 text-gray-600">
                            Aguarde um momento enquanto validamos sua conta.
                        </p>
                    </>
                );
            case 'sucesso':
                return (
                    <>
                        <SuccessIcon />
                        <h1 className="text-3xl font-montserrat text-gray-900 mt-4">
                            E-mail verificado com sucesso!
                        </h1>
                        <p className="mt-3 text-gray-600">
                            Sua conta foi ativada. Agora você pode fazer o login.
                        </p>
                        <div className="mt-8">
                            <Link href="/login" className="w-full inline-block px-6 py-3 bg-blue-800 text-white font-montserrat rounded-md shadow-md transition-all hover:bg-blue-900">
                                Ir para o Login
                            </Link>
                        </div>
                    </>
                );
            case 'erro':
                return (
                    <>
                        <ErrorIcon />
                        <h1 className="text-3xl font-montserrat text-gray-900 mt-4">
                            Ocorreu um erro
                        </h1>
                        <p className="mt-3 text-red-600 bg-red-50 p-3 rounded-md">
                            {errorMessage}
                        </p>
                        <div className="mt-8">
                            <Link href="/login" className="text-sm text-blue-600 hover:underline">
                                Voltar para o Login
                            </Link>
                        </div>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center font-lato">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                {renderContent()}
            </div>
        </main>
    );
}
