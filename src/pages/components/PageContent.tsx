import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import CardGrid from './CardGrid'; // Adjust the path as necessary
import cardDeck from './CardDeck'; // Adjust the path as necessary
import { PageContainer } from '@toolpad/core';
import DashboardGrid from './DashboardGrid';

interface PageContentProps {
  pathname: string;
  playingDeck: number;
  setPlayingDeck: (value: number) => void;
}

const PageContent: React.FC<PageContentProps> = ({ pathname, playingDeck, setPlayingDeck }) => {
  const renderPageContent = () => {
    switch (pathname) {
      case '/dashboard':
        return <Grid container spacing={0}><DashboardGrid /></Grid>;
      case '/blackjack':
        return (
          <Grid container spacing={0}>
            {cardDeck.length > 0 ? (
              <CardGrid playingDeck={playingDeck} cards={cardDeck} />
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

export default PageContent;
