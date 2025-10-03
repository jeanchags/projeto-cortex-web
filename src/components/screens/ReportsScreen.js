import React from 'react';
import Navbar from '../layout/Navbar';

/**
 * Dados mockados para o relatório, refletindo a estrutura esperada da API.
 */
const mockReport = {
    id: 'rep-001',
    profileName: 'Turma 101 - Análise de Comportamento',
    formTitle: 'Análise de Foco e Concentração',
    generatedAt: new Date('2025-10-03T10:00:00Z'),
    summary: 'O perfil demonstra um padrão comportamental predominantemente Colaborativo, com fortes indicativos de aptidão para trabalho em equipe e comunicação assertiva. Pontos de desenvolvimento foram identificados na gestão de tarefas sob pressão.',
    sections: [
        {
            title: 'Pontos Fortes',
            content: '<p><strong>Comunicação Eficaz:</strong> Habilidade de expressar ideias de forma clara e ouvir ativamente os colegas.</p><ul><li>Proatividade em discussões.</li><li>Clareza na argumentação.</li></ul>'
        },
        {
            title: 'Áreas de Melhoria',
            content: '<p><strong>Gestão de Tempo:</strong> Dificuldade em priorizar tarefas quando múltiplas demandas ocorrem simultaneamente.</p>'
        },
        {
            title: 'Recomendações',
            content: '<p>Recomenda-se a aplicação de técnicas de gerenciamento de tempo, como a Matriz de Eisenhower, para auxiliar na priorização de tarefas. Workshops sobre liderança e tomada de decisão também podem ser benéficos.</p>'
        }
    ]
};

/**
 * Componente ReportScreen (Tarefa FE-14)
 * Busca e renderiza um relatório de diagnóstico, exibindo seu conteúdo
 * formatado em HTML de maneira profissional e legível.
 */
const ReportScreen = () => {
    // Formata a data para um padrão legível.
    const formattedDate = new Date(mockReport.generatedAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    });

    return (
        <div className="min-h-screen bg-slate-50 font-lato">
            <Navbar />
            <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-lg shadow-xl p-8 sm:p-12">
                    {/* Cabeçalho do Relatório */}
                    <header className="pb-8 border-b border-gray-200">
                        <h1 className="text-3xl font-montserrat text-blue-800">
                            Relatório de Análise de Perfil
                        </h1>
                        <div className="mt-4 text-gray-600">
                            <p><strong>Perfil:</strong> {mockReport.profileName}</p>
                            <p><strong>Formulário:</strong> {mockReport.formTitle}</p>
                            <p className="text-sm text-gray-500 mt-2">
                                Gerado em {formattedDate}
                            </p>
                        </div>
                    </header>

                    {/* Corpo do Relatório */}
                    <div className="mt-8">
                        {/* Sumário */}
                        <section className="mb-10">
                            <div className="bg-blue-50 border-l-4 border-blue-800 p-4 rounded-r-lg">
                                <p className="text-gray-800 leading-relaxed">
                                    {mockReport.summary}
                                </p>
                            </div>
                        </section>

                        {/* Seções Dinâmicas */}
                        <div className="space-y-8">
                            {mockReport.sections.map((section, index) => (
                                <section key={index}>
                                    <h2 className="text-2xl font-montserrat text-gray-800 border-b border-gray-200 pb-2 mb-4">
                                        {section.title}
                                    </h2>
                                    {/* Renderiza o conteúdo HTML de forma segura */}
                                    <div
                                        className="prose max-w-none text-gray-700"
                                        dangerouslySetInnerHTML={{ __html: section.content }}
                                    />
                                </section>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            {/* Estilos para o conteúdo injetado via dangerouslySetInnerHTML */}
            <style jsx global>{`
                .prose p {
                    margin-bottom: 1rem;
                }
                .prose strong {
                    font-weight: 700;
                    color: #1e3a8a; /* Cor similar ao text-gray-800 */
                }
                .prose ul {
                    list-style-type: disc;
                    padding-left: 1.5rem;
                    margin-top: 1rem;
                }
                .prose li {
                    margin-bottom: 0.5rem;
                }
            `}</style>
        </div>
    );
};

export default ReportScreen;
