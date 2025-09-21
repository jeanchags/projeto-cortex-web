import React from 'react';

/**
 * Componente DashboardScreen
 * Renderiza o painel principal do sistema.
 * Atualmente, exibe uma mensagem de "página em construção".
 */
const DashboardScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center font-lato">
            <div className="max-w-md w-full">
                <svg className="mx-auto h-16 w-16 text-blue-800 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                <h1 className="text-4xl font-montserrat text-gray-900">
                    Dashboard
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

export default DashboardScreen;
