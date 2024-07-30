import React from 'react';
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

interface HeaderDesktopProps {
  handleThemeChange: (newMode: 'light' | 'dark') => void;
}

const HeaderDesktop: React.FC<HeaderDesktopProps> = ({ handleThemeChange }) => {
  const { t, i18n } = useTranslation('common');
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language).then(() => {
      router.push(router.pathname, router.asPath, { locale: language });
    });
    handleLanguageMenuClose();
  };

  const handleThemeToggle = () => {
    const newMode = darkMode ? 'light' : 'dark';
    handleThemeChange(newMode);
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
            <IconButton className={styles.modeButton} onClick={handleThemeToggle}>
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
              <MenuItem onClick={() => handleLanguageChange('en')}>
                <Flag code="GB" className={styles.flagIcon} />
                English
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange('de')}>
                <Flag code="DE" className={styles.flagIcon} />
                Deutsch
              </MenuItem>
              <MenuItem onClick={() => handleLanguageChange('fr')}>
                <Flag code="FR" className={styles.flagIcon} />
                French
              </MenuItem>
            </Menu>
          </li>
          <li><Link href="/auth/login"><PersonIcon/></Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderDesktop;
