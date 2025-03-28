import React from 'react';
import { Grid, Typography, Box, List, ListItem, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import useGrid from '../hooks/useGrid';

// Update the props to accept all necessary statistics
interface PageHeaderProps {
  deckCount: number;                // Number of decks in play
  cardsRemaining: number;           // Number of cards remaining in the deck
  chancesToWin: number;             // Percentage chance to win
  totalWins: number;                // Total number of wins
  totalLosses: number;              // Total number of losses
  pushes: number;                   // Total number of pushes
  blackjackCount: number;           // Total number of blackjacks
  dealersUpCard: number;            // Dealer's up card value
  playerHandValue: number;          // Player's current hand value
  dealerHandValue: number;          // Dealer's current hand value
  cardsPlayed: number;              // Total number of cards played
  numberOfSplits: number;           // Number of splits that have occurred
  numberOfDoubleDowns: number;      // Number of double downs that have occurred
  winningPercentage: number;         // Winning percentage
  lastHandResult: 'Win' | 'Loss' | 'Push'; // Result of the last hand
  // cardsRemainingInDecks: number;    // Total cards remaining across all decks
  gameRoundNumber: number;          // Current game round number
  highScore: number;                // Player's high score
  riskAssessment: 'Low' | 'Medium' | 'High'; // Assessment of risk level
  numberOfTens: number;
  numberOfAces: number;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  deckCount,
  cardsRemaining,
  chancesToWin,
  totalWins,
  totalLosses,
  pushes,
  blackjackCount,
  dealersUpCard,
  playerHandValue,
  dealerHandValue,
  cardsPlayed,
  numberOfSplits,
  numberOfDoubleDowns,
  winningPercentage,
  lastHandResult,
  // cardsRemainingInDecks,
  gameRoundNumber,
  highScore,
  riskAssessment,
  numberOfTens,
  numberOfAces
}) => {
  const { Skeleton } = useGrid();


  // Create an array of stats to be displayed
  const stats = [
    { label: 'Decks', value: deckCount },
    { label: 'Cards Remaining', value: cardsRemaining },
    { label: 'Tens Remaining', value: numberOfTens },
    { label: 'Aces Remaining', value: numberOfAces },
    { label: 'Chances to Win', value: `${chancesToWin}%` },
  ];

  return (
    <Grid container spacing={1} style={{ marginBottom: 10, marginTop: 2 }}>
    <Grid item xs={12}>
      <Skeleton height={75}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: 1,
          }}
        >
          {stats.map((stat, index) => (
            <Box key={index} sx={{ margin: 1 }}>
              <Typography variant="subtitle2">
                {stat.label}: {stat.value}
              </Typography>
            </Box>
          ))}
          {/* Spacer box to push input to the far right */}
          <Box sx={{ ml: 'auto' }}>
            <TextField
              variant="outlined"
              placeholder="Enter value"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '40px', // Adjust height as needed
                },
              }}
            />
          </Box>
        </Box>
      </Skeleton>
    </Grid>
  </Grid>
  );
};

export default PageHeader;
