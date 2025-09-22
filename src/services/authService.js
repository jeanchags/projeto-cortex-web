import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

const CORTEX_SESSION_TOKEN = 'CORTEX_SESSION_TOKEN';

/**
 * Inicia a sessão do usuário, armazenando o token em um cookie.
 * @param {string} token - O token de autenticação a ser armazenado.
 */
function startSession(token) {
    setCookie(null, CORTEX_SESSION_TOKEN, token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: '/',
    });
}

/**
 * Encerra a sessão do usuário, removendo o cookie do token.
 * @param {object} ctx - O contexto do Next.js (opcional, para uso no lado do servidor).
 */
function deleteSession(ctx = null) {
    destroyCookie(ctx, CORTEX_SESSION_TOKEN);

}

/**
 * Realiza o login do usuário.
 * Em um cenário real, faria uma chamada para a API.
 * Aqui, simulamos o sucesso e iniciamos a sessão.
 * @param {object} credentials - As credenciais do usuário (email, senha).
 * @returns {Promise<{token: string}>} - Uma promessa que resolve com o token.
 */
async function login({ email, password }) {

    const response = await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    let data;
    try {
        // Tenta parsear o JSON. Isso pode falhar se for um erro 500 com HTML.
        data = await response.json();
    } catch (jsonError) {
        // Se o parse falhar, é um erro de servidor inesperado.
        throw new Error(`O servidor retornou uma resposta inesperada (Status: ${response.status}).`);
    }

    // 2. Tratamento de Respostas de Erro da API (Status HTTP)
    if (!response.ok) {
        let errorMessage = data.message; // Mensagem vinda do backend

        if (response.status === 401 || response.status === 404) {
            errorMessage = 'E-mail ou senha incorretos.';
        } else if (response.status === 400) {
            errorMessage = errorMessage || 'Dados inválidos. Verifique os campos.';
        } else if (response.status >= 500) {
            errorMessage = 'Ocorreu um erro interno no servidor. Tente mais tarde.';
        }

        throw new Error(errorMessage || 'Não foi possível fazer login.');
    }

    // 3. Tratamento de Resposta de Sucesso (200 OK)
    if (!data.token) {
        // Validação de contrato: A API deu OK, mas não enviou o token.
        console.error('Resposta de login bem-sucedida, mas sem token.');
        throw new Error('Resposta inválida do servidor. Tente novamente.');
    }

    console.log('Login bem-sucedido:', data);
    return data;
}

export const authService = {
    login,
    startSession,
    deleteSession,
    getSessionToken: (ctx = null) => {
        const cookies = parseCookies(ctx);
        return cookies[CORTEX_SESSION_TOKEN] || null;
    },
};
