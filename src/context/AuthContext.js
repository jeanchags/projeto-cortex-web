import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '@/services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children, pageUser }) {
    const [user, setUser] = useState(pageUser || null);

    // O useEffect existente já lida bem com a hidratação inicial.
    useEffect(() => {
        if (!pageUser) {
            const sessionUser = authService.getUserSession();
            if (sessionUser) {
                setUser(sessionUser);
            }
        }
    }, [pageUser]);

    /**
     * Nova função de logout:
     * 1. Remove os cookies da sessão.
     * 2. Limpa o estado do usuário no contexto para null.
     */
    const logout = () => {
        authService.deleteSession();
        setUser(null);
    };

    // Adiciona a função 'logout' ao valor provido pelo contexto.
    const value = {
        user,
        isAuthenticated: !!user,
        logout, // <--- Exporta a nova função
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// O hook 'useAuth' não precisa de alterações.
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}