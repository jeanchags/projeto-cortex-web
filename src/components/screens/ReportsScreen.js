import React from 'react';
import Navbar from '../layout/Navbar';
import { useRouter } from 'next/router';

// Dados mocados expandidos para o relatório, visando ocupar duas páginas.
const reportData = {
    profileName: "Turma 301",
    date: "21/09/2025",
    summary: {
        engajamento: "Alto",
        tarefas: "Quase Sempre",
        interação: "Interage Bem",
        iniciativa: "Muita",
        resiliência: "Persevera"
    },
    questions: [
        { title: "Nível de engajamento do aluno nas atividades", value: 80, label: "Alto" },
        { title: "Frequência de entrega de tarefas de casa", value: 90, label: "Quase Sempre" },
        { title: "Interação do aluno com os colegas", value: 70, label: "Interage Bem" },
        { title: "Iniciativa para aprender novos conceitos", value: 85, label: "Muita" },
        { title: "Reação a desafios e dificuldades acadêmicas", value: 75, label: "Persevera" },
        { title: "Capacidade de organização e planejamento", value: 65, label: "Moderada" },
        { title: "Demonstração de criatividade na resolução de problemas", value: 88, label: "Alta" },
        { title: "Nível de atenção e foco durante as aulas", value: 72, label: "Bom" },
        { title: "Comunicação verbal e expressão de ideias", value: 82, label: "Muito Boa" },
        { title: "Adaptação a novas rotinas e regras", value: 95, label: "Excelente" },
    ],
    observations: "O perfil demonstra um excelente engajamento geral e proatividade. A interação social é positiva, mas pode ser incentivada em atividades de liderança. A resiliência é um ponto forte, mostrando boa capacidade de superação frente aos desafios. Observa-se uma leve dificuldade na organização autônoma de tarefas de longo prazo, embora a execução diária seja consistente. A criatividade é um diferencial notável, especialmente em atividades que permitem liberdade de expressão. Recomenda-se acompanhamento para desenvolver habilidades de planejamento e autonomia em projetos mais complexos, potencializando ainda mais seu desempenho acadêmico e social.",
    recommendations: [
        "Incentivar a participação em projetos de grupo com papel de liderança para desenvolver a comunicação e a tomada de decisão.",
        "Utilizar ferramentas de planejamento, como agendas ou aplicativos de tarefas, para auxiliar na organização de atividades de longo prazo.",
        "Propor desafios criativos que exijam soluções inovadoras, explorando seu ponto forte na resolução de problemas.",
        "Oferecer feedback constante sobre o progresso em relação à organização, reforçando positivamente os avanços.",
        "Criar oportunidades para que o aluno apresente trabalhos e ideias para a turma, aprimorando a confiança e a habilidade de comunicação verbal."
    ]
};

/**
 * Componente ReportsScreen
 * Exibe um relatório psicopedagógico detalhado com opção de impressão.
 */
const ReportsScreen = () => {
    const router = useRouter();

    /**
     * Aciona a funcionalidade de impressão do navegador.
     */
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="min-h-screen bg-slate-50 font-lato">
            {/* Navbar é ocultada durante a impressão */}
            <Navbar hideOnPrint={true} />

            <main className="max-w-4xl mx-auto py-8 sm:px-6 lg:px-8 print:py-0 print:px-0">

                {/* Ações do Relatório (oculto na impressão) */}
                <div className="flex justify-between items-center mb-6 px-4 sm:px-0 print:hidden">
                    <button onClick={() => router.back()} className="text-sm text-blue-600 hover:underline">
                        &larr; Voltar para Dashboard
                    </button>
                    <button
                        onClick={handlePrint}
                        className="bg-yellow-400 text-blue-800 font-montserrat rounded-md py-2 px-5 text-sm shadow-md transition-all hover:bg-yellow-500 hover:-translate-y-0.5"
                    >
                        <svg className="w-4 h-4 mr-0 sm:mr-2 inline" fill="none" stroke="currentColor"
                             viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                        </svg>
                        <span class="hidden sm:inline">Baixar PDF</span>
                    </button>
                </div>

                {/* Conteúdo Imprimível do Relatório */}
                <div id="report-content"
                     className="bg-white rounded-lg shadow-xl p-8 sm:p-12 print:shadow-none print:p-2 print:border">

                    {/* Cabeçalho */}
                    <header className="flex flex-col sm:flex-row justify-between items-start pb-8 border-b-2 border-gray-100">
                        <div className="flex items-center">
                            <svg className="h-10 w-10 text-blue-800" viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z"/>
                            </svg>
                            <span className="font-montserrat text-2xl ml-3 text-gray-800">Cortex</span>
                        </div>
                        <div className="text-left sm:text-right mt-4 sm:mt-0">
                            <h1 className="text-2xl font-montserrat text-blue-800">Relatório Psicopedagógico</h1>
                            <p className="text-gray-500 mt-1">Perfil Avaliado: <strong>{reportData.profileName}</strong></p>
                            <p className="text-sm text-gray-500">Data de Emissão: {reportData.date}</p>
                        </div>
                    </header>

                    {/* Resumo Geral */}
                    <section id="summary" className="my-8">
                        <h2 className="text-xl font-montserrat text-gray-800 border-l-4 border-yellow-400 pl-3 mb-4">Resumo Geral</h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-center">
                            {Object.entries(reportData.summary).map(([key, value]) => (
                                <div key={key} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                                    <p className="text-sm text-gray-500 capitalize">{key}</p>
                                    <p className="font-bold text-blue-800 text-md mt-1">{value}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Análise Detalhada */}
                    <section id="details" className="my-10">
                        <h2 className="text-xl font-montserrat text-gray-800 border-l-4 border-yellow-400 pl-3 mb-6">Análise Detalhada por Área</h2>
                        <div className="space-y-6">
                            {reportData.questions.map((q, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-baseline mb-1">
                                        <p className="text-gray-700 font-semibold">{q.title}</p>
                                        <p className="text-sm font-bold text-blue-800">{q.label}</p>
                                    </div>
                                    <div className="w-full bg-gray-200 rounded-full h-4">
                                        <div
                                            className="bg-blue-800 h-4 rounded-full flex items-center justify-center text-xs font-medium text-blue-100"
                                            style={{ width: `${q.value}%` }}
                                        >
                                            {q.value}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Observações */}
                    <section id="observations" className="my-10 break-after-page">
                        <h2 className="text-xl font-montserrat text-gray-800 border-l-4 border-yellow-400 pl-3 mb-4">Observações do Profissional</h2>
                        <div className="bg-slate-50/70 p-6 rounded-lg border border-gray-200">
                            <p className="text-gray-600 leading-relaxed italic">
                                "{reportData.observations}"
                            </p>
                        </div>
                    </section>

                    {/* Recomendações (iniciará na segunda página da impressão) */}
                    <section id="recommendations" className="my-10">
                        <h2 className="text-xl font-montserrat text-gray-800 border-l-4 border-yellow-400 pl-3 mb-6">Recomendações Pedagógicas</h2>
                        <ul className="space-y-4 list-disc list-inside text-gray-700">
                            {reportData.recommendations.map((rec, index) => (
                                <li key={index} className="pl-2">{rec}</li>
                            ))}
                        </ul>
                    </section>

                    {/* Rodapé */}
                    <footer className="pt-8 mt-10 border-t-2 border-gray-100 text-center text-xs text-gray-400 print:text-black">
                        <p><strong>Jean Chagas Fernandes</strong></p>
                        <p>Psicopedagogo | CRP 12/34567</p>
                        <p>Relatório gerado pelo Sistema Cortex em {reportData.date}</p>
                    </footer>
                </div>
            </main>
        </div>
    );
};

export default ReportsScreen;

