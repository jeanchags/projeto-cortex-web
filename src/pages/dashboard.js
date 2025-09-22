import DashboardScreen from '@/components/screens/DashboardScreen';
import { withAuth } from '@/hoc/withAuth';
import { authService } from '@/services/authService';


export default function DashboardPage() {
    return <DashboardScreen />;
}

/**
 * Executa no lado do servidor antes de renderizar a página.
 * Verifica se o usuário tem uma sessão ativa. Se não, redireciona para o login.
 * @param {object} ctx - O contexto do Next.js.
 */
export async function getServerSideProps(ctx) {
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

    return {
        props: {}, // Permite a renderização da página se o token existir.
    };
}