import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  color: 'primary' | 'secondary' | 'error' | 'warning'; // Include other color options from your theme
  label?: string; // Optional label prop for backward compatibility
}

const CustomButton: React.FC<CustomButtonProps> = ({ color, label, children, ...rest }) => {
  return (
    <Button color={color} {...rest}>
      {label || children} {/* Use label if provided, otherwise use children */}
    </Button>
  );
};

export default CustomButton;
