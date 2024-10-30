import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    error: {
      main: '#330049', // Dark Magenta (for error states)
    },
    success: {
      main: '#8f7507', // Reusing Gold Yellow for success
    },
    info: {
      main: '#5a2d7a', // Lavender (for informational elements)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

export default theme;
