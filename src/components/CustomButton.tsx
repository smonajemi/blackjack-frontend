import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  color: 'primary' | 'secondary' | 'error' | 'warning'; 
  label?: string; 
}

const CustomButton: React.FC<CustomButtonProps> = ({ color, label, children, ...rest }) => {
  return (
    <Button color={color} {...rest}>
      {label || children} 
    </Button>
  );
};

export default CustomButton;
