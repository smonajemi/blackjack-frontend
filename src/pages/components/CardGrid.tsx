import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, Typography, Button, Box, IconButton } from '@mui/material';
import CenteredLoader from '../../components/Loader';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';
import PageHeader from './PageHeader';

type CardData = {
  name: string;
  imageUrl: string;
  rank: number;
};

type CardCount = {
  rank: number;
  count: number;
  originalCount: number;
  name: string;
  imageUrl: string;
};

const CardGrid: React.FC<{ cards: CardData[] }> = ({ cards }) => {
  const groupedCards = cards.reduce<Record<number, CardData[]>>((acc, card) => {
    if (!acc[card.rank]) {
      acc[card.rank] = [];
    }
    acc[card.rank].push(card);
    return acc;
  }, {});

  const [loading, setLoading] = useState(true);
  const [deckCount, setDeckCount] = useState(4);
  const [totalCardsRemaining, setTotalCardsRemaining] = useState(deckCount * 52);

  const initialCards: CardCount[] = Object.entries(groupedCards).map(([rank, cardArray]) => ({
    rank: Number(rank),
    count: cardArray.length * deckCount,
    originalCount: cardArray.length,
    name: cardArray[0].name,
    imageUrl: cardArray[0].imageUrl,
  }));
  const [cardCounts, setCardCounts] = useState<CardCount[]>(initialCards);

  useEffect(() => {
    setCardCounts(prevCounts =>
      prevCounts.map(card => ({
        ...card,
        count: Math.min(card.originalCount * deckCount, card.count),
      }))
    );
  }, [deckCount]);

  const handleAddClick = (cardName: string) => {
    setCardCounts(prevCounts => {
      const updatedCounts = prevCounts.map(card =>
        card.name === cardName && card.count < card.originalCount * deckCount
          ? { ...card, count: card.count + 1 }
          : card
      );
      const newTotal = updatedCounts.reduce((sum, card) => sum + card.count, 0);
      setTotalCardsRemaining(newTotal);
      return updatedCounts;
    });
  };

  const handleRemoveClick = (cardName: string) => {
    setCardCounts(prevCounts => {
      const updatedCounts = prevCounts.map(card =>
        card.name === cardName && card.count > 0
          ? { ...card, count: card.count - 1 }
          : card
      );
      const newTotal = updatedCounts.reduce((sum, card) => sum + card.count, 0);
      setTotalCardsRemaining(newTotal);
      return updatedCounts;
    });
  };

  const handleReset = () => {
    setDeckCount(4);
    setCardCounts(initialCards);
    setTotalCardsRemaining(initialCards.reduce((sum, card) => sum + card.count, 0));
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);


  return (
    <Box display="flex" justifyContent="center" alignItems="center" style={{ height: 'auto', width: '100%' }}>
      {loading ? (
        <CenteredLoader message="Hang Tight!" />
      ) : (
        <Box position="relative" minHeight="100vh">
          <PageHeader deckCount={deckCount} cardsRemaining={totalCardsRemaining} chancesToWin={0} />
          <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
            <Button variant="outlined" color="error" onClick={handleReset} style={{ marginRight: 15 }}>
              Start Over
            </Button>
          </Box>
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
