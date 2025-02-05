import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../../Dashboard'; 
import '@testing-library/jest-dom';


describe('Dashboard', () => {
  test('renders without crashing', () => {
    render(<Dashboard />);
   
    expect(true).toBe(true);
  });
});
