import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomLoader from '..../CustomLoader

describe('CustomLoader', () => {
  it('renders the spinner', () => {
    render(<CustomLoader />);
    // Check if CircularProgress is in the document
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('renders with a message when provided', () => {
    const message = 'Loading...';
    render(<CustomLoader message={message} />);

    // Check if the message is displayed
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
