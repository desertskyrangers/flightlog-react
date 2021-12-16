import {render, screen} from '@testing-library/react';
import Home from './Home';
import Login from "./Login";

test('renders DSR FlightLog text', () => {
    render(<Home/>);
    expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

test('renders Sign Up link', () => {
    render(<Home/>);
    const element = screen.getByText(/sign up/i);
    expect(element).toBeInTheDocument();
});

test('renders Sign In link', () => {
    render(<Home/>);
    const element = screen.getByText(/sign in/i);
    expect(element).toBeInTheDocument();
});

test('renders username field', () => {
    render(<Login/>);
    const element = screen.getByLabelText(/username/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('type', 'text');
});

test('renders password field', () => {
    render(<Login/>);
    const element = screen.getByLabelText(/password/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('type', 'password');
});

test('renders login button', () => {
    render(<Login/>);
    const element = screen.getByText(/sign in/i);
    expect(element).toBeInTheDocument();
    expect(element).toHaveAttribute('type', 'button');
});
