import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      contrastText: '#fff'
    },
    secondary: {
      main: '#9c27b0'
    }
  },
  components: {
    MuiListItem: {
      styleOverrides: {
        root: {
          paddingLeft: '8px',
          paddingRight: '8px'
        }
      }
    }
  }
});

export default theme;