import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Navbar from '../layout/Navbar';


// Dados mocados para as questões, baseados no protótipo
const questions = [
    {
        id: 1,
        title: "Qual é o nível de engajamento do aluno nas atividades em sala de aula?",
        options: ["Muito Baixo", "Baixo", "Médio", "Alto", "Muito Alto"],
    },
    {
        id: 2,
        title: "Com que frequência o aluno completa e entrega as tarefas de casa?",
        options: ["Raramente", "Às Vezes", "Frequentemente", "Quase Sempre", "Sempre"],
    },
    {
        id: 3,
        title: "Como você avalia a interação do aluno com os colegas?",
        options: ["Isolado", "Pouca Interação", "Interage Bem", "Muito Sociável", "Líder Natural"],
    },
    {
        id: 4,
        title: "O aluno demonstra iniciativa para aprender novos conceitos?",
        options: ["Nenhuma", "Pouca", "Alguma", "Muita", "Excepcional"],
    },
    {
        id: 5,
        title: "Como o aluno reage a desafios e dificuldades acadêmicas?",
        options: ["Desiste Facilmente", "Fica Frustrado", "Pede Ajuda", "Persevera", "Enfrenta com Confiança"],
    }
];

/**
 * Componente FormsScreen
 * Gerencia o fluxo de preenchimento de um formulário de avaliação,
 * unificando as telas de introdução, questões e revisão.
 */
const FormsScreen = () => {
    const router = useRouter();
    const [currentScreen, setCurrentScreen] = useState('intro'); // 'intro', 'question', 'review'
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});

    // --- Handlers de Navegação do Formulário ---

    const startForm = () => {
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setCurrentScreen('question');
    };

    const handleAnswer = (questionId, answer) => {
        const newAnswers = { ...userAnswers, [questionId]: answer };
        setUserAnswers(newAnswers);

        // Avança para a próxima questão ou para a tela de revisão
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            setCurrentScreen('review');
        }
    };

    const editAnswer = (questionIndex) => {
        setCurrentQuestionIndex(questionIndex);
        setCurrentScreen('question');
    };

    const submitForm = () => {
        console.log("Formulário Finalizado:", userAnswers);
        // Em uma aplicação real, aqui os dados seriam enviados para uma API.
        alert("Avaliação concluída com sucesso!");
        router.push('/dashboard'); // Redireciona para o dashboard após a conclusão
    };

    // --- Funções de Renderização para cada Tela ---

    // TELA 3.1: Introdução do Formulário
    const renderIntroScreen = () => (
        <div className="max-w-2xl mx-auto my-12 bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
                <h1 className="text-2xl font-montserrat text-blue-800">Avaliação Psicopedagógica</h1>
                <p className="text-gray-600 mt-4">
                    Este formulário contém <strong>{questions.length} questões</strong> de múltipla escolha para avaliar o perfil de desenvolvimento do aluno.
                    Suas respostas são essenciais para uma análise completa.
                </p>
                <p className="text-sm text-gray-500 mt-2">Tempo estimado: 5 minutos.</p>
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={startForm}
                    className="w-full max-w-xs px-6 py-3 bg-blue-800 text-white font-montserrat rounded-md shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5"
                >
                    Iniciar Avaliação
                </button>
            </div>
        </div>
    );

    // TELA 3.2: Tela de Questão
    const renderQuestionScreen = () => {
        const question = questions[currentQuestionIndex];
        const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

        return (
            <div className="max-w-2xl mx-auto my-12 bg-white rounded-lg shadow-xl p-8">
                {/* Barra de Progresso */}
                <div>
                    <p className="text-sm font-semibold text-blue-800 mb-2">PERGUNTA {currentQuestionIndex + 1} DE {questions.length}</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>

                {/* Título da Questão */}
                <div className="mt-8">
                    <h2 className="text-xl text-gray-800 font-medium">{question.title}</h2>
                </div>

                {/* Opções de Resposta */}
                <div className="mt-6 space-y-4">
                    {question.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswer(question.id, option)}
                            className="w-full text-left p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-800 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
        );
    };

    // TELA 3.3: Tela de Revisão
    const renderReviewScreen = () => (
        <div className="max-w-2xl mx-auto my-12 bg-white rounded-lg shadow-xl p-8">
            <div className="text-center">
                <h1 className="text-2xl font-montserrat text-blue-800">Revise suas Respostas</h1>
                <p className="text-gray-600 mt-2">Confira as respostas antes de finalizar a avaliação.</p>
            </div>

            {/* Lista de Respostas */}
            <div className="mt-8 space-y-4">
                {questions.map((question, index) => (
                    <div key={question.id} className="flex justify-between items-center border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
                        <div>
                            <p className="text-sm text-gray-500">Questão {index + 1}</p>
                            <p className="text-gray-800">{question.title}</p>
                        </div>
                        <div className="text-right flex-shrink-0 ml-4">
                            <p className="font-bold text-blue-800">{userAnswers[question.id]}</p>
                            <button onClick={() => editAnswer(index)} className="text-sm text-blue-600 hover:underline">
                                Alterar
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Ações */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button
                    onClick={submitForm}
                    className="w-full sm:w-auto px-6 py-3 bg-blue-800 text-white font-montserrat rounded-md shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5"
                >
                    Finalizar e Enviar
                </button>
                <button
                    onClick={() => editAnswer(questions.length - 1)}
                    className="w-full sm:w-auto px-6 py-2 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors"
                >
                    Voltar
                </button>
            </div>
        </div>
    );


    return (
        <div className="min-h-screen bg-slate-50 font-lato">
            <Navbar />
            <main className="px-4">
                {currentScreen === 'intro' && renderIntroScreen()}
                {currentScreen === 'question' && renderQuestionScreen()}
                {currentScreen === 'review' && renderReviewScreen()}
            </main>
        </div>
    );
};

export default FormsScreen;
