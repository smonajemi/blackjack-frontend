// Dashboard.test.tsx
import React from 'react';
import { render } from '@testing-library/react';
import Dashboard from '../../Dashboard'; // Adjust the import path if needed
import '@testing-library/jest-dom';


describe('Dashboard', () => {
  test('renders without crashing', () => {
    render(<Dashboard />);
    // You can add a simple assertion here if needed, like checking for an element
    expect(true).toBe(true); // This is a placeholder assertion
  });
});
