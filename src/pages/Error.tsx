import React from 'react';
import MainContainer from '../components/MainContainer';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/'); // Navigate to home or any other route
  };

  return (
    <MainContainer title="Error">
      <Box textAlign="center">
        <Typography variant="h2" color="error" gutterBottom>
          Oops! Something went wrong.
        </Typography>
        <Typography variant="body1" paragraph>
          We're sorry, but the page you were looking for could not be found or an error occurred.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGoHome}
          sx={{ mt: 2 }}
        >
          Go to Home
        </Button>
      </Box>
    </MainContainer>
  );
};

export default ErrorPage;
