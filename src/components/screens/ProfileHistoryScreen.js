import React from 'react';
import Link from 'next/link';
import Navbar from '../layout/Navbar';

// --- Ícones para a Timeline ---

/**
 * Ícone para eventos do tipo 'relatório'.
 */
const ReportIcon = () => (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
);

/**
 * Ícone para eventos do tipo 'formulário'.
 */
const FormIcon = () => (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
);

/**
 * Ícone para o evento de criação do perfil.
 */
const ProfileCreationIcon = () => (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
    </svg>
);


// --- Dados Mockados ---

/**
 * Dados fictícios para simular o histórico de atividades do perfil.
 * Conforme especificado na tarefa FE-09.
 */
const mockHistory = [
    {
        type: 'report',
        title: 'Relatório Psicopedagógico Gerado',
        timestamp: new Date('2025-10-02T14:30:00Z'),
        author: 'Jean Chagas',
        details: 'Resultado: Perfil Colaborativo',
        link: '/reports/1'
    },
    {
        type: 'form',
        title: 'Formulário "Análise de Foco" Submetido',
        timestamp: new Date('2025-10-02T14:25:00Z'),
        author: 'Jean Chagas',
        details: '5/5 questões respondidas',
        link: '/forms/submission/1'
    },
    {
        type: 'profile_creation',
        title: 'Perfil Criado',
        timestamp: new Date('2025-09-15T09:00:00Z'),
        author: 'Jean Chagas',
        details: 'Início do acompanhamento.',
        link: '#'
    }
];

/**
 * Mapeamento de tipos de evento para seus respectivos ícones e estilos.
 */
const eventTypeConfig = {
    report: {
        Icon: ReportIcon,
        bgColor: 'bg-blue-800',
    },
    form: {
        Icon: FormIcon,
        bgColor: 'bg-yellow-400',
    },
    profile_creation: {
        Icon: ProfileCreationIcon,
        bgColor: 'bg-gray-400',
    },
};


/**
 * Componente ProfileHistoryScreen (Tarefa FE-09)
 * Renderiza a página de detalhes e o histórico de atividades de um perfil específico.
 * Utiliza dados mockados para a construção inicial da interface.
 */
const ProfileHistoryScreen = () => {

    /**
     * Formata um objeto Date para uma string legível.
     * @param {Date} date - O objeto de data a ser formatado.
     * @returns {string} - A data formatada (ex: "02 de Outubro de 2025 às 14:30").
     */
    const formatTimestamp = (date) => {
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).replace(' ', ' de ').replace(',', ' às');
    };

    return (
        <div className="min-h-screen bg-slate-50 font-lato">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">

                    {/* Cabeçalho da Página */}
                    <div className="mb-8 px-4 sm:px-0">
                        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
                            &larr; Voltar para Meus Perfis
                        </Link>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <h1 className="text-3xl font-montserrat text-gray-900 mb-4 sm:mb-0">
                                Turma 101 - Análise de Comportamento
                            </h1>
                            <button
                                className="bg-yellow-400 text-blue-800 font-montserrat rounded-md py-2 px-5 text-sm shadow-md transition-all hover:bg-yellow-500 hover:-translate-y-0.5"
                            >
                                + Novo Formulário
                            </button>
                        </div>
                    </div>

                    {/* Timeline de Histórico */}
                    <div className="flow-root px-4 sm:px-0">
                        <ul role="list" className="-mb-8">
                            {mockHistory.map((event, eventIdx) => {
                                const { Icon, bgColor } = eventTypeConfig[event.type] || eventTypeConfig.profile_creation;
                                return (
                                    <li key={eventIdx}>
                                        <div className="relative pb-8">
                                            {/* Conector da timeline (se não for o último item) */}
                                            {eventIdx !== mockHistory.length - 1 ? (
                                                <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                            ) : null}

                                            <div className="relative flex space-x-4">
                                                {/* Ícone do evento */}
                                                <div>
                                                <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-slate-50 ${bgColor}`}>
                                                    <Icon />
                                                </span>
                                                </div>

                                                {/* Conteúdo do evento */}
                                                <div className="min-w-0 flex-1 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                                    <div className="flex justify-between items-center">
                                                        <h3 className="text-md font-bold text-gray-800">{event.title}</h3>
                                                        <p className="text-xs text-gray-500 whitespace-nowrap ml-4">
                                                            {formatTimestamp(event.timestamp)}
                                                        </p>
                                                    </div>
                                                    <p className="text-sm text-gray-600 mt-1">
                                                        por <span className="font-semibold">{event.author}</span>
                                                    </p>
                                                    <p className="text-sm text-gray-500 mt-2">
                                                        {event.details}
                                                    </p>
                                                    <div className="mt-3 text-right">
                                                        <Link href={event.link} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                                                            Ver Detalhes &rarr;
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                )})}
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ProfileHistoryScreen;