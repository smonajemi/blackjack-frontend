import * as React from 'react';
import { AppProvider, DashboardLayout, PageContainer } from '@toolpad/core';
import Grid from '@mui/material/Grid'; // Use the standard Grid component
import { NAVIGATION, demoTheme, useDemoRouter } from '../config/config'; // Adjust the path as needed
import { styled } from '@mui/material/styles';

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

const DashboardLayoutBasic: React.FC<{ window?: () => Window }> = (props) => {
  const { window } = props;
  const router = useDemoRouter('/blackjack');
  const demoWindow = window ? window() : undefined;

  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} window={demoWindow}>
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            <Grid item xs={5} />
            <Grid item xs={12}>
              <Skeleton height={150} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton height={14} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton height={100} />
            </Grid>
          </Grid>
          
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
};

export default DashboardLayoutBasic;
