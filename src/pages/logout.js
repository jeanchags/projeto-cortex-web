import { useEffect } from 'react';
import { useRouter } from 'next/router';
import {authService} from "@/services/authService";


export default function Logout() {

    const router = useRouter();
    useEffect(() => {
        authService.deleteSession();
        router.push('/login');
    }, [router]);
    return null;
}

/**
 * Verifica no lado do servidor se o usuário já possui uma sessão ativa.
 * Se não, redireciona para o login.
 * @param {object} ctx - O contexto do Next.js.
 */
export async function getServerSideProps(ctx) {
    const token = authService.getSessionToken(ctx);

    if (!token) {
        return {
            redirect: {
                destination: '/login',
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
}
