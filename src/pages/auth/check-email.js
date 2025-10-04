import Link from 'next/link';
import React from 'react';

/**
 * Ícone de envelope para a página.
 */
const EnvelopeIcon = () => (
    <svg className="mx-auto h-16 w-16 text-blue-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
);

/**
 * Página para instruir o usuário a verificar seu e-mail após o registro.
 */
export default function CheckEmailPage() {
    return (
        <main className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center font-lato">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
                <EnvelopeIcon />
                <h1 className="text-3xl font-montserrat text-gray-900 mt-4">
                    Verifique seu E-mail
                </h1>
                <p className="mt-3 text-gray-600">
                    Enviamos um link de confirmação para o seu endereço de e-mail. Por favor, clique no link para ativar sua conta.
                </p>

                <div className="mt-8 space-y-4">
                    <button
                        onClick={() => console.log('Funcionalidade de reenviar e-mail a ser implementada.')}
                        disabled
                        className="w-full px-6 py-3 bg-blue-800 text-white font-montserrat rounded-md shadow-md transition-all disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Reenviar e-mail
                    </button>
                    <Link href="/login" className="inline-block text-sm text-blue-600 hover:underline">
                        Voltar para o Login
                    </Link>
                </div>
            </div>
        </main>
    );
}
