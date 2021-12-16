import {render, screen} from '@testing-library/react';
import Login from './Login';

test('renders DSR FlightLog text', () => {
	render(<Login/>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
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

test('renders sign in button', () => {
	render(<Login/>);
	const element = screen.getByText(/sign in/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'button');
});

test('renders sign up button', () => {
	render(<Login/>);
	const element = screen.getByText(/sign up/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('A');
	expect(element).toHaveClass('button');
});

// TODO What about the notice???
