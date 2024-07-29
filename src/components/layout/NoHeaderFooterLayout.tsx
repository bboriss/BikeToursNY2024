import React from 'react';

interface NoHeaderFooterLayoutProps {
  children: React.ReactNode;
}

const NoHeaderFooterLayout: React.FC<NoHeaderFooterLayoutProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default NoHeaderFooterLayout;
