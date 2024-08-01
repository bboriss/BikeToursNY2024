import React, { useState } from 'react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import PersonIcon from '@mui/icons-material/Person';
import styles from './MobileMenu.module.scss';

const MobileMenu: React.FC = () => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <IconButton className={styles.menuIcon} onClick={toggleMenu}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="left" open={isOpen} onClose={toggleMenu} className={styles.drawer}>
        <div className={styles.header}>
          <IconButton onClick={toggleMenu} className={styles.closeIcon}>
            <CloseIcon />
          </IconButton>
          <h1 className={styles.title}>{t('Bike Tours New York')}</h1>
        </div>
        <List className={styles.nav}>
          <ListItem button onClick={toggleMenu}>
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <Link href="/">
              <ListItemText primary={t('home')} />
            </Link>
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <ListItemIcon><InfoIcon /></ListItemIcon>
            <Link href="/about">
              <ListItemText primary={t('about')} />
            </Link>
          </ListItem>
          <ListItem button onClick={toggleMenu}>
            <ListItemIcon><PersonIcon /></ListItemIcon>
            <Link href="/auth/login">
              <ListItemText primary={t('login')} />
            </Link>
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default MobileMenu;
