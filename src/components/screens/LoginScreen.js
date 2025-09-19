import React from 'react';

/**
 * Componente LoginScreen
 * Renderiza a interface de usuário para a tela de login.
 * Esta versão é uma réplica fiel do protótipo e do documento de handoff de design,
 * implementando o layout de tela dividida e todos os elementos visuais especificados.
 */
const LoginScreen = () => {
    return (
        <>
            {/* Estilos para a animação do gradiente, replicados do protótipo */}
            <style>
                {`
          .art-panel {
            background: linear-gradient(135deg, #004AAD, #3b82f6, #ECBE3C);
            background-size: 200% 200%;
            animation: gradient-animation 10s ease infinite;
          }
          @keyframes gradient-animation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
            </style>

            <div id="login-screen" className="min-h-screen bg-slate-50">
                <div className="lg:grid lg:grid-cols-2 min-h-screen">

                    {/* Painel Artístico (visível apenas em telas grandes) */}
                    <div className="art-panel hidden lg:flex flex-col items-center justify-center text-white p-12 text-center">
                        <svg className="h-16 w-16 mb-6" viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z" />
                        </svg>
                        <h1 className="text-4xl font-montserrat leading-tight">
                            Bem-vindo(a) ao Cortex
                        </h1>
                        <p className="mt-4 text-lg opacity-80 max-w-sm">
                            A plataforma que transforma dados em desenvolvimento com serenidade digital.
                        </p>
                    </div>

                    {/* Painel do Formulário de Login */}
                    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-md w-full space-y-8">

                            {/* Cabeçalho do formulário */}
                            <div className="text-center">
                                <svg className="mx-auto h-12 w-12 text-blue-800 lg:hidden" viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z" />
                                </svg>
                                <h1 className="mt-4 text-3xl font-montserrat text-gray-900">
                                    Acesse sua conta
                                </h1>
                                <p className="mt-2 text-gray-600 font-lato">
                                    Foco no que importa: a evolução.
                                </p>
                            </div>

                            {/* Card do Formulário */}
                            <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-xl">
                                {/* Inputs de E-mail e Senha */}
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <div>
                                        <input id="email-address" name="email" type="email" autoComplete="email" required
                                               className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent sm:text-sm font-lato"
                                               placeholder="E-mail"
                                        />
                                    </div>
                                    <div>
                                        <input id="password" name="password" type="password" autoComplete="current-password" required
                                               className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent sm:text-sm font-lato"
                                               placeholder="Senha"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end">
                                    <div className="text-sm">
                                        <a href="#" className="font-medium text-blue-800 hover:text-blue-700 font-lato">
                                            Esqueceu sua senha?
                                        </a>
                                    </div>
                                </div>

                                {/* Botão de Entrar */}
                                <div>
                                    <button type="button" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 font-montserrat transition-colors duration-300">
                                        Entrar
                                    </button>
                                </div>

                                {/* Divisor "ou" */}
                                <div className="relative flex py-2 items-center">
                                    <div className="flex-grow border-t border-gray-200"></div>
                                    <span className="flex-shrink mx-4 text-gray-400 text-xs font-lato">ou</span>
                                    <div className="flex-grow border-t border-gray-200"></div>
                                </div>

                                {/* Botão de Entrar com Google */}
                                <div>
                                    <button type="button" className="group relative w-full flex justify-center py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                                        <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M47.52 24.54C47.52 22.86 47.34 21.24 47.04 19.68H24V28.32H37.44C36.84 31.44 35.16 34.08 32.64 35.82V41.22H40.2C44.88 36.96 47.52 31.14 47.52 24.54Z" fill="#4285F4"/><path d="M24 48C30.48 48 35.88 45.84 40.2 41.22L32.64 35.82C30.36 37.44 27.36 38.4 24 38.4C17.64 38.4 12.24 34.32 10.32 28.8H2.4V34.32C6.6 42.66 14.64 48 24 48Z" fill="#34A853"/><path d="M10.32 28.8C9.96 27.66 9.72 26.46 9.72 25.2C9.72 23.94 9.96 22.74 10.32 21.6L2.4 16.08C0.84 19.14 0 22.08 0 25.2C0 28.32 0.84 31.26 2.4 34.32L10.32 28.8Z" fill="#FBBC05"/><path d="M24 9.6C27.6 9.6 30.72 10.8 33.12 12.96L40.44 5.64C36 1.92 30.48 0 24 0C14.64 0 6.6 5.34 2.4 13.68L10.32 19.2C12.24 13.68 17.64 9.6 24 9.6Z" fill="#EA4335"/></svg>
                                        Entrar com Google
                                    </button>
                                </div>
                            </div>

                            {/* Link para Criar Conta */}
                            <p className="text-center text-sm text-gray-600 font-lato">
                                Ainda não tem conta? <a href="#" className="font-medium text-blue-800 hover:text-blue-700">Crie agora</a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default LoginScreen;
