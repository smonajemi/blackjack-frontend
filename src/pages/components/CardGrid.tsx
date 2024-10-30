// CardGrid.tsx
import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia } from '@mui/material';

const CardGrid: React.FC<{ cards: { name: string; imageUrl: string, rank: number }[] }> = ({ cards }) => {

  return (
    <Grid container spacing={2} style={{ marginTop: 15, justifyContent: 'center' }}>
    {cards
      .sort((a, b) => a.rank - b.rank) // Sort the cards by rank
      .map((card) => (
        <Grid item xs={2} key={card.name}>
          <Card>
            <CardMedia component="img" image={card.imageUrl} alt={card.name} />
          </Card>
        </Grid>
      ))}
  </Grid>
  );
};

export default CardGrid;
