import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

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
  const uniqueCards = Object.entries(groupedCards).map(([rank, cardArray]) => ({
    rank: Number(rank),
    count: cardArray.length,
    name: cardArray[0].name, // Use the name of the first card in the group for display
    imageUrl: cardArray[0].imageUrl // Use the image URL of the first card in the group for display
  }));

  return (
    <Grid container spacing={2} style={{ marginTop: 15, justifyContent: 'center' }}>
      {uniqueCards
        .sort((a, b) => a.rank - b.rank) // Sort the unique cards by rank
        .map((card) => (
          <Grid item xs={2} key={card.name}>
            <Card>
              <CardMedia component="img" image={card.imageUrl} alt={card.name} />
              <CardContent>
                <Typography variant="body2" color="textSecondary">
                  {`Number of cards: ${card.count}`} {/* Display the count of cards */}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
    </Grid>
  );
};

export default CardGrid;
