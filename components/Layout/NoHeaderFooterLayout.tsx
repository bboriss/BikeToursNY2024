import React from 'react';
import styles from './NoHeaderFooterLayout.module.scss';

interface NoHeaderFooterLayoutProps {
  children: React.ReactNode;
}

const NoHeaderFooterLayout: React.FC<NoHeaderFooterLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.mainContent}>{children}</main>
    </div>
  );
};

export default NoHeaderFooterLayout;
