// src/pages/reports/[id].js
import { useRouter } from 'next/router';
import ReportScreen from '@/components/screens/ReportsScreen';
import { withAuth } from '@/hoc/withAuth';

function ReportPage() {
    const router = useRouter();
    const { id } = router.query; // ID do relatório vindo da URL

    // Em um cenário real, o reportId seria passado para o ReportScreen
    // para buscar os dados específicos daquele relatório.
    // Por enquanto, o ReportScreen usa dados mocados.
    if (!id) {
        return <div>Carregando...</div>; // Ou um componente de loading
    }

    return <ReportScreen reportId={id} />;
}

export default withAuth(ReportPage);
