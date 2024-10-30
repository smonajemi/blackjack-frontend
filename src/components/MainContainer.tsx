import React from 'react';
import { Box, Typography } from '@mui/material';

interface MainContainerProps {
  children?: React.ReactNode; 
  title: string;
}

const MainContainer: React.FC<MainContainerProps> = ({ children, title }) => {
  return (
    <Box
      sx={{
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '4px', 
        backgroundColor: '#fff',
      }}
    >
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <Box>{children}</Box>
    </Box>
  );
};

export default MainContainer;
