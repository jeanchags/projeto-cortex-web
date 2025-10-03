// src/services/formService.js

import { authService } from './authService';

/**
 * Busca a estrutura de um formulário específico pelo seu ID.
 * @param {string} formId - O ID do formulário.
 * @returns {Promise<object>} - Uma promessa que resolve para o objeto do formulário.
 * @throws {Error} - Lança um erro se a requisição falhar.
 */
export const getFormById = async (formId) => {
    try {
        const token = authService.getSessionToken();
        if (!token) {
            throw new Error("Usuário não autenticado.");
        }

        const response = await fetch(`/api/v1/forms/${formId}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Falha ao buscar o formulário (Status: ${response.status}).`);
        }

        return await response.json();
    } catch (error) {
        console.error('Falha ao buscar dados do formulário:', error);
        // Propaga o erro para ser tratado pela UI (pelo componente que chamou o serviço)
        throw error;
    }
};
