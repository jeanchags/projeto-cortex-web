// src/components/screens/DiagnosticFormScreen.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getFormById } from '@/services/formService';
import Navbar from '../layout/Navbar';
import Alert from '@/components/common/Alert';

/**
 * Componente DiagnosticFormScreen (Tarefa FE-12)
 * Busca e renderiza dinamicamente um formulário de diagnóstico a partir da API,
 * gerencia o estado das respostas e prepara para submissão.
 */
const DiagnosticFormScreen = () => {
    const router = useRouter();
    const { formId } = router.query; // Obtém o ID do formulário da URL, futuramente

    // Estados para os dados do formulário e controle de UI
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para armazenar as respostas do usuário { questionId: optionId }
    const [answers, setAnswers] = useState({});

    useEffect(() => {
        // Usa um ID mockado enquanto a navegação não passa o ID real
        const idToFetch = formId || 'form-01';

        const fetchForm = async () => {
            try {
                setLoading(true);
                setError(null);
                const formData = await getFormById(idToFetch);
                setForm(formData);
            } catch (err) {
                setError(err.message || 'Não foi possível carregar o formulário. Tente novamente.');
            } finally {
                setLoading(false);
            }
        };

        fetchForm();
    }, [formId]);

    /**
     * Atualiza o estado 'answers' quando o usuário seleciona uma opção.
     * @param {string} questionId - O ID da pergunta.
     * @param {string} optionId - O ID da opção selecionada.
     */
    const handleAnswerChange = (questionId, optionId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    /**
     * Lida com a submissão do formulário.
     * @param {React.FormEvent} e - O evento de submissão.
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Respostas Finais:", answers);
        // A lógica de envio para a API (POST /submissions) será implementada na tarefa FE-13.
    };

    // Verifica se todas as perguntas foram respondidas para habilitar o botão
    const allQuestionsAnswered = form && Object.keys(answers).length === form.questions.length;

    // --- Renderização Condicional ---

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <div className="max-w-2xl mx-auto my-12 p-8">
                    {/* Skeleton Loader */}
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-300 rounded w-3/4 mb-10"></div>
                        <div className="space-y-8">
                            {[...Array(3)].map((_, i) => (
                                <div key={i}>
                                    <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
                                    <div className="space-y-3">
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Navbar />
                <main className="max-w-2xl mx-auto py-12 px-4">
                    <Alert message={error} type="error" onClose={() => setError(null)} />
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 font-lato">
            <Navbar />
            <main className="max-w-2xl mx-auto py-12 px-4">
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8">
                    {/* Cabeçalho do Formulário */}
                    <div className="text-center border-b border-gray-200 pb-6 mb-8">
                        <h1 className="text-2xl font-montserrat text-blue-800">{form?.title}</h1>
                        <p className="text-gray-600 mt-2">
                            Selecione a opção que melhor descreve cada situação.
                        </p>
                    </div>

                    {/* Renderização Dinâmica das Questões */}
                    <div className="space-y-8">
                        {form?.questions.map((question, index) => (
                            <fieldset key={question.id} className="border-t border-gray-100 pt-6 first:border-t-0 first:pt-0">
                                <legend className="text-lg text-gray-800 font-semibold mb-4">
                                    <span className="text-blue-800 font-bold mr-2">{index + 1}.</span>
                                    {question.text}
                                </legend>
                                <div className="space-y-3">
                                    {question.options.map((option) => (
                                        <label
                                            key={option.id}
                                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                                                answers[question.id] === option.id
                                                    ? 'border-blue-800 bg-blue-50 ring-2 ring-blue-300'
                                                    : 'border-gray-200 hover:border-blue-500'
                                            }`}
                                        >
                                            <input
                                                type="radio"
                                                name={question.id}
                                                value={option.id}
                                                checked={answers[question.id] === option.id}
                                                onChange={() => handleAnswerChange(question.id, option.id)}
                                                className="h-4 w-4 text-blue-800 focus:ring-blue-500 border-gray-300"
                                            />
                                            <span className="ml-3 text-gray-700">{option.text}</span>
                                        </label>
                                    ))}
                                </div>
                            </fieldset>
                        ))}
                    </div>

                    {/* Botão de Submissão */}
                    <div className="mt-10 pt-6 border-t border-gray-200">
                        <button
                            type="submit"
                            disabled={!allQuestionsAnswered}
                            className="w-full px-6 py-4 bg-blue-800 text-white font-montserrat rounded-md shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none"
                        >
                            Finalizar e Gerar Relatório
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default DiagnosticFormScreen;
