/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    async rewrites() {
        return [
            {
                source: '/api/:path*', // Captura todas as rotas que começam com /api
                destination: 'http://projeto-cortex-api:5000/api/:path*', // E as redireciona para a sua API na porta 5000
            },
        ];
    },
};

module.exports = nextConfig;
