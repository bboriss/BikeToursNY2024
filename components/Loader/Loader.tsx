import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
  backgroundColor: 'rgba(0, 0, 0, 0.75)',
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 9999,
}));

const CustomCircularProgress = styled(CircularProgress)(({ theme }) => ({
  color: '#f7b731',
  size: 80,
}));

const Loader: React.FC = () => {
  return (
    <LoaderWrapper>
      <CustomCircularProgress />
    </LoaderWrapper>
  );
};

export default Loader;
