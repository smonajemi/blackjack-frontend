import React from 'react';
import { Box, Grid } from '@mui/material';
import useGrid from '../hooks/useGrid';

const DashboardGrid: React.FC = React.memo(() => {
  const Skeleton = useGrid();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: 'auto', width: '100%' }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={5} />
        <Grid item xs={12}>
          <Skeleton height={14} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={14} />
        </Grid>
        <Grid item xs={12} md={4}>
          <Skeleton height={100} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Skeleton height={100} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={150} />
        </Grid>
        <Grid item xs={12}>
          <Skeleton height={14} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Skeleton height={100} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Skeleton height={100} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Skeleton height={100} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Skeleton height={100} />
        </Grid>
      </Grid>
    </Box>
  );
});

export default DashboardGrid;
