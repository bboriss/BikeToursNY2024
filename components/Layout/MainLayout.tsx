import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderDesktop from '../Header/HeaderDesktop';
import HeaderMobile from '../Header/HeaderMobile';
import Footer from '../Footer/Footer';
import styles from './MainLayout.module.scss';

interface MainLayoutProps {
  children: React.ReactNode;
  handleThemeChange: (newMode: 'light' | 'dark') => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, handleThemeChange }) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className={styles.layout}>
      {isMobile ? <HeaderMobile handleThemeChange={handleThemeChange}/> : <HeaderDesktop handleThemeChange={handleThemeChange}/>}
      <main className={styles.mainContent}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
