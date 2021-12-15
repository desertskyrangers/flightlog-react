import {render, screen} from '@testing-library/react';
import App from './App';
import Login from "./Login";

test('renders DSR FlightLog text', () => {
    render(<App/>);
    expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

// test('renders Sign Up link', () => {
//     render(<App/>);
//     const element = screen.getByText(/sign up/i);
//     expect(element).toBeInTheDocument();
// });

test('renders Sign In link', () => {
    render(<App/>);
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
