// DashboardLayoutBasic.tsx
import React from 'react';
import { AppProvider, DashboardLayout, PageContainer } from '@toolpad/core';
import Grid from '@mui/material/Grid';
import { NAVIGATION, demoTheme, useRouter } from '../config/config';
import CardGrid from './components/CardGrid';
import PageHeader from './components/PageHeader';
import cardDeck from './components/CardDeck'; // Adjust the path as necessary
import { Box, createTheme, Typography } from '@mui/material';

const PageContent = ({ pathname }: { pathname: string }) => {
  // Determine which content to display based on the pathname
  const renderContent = () => {
    switch (pathname) {
      case '/dashboard':
        return <Typography variant="h4">Hello Dashboard</Typography>;
      case '/blackjack':
        return (
          <Grid container spacing={2} >
            <CardGrid cards={cardDeck} />
          </Grid>
        );
      default:
        return <Typography variant="h4">Select a tab to view content</Typography>;
    }
  };

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
        {/* <PageHeader /> */}
        {renderContent()}
      </PageContainer>
    </Box>
  );
};

const DashboardLayoutBasic: React.FC<{ window?: () => Window }> = (props) => {
  const { window } = props;
  const router = useRouter('/');
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
        <PageContent pathname={router.pathname} />
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutBasic;
