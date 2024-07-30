import React, { useState } from 'react';
import Link from 'next/link';
import { Drawer, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode, Close as CloseIcon, Home as HomeIcon, Info as InfoIcon, Person as PersonIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import PublicIcon from '@mui/icons-material/Public';
import styles from './HeaderMobile.module.scss';

interface HeaderMobileProps {
  handleThemeChange: (newMode: 'light' | 'dark') => void;
}

const HeaderMobile: React.FC<HeaderMobileProps> = ({ handleThemeChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLanguageMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setAnchorEl(null);
  };

  const handleThemeToggle = () => {
    const newMode = darkMode ? 'light' : 'dark';
    handleThemeChange(newMode);
  };

  return (
    <header className={styles.header}>
      <IconButton className={styles.menuButton} onClick={toggleMenu}>
        <MenuIcon />
      </IconButton>
      <div className={styles.controls}>
        <IconButton className={styles.modeButton} onClick={handleThemeToggle}>
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
        <IconButton className={styles.languageButton} onClick={handleLanguageMenuOpen}>
          <PublicIcon/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={handleLanguageMenuClose}>English</MenuItem>
          <MenuItem onClick={handleLanguageMenuClose}>Deutsch</MenuItem>
          <MenuItem onClick={handleLanguageMenuClose}>French</MenuItem>
        </Menu>
      </div>
      <Drawer
        anchor="left"
        open={menuOpen}
        onClose={toggleMenu}
        classes={{ paper: styles.drawerPaper }}
      >
        <div className={styles.drawerContent}>
          <IconButton className={styles.closeButton} onClick={toggleMenu}>
            <CloseIcon />
          </IconButton>
          <h1 className={styles.title}>Bike Tours New York</h1>
          <ul className={styles.drawerList}>
            <li>
              <HomeIcon className={styles.icon} />
              <Link href="/">Home</Link>
            </li>
            <li>
              <InfoIcon className={styles.icon} />
              <Link href="/about">About</Link>
            </li>
            <li>
              <PersonIcon className={styles.icon} />
              <Link href="/auth/login">Login</Link>
            </li>
          </ul>
        </div>
      </Drawer>
    </header>
  );
};

export default HeaderMobile;
