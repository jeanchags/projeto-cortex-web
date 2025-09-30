import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

// 1. Cria o Contexto
const AuthContext = createContext(null);

// 2. Cria o Provedor (Provider)
export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Ao carregar a aplicação no cliente, busca os dados do usuário dos cookies
        const sessionUser = authService.getUserSession();
        if (sessionUser) {
            setUser(sessionUser);
        }
    }, []);

    // O valor fornecido pelo contexto inclui o usuário e, futuramente,
    // poderia incluir funções como login, logout, etc.
    const value = {
        user,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// 3. Cria um Hook customizado para facilitar o uso do contexto
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
