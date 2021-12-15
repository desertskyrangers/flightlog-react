import { render, screen } from '@testing-library/react';
import App from './App';

test('renders DSR FlightLog text', () => {
  render(<App />);
  const textElement = screen.getByText(/DSR FlightLog/i);
  expect(textElement).toBeInTheDocument();
});
