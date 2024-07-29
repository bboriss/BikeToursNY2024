import React from 'react';
import Link from 'next/link';
import styles from './HeaderDesktop.module.scss';

const HeaderDesktop: React.FC = () => {
  return (
    <header className={styles.desktopHeader}>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/tours">Tours</Link>
          </li>
          <li>
            <Link href="/login">Login</Link>
          </li>
          <li>
            <Link href="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderDesktop;
