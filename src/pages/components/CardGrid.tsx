// CardGrid.tsx
import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
  backgroundColor: theme.palette.action.hover,
  borderRadius: theme.shape.borderRadius,
  height,
  content: '" "',
}));

interface FaceCard {
  name: string;
  imageUrl: string;
}

interface CardGridProps {
  faceCards: FaceCard[];
}

const CardGrid: React.FC<CardGridProps> = ({ faceCards }) => {
  return (
    <Grid container spacing={1} style={{ justifyContent: 'center' }}>
    {faceCards.map((card, index) => (
      <Grid item xs={12} sm={6} md={3} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={card.imageUrl}
          alt={card.name}
          style={{ height: '200px', width: '100%', objectFit: 'contain' }}
        />
      </Grid>
    ))}
      {/* Add Skeletons for remaining spaces if less than 4 cards */}
      {/* {Array.from({ length: 4 - faceCards.length }).map((_, index) => (
        <Grid item xs={3} key={faceCards.length + index}>
          <Skeleton height={200} />
        </Grid>
      ))} */}
    </Grid>
  );
};

export default CardGrid;
