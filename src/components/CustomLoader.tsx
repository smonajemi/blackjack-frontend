import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface CenteredLoaderProps {
    message?: string; 
    size?: number;  
}

const CustomLoader: React.FC<CenteredLoaderProps> = ({ message, size = 40 }) => {
    return (
        <Box
            display="flex"
            flexDirection="column" 
            alignItems="center"
            justifyContent="center"
            height="100vh"
        >
            <CircularProgress size={size} />
            {message && (
                <Typography variant="caption" style={{ marginTop: 15 }}>
                    {message}
                </Typography>
            )}
        </Box>
    );
};

export default CustomLoader;
