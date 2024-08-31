import { createTheme, ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    formColors: {
      hover: string;
      yellow: string;
    };
    backgroundHeader: string;
    paginationColor: string;
  }

  interface PaletteOptions {
    formColors?: {
      hover?: string;
      yellow?: string;
    };
    backgroundHeader?: string;
    paginationColor?: string;
  }
}

export const lightTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3a4750',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#ffffff',
    },
    formColors: {
      hover: '#FFDD93',
      yellow: '#f7b731',
    },
    backgroundHeader: '#f7b731',
    paginationColor: '#ffffff',
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});

export const darkTheme: ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3a4750',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#272829',
      paper: '#333333',
    },
    text: {
      primary: '#ffffff',
      secondary: '#f7b731',
    },
    formColors: {
      hover: '#FFDD93',
      yellow: '#f7b731',
    },
    backgroundHeader: '#272829',
    paginationColor: '#f7b731',
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});
