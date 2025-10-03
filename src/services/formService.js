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

/**
 * NOVO: Submete as respostas de um formulário para a API.
 * @param {object} payload - O corpo da requisição a ser enviado.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados da resposta da API (ex: { reportId }).
 * @throws {Error} - Lança um erro se a requisição falhar.
 */
export const submitFormAnswers = async (payload) => {
    try {
        const token = authService.getSessionToken();
        if (!token) {
            throw new Error("Sessão expirada. Por favor, faça login novamente.");
        }

        const response = await fetch('/api/v1/submissions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Falha ao enviar as respostas (Status: ${response.status}).`);
        }

        // Retorna o corpo da resposta para que o ID do relatório possa ser usado.
        return await response.json();

    } catch (error) {
        console.error('Falha ao submeter o formulário:', error);
        throw error; // Propaga o erro para ser tratado pelo componente.
    }
};
