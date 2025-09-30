import '@/styles/globals.css';
import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }) {

    const { user, ...restPageProps } = pageProps;

    return (

        <AuthProvider pageUser={user}>
            <Component {...restPageProps} />
        </AuthProvider>
    );
}

export default MyApp;
