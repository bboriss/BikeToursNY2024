import { createTheme, ThemeOptions } from '@mui/material/styles';
declare module '@mui/material/styles' {
  interface Palette {
    formColors: {
      hover: string;
    };
  }

  interface PaletteOptions {
    formColors?: {
      hover?: string;
    };
  }
}


// Definiši svetlu temu
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
      hover: '#FFDD93'
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
      main: '#3a4750',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: '#121212',
      paper: '#333333',
    },
    text: {
      primary: '#ffffff',
      secondary: '#f7b731',
    },
    formColors: {
      hover: '#FFDD93'
    },
  },
  typography: {
    fontFamily: 'Poppins, Arial, sans-serif',
  },
});
