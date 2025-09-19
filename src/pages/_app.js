import '@/styles/globals.css';

/**
 * Este é o componente raiz da aplicação.
 * É usado para inicializar páginas e é o lugar ideal para
 * importar estilos globais.
 */
function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

export default MyApp;
