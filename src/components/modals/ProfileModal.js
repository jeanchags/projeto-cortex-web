import React, { useState } from 'react';
import { authService } from '@/services/authService';

/**
 * Componente ProfileModal
 * Renderiza uma modal para a criação de um novo perfil, gerenciando
 * o estado do formulário e a submissão para a API.
 *
 * @param {object} props - Propriedades do componente.
 * @param {boolean} props.isOpen - Controla a visibilidade da modal.
 * @param {function} props.onClose - Função de callback para fechar a modal.
 * @param {function} props.onProfileCreated - Callback executado após a criação bem-sucedida do perfil.
 */
const ProfileModal = ({ isOpen, onClose, onProfileCreated }) => {
    // Estados do componente
    const [profileName, setProfileName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // Se a modal não estiver aberta, não renderiza nada.
    if (!isOpen) {
        return null;
    }

    /**
     * Impede que o clique dentro do conteúdo da modal a feche.
     * @param {React.MouseEvent} e - O evento de clique.
     */
    const handleModalContentClick = (e) => {
        e.stopPropagation();
    };

    /**
     * Lida com a submissão do formulário de criação de perfil.
     * @param {React.FormEvent} e - O evento de submissão do formulário.
     */
    const handleCreateProfile = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const token = authService.getSessionToken();
            if (!token) {
                throw new Error("Sessão expirada. Por favor, faça login novamente.");
            }

            const response = await fetch('/api/v1/profiles', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    personalData: { fullName: profileName }
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Falha ao criar o perfil.');
            }

            // Notifica o componente pai e fecha a modal
            if (onProfileCreated) {
                onProfileCreated();
            }
            onClose();

        } catch (err) {
            setError(err.message || 'Não foi possível criar o perfil. Tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Overlay de fundo que cobre a tela inteira
        <div
            id="profile-modal"
            className="fixed inset-0 bg-gray-800 bg-opacity-60 overflow-y-auto h-full w-full z-20 flex items-center justify-center p-4"
            onClick={onClose} // Fecha a modal ao clicar no fundo
        >
            {/* Contêiner do conteúdo da modal */}
            <form
                onSubmit={handleCreateProfile}
                className="relative mx-auto p-5 border w-full max-w-md shadow-lg rounded-lg bg-white"
                onClick={handleModalContentClick} // Impede o fechamento ao clicar no conteúdo
            >
                {/* Botão de Fechar no canto */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute top-0 right-0 mt-4 mr-4 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Fechar modal"
                >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="mt-3 text-center">
                    {/* Título da Modal */}
                    <h3 className="text-xl leading-6 font-medium text-gray-900 font-montserrat">
                        Criar novo perfil
                    </h3>
                    <div className="mt-2 px-7 py-3">
                        {/* Texto descritivo */}
                        <p className="text-sm text-gray-500 mb-4 font-lato">
                            Dê um nome para organizar a avaliação (ex: Turma 101, João Silva).
                        </p>
                        {/* Campo de Input */}
                        <input
                            type="text"
                            value={profileName}
                            onChange={(e) => setProfileName(e.target.value)}
                            className="w-full px-3 py-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
                            placeholder="Nome do perfil"
                            required
                        />
                        {/* Mensagem de Erro */}
                        {error && (
                            <p className="mt-2 text-sm text-red-500">{error}</p>
                        )}
                    </div>
                    {/* Botões de Ação */}
                    <div className="items-center px-4 py-3 space-y-2">
                        <button
                            type="submit"
                            id="confirm-btn"
                            disabled={isLoading}
                            className="w-full px-4 py-3 bg-blue-800 text-white text-base font-montserrat font-medium rounded-md shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            {isLoading ? 'Salvando...' : 'Salvar Perfil'}
                        </button>
                        <button
                            type="button"
                            id="cancel-btn"
                            onClick={onClose}
                            className="w-full px-4 py-2 bg-transparent text-gray-600 text-base font-medium rounded-md hover:bg-gray-100 transition-colors"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ProfileModal;
