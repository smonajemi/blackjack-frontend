// App.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import App from './App';



describe('App Component', () => {
  test('renders without crashing and contains Routes', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    );

    // Check if the theme and routing elements are rendered
    expect(screen.getByRole('application')).toBeInTheDocument();
  });
});
