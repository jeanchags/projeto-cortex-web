// src/components/screens/DiagnosticFormScreen.js

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
// Importa o novo serviço de submissão
import { getFormById, submitFormAnswers } from '@/services/formService';
import Navbar from '../layout/Navbar';
import Alert from '@/components/common/Alert';

/**
 * Componente DiagnosticFormScreen (Tarefa FE-12 e FE-13)
 * Busca e renderiza dinamicamente um formulário, gerencia o estado das respostas,
 * e lida com a submissão para a API, incluindo estados de loading e erro.
 */
const DiagnosticFormScreen = () => {
    const router = useRouter();
    // Obtém o ID do formulário e do perfil da URL
    const { formId, profileId } = router.query;

    // Estados para os dados do formulário e controle de UI
    const [form, setForm] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Estado para armazenar as respostas do usuário { questionId: optionId }
    const [answers, setAnswers] = useState({});

    // *** NOVOS ESTADOS para gerenciar o processo de submissão ***
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionError, setSubmissionError] = useState(null);


    useEffect(() => {
        // Usa um ID mockado se não vier da URL, para desenvolvimento
        const idToFetch = formId || 'form-01';

        if(router.isReady) { // Garante que os query params estão disponíveis
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
        }
    }, [formId, router.isReady]);

    /**
     * Atualiza o estado 'answers' quando o usuário seleciona uma opção.
     */
    const handleAnswerChange = (questionId, optionId) => {
        setAnswers(prevAnswers => ({
            ...prevAnswers,
            [questionId]: optionId,
        }));
    };

    /**
     * Lida com a submissão do formulário.
     */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmissionError(null);

        // Monta o payload conforme a especificação
        const payload = {
            profileId: profileId || "PROFILE_ID_MOCK", // Usa ID mock se não vier da URL
            formId: form.id,
            formVersion: form.version,
            answers: answers,
        };

        try {
            // Chama a função do serviço para enviar os dados
            const result = await submitFormAnswers(payload);

            // Redireciona para a tela do relatório recém-gerado
            // O ID do relatório virá da resposta da API (ex: result.reportId)
            router.push(`/reports/${result.reportId}`);

        } catch (err) {
            // Define a mensagem de erro para ser exibida no Alert
            setSubmissionError(err.message || 'Ocorreu um erro inesperado. Tente novamente.');
        } finally {
            // Garante que o estado de 'submitting' seja resetado
            setIsSubmitting(false);
        }
    };

    // Verifica se todas as perguntas foram respondidas
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
                {/* *** NOVO: Alerta para erros de submissão *** */}
                <Alert
                    message={submissionError}
                    type="error"
                    onClose={() => setSubmissionError(null)}
                />

                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-8 mt-4">
                    <div className="text-center border-b border-gray-200 pb-6 mb-8">
                        <h1 className="text-2xl font-montserrat text-blue-800">{form?.title}</h1>
                        <p className="text-gray-600 mt-2">
                            Selecione a opção que melhor descreve cada situação.
                        </p>
                    </div>

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

                    <div className="mt-10 pt-6 border-t border-gray-200">
                        {/* *** BOTÃO DE SUBMISSÃO ATUALIZADO *** */}
                        <button
                            type="submit"
                            disabled={!allQuestionsAnswered || isSubmitting}
                            className="w-full px-6 py-4 bg-blue-800 text-white font-montserrat rounded-md shadow-md transition-all hover:bg-blue-900 hover:-translate-y-0.5 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
                        >
                            {isSubmitting && (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            {isSubmitting ? 'Enviando...' : 'Finalizar e Gerar Relatório'}
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default DiagnosticFormScreen;
