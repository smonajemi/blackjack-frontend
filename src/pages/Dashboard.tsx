// DashboardLayoutBasic.tsx
import React, { useState } from 'react';
import { AppProvider, DashboardLayout, PageContainer } from '@toolpad/core';
import Grid from '@mui/material/Grid';
import { NAVIGATION, demoTheme, useRouter } from '../config/config';
import CardGrid from './components/CardGrid';
import cardDeck from './components/CardDeck'; // Adjust the path as necessary
import { Box, Typography } from '@mui/material';

const PageContent = ({ pathname }: { pathname: string }) => {
  // Determine which content to display based on the pathname
  const renderPageContent = () => {
    switch (pathname) {
      case '/dashboard':
        return <Typography variant="h4">Hello Dashboard</Typography>;
      case '/blackjack':
        return (
          <Grid container spacing={2}>
            {cardDeck.length > 0 ? (
              <CardGrid cards={cardDeck}/>
            ) : (
              <Typography variant="h6">No cards available</Typography>
            )}
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
        {renderPageContent()}
      </PageContainer>
    </Box>
  );
};

const Dashboard: React.FC = (props) => { // No need for window prop
  const router = useRouter('/');

  return (
    <AppProvider
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
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

export default Dashboard;
