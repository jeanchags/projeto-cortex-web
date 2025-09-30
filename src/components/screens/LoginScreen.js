import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { authService } from "@/services/authService";

// Componentes de Ícones (SVG embutido para simplicidade)
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="form-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
);
const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="form-icon">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
);
const EmailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="form-icon">
        <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
    </svg>
);

// Ícone do Google como um componente React para melhor controle
const GoogleIcon = () => (
    <svg className="h-5 w-5" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M48 24C48 22.0427 47.8438 20.125 47.5469 18.25H24.4688V28.8281H37.8281C37.2656 31.8906 35.5312 34.5 32.9531 36.1719V42.5312H41.0156C45.3281 38.4844 48 31.8906 48 24Z" fill="#4285F4"/>
        <path d="M24.4688 48C30.9375 48 36.375 45.8906 40.0312 42.5312L32.9531 36.1719C30.9375 37.5 28.0781 38.4375 24.4688 38.4375C18.2344 38.4375 12.8906 34.3438 11.0156 28.5H2.625V35.0625C6.32812 42.7969 14.7188 48 24.4688 48Z" fill="#34A853"/>
        <path d="M11.0156 28.5C10.5 27.0469 10.2188 25.5 10.2188 24C10.2188 22.5 10.5 20.9531 11.0156 19.5L11.0156 12.9375H2.625C0.9375 16.2188 0 19.9688 0 24C0 28.0312 0.9375 31.7812 2.625 35.0625L11.0156 28.5Z" fill="#FBBC05"/>
        <path d="M24.4688 9.5625C27.5312 9.5625 30.1562 10.625 32.25 12.625L40.2188 4.65625C36.375 1.73438 30.9375 0 24.4688 0C14.7188 0 6.32812 5.20312 2.625 12.9375L11.0156 19.5C12.8906 13.6562 18.2344 9.5625 24.4688 9.5625Z" fill="#EA4335"/>
    </svg>
);

const CortexIcon = () => (
    <svg viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z" />
    </svg>
);

const LoginScreen = () => {
    const router = useRouter();
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    // Estados para o formulário de Login
    const [loginValues, setLoginValues] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLoading, setIsLoginLoading] = useState(false);

    // Estados para o formulário de Registro
    const [regValues, setRegValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [regError, setRegError] = useState(null);
    const [isRegLoading, setIsRegLoading] = useState(false);

    const handleLoginChange = (event) => {
        const { name, value } = event.target;
        setLoginValues(prev => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (event) => {
        const { name, value } = event.target;
        setRegValues(prev => ({ ...prev, [name]: value }));
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        setLoginError(null);
        setIsLoginLoading(true);
        try {
            const data = await authService.login({
                email: loginValues.email,
                password: loginValues.password,
            });

            authService.startSession(data);
            router.push('/dashboard');
        } catch (err) {
            setLoginError(err.message);
        } finally {
            setIsLoginLoading(false);
        }
    };

    const handleRegisterSubmit = async (event) => {
        event.preventDefault();
        setRegError(null);

        if (regValues.password !== regValues.confirmPassword) {
            setRegError('As senhas não coincidem.');
            return;
        }
        setIsRegLoading(true);
        try {
            await authService.register({
                name: regValues.name,
                email: regValues.email,
                password: regValues.password,
            });
            alert('Conta criada com sucesso! Por favor, faça o login para continuar.');
            setIsSignUpMode(false); // Volta para a tela de login
            setRegValues({ name: '', email: '', password: '', confirmPassword: '' });
        } catch (err) {
            setRegError(err.message);
        } finally {
            setIsRegLoading(false);
        }
    };

    return (
        <>
            <div className={`login-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        {/* Formulário de Login */}
                        <form onSubmit={handleLoginSubmit} className="sign-in-form">
                            <div className="logo">
                                <svg viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z" />
                                </svg>
                            </div>
                            <h2 className="title">Acesse sua conta</h2>
                            <div className="input-field">
                                <EmailIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={loginValues.email}
                                    onChange={handleLoginChange}
                                    required
                                    />
                            </div>
                            <div className="input-field">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    name="password"
                                    value={loginValues.password}
                                    onChange={handleLoginChange}
                                    required
                                />
                            </div>
                            {loginError && <p className="error-message">{loginError}</p>}
                            <button type="submit" className="btn solid" disabled={isLoginLoading}>
                                {isLoginLoading ? 'Entrando...' : 'Login'}
                            </button>
                            <div className="divider">
                                <span className="divider-line"></span>
                                <span className="divider-text">OU</span>
                                <span className="divider-line"></span>
                            </div>

                            <button type="button" className="google-btn">
                                <GoogleIcon />
                                <span>Entrar com Google</span>
                            </button>
                        </form>

                        {/* Formulário de Registro */}
                        <form onSubmit={handleRegisterSubmit} className="sign-up-form">
                            <div className="logo">
                                <svg viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z" />
                                </svg>
                            </div>
                            <h2 className="title">Crie sua conta</h2>
                            <div className="input-field">
                                <UserIcon />
                                <input
                                    type="text"
                                    placeholder="Nome Completo"
                                    name="name"
                                    value={regValues.name}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <EmailIcon />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    value={regValues.email}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Senha"
                                    name="password"
                                    value={regValues.password}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            <div className="input-field">
                                <LockIcon />
                                <input
                                    type="password"
                                    placeholder="Confirme a Senha"
                                    name="confirmPassword"
                                    value={regValues.confirmPassword}
                                    onChange={handleRegisterChange}
                                    required
                                />
                            </div>
                            {regError && <p className="error-message">{regError}</p>}
                            <button type="submit" className="btn" disabled={isRegLoading}>
                                {isRegLoading ? 'Registrando...' : 'Registrar'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Ainda não tem conta?</h3>
                            <p>
                                Comece sua jornada de insights hoje. Crie sua conta e desbloqueie o potencial dos seus dados.
                            </p>
                            <button className="btn transparent" onClick={() => setIsSignUpMode(true)}>
                                Crie agora
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/adamiqshan/animated-login-signup-page/main/img/log.svg" className="image" alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Já possui uma conta?</h3>
                            <p>
                                Foco no que importa: a evolução. Acesse sua conta para continuar de onde parou.
                            </p>
                            <button className="btn transparent" onClick={() => setIsSignUpMode(false)}>
                                Faça login
                            </button>
                        </div>
                        <img src="https://raw.githubusercontent.com/adamiqshan/animated-login-signup-page/main/img/register.svg" className="image" alt="" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }

                body,
                input {
                    font-family: 'Lato', sans-serif;
                }

                .logo {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin-bottom: 1rem;
                }

                .logo svg {
                    height: 48px;
                    width: 48px;
                    color: #004AAD; /* blue-800 */
                }

                .divider {
                    display: flex;
                    align-items: center;
                    text-align: center;
                    width: 100%;
                    max-width: 380px;
                    margin: 20px 0 15px;
                }

                .divider-line {
                    flex-grow: 1;
                    border-bottom: 1px solid #cbd5e1; /* slate-300 */
                }

                .divider-text {
                    padding: 0 10px;
                    color: #64748b; /* slate-500 */
                    font-size: 0.8rem;
                    font-weight: 700;
                    text-transform: uppercase;
                }

                /* Estilo Aprimorado para o Botão Google */
                .google-btn {
                    max-width: 380px;
                    width: 100%;
                    background-color: #ffffff;
                    color: #334155; /* slate-700 */
                    border: 1px solid #cbd5e1; /* slate-300 */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: 12px;
                    text-transform: none;
                    font-family: 'Lato', sans-serif;
                    font-weight: 700;
                    height: 49px;
                    border-radius: 49px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin: 0; /* Remove a margem herdada do .btn */
                }

                .google-btn:hover {
                    border-color: #94a3b8; /* slate-400 */
                    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
                }
                
                .login-container {
                    position: relative;
                    width: 100%;
                    min-height: 100vh;
                    background-color: #f8fafc;
                    overflow: hidden;
                }

                .login-container:before {
                    content: "";
                    position: absolute;
                    height: 2000px;
                    width: 2000px;
                    top: -10%;
                    right: 48%;
                    transform: translateY(-50%);
                    background-image: linear-gradient(-45deg, #004AAD 0%, #ECBE3C 100%);
                    transition: 1.8s ease-in-out;
                    border-radius: 50%;
                    z-index: 6;
                }

                .forms-container {
                    position: absolute;
                    width: 100%;
                    height: 100%;
                    top: 0;
                    left: 0;
                }

                .signin-signup {
                    position: absolute;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    left: 75%;
                    width: 50%;
                    transition: 1s 0.7s ease-in-out;
                    display: grid;
                    grid-template-columns: 1fr;
                    z-index: 5;
                }

                form {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-direction: column;
                    padding: 0rem 5rem;
                    transition: all 0.2s 0.7s;
                    overflow: hidden;
                    grid-column: 1 / 2;
                    grid-row: 1 / 2;
                }

                form.sign-up-form {
                    opacity: 0;
                    z-index: 1;
                }

                form.sign-in-form {
                    z-index: 2;
                }

                .title {
                    font-size: 2.2rem;
                    color: #444;
                    margin-bottom: 10px;
                    font-family: 'Montserrat', sans-serif;
                }

                .input-field {
                    max-width: 380px;
                    width: 100%;
                    background-color: #f0f0f0;
                    height: 55px;
                    margin: 10px 0;
                    border-radius: 55px;
                    display: grid;
                    grid-template-columns: 15% 85%;
                    padding: 0 0.4rem;
                    align-items: center;
                }
                
                .input-field .form-icon {
                    height: 1.5rem; /* 24px */
                    width: 1.5rem; /* 24px */
                    color: #acacac;
                    margin: 0 auto;
                }

                .input-field input {
                    background: none;
                    outline: none;
                    border: none;
                    line-height: 1;
                    font-weight: 600;
                    font-size: 1.1rem;
                    color: #333;
                }

                .input-field input::placeholder {
                    color: #aaa;
                    font-weight: 500;
                }

                .btn {
                    width: 100%;
                    max-width: 380px;
                    background-color: #004AAD;
                    border: none;
                    outline: none;
                    height: 49px;
                    border-radius: 49px;
                    color: #fff;
                    text-transform: uppercase;
                    font-weight: 600;
                    margin: 10px 0;
                    cursor: pointer;
                    transition: 0.5s;
                }

                .btn:hover {
                    background-color: #003a8c;
                }
                
                .btn:disabled {
                    background-color: #9ca3af;
                    cursor: not-allowed;
                }
                
                .error-message {
                    color: #ef4444; /* red-500 */
                    font-size: 0.875rem;
                    margin-top: 0.25rem;
                }

                .panels-container {
                    position: absolute;
                    height: 100%;
                    width: 100%;
                    top: 0;
                    left: 0;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                }

                .panel {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    justify-content: space-around;
                    text-align: center;
                    z-index: 6;
                    overflow: hidden;
                }

                .left-panel {
                    pointer-events: all;
                    padding: 3rem 17% 2rem 12%;
                }

                .right-panel {
                    pointer-events: none;
                    padding: 3rem 12% 2rem 17%;
                }

                .panel .content {
                    color: #fff;
                    transition: transform 0.9s ease-in-out;
                    transition-delay: 0.6s;
                }

                .panel h3 {
                    font-weight: 600;
                    line-height: 1;
                    font-size: 1.5rem;
                }

                .panel p {
                    font-size: 0.95rem;
                    padding: 0.7rem 0;
                }

                .btn.transparent {
                    margin: 0;
                    background: none;
                    border: 2px solid #fff;
                    width: 130px;
                    height: 41px;
                    font-weight: 600;
                    font-size: 0.8rem;
                }

                .image {
                    width: 100%;
                    transition: transform 1.1s ease-in-out;
                    transition-delay: 0.4s;
                }

                .right-panel .content,
                .right-panel .image {
                    transform: translateX(800px);
                }

                /* Animação com a classe sign-up-mode */
                .login-container.sign-up-mode:before {
                    transform: translate(100%, -50%);
                    right: 52%;
                }

                .login-container.sign-up-mode .left-panel .image,
                .login-container.sign-up-mode .left-panel .content {
                    transform: translateX(-800px);
                }

                .login-container.sign-up-mode .signin-signup {
                    left: 25%;
                }

                .login-container.sign-up-mode form.sign-up-form {
                    opacity: 1;
                    z-index: 2;
                }

                .login-container.sign-up-mode form.sign-in-form {
                    opacity: 0;
                    z-index: 1;
                }

                .login-container.sign-up-mode .right-panel .image,
                .login-container.sign-up-mode .right-panel .content {
                    transform: translateX(0%);
                }

                .login-container.sign-up-mode .left-panel {
                    pointer-events: none;
                }

                .login-container.sign-up-mode .right-panel {
                    pointer-events: all;
                }

                /* Media Queries para Responsividade */
                @media (max-width: 870px) {
                    .login-container {
                        min-height: 800px;
                        height: 100vh;
                    }
                    .signin-signup {
                        width: 100%;
                        top: 95%;
                        transform: translate(-50%, -100%);
                        transition: 1s 0.8s ease-in-out;
                    }
                    .signin-signup,
                    .login-container.sign-up-mode .signin-signup {
                        left: 50%;
                    }
                    .panels-container {
                        grid-template-columns: 1fr;
                        grid-template-rows: 1fr 2fr 1fr;
                    }
                    .panel {
                        flex-direction: row;
                        justify-content: space-around;
                        align-items: center;
                        padding: 2.5rem 8%;
                        grid-column: 1 / 2;
                    }
                    .right-panel {
                        grid-row: 3 / 4;
                    }
                    .left-panel {
                        grid-row: 1 / 2;
                    }
                    .image {
                        width: 200px;
                        transition: transform 0.9s ease-in-out;
                        transition-delay: 0.6s;
                    }
                    .panel .content {
                        padding-right: 15%;
                        transition: transform 0.9s ease-in-out;
                        transition-delay: 0.8s;
                    }
                    .panel h3 {
                        font-size: 1.2rem;
                    }
                    .panel p {
                        font-size: 0.7rem;
                        padding: 0.5rem 0;
                    }
                    .btn.transparent {
                        width: 110px;
                        height: 35px;
                        font-size: 0.7rem;
                    }
                    .login-container:before {
                        width: 1500px;
                        height: 1500px;
                        transform: translateX(-50%);
                        left: 30%;
                        bottom: 68%;
                        right: initial;
                        top: initial;
                        transition: 2s ease-in-out;
                    }
                    .login-container.sign-up-mode:before {
                        transform: translate(-50%, 100%);
                        bottom: 32%;
                        right: initial;
                    }
                    .login-container.sign-up-mode .left-panel .image,
                    .login-container.sign-up-mode .left-panel .content {
                        transform: translateY(-300px);
                    }
                    .login-container.sign-up-mode .right-panel .image,
                    .login-container.sign-up-mode .right-panel .content {
                        transform: translateY(0px);
                    }
                    .right-panel .image,
                    .right-panel .content {
                        transform: translateY(300px);
                    }
                    .login-container.sign-up-mode .signin-signup {
                        top: 5%;
                        transform: translate(-50%, 0);
                    }
                }
                @media (max-width: 570px) {
                    form {
                        padding: 0 1.5rem;
                    }
                    .image {
                        display: none;
                    }
                    .panel .content {
                        padding: 0.5rem 1rem;
                    }
                    .login-container {
                        padding: 1.5rem;
                    }
                    .login-container:before {
                        bottom: 72%;
                        left: 50%;
                    }
                    .login-container.sign-up-mode:before {
                        bottom: 28%;
                        left: 50%;
                    }
                }
            `}
            </style>
        </>
    );
};

export default LoginScreen;
