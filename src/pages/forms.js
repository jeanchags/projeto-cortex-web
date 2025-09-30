import FormsScreen from '@/components/screens/FormsScreen';
import { authService } from '@/services/authService';


/**
 * Rota para a página de formulários.
 * Renderiza o componente FormScreen.
 */
export default function FormsPage({user}) {
    return <FormsScreen user={user} />;
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
