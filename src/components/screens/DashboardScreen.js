import React, { useState, useEffect } from 'react';
import Navbar from '../layout/Navbar';
import ProfileModal from '../modals/ProfileModal';
import ProfileCard from '../cards/ProfileCard';
import Pagination from '../layout/Pagination'; // <-- Importa o novo componente
import { authService } from '@/services/authService';

const ITEMS_PER_PAGE = 9; // Define quantos perfis serão exibidos por página

/**
 * Componente DashboardScreen
 * Renderiza o painel principal, buscando e exibindo os perfis
 * de avaliação do usuário de forma paginada.
 */
const DashboardScreen = () => {
    // Estados do componente
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profiles, setProfiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estados para gerenciamento da paginação
    const [currentPage, setCurrentPage] = useState(1);
    const [paginationInfo, setPaginationInfo] = useState(null);

    /**
     * Busca os perfis da API de forma paginada.
     * @param {number} page - O número da página a ser buscada.
     */
    const fetchProfiles = async (page = 1) => {
        setIsLoading(true);
        setError(null);

        try {
            const token = authService.getSessionToken();
            if (!token) {
                throw new Error("Sessão inválida. Por favor, faça login novamente.");
            }

            // Constrói a URL com os parâmetros de paginação
            const url = `/api/v1/profiles?page=${page}&limit=${ITEMS_PER_PAGE}`;

            const response = await fetch(url, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || `Falha ao buscar os perfis (Status: ${response.status}).`);
            }

            const data = await response.json();

            // *** CORREÇÃO: Extrai os perfis do array 'data' e a paginação do objeto 'pagination' ***
            setProfiles(data.data || []);
            setPaginationInfo(data.pagination || null);

        } catch (err) {
            setError(err.message || 'Não foi possível carregar os perfis. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    // useEffect agora depende de 'currentPage'.
    // Ele será executado na montagem inicial e sempre que 'currentPage' mudar.
    useEffect(() => {
        fetchProfiles(currentPage);
    }, [currentPage]);

    // Função para ser passada para o componente de paginação
    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= paginationInfo.totalPages) {
            setCurrentPage(newPage);
        }
    };

    /**
     * Renderiza o conteúdo principal do dashboard com base no estado da requisição.
     */
    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center text-gray-500 mt-8">Carregando perfis...</div>;
        }

        if (error) {
            return <div className="text-center text-red-600 bg-red-100 p-4 rounded-md mt-8">{error}</div>;
        }

        if (profiles.length === 0) {
            return (
                <div id="empty-state" className="text-center bg-white p-12 rounded-lg border border-dashed border-gray-300">
                    <svg className="mx-auto h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                    <h3 className="mt-4 text-xl font-medium text-gray-900 font-montserrat">Crie seu primeiro perfil</h3>
                    <p className="mt-2 text-gray-500">Perfis são como pastas para organizar suas avaliações.</p>
                     <div className="mt-6">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        type="button"
                        className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md bg-yellow-400 text-blue-800 hover:bg-yellow-500"
                      >
                        + Criar meu primeiro perfil
                      </button>
                    </div>
                </div>
            );
        }

        return (
             <>
                <div id="populated-state" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profiles.map((profile) => (
                        <ProfileCard key={profile.id} profile={profile} />
                    ))}
                </div>
                {paginationInfo && paginationInfo.totalPages > 1 && (
                     <Pagination
                        paginationInfo={paginationInfo}
                        onPageChange={handlePageChange}
                    />
                )}
            </>
        );
    };

    return (
        <>
            <div className="min-h-screen bg-slate-50 font-lato">
                <Navbar />
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <h1 className="text-3xl font-montserrat text-gray-900 mb-4 sm:mb-0">
                                Meus Perfis
                            </h1>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="bg-yellow-400 text-blue-800 font-montserrat rounded-md py-2 px-5 text-sm shadow-md transition-all hover:bg-yellow-500 hover:-translate-y-0.5"
                            >
                                + Novo Perfil
                            </button>
                        </div>
                        {renderContent()}
                    </div>
                </main>
            </div>
            <ProfileModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProfileCreated={() => fetchProfiles(1)} // Recarrega para a primeira página após criar
            />
        </>
    );
};

export default DashboardScreen;
