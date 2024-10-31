import React from 'react';
import { Grid, Typography, Box, List, ListItem } from '@mui/material';
import { styled } from '@mui/material/styles';

// Update the props to accept deckCount, cardsRemaining, and chancesToWin
interface PageHeaderProps {
  deckCount: number;
  cardsRemaining: number;
  chancesToWin: number; // New prop for chances to win
}

const PageHeader: React.FC<PageHeaderProps> = ({ deckCount, cardsRemaining, chancesToWin }) => {
  const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    display: 'flex', // Added to align contents inside the Skeleton
    alignItems: 'center', // Vertically center the content
    justifyContent: 'center', // Horizontally center the content
    padding: theme.spacing(2), // Add padding for better spacing
  }));

  return (
    <Grid container spacing={1} style={{ marginBottom: 10, marginTop: 2 }}>
      <Grid item xs={12}>
        <Skeleton height={120}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start', // Align items to the left
              width: '100%',
            }}
          >
            <List>
              <ListItem>
                <Typography variant="subtitle2">Decks: {deckCount}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="subtitle2">Cards Remaining: {cardsRemaining}</Typography>
              </ListItem>
              <ListItem>
                <Typography variant="subtitle2">Chances to Win: {chancesToWin}</Typography>
              </ListItem>
            </List>
          </Box>
        </Skeleton>
      </Grid>
      <Grid item xs={12} />
    </Grid>
  );
};

export default PageHeader;
