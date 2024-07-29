import { createTheme, ThemeOptions } from '@mui/material/styles';

// Definiši svetlu temu
export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#555555',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

// Definiši tamnu temu
export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: '#121212',
      paper: '#333333',
    },
    text: {
      primary: '#ffffff',
      secondary: '#aaaaaa',
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});
