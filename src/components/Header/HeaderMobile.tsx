import React, { useState } from 'react';
import { Drawer, IconButton, Menu, MenuItem } from '@mui/material';
import { Menu as MenuIcon, LightMode, DarkMode, Close as CloseIcon } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
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
          🌐
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleLanguageMenuClose}
        >
          <MenuItem onClick={handleLanguageMenuClose}>English</MenuItem>
          <MenuItem onClick={handleLanguageMenuClose}>Deutsch</MenuItem>
        </Menu>
      </div>
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={toggleMenu}
      >
        <div className={styles.drawerContent}>
          <IconButton className={styles.closeButton} onClick={toggleMenu}>
            <CloseIcon />
          </IconButton>
          <ul className={styles.drawerList}>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
      </Drawer>
    </header>
  );
};

export default HeaderMobile;
