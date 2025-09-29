import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image'; // Usando o componente Image do Next.js para otimização
import { authService } from "@/services/authService";

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

const LoginScreen = () => {
    const router = useRouter();
    const [isSignUpMode, setIsSignUpMode] = useState(false);

    // Estado unificado para os formulários para simplificar o gerenciamento
    const [loginValues, setLoginValues] = useState({ email: '', password: '' });
    const [regValues, setRegValues] = useState({ name: '', email: '', password: '', confirmPassword: '' });

    // Estados para feedback ao usuário (erros e carregamento)
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLoginChange = (e) => {
        setError(''); // Limpa o erro ao digitar
        setLoginValues({ ...loginValues, [e.target.name]: e.target.value });
    };

    const handleRegisterChange = (e) => {
        setError(''); // Limpa o erro ao digitar
        setRegValues({ ...regValues, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await authService.login({
                email: loginValues.email,
                password: loginValues.password,
            });
            router.push('/dashboard');
        } catch (err) {
            setError(err.message || 'Falha no login. Verifique suas credenciais.');
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        if (regValues.password !== regValues.confirmPassword) {
            setError('As senhas não coincidem.');
            return;
        }
        setLoading(true);
        setError('');
        try {
            await authService.register({
                name: regValues.name,
                email: regValues.email,
                password: regValues.password,
            });
            alert('Conta criada com sucesso! Por favor, faça o login para continuar.');
            setIsSignUpMode(false);
            // Limpa os formulários para segurança e usabilidade
            setRegValues({ name: '', email: '', password: '', confirmPassword: '' });
            setLoginValues({ email: regValues.email, password: '' }); // Preenche o e-mail no login
        } catch (err) {
            setError(err.message || 'Não foi possível registrar. Tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className={`login-container ${isSignUpMode ? "sign-up-mode" : ""}`}>
                <div className="forms-container">
                    <div className="signin-signup">
                        <form onSubmit={handleLoginSubmit} className="sign-in-form">
                            <h2 className="title">Faça seu login</h2>
                            <div className="input-field">
                                <UserIcon />
                                <input type="email" placeholder="Email" name="email" value={loginValues.email} onChange={handleLoginChange} required />
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
                            {error && !isSignUpMode && <p className="error-message">{error}</p>}
                            <button type="submit" className="btn solid" disabled={loading}>
                                {loading && !isSignUpMode ? 'Entrando...' : 'Login'}
                            </button>
                        </form>

                        <form onSubmit={handleRegisterSubmit} className="sign-up-form">
                            <h2 className="title">Crie sua conta</h2>
                            <div className="input-field">
                                <UserIcon />
                                <input type="text" placeholder="Nome Completo" name="name" value={regValues.name} onChange={handleRegisterChange} required />
                            </div>
                            <div className="input-field">
                                <EmailIcon />
                                <input type="email" placeholder="Email" name="email" value={regValues.email} onChange={handleRegisterChange} required />
                            </div>
                            <div className="input-field">
                                <LockIcon />
                                <input type="password" placeholder="Senha" name="password" value={regValues.password} onChange={handleRegisterChange} required minLength="6" />
                            </div>
                            <div className="input-field">
                                <LockIcon />
                                <input type="password" placeholder="Confirme a Senha" name="confirmPassword" value={regValues.confirmPassword} onChange={handleRegisterChange} required />
                            </div>
                            {error && isSignUpMode && <p className="error-message">{error}</p>}
                            <button type="submit" className="btn" disabled={loading}>
                                {loading && isSignUpMode ? 'Criando...' : 'Criar Conta'}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>Ainda não tem conta?</h3>
                            <p>Comece sua jornada de insights hoje. Crie sua conta e desbloqueie o potencial dos seus dados.</p>
                            <button className="btn transparent" onClick={() => { setIsSignUpMode(true); setError(''); }}>
                                Crie agora
                            </button>
                        </div>
                        <Image src="https://raw.githubusercontent.com/adamiqshan/animated-login-signup-page/main/img/log.svg" width={400} height={400} className="image" alt="Login illustration" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Já possui uma conta?</h3>
                            <p>Foco no que importa: a evolução. Acesse sua conta para continuar de onde parou.</p>
                            <button className="btn transparent" onClick={() => { setIsSignUpMode(false); setError(''); }}>
                                Faça login
                            </button>
                        </div>
                        <Image src="https://raw.githubusercontent.com/adamiqshan/animated-login-signup-page/main/img/register.svg" width={400} height={400} className="image" alt="Register illustration" />
                    </div>
                </div>
            </div>

            <style jsx global>{`
                /* Estilos Globais para a página de Login - para evitar conflitos, usei um container com classe específica */
                .login-container {
                    position: relative;
                    width: 100%;
                    background-color: #fff;
                    min-height: 100vh;
                    overflow: hidden;
                    font-family: 'Lato', sans-serif;
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
                    margin: 10px 0;
                    height: 55px;
                    border-radius: 55px;
                    display: grid;
                    grid-template-columns: 15% 85%;
                    padding: 0 0.4rem;
                    position: relative;
                }

                .input-field .form-icon {
                    text-align: center;
                    line-height: 55px;
                    color: #acacac;
                    transition: 0.5s;
                    font-size: 1.1rem;
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
                    width: 150px;
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
                    background-color: #cccccc;
                    cursor: not-allowed;
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

                .image {
                    width: 100%;
                    transition: transform 1.1s ease-in-out;
                    transition-delay: 0.4s;
                }
                
                .error-message {
                    color: #ef4444; /* red-500 */
                    font-size: 0.875rem;
                    margin-top: 5px;
                    max-width: 380px;
                    text-align: center;
                }

                /* Animação */
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

                @media (max-width: 870px) {
                  /* Estilos responsivos... */
                }
            `}
            </style>
        </>
    );
};

export default LoginScreen;
