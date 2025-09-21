import React from 'react';
import { authService } from '@/services/authService';

/**
 * HOC (Higher-Order Component) para proteger rotas que exigem autenticação.
 * Verifica a sessão no lado do servidor e redireciona para o login se não houver.
 * @param {React.Component} WrappedComponent - O componente a ser envolvido.
 */
export function withAuth(WrappedComponent) {
    const WithAuthWrapper = (props) => {
        // A lógica de verificação já foi feita no getServerSideProps.
        // O componente é renderizado apenas se a autenticação for bem-sucedida.
        return <WrappedComponent {...props} />;
    };

    WithAuthWrapper.getServerSideProps = async (ctx) => {
        const token = authService.getSessionToken(ctx);

        if (!token) {
            // Redireciona para a página de login se não houver token.
            return {
                redirect: {
                    destination: '/login',
                    permanent: false,
                },
            };
        }

        // Se houver um componente aninhado com getServerSideProps, chame-o.
        if (WrappedComponent.getServerSideProps) {
            const wrappedProps = await WrappedComponent.getServerSideProps(ctx);
            return { props: wrappedProps.props };
        }

        return {
            props: {},
        };
    };

    return WithAuthWrapper;
}
