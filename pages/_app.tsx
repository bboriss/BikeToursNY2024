import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation } from 'next-i18next';
import Head from 'next/head';
import { Provider } from 'react-redux';
import MainLayout from '../components/Layout/MainLayout';
import { lightTheme, darkTheme } from '../styles/theme';
import Loader from '../components/Loader/Loader';
import store from '../redux/store';
import { useAppDispatch } from '../redux/hooks';
import { verifyTokenAndRefresh } from '../utils/authUtils';
import 'leaflet/dist/leaflet.css';
import '../styles/globals.scss';
import '../styles/theme.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark' || 'dark';
    setMode(savedMode);
  }, []);

  useEffect(() => {
    if (mode) {
      localStorage.setItem('theme', mode);
      document.body.classList.remove(mode === 'light' ? 'dark-theme' : 'light-theme');
      document.body.classList.add(mode + '-theme');
    }
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

  if (mode === null) {
    return <Loader />; // Or any fallback content until the theme is loaded
  }

  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => <MainLayout handleThemeChange={handleThemeChange}>{page}</MainLayout>);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <Head>
          <title>BikeToursNewYork</title>
          <meta name="description" content="Discover the best bike tours in New York!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <StartupActions>
          {loading && <Loader />}
          {getLayout(<Component {...pageProps} handleThemeChange={handleThemeChange} />)}
        </StartupActions>
      </Provider>
    </ThemeProvider>
  );
};

const StartupActions = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    verifyTokenAndRefresh(dispatch);
  }, [dispatch]);

  return <>{children}</>;
};

export default appWithTranslation(MyApp);
