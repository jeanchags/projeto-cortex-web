import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { useRouter } from 'next/router';

const CORTEX_SESSION_TOKEN = 'CORTEX_SESSION_TOKEN';
const CORTEX_USER_INFO = 'CORTEX_USER_INFO';

/**
 * Inicia a sessão do usuário, armazenando o token em um cookie.
 * @param {string} token - O token de autenticação a ser armazenado.
 * @param {object} user - O objeto com os dados do usuário (ex: { name, email }).
 */
function startSession({ token, user }) {
    setCookie(null, CORTEX_SESSION_TOKEN, token, {
        maxAge: 30 * 24 * 60 * 60, // 30 dias
        path: '/',
    });
    // Armazena os dados do usuário como uma string JSON
    setCookie(null, CORTEX_USER_INFO, JSON.stringify(user), {
        maxAge: 30 * 24 * 60 * 60,
        path: '/',
    });
}

/**
 * Encerra a sessão do usuário, removendo o cookie do token.
 * @param {object} ctx - O contexto do Next.js (opcional, para uso no lado do servidor).
 */
function deleteSession(ctx = null) {
    destroyCookie(ctx, CORTEX_SESSION_TOKEN);
    destroyCookie(ctx, CORTEX_USER_INFO);
}

/**
 * Retorna os dados do usuário da sessão.
 * @param {object} ctx - O contexto do Next.js (opcional).
 * @returns {object|null} - O objeto do usuário ou null.
 */
function getUserSession(ctx = null) {
    const { [CORTEX_USER_INFO]: userCookie } = parseCookies(ctx);
    if (!userCookie) {
        return null;
    }
    try {
        return JSON.parse(userCookie);
    } catch (error) {
        console.error('Failed to parse user session cookie:', error);
        return null;
    }
}

/**
 * Realiza o login do usuário.
 * Em um cenário real, faria uma chamada para a API.
 * Aqui, simulamos o sucesso e iniciamos a sessão.
 * @param {object} credentials - As credenciais do usuário (email, senha).
 * @returns {Promise<{token: string}>} - Uma promessa que resolve com o token.
 */
async function login({ email, password }) {

    const response = await fetch(`/${process.env.NEXT_PUBLIC_API_LOGIN_PATH}`, {
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

async function register({ name, email, password }) {
    const response = await fetch(`/${process.env.NEXT_PUBLIC_API_REGISTER_PATH}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify({ name, email, password }),
    });

    let data;
    try {
        // Tenta parsear o JSON. Isso pode falhar se for um erro 500 com HTML.
        data = await response.json();
    } catch (jsonError) {
        // Se o parse falhar, é um erro de servidor inesperado.
        throw new Error(`O servidor retornou uma resposta inesperada (Status: ${response.status}).`);
    }

    if (!response.ok) {
        // Lógica de tratamento de erro similar à função de login
        throw new Error(data.message || 'Não foi possível registrar. Tente novamente.');
    }

    // 2. Tratamento de Respostas de Erro da API (Status HTTP)
    if (!response.ok) {
        let errorMessage = data.message; // Mensagem vinda do backend

        if (response.status === 401 || response.status === 404) {
            errorMessage = '401 ou 404)';
        } else if (response.status === 400) {
            errorMessage = errorMessage || '400';
        } else if (response.status >= 500) {
            errorMessage = '500';
        }

        throw new Error(errorMessage || 'Não foi possível fazer o registro.');
    }

    // 3. Tratamento de Resposta de Sucesso (200 OK)
    if (!data.token) {
        // Validação de contrato: A API deu OK, mas não enviou o token.
        console.error('Resposta de Registro bem-sucedido, mas sem token.');
        throw new Error('Resposta inválida do servidor. Tente novamente.');
    }

    console.log('Registro bem-sucedido:', data);
    return data;
}

/**
 * Verifica o token de e-mail na API.
 * @param {string} token - O token de verificação da URL.
 * @returns {Promise<object>} - Uma promessa que resolve com os dados da resposta da API.
 * @throws {Error} - Lança um erro se a verificação falhar.
 */
async function verifyEmailToken(token) {
    try {
        const response = await fetch(`/api/v1/auth/verify-email/${token}`, {
            method: 'GET',
        });

        if (!response.ok) {
            // Se o backend retornar um erro (ex: 400 para token inválido),
            // tentamos extrair a mensagem de erro do corpo da resposta.
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.message || `Falha ao verificar o e-mail (Status: ${response.status}).`);
        }

        // Para um GET bem-sucedido que redireciona, o corpo pode não ser JSON,
        // mas tratamos o status 200 como sucesso aqui.
        return { success: true };

    } catch (error) {
        console.error('Falha ao verificar o token de e-mail:', error);
        throw error; // Propaga o erro para ser tratado pela UI.
    }
}


export const authService = {
    login,
    register,
    verifyEmailToken,
    startSession,
    deleteSession,
    getUserSession,
    getSessionToken: (ctx = null) => {
        const cookies = parseCookies(ctx);
        return cookies[CORTEX_SESSION_TOKEN] || null;
    },
};