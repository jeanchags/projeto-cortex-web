import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext'; // Importe o AuthProvider

function MyApp({ Component, pageProps }) {
    return (
        // Envolva o Component com o AuthProvider
        <AuthProvider>
            <Component {...pageProps} />
        </AuthProvider>
    );
}

export default MyApp;
