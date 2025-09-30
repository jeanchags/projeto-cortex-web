import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { generateColorFromString } from '@/utils/colorUtils';


/**
 * Componente de Navegação Principal
 * Renderiza o cabeçalho da aplicação com logo, links de navegação e menu de usuário.
 * @param {object} props - Propriedades do componente.
 * @param {boolean} [props.hideOnPrint=false] - Se verdadeiro, oculta a navbar na impressão.
 */
const Navbar = ({ hideOnPrint = false }) => {
    // Estado para controlar a visibilidade do dropdown do perfil
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();
    const { user } = useAuth();

    /**
     * Alterna a visibilidade do dropdown do perfil.
     */
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    /**
     * Efeito para fechar o dropdown se o usuário clicar fora dele.
     */
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };
        // Adiciona o listener quando o dropdown está aberto
        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        // Remove o listener ao limpar o efeito
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen]);

    const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : '?';
    const avatarBackgroundColor = generateColorFromString(user?.name || '');


    return (
        <nav className={`bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-20 ${hideOnPrint ? 'print:hidden' : ''}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/dashboard" className="flex items-center cursor-pointer">
                        <svg className="h-8 w-8 text-blue-800" viewBox="0 0 28 32" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 0L27.8564 8V24L14 32L0.143594 24V8L14 0Z" />
                        </svg>
                        <span className="font-montserrat text-xl ml-2 text-gray-800">Cortex</span>
                    </Link>

                    {/* Links do Menu */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link href="/forms" className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Formulários
                            </Link>
                            <Link href="/reports" className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Relatórios
                            </Link>
                            {/* Rota 'Assinatura' não existe ainda, então usamos '#' */}
                            <a href="#" className="text-gray-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Assinatura
                            </a>
                        </div>
                    </div>

                                       {/* Avatar do Usuário e Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={toggleDropdown} className="flex items-center focus:outline-none">
                            {user ? (
                                <div
                                    className="h-9 w-9 rounded-full ring-2 ring-offset-2 ring-blue-800 flex items-center justify-center text-white font-bold"
                                    style={{ backgroundColor: avatarBackgroundColor }}
                                >
                                    {userInitial}
                                </div>
                            ) : (
                                <div className="h-9 w-9 rounded-full bg-gray-200 animate-pulse"></div>
                            )}
                        </button>

                        {/* Menu Dropdown */}
                        {isDropdownOpen && user && ( // Só mostra o dropdown se o usuário existir
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-30 ring-1 ring-black ring-opacity-5">
                                <div className="px-4 py-2 text-sm text-gray-700">
                                    <p className="font-semibold">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                                <div className="border-t border-gray-100"></div>
                                <Link href="/logout" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                                    Sair
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
