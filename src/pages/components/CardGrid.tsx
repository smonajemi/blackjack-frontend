import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, Typography, Button, Box, IconButton } from '@mui/material';
import CenteredLoader from '../../components/Loader';
import { Delete as DeleteIcon, Add as AddIcon } from '@mui/icons-material';


// Define the props type for the CardGrid component
const CardGrid: React.FC<{ cards: { name: string; imageUrl: string; rank: number }[] }> = ({ cards }) => {

  // Group cards by rank
  const groupedCards = cards.reduce((acc: Record<number, { name: string; imageUrl: string; rank: number }[]>, card) => {
    if (!acc[card.rank]) {
      acc[card.rank] = [];
    }
    acc[card.rank].push(card); // Push the card into the array for that rank
    return acc;
  }, {});

  // Convert the grouped cards back to an array with rank and count
  const initialCards = Object.entries(groupedCards).map(([rank, cardArray]) => ({
    rank: Number(rank),
    count: cardArray.length,
    originalCount: cardArray.length, // Store the original count for comparison
    name: cardArray[0].name, // Use the name of the first card in the group for display
    imageUrl: cardArray[0].imageUrl // Use the image URL of the first card in the group for display
  }));

  // State to manage counts of each card
  const [cardCounts, setCardCounts] = useState(initialCards);
  const [loading, setLoading] = useState(true)

  // Handle click on the add button to increase count
  const handleAddClick = (cardName: string) => {
    setCardCounts(prevCounts =>
      prevCounts.map(card =>
        card.name === cardName && card.count < card.originalCount // Check if the count is less than original
          ? { ...card, count: card.count + 1 }
          : card // Increase count by 1 if condition is met
      )
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
    setCardCounts(initialCards);
  };


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000); // Simulate a 1-second loading delay
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
          <Button
            variant="contained"
            color="primary"
            onClick={handleReset}
            style={{ marginBottom: 15 }}
          >
            Reset Counts
          </Button>
          <Grid container spacing={2} style={{ marginTop: 15, justifyContent: 'center' }}>
            {cardCounts
              .sort((a, b) => a.rank - b.rank)
              .map((card) => (
                <Grid item xs={2} key={card.name}>
                  <Card
                    style={{
                      opacity: card.count === 0 ? 0.5 : 1,
                      pointerEvents: card.count === 0 ? 'none' : 'auto',
                    }}
                  >
                    <CardMedia component="img" image={card.imageUrl} alt={card.name} />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary">
                        {`Number of cards: ${card.count}`}
                      </Typography>
                      <IconButton aria-label="delete" size="small" color="success" onClick={(e) => {
                        e.stopPropagation();
                        handleAddClick(card.name);
                      }}
                        style={{ marginTop: 10, marginRight: 10 }}>
                        <AddIcon fontSize="inherit" />
                      </IconButton>
                      <IconButton aria-label="delete" size="small" color="error" onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveClick(card.name);
                      }} style={{ marginTop: 10 }} >
                        <DeleteIcon fontSize="inherit" />
                      </IconButton>
                    </CardContent>
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
