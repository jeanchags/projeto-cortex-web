import DashboardScreen from '@/components/screens/DashboardScreen';
import { authService } from '@/services/authService';


export default function DashboardPage({user}) {
    return <DashboardScreen user={user} />;
}

/**
 * Executa no lado do servidor antes de renderizar a página.
 * Verifica se o usuário tem uma sessão ativa. Se não, redireciona para o login.
 * @param {object} ctx - O contexto do Next.js.
 */
export async function getServerSideProps(ctx) {
    const token = authService.getSessionToken(ctx);
    const user = authService.getUserSession(ctx);

    if (!token || !user) {
        // Redireciona para a página de login se não houver token.
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {
            user,
        },
    };
}
