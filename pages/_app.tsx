import { AppProps } from 'next/app';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { useEffect, useState } from 'react';
import { appWithTranslation } from 'next-i18next';
import MainLayout from '../components/Layout/MainLayout';
import NoHeaderFooterLayout from '../components/Layout/NoHeaderFooterLayout';
import { lightTheme, darkTheme } from '../styles/theme';
import '../styles/globals.scss';
import '../styles/theme.scss';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedMode = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', mode);
    document.body.classList.remove(mode === 'light' ? 'dark-theme' : 'light-theme');
    document.body.classList.add(mode + '-theme');
  }, [mode]);

  const handleThemeChange = (newMode: 'light' | 'dark') => {
    setMode(newMode);
  };

  const theme = createTheme(mode === 'light' ? lightTheme : darkTheme);

  const getLayout = (Component as any).getLayout || ((page: React.ReactNode) => <MainLayout handleThemeChange={handleThemeChange}>{page}</MainLayout>);

  if ((Component as any).useNoHeaderFooterLayout) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NoHeaderFooterLayout>
          <Component {...pageProps} handleThemeChange={handleThemeChange} />
        </NoHeaderFooterLayout>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {getLayout(<Component {...pageProps} handleThemeChange={handleThemeChange} />)}
    </ThemeProvider>
  );
};

export default appWithTranslation(MyApp);
