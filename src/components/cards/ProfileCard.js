import React from 'react';
import Link from 'next/link';

/**
 * Componente ProfileCard
 * Exibe um card individual de perfil com link para os formulários.
 * @param {object} props - Propriedades do componente.
 * @param {object} props.profile - O objeto de dados do perfil vindo da API.
 */
const ProfileCard = ({ profile }) => {
    // Formata a data para o padrão brasileiro.
    const lastUpdateDate = new Date(profile.lastUpdate).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    return (
        <Link
            href={`/forms?profileId=${profile.id}`}
            className="cursor-pointer bg-white rounded-lg shadow-md p-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all"
        >
            <div>
                <div className="flex items-center justify-between">
                    <h3 className="text-lg font-montserrat text-blue-800 truncate" title={profile.fullName}>
                        {profile.fullName}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-semibold">
                        ATIVO
                    </span>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                    Atualizado em: {lastUpdateDate}
                </p>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600">0 formulários preenchidos.</p>
            </div>
        </Link>
    );
};

export default ProfileCard;