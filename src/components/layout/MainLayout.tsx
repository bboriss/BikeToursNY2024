import React from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';
import HeaderDesktop from '../Header/HeaderDesktop';
import HeaderMobile from '../Header/HeaderMobile';
import Footer from '../Footer/Footer';

interface MainLayoutProps {
  children: React.ReactNode;
  handleThemeChange: (newMode: 'light' | 'dark') => void;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, handleThemeChange}) => {
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div>
      {isMobile ? <HeaderMobile handleThemeChange={handleThemeChange}/> : <HeaderDesktop />}
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
