import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton, TextField } from '@mui/material';
import CenteredLoader from '../../components/Loader';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';

// Define the type for your card data
type CardData = {
  name: string;
  imageUrl: string;
  rank: number;
};

// Define the type for your card counts
type CardCount = {
  rank: number;
  count: number;
  originalCount: number;
  name: string;
  imageUrl: string;
};

const CardGrid: React.FC<{ cards: CardData[] }> = ({ cards }) => {
  // Group cards by rank using reduce
  const groupedCards = cards.reduce<Record<number, CardData[]>>((acc, card) => {
    if (!acc[card.rank]) {
      acc[card.rank] = [];
    }
    acc[card.rank].push(card);
    return acc;
  }, {});

  // Convert the grouped cards back to an array using reduce
  const initialCards: CardCount[] = Object.entries(groupedCards).reduce<CardCount[]>((acc, [rank, cardArray]) => {
    const cardCount: CardCount = {
      rank: Number(rank),
      count: cardArray.length * 4, // Initialize count based on 2 decks
      originalCount: cardArray.length, // Store the original count for comparison
      name: cardArray[0].name, // Use the name of the first card in the group for display
      imageUrl: cardArray[0].imageUrl // Use the image URL of the first card in the group for display
    };
    acc.push(cardCount);
    return acc;
  }, []);

  // State to manage counts of each card and deck count
  const [cardCounts, setCardCounts] = useState<CardCount[]>(initialCards);
  const [loading, setLoading] = useState(true);
  const [deckCount, setDeckCount] = useState(2); // Initial number of decks

  // Effect to update card counts based on deck count
  useEffect(() => {
    setCardCounts(prevCounts =>
      prevCounts.map(card => {
        const maxAllowedCount = card.originalCount * deckCount; // Calculate the new max allowed count
        return {
          ...card,
          count: Math.min(maxAllowedCount, card.count), // Update count based on new deck count
        };
      })
    );
  }, [deckCount]); // Run this effect when deckCount changes


  // Handle click on the add button to increase count
  const handleAddClick = (cardName: string) => {
    setCardCounts(prevCounts =>
      prevCounts.map(card => {
        const maxAllowedCount = card.originalCount * deckCount; // Calculate the maximum allowed count based on original count and deck count
        return card.name === cardName && card.count < maxAllowedCount
          ? { ...card, count: card.count + 1 }
          : card; // Otherwise, return the card unchanged
      })
    );
  };

  // Handle click on the remove button to decrease count
  const handleRemoveClick = (cardName: string) => {
    setCardCounts(prevCounts =>
      prevCounts.map(card =>
        card.name === cardName && card.count > 0 // Ensure count doesn't go below 0
          ? { ...card, count: Math.max(0, card.count - 1) }
          : card // Decrease count by 1 if condition is met
      )
    );
  };

  // Reset counts to initial values
  const handleReset = () => {
    setDeckCount(4); // Reset to 2 decks
    setCardCounts(initialCards); // Reset counts to their initial state
  };

  // Effect to simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1-second loading delay
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: 'auto', width: '100%' }}
    >
      {loading ? (
        <CenteredLoader message="Hang Tight!" />
      ) : (
        <Box position="relative" minHeight="100vh">
          {/* Centered Box for the button and input */}
          <Box display="flex" justifyContent="center" alignItems="center" marginBottom={2}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleReset}
              style={{ marginRight: 15 }}
            >
              Reset Counts
            </Button>
         
          </Box>
          <Grid container spacing={2} style={{ marginTop: 15, justifyContent: 'center' }}>
            {cardCounts
              .sort((a, b) => a.rank - b.rank)
              .map((card) => (
                <Grid item xs={1.5} key={card.name}>
                  <Card
                    style={{
                      opacity: card.count === 0 ? 0.5 : 1,
                      pointerEvents: 'auto',
                    }}
                  >
                    <CardMedia component="img" image={card.imageUrl} alt={card.name} />
                    <Typography variant="caption" color="textSecondary">
                        {`Max allowed: ${card.count}`}
                      </Typography>
                    <Box>
                  
                      <IconButton aria-label="add" size="small" color="success" onClick={(e) => {
                        e.stopPropagation();
                        handleAddClick(card.name);
                      }}
                        style={{ marginTop: 10, marginRight: 10 }} >
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="remove" size="small" color="error" onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveClick(card.name);
                      }} style={{ marginTop: 10 }} >
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
