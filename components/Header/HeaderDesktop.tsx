import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import PersonIcon from '@mui/icons-material/Person';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import PublicIcon from '@mui/icons-material/Public';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import Flag from 'react-world-flags';
import styles from './HeaderDesktop.module.scss';
import { changeLanguageAndRoute } from '../../utils/languageUtils';
import { toggleTheme } from '../../utils/themeUtils';
import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import { logout } from '../../redux/slices/authSlice';

interface HeaderDesktopProps {
  handleThemeChange: (newMode: 'light' | 'dark') => void;
}

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({ handleThemeChange }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';
  
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const dispatch = useAppDispatch();

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push('/auth/login');
  };

  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <h1>{t('title')}</h1>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/">{t('home')}</Link></li>
          <li><Link href="/about">{t('about')}</Link></li>
          <li>
            <IconButton className={styles.modeButton} onClick={() => toggleTheme(darkMode, handleThemeChange)}>
              {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </li>
          <li>
            <IconButton className={styles.languageButton} onClick={handleLanguageMenuOpen}>
              <PublicIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleLanguageMenuClose}
              className={styles.languageMenu}
            >
              <MenuItem onClick={() => {
                changeLanguageAndRoute(router, 'en');
                handleLanguageMenuClose();
              }}>
                <Flag code="GB" className={styles.flagIcon} />
                English
              </MenuItem>
              <MenuItem onClick={() => {
                changeLanguageAndRoute(router, 'de');
                handleLanguageMenuClose();
              }}>
                <Flag code="DE" className={styles.flagIcon} />
                Deutsch
              </MenuItem>
              <MenuItem onClick={() => {
                changeLanguageAndRoute(router, 'fr');
                handleLanguageMenuClose();
              }}>
                <Flag code="FR" className={styles.flagIcon} />
                French
              </MenuItem>
            </Menu>
          </li>
          <li>
            {isAuthenticated ? (
              <a onClick={handleLogout} className={styles.logoutLink}>
                {t('auth.logout')}
              </a>
            ) : (
              <Link href="/auth/login">
                <PersonIcon />
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderDesktop;
