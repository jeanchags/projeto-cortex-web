/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    async rewrites() {
        return [
            {
                source: '/api/:path*', // Captura todas as rotas que começam com /api
                destination: `${process.env.NEXT_PUBLIC_API_PROXY_URL}:${process.env.NEXT_PUBLIC_API_PORT}/api/:path*`, // E as redireciona para a sua API na porta 5000
            },
        ];
    },
};

module.exports = nextConfig;
