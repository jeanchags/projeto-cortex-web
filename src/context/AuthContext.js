import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children, pageUser }) {
    const [user, setUser] = useState(pageUser || null);

    useEffect(() => {
        if (!pageUser) {
            const sessionUser = authService.getUserSession();
            if (sessionUser) {
                setUser(sessionUser);
            }
        }
    }, [pageUser]);

    /**
     * Nova função de login:
     * 1. Autentica com o serviço (API).
     * 2. Inicia a sessão (grava os cookies).
     * 3. Atualiza o estado do usuário no contexto.
     * @param {string} email O email do usuário.
     * @param {string} password A senha do usuário.
     * @throws {Error} Lança um erro se a autenticação falhar.
     */
    const login = async (email, password) => {
        try {
            // 1. Chama o serviço de autenticação
            const sessionData = await authService.login({ email, password });

            // 2. Inicia a sessão, gravando os cookies
            authService.startSession(sessionData);

            // 3. Atualiza o estado em memória do contexto
            setUser(sessionData.user);

        } catch (error) {
            // Se a autenticação falhar, o erro é propagado para quem chamou (LoginScreen)
            console.error('Falha no login a partir do AuthContext:', error);
            throw error;
        }
    };

    const logout = () => {
        authService.deleteSession();
        setUser(null);
    };

    // Adiciona a função 'login' ao valor provido pelo contexto.
    const value = {
        user,
        isAuthenticated: !!user,
        login, // <--- Exporta a nova função de login
        logout,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
