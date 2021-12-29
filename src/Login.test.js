import {render, screen} from '@testing-library/react';
import Login from './Login';
import {BrowserRouter} from "react-router-dom";

test('renders DSR FlightLog text', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

test('renders username field', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	const element = screen.getByLabelText(/username/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
});

test('renders password field', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	const element = screen.getByLabelText(/password/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
});

test('renders sign in button', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	const element = screen.getByText(/sign in/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

test('renders sign up button', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	const element = screen.getByText(/sign up/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});

// TODO What about the notice???
