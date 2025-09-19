/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                'lato': ['Lato', 'sans-serif'],
                'montserrat': ['Montserrat', 'sans-serif'],
            },
            colors: {
                'blue-800': '#004AAD', // Azul Sereno
                'yellow-400': '#ECBE3C', // Amarelo Vivo
            }
        },
    },
    plugins: [],
}
