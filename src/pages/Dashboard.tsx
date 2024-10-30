import * as React from 'react';
import { AppProvider, DashboardLayout, PageContainer } from '@toolpad/core';
import Grid from '@mui/material/Grid'; // Use the standard Grid component
import { NAVIGATION, demoTheme, useDemoRouter } from '../config/config'; // Adjust the path as needed
import CardGrid from './components/CardGrid';

import kingOfHearts from '../images/kingHeart.png';
import queenOfHearts from '../images/queenHeart.png';
import jackOfHearts from '../images/jackDiamond.png';
import PageHeader from './components/PageHeader';


const DashboardLayoutBasic: React.FC<{ window?: () => Window }> = (props) => {
  const { window } = props;
  const router = useDemoRouter('/blackjack');
  const demoWindow = window ? window() : undefined;

  const faceCards = [
    { name: 'King of Hearts', imageUrl: kingOfHearts  },
    { name: 'Queen of Hearts', imageUrl: queenOfHearts },
    { name: 'Jack of Hearts', imageUrl: jackOfHearts},
  ];

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
    <DashboardLayout>
      <PageContainer>
        <Grid container spacing={1}>
          <Grid item xs={5} />
          {/* <PageHeader /> */}
          <CardGrid faceCards={faceCards} />
        </Grid>
      </PageContainer>
    </DashboardLayout>
  </AppProvider>
  );
};

export default DashboardLayoutBasic;
