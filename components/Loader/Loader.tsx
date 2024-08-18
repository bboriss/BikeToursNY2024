import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

interface LoaderProps {
  variant?: 'fullScreen' | 'container'; // Add a variant prop
}

const LoaderWrapper = styled(Box)<{ variant: string }>(({ theme, variant }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: variant === 'container' ? '50vh' : '100vh',
  width: variant === 'container' ? '50vw' : '100vw',
  backgroundColor: variant === 'container' ? 'transparent' : 'rgba(0, 0, 0, 0.75)',
  position: variant === 'container' ? 'relative' : 'fixed',
  top: 0,
  left: 0,
  zIndex: variant === 'container' ? 'auto' : 9999,
}));

const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: '#f7b731',
  size: 80,
}));

const Loader: React.FC<LoaderProps> = ({ variant = 'fullScreen' }) => {
  return (
    <LoaderWrapper variant={variant}>
      <CustomCircularProgress />
    </LoaderWrapper>
  );
};

export default Loader;
