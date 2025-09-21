import React from 'react';

/**
 * Componente ReportScreen
 * Renderiza a área de relatórios do sistema.
 * Atualmente, exibe uma mensagem de "página em construção".
 */
const ReportScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center font-lato">
            <div className="max-w-md w-full">
                <svg className="mx-auto h-16 w-16 text-blue-800 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <h1 className="text-4xl font-montserrat text-gray-900">
                    Relatórios
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

export default ReportScreen;
