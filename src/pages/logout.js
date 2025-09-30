import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';


export default function LogoutPage() {

    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        logout();
        router.push('/login');
    }, [router]);

    return null;
}

