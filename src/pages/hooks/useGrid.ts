import { useState } from 'react';
import { styled } from '@mui/material/styles';

// Define the styled component outside of the hook
const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}));

// Define the useGrid hook
const useGrid = (initialHeight: number = 100) => {
    const [height] = useState(initialHeight);
  
    // Return the styled component with the specified height
    return Skeleton;
};

export default useGrid;
