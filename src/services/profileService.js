import { authService } from './authService';

/**
 * Busca o histórico de atividades de um perfil específico.
 * @param {string} profileId - O ID do perfil.
 * @returns {Promise<Array>} - Uma promessa que resolve para o array de eventos do histórico.
 * @throws {Error} - Lança um erro se a requisição falhar.
 */
export const getProfileHistory = async (profileId) => {
    try {
        const token = authService.getSessionToken();
        if (!token) {
            throw new Error("Usuário não autenticado.");
        }

        const response = await fetch(`/api/v1/profiles/${profileId}/history`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Falha ao buscar o histórico (Status: ${response.status}).`);
        }

        const data = await response.json();
        return data.history || []; // Garante que sempre retornemos um array
    } catch (error) {
        console.error('Falha ao buscar o histórico do perfil:', error);
        // Propaga o erro para ser tratado pela UI
        throw error;
    }
};
