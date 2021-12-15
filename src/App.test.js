import {render, screen} from '@testing-library/react';
import App from './App';

test('renders DSR FlightLog text', () => {
    render(<App/>);
    expect(screen.getByText(/DSR FlightLog/i)).toBeInTheDocument();
});

test('renders Sign Up link', () => {
    render(<App/>);
    const element = screen.getByText(/sign up/i);
    expect(element).toBeInTheDocument();
});

test('renders Sign In link', () => {
    render(<App/>);
    const element = screen.getByText(/sign in/i);
    expect(element).toBeInTheDocument();
});
