// DashboardLayoutBasic.tsx
import React from 'react';
import { AppProvider, DashboardLayout, PageContainer } from '@toolpad/core';
import Grid from '@mui/material/Grid';
import { NAVIGATION, demoTheme, useDemoRouter } from '../config/config';
import CardGrid from './components/CardGrid';
import PageHeader from './components/PageHeader';
import myCards from './components/CardDeck'; // Adjust the path as necessary
import { Box, Typography } from '@mui/material';

const DemoPageContent = ({ pathname }: { pathname: string }) => {
  // Determine which content to display based on the pathname
  let content;

  switch (pathname) {
    case '/dashboard':
      content = <Typography variant="h4">Hello Dashboard</Typography>;
      break;
    case '/blackjack':
      content = (
        <Grid container spacing={2}>
          <CardGrid cards={myCards} />
        </Grid>
      );
      break;
    default:
      content = <Typography variant="h4">Select a tab to view content</Typography>;
      break;
  }

  return (
    <Box
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <PageContainer>
        {content}
      </PageContainer>
    </Box>
  );
};

const DashboardLayoutBasic: React.FC<{ window?: () => Window }> = (props) => {
  const { window } = props;
  const router = useDemoRouter('/blackjack');
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="BJ logo" />,
        title: 'BJ',
      }}
    >
      <DashboardLayout>
        <DemoPageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutBasic;
