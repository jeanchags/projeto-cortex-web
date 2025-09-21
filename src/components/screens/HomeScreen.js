import React from 'react';

/**
 * Componente HomeScreen
 * Renderiza a página inicial do sistema.
 * Atualmente, exibe uma mensagem de "página em construção".
 */
const HomeScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center font-lato">
            <div className="max-w-md w-full">
                <svg className="mx-auto h-16 w-16 text-blue-800 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <h1 className="text-4xl font-montserrat text-gray-900">
                    Página Inicial
                </h1>
                <p className="mt-2 text-lg text-gray-600">
                    Em construção.
                </p>
                <p className="mt-4 text-gray-500">
                    Estamos preparando uma experiência incrível para você. Volte em breve!
                </p>
            </div>
        </div>
    );
};

export default HomeScreen;
