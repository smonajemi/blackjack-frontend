import * as React from 'react';
import { extendTheme } from '@mui/material/styles';
import { Router, Navigation } from '@toolpad/core/AppProvider';

export const NAVIGATION: Navigation = [

  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
  },
  {
    segment: 'blackjack',
    title: 'Blackjack',
  },
  {
    kind: 'divider',
  },
  
];

export const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});


export const useDemoRouter = (initialPath: string): Router => {
  const [pathname, setPathname] = React.useState(initialPath);
console.log(pathname)
  const router = React.useMemo(
    () => ({
      pathname,
      searchParams: new URLSearchParams(),
      navigate: (path: string | URL) => setPathname(String(path)),
    }),
    [pathname]
  );

  return router;
};

export const config = {
  NAVIGATION,
  demoTheme,
  useDemoRouter,
} as const;

