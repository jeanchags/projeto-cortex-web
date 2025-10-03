import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../layout/Navbar';
import { getProfileHistory } from '@/services/profileService'; // <-- Importa o novo serviço

// --- Ícones para a Timeline (sem alteração) ---
const ReportIcon = () => (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
);
const FormIcon = () => (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
);
const ProfileCreationIcon = () => (
    <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>
);

// Mapeamento de tipos de evento para seus respectivos ícones e estilos (sem alteração)
const eventTypeConfig = {
    report: { Icon: ReportIcon, bgColor: 'bg-blue-800' },
    form: { Icon: FormIcon, bgColor: 'bg-yellow-400' },
    profile_creation: { Icon: ProfileCreationIcon, bgColor: 'bg-gray-400' },
};

/**
 * Componente ProfileHistoryScreen (Tarefa FE-11)
 * Renderiza a página de detalhes e o histórico de atividades de um perfil específico.
 */
const ProfileHistoryScreen = ({ profileId }) => {
    // --- NOVOS ESTADOS PARA GERENCIAR DATA FETCHING ---
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // --- HOOK useEffect PARA BUSCAR OS DADOS DA API ---
    useEffect(() => {
        if (!profileId) return;

        const fetchHistory = async () => {
            setLoading(true);
            setError(null);
            try {
                const historyData = await getProfileHistory(profileId);
                // Ordena os dados pela data mais recente primeiro
                historyData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setHistory(historyData);
            } catch (err) {
                setError(err.message || 'Não foi possível carregar o histórico. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [profileId]); // Dependência: refaz a busca se o ID do perfil mudar

    // Função para formatar a data (sem alteração)
    const formatTimestamp = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
        }).replace(' ', ' de ').replace(',', ' às');
    };

    const renderTimelineItemContent = (event) => {
        const commonContent = (
            <>
                <div className="flex justify-between items-center">
                    <h3 className="text-md font-bold text-gray-800">{event.title}</h3>
                    <p className="text-xs text-gray-500 whitespace-nowrap ml-4">
                        {formatTimestamp(event.timestamp)}
                    </p>
                </div>
                <p className="text-sm text-gray-600 mt-1">por <span className="font-semibold">{event.author}</span></p>
                <p className="text-sm text-gray-500 mt-2">{event.details}</p>
            </>
        );

        // *** TAREFA FE-15: Torna o item de relatório clicável ***
        if (event.type === 'report') {
            return (
                <Link href={`/reports/${event.id}`} className="block hover:bg-slate-50 rounded-lg transition-colors">
                    <div className="min-w-0 flex-1 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                        {commonContent}
                        <div className="mt-3 text-right">
                             <span className="text-sm font-semibold text-blue-600 hover:text-blue-800">
                                Ver Relatório &rarr;
                            </span>
                        </div>
                    </div>
                </Link>
            );
        }

        // Para outros tipos de evento, mantém o comportamento anterior
        return (
            <div className="min-w-0 flex-1 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                {commonContent}
                {event.link && (
                    <div className="mt-3 text-right">
                        <Link href={event.link} className="text-sm font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                            Ver Detalhes &rarr;
                        </Link>
                    </div>
                )}
            </div>
        );
    };

    // --- LÓGICA DE RENDERIZAÇÃO CONDICIONAL ---
    const renderContent = () => {
        if (loading) {
            return <div className="text-center text-gray-500 mt-12">Carregando histórico...</div>;
        }

        if (error) {
            return <div className="text-center text-red-600 bg-red-100 p-6 rounded-md mt-8">{error}</div>;
        }

        if (history.length === 0) {
            return (
                <div className="text-center bg-white p-12 rounded-lg border border-dashed border-gray-300">
                    <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <h3 className="mt-4 text-xl font-medium text-gray-900 font-montserrat">Nenhuma atividade registrada</h3>
                    <p className="mt-2 text-gray-500">O histórico deste perfil ainda está vazio.</p>
                </div>
            );
        }

        return (
            <div className="flow-root px-4 sm:px-0">
                <ul role="list" className="-mb-8">
                    {history.map((event, eventIdx) => {
                        const { Icon, bgColor } = eventTypeConfig[event.type] || eventTypeConfig.profile_creation;
                        return (
                            <li key={event.id || eventIdx}>
                                <div className="relative pb-8">
                                    {eventIdx !== history.length - 1 ? (
                                        <span className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                                    ) : null}
                                    <div className="relative flex space-x-4">
                                        <div>
                                            <span className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-slate-50 ${bgColor}`}>
                                                <Icon />
                                            </span>
                                        </div>
                                        {renderTimelineItemContent(event)}
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-50 font-lato">
            <Navbar />
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    {/* Cabeçalho da Página (sem alteração) */}
                    <div className="mb-8 px-4 sm:px-0">
                        <Link href="/dashboard" className="text-sm text-blue-600 hover:underline mb-4 inline-block">
                            &larr; Voltar para Meus Perfis
                        </Link>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                            <h1 className="text-3xl font-montserrat text-gray-900 mb-4 sm:mb-0">
                                Turma 101 - Análise de Comportamento
                            </h1>
                            <button className="bg-yellow-400 text-blue-800 font-montserrat rounded-md py-2 px-5 text-sm shadow-md transition-all hover:bg-yellow-500 hover:-translate-y-0.5">
                                + Novo Formulário
                            </button>
                        </div>
                    </div>

                    {/* Timeline de Histórico agora renderizada dinamicamente */}
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default ProfileHistoryScreen;
