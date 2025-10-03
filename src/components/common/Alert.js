import React, { useState, useEffect } from 'react';

// --- Ícones para cada tipo de alerta ---
const icons = {
    success: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    error: ( // Mapeado de 'danger'
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
    warning: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
    ),
    info: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
    ),
};

// --- Estilos de cor para cada tipo ---
const typeClasses = {
    success: 'bg-green-100 border-green-400 text-green-700',
    error: 'bg-red-100 border-red-400 text-red-700',
    warning: 'bg-yellow-100 border-yellow-400 text-yellow-700',
    info: 'bg-blue-100 border-blue-400 text-blue-700',
};


/**
 * Componente de Alerta Reutilizável e Estilizado
 * Exibe uma mensagem com base no tipo (success, error, warning, info).
 * O alerta desaparece automaticamente após um tempo ou pode ser fechado pelo usuário.
 *
 * @param {object} props - Propriedades do componente.
 * @param {string} props.message - A mensagem a ser exibida.
 * @param {string} [props.type='info'] - O tipo de alerta ('success', 'error', 'warning', 'info').
 * @param {function} props.onClose - Função de callback para fechar o alerta.
 */
const Alert = ({ message, type = 'info', onClose }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => {
                handleClose();
            }, 5000); // Fecha automaticamente após 5 segundos
            return () => clearTimeout(timer);
        } else {
            setVisible(false);
        }
    }, [message, type]); // Re-executa o efeito se a mensagem ou o tipo mudarem

    const handleClose = () => {
        setVisible(false);
        // Aguarda a animação de saída antes de chamar o onClose
        setTimeout(() => {
            if (onClose) {
                onClose();
            }
        }, 300);
    };

    if (!message) {
        return null;
    }

    // Seleciona o ícone e a classe de cor com base no tipo, com fallback para 'info'
    const selectedIcon = icons[type] || icons.info;
    const selectedClasses = typeClasses[type] || typeClasses.info;

    const finalClasses = `fixed top-5 right-5 max-w-sm w-full p-4 rounded-lg border shadow-lg flex items-center gap-4 z-50 transition-all duration-300 ease-in-out ${selectedClasses} ${visible ? 'transform translate-x-0 opacity-100' : 'transform translate-x-full opacity-0'}`;

    return (
        <div className={finalClasses} role="alert">
            <div className="flex-shrink-0">
                {selectedIcon}
            </div>
            <div className="flex-grow font-medium">
                {message}
            </div>
            <button onClick={handleClose} className="ml-4 flex-shrink-0" aria-label="Fechar">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
        </div>
    );
};

export default Alert;
