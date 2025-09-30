import LoginScreen from '@/components/screens/LoginScreen';
import {authService} from "@/services/authService";

/**
 * Página principal da aplicação.
 * Em um projeto Next.js, os arquivos dentro de `src/pages`
 * se tornam rotas automaticamente. `index.js` é a rota raiz ("/").
 */
export default function LoginPage() {
    return <LoginScreen />;
}

/**
 * Verifica no lado do servidor se o usuário já possui uma sessão ativa.
 * Se sim, redireciona para o dashboard.
 * @param {object} ctx - O contexto do Next.js.
 */
export async function getServerSideProps(ctx) {
    const token = authService.getSessionToken(ctx);
    const user = authService.getUserSession(ctx);

    if (token) {
        
        return {
            redirect: {
                destination: '/dashboard',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
