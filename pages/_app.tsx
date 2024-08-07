import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import { Provider } from 'react-redux';
import MainLayout from '../components/Layout/MainLayout';
import NoHeaderFooterLayout from '../components/Layout/NoHeaderFooterLayout';
import { lightTheme, darkTheme } from '../styles/theme';
import Loader from '../components/Loader/Loader';
import store from '../redux/store';
import '../styles/globals.scss';
import '../styles/theme.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.body.classList.remove(mode === 'light' ? 'dark-theme' : 'light-theme');
    document.body.classList.add(mode + '-theme');
  }, [mode]);

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setLoading(true);
    };
    const handleRouteChangeComplete = () => {
      setLoading(false);
    };
    const handleRouteChangeError = () => {
      setLoading(false);
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  const handleThemeChange = (newMode: 'light' | 'dark') => {
    setMode(newMode);
  };

  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme);

  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => <MainLayout handleThemeChange={handleThemeChange}>{page}</MainLayout>);

  if ((Component as any).useNoHeaderFooterLayout) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Provider store={store}>
          {loading && <Loader />}
          <NoHeaderFooterLayout>
            <Component {...pageProps} handleThemeChange={handleThemeChange} />
          </NoHeaderFooterLayout>
        </Provider>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        {loading && <Loader />}
        {getLayout(<Component {...pageProps} handleThemeChange={handleThemeChange} />)}
      </Provider>
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
