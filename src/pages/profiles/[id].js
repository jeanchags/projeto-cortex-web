// src/pages/profiles/[id].js
import { useRouter } from 'next/router';
import ProfileHistoryScreen from '@/components/screens/ProfileHistoryScreen';
import { withAuth } from '@/hoc/withAuth';

function ProfileHistoryPage() {
    const router = useRouter();
    const { id } = router.query; // O ID do perfil estará aqui

    // Futuramente, você usará este ID para buscar os dados do perfil.
    // Por enquanto, o ProfileHistoryScreen usa dados mockados.

    return <ProfileHistoryScreen profileId={id} />;
}

export default withAuth(ProfileHistoryPage);
