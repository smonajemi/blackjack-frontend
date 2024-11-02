// src/theme.ts
import { createTheme } from '@mui/material/styles';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#ffffff', // Custom primary color
      contrastText: '#ffffff', // Text color for primary buttons
    },
    secondary: {
      main: '#dc004e', // Custom secondary color
      contrastText: '#ffffff', // Text color for secondary buttons
    },
    // You can define additional colors here
    error: {
      main: '#f44336', // Error color
    },
    warning: {
      main: '#f44336', // Warning color
    },
    info: {
      main: '#2196f3', // Info color
    },
    success: {
      main: '#4caf50', // Success color
    },
    background: {
      default: '#f5f5f5', // Default background color
      paper: '#ffffff', // Paper background color (for cards, etc.)
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif', // Custom font family
    fontSize: 14, // Default font size
    // You can customize other typography settings here
  },
  spacing: 4, // Default spacing (4px)
});

export default theme;
