// CardGrid.tsx
import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';

const CardGrid: React.FC<{ cards: { name: string; imageUrl: string }[] }> = ({ cards }) => {

  
  return (
    <Grid container spacing={2} style={{ marginTop: 15, justifyContent: 'center'}}>
      {cards.map((card) => (
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
