import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../layout/Navbar';

/**
 * Componente DashboardScreen
 * Renderiza o painel principal do sistema, baseado no protótipo (TELA 2.0).
 * Inclui a navegação principal, a visualização de "perfis".
 */
const DashboardScreen = () => {
    // Estado para controlar a visibilidade do modal de "Novo Perfil"
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Funções para controlar o modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    /**
     * Simula a criação de um perfil e fecha o modal.
     */
    const createProfile = () => {
        // Em uma aplicação real, aqui haveria lógica de API.
        console.log("Simulando criação de perfil...");
        closeModal();
    };

    return (
        <>
            {/* TELA 2.0: Dashboard e Gestão de Perfis
              Adaptado do protótipo 'cortex_sprint1_prototype_unified.html'
            */}
            <div className="min-h-screen bg-slate-50 font-lato">

                {/* Navegação Principal Reutilizável */}
                <Navbar />

                {/* Conteúdo Principal */}
                <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        {/* Cabeçalho da Seção */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                            <h1 className="text-3xl font-montserrat text-gray-900 mb-4 sm:mb-0">
                                Meus Perfis
                            </h1>
                            {/* Botão de Novo Perfil */}
                            <button
                                onClick={openModal}
                                className="bg-yellow-400 text-blue-800 font-montserrat rounded-md py-2 px-5 text-sm shadow-md transition-all hover:bg-yellow-500 hover:-translate-y-0.5"
                            >
                                + Novo Perfil
                            </button>
                        </div>

                        {/* Estado Populado (Hardcoded) */}
                        <div id="populated-state" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Card 1 - Linka para /forms */}
                            <Link href="/forms" className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-montserrat text-blue-800">Turma 301</h3>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">ATIVO</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Criado em: 15/09/2025</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-600">3 formulários preenchidos.</p>
                                </div>
                            </Link>

                            {/* Card 2 - Linka para /forms */}
                            <Link href="/forms" className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-montserrat text-blue-800">João Silva</h3>
                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">ATIVO</span>
                                    </div>
                                    <p className="text-sm text-gray-500 mt-2">Criado em: 12/09/2025</p>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-600">1 formulário preenchido.</p>
                                </div>
                            </Link>

                            {/* Card de Adicionar Novo Perfil (Abre o modal) */}
                            <div
                                onClick={openModal}
                                className="cursor-pointer bg-white/60 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-yellow-400 hover:bg-yellow-50 transition-all group"
                            >
                                <div className="text-center p-6">
                                    <span className="text-4xl text-gray-400 group-hover:text-yellow-400 transition-colors">+</span>
                                    <p className="text-sm font-medium text-gray-600 mt-2">Adicionar novo perfil</p>
                                </div>
                            </div>

                        </div>
                    </div>
                </main>
            </div>

            {/* MODAL: Criar Novo Perfil */}
            {isModalOpen && (
                <div
                    id="profile-modal"
                    className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full z-20 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div
                        className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="mt-3 text-center">
                            <h3 className="text-xl leading-6 font-medium text-gray-900 font-montserrat">
                                Criar novo perfil
                            </h3>
                            <div className="mt-2 px-7 py-3">
                                <p className="text-sm text-gray-500 mb-4">
                                    Dê um nome para organizar a avaliação (ex: Turma 101, João Silva).
                                </p>
                                <input
                                    type="text"
                                    className="w-full px-3 py-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                                    placeholder="Nome do perfil"
                                />
                            </div>
                            <div className="items-center px-4 py-3 space-y-2">
                                <button
                                    onClick={createProfile}
                                    className="w-full px-4 py-3 bg-blue-800 text-white text-base font-montserrat font-medium rounded-md shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5"
                                >
                                    Salvar Perfil
                                </button>
                                <button
                                    onClick={closeModal}
                                    className="w-full px-4 py-2 bg-transparent text-gray-600 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DashboardScreen;
