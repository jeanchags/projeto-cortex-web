import ReportsScreen from '@/components/screens/ReportsScreen';
import { authService } from '@/services/authService'; 

/**
 * Rota para a página de relatórios.
 * Renderiza o componente ReportScreen.
 */
export default function ReportsPage({ user }) {
    return <ReportsScreen user={user} />;
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
