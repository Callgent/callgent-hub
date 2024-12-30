import { ThemeProvider } from 'next-themes';
import Header from '@/components/header';
import Footer from '@/components/footer';
import AppRouter from '@/router';
import { BrowserRouter } from 'react-router-dom';
import MessageToast from '@/components/message';

export function Layout() {
    return (
        <BrowserRouter>
            <ThemeProvider attribute="class" enableSystem={true} >
                <Header />
                <AppRouter />
                <Footer />
                <MessageToast />
            </ThemeProvider>
        </BrowserRouter>
    );
}
