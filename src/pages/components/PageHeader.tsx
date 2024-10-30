import React from 'react';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const PageHeader = () => {

  const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    content: '" "',
  }));

  return (
    <Grid container spacing={2} style={{ marginBottom: 15}}>
      <Grid item xs={12}>
        <Skeleton height={150} />
      </Grid>
      <Grid item xs={12}>
        <Skeleton height={14} />
      </Grid>
    </Grid>
  );
};

export default PageHeader;
