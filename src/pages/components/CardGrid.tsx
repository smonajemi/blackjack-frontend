import React, { } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import CenteredLoader from '../../components/Loader';
import { Delete as DeleteIcon, Add as AddIcon, ArrowRightOutlined, ArrowLeftOutlined } from '@mui/icons-material';
import PageHeader from './PageHeader';
import { CardData } from '../../types/card.types';
import useCard from '../hooks/useCard';

const CardGrid: React.FC<{ cards: CardData[], playingDeck: number }> = ({ cards, playingDeck }) => {
  const {
    loading,
    deckCount,
    totalCardsRemaining,
    cardCounts,
    handleAddClick,
    handleRemoveClick,
    handleReset,
  } = useCard(cards, playingDeck);

  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <CenteredLoader message="Hang Tight!" />
      ) : (
        <Box position="relative" minHeight="100vh">
            <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
            <Button variant="outlined" color="error" onClick={handleReset} style={{ marginRight: 15 }}>
              Start Over
            </Button>
          </Box>
          <IconButton>
            <ArrowLeftOutlined></ArrowLeftOutlined>
          </IconButton>
          <IconButton>
            <ArrowRightOutlined></ArrowRightOutlined>
          </IconButton>
     
          <PageHeader deckCount={deckCount} cardsRemaining={totalCardsRemaining} chancesToWin={0} totalWins={0} totalLosses={0} pushes={0} blackjackCount={0} dealersUpCard={0} playerHandValue={0} dealerHandValue={0} cardsPlayed={0} numberOfSplits={0} numberOfDoubleDowns={0} winningPercentage={0} lastHandResult={'Win'} gameRoundNumber={0} highScore={0} riskAssessment={'Low'} />
          
          <Grid container spacing={2} style={{ marginTop: 15, justifyContent: 'center' }}>
            {cardCounts
              .sort((a, b) => a.rank - b.rank)
              .map(card => (
                <Grid item xs={1.5} key={card.name}>
                  <Card style={{ opacity: card.count === 0 ? 0.5 : 1 }}>
                    {loading ? (
                      <CenteredLoader />
                    ) : (
                      <CardMedia component="img" image={card.imageUrl} alt={card.name} />
                    )}
                    <Typography variant="caption" color="textSecondary">
                      {`Max allowed: ${card.count}`}
                    </Typography>
                    <Box>
                      <IconButton aria-label="add" size="small" color="success" onClick={(e) => {
                        e.stopPropagation();
                        handleAddClick(card.name);
                      }} style={{ marginTop: 10, marginRight: 10 }}>
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="remove" size="small" color="error" onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveClick(card.name);
                      }} style={{ marginTop: 10 }}
                        disabled={card.count === 0}
                      >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </Box>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};

export default CardGrid;
