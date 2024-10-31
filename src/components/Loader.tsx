import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CenteredLoaderProps {
  message?: string; // Optional message prop
  size?: number;    // Optional size prop to control spinner size

}

const CenteredLoader: React.FC<CenteredLoaderProps> = ({ message, size }) => {
  return (
    <Box
      display="flex"
      flexDirection="column" // Stack spinner and message vertically
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <CircularProgress />
      {message && (
        <Typography variant="h6" style={{ marginTop: 16 }}>
          {message}
        </Typography>
      )}
    </Box>
  );
};

export default CenteredLoader;
