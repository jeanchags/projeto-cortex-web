import React from 'react';

/**
 * Componente FormScreen
 * Renderiza a área de formulários do sistema.
 * Atualmente, exibe uma mensagem de "página em construção".
 */
const FormScreen = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center p-6 text-center font-lato">
            <div className="max-w-md w-full">
                <svg className="mx-auto h-16 w-16 text-blue-800 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
                <h1 className="text-4xl font-montserrat text-gray-900">
                    Formulários
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

export default FormScreen;
