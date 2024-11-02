import { styled } from '@mui/material/styles';

// Define Skeleton component outside of the hook
const Skeleton = styled('div')<{ height: number }>(({ theme, height }) => ({
    backgroundColor: theme.palette.action.hover,
    borderRadius: theme.shape.borderRadius,
    height,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
}));

const useGrid = () => {
    return { Skeleton } as const; 
};

export default useGrid;
