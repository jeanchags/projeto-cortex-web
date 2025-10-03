import React from 'react';

/**
 * Componente de Paginação reutilizável.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.paginationInfo - Objeto com dados da paginação (currentPage, totalPages).
 * @param {function} props.onPageChange - Função callback para mudar de página.
 */
const Pagination = ({ paginationInfo, onPageChange }) => {
    const { currentPage, totalPages } = paginationInfo;

    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    // Lógica para não renderizar se houver apenas uma página
    if (totalPages <= 1) {
        return null;
    }

    return (
        <nav className="mt-8 flex items-center justify-center" aria-label="Paginação">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
                Anterior
            </button>

            {pageNumbers.map(number => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`-ml-px relative inline-flex items-center px-4 py-2 text-sm font-medium ${
                        currentPage === number
                            ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                            : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                    }`}
                >
                    {number}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="-ml-px relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:bg-gray-50 disabled:text-gray-300 disabled:cursor-not-allowed"
            >
                Próxima
            </button>
        </nav>
    );
};

export default Pagination;
