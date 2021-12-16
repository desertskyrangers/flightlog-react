import {render, screen} from '@testing-library/react';
import Signup from './Signup';

test('renders username field', () => {
	render(<Signup/>);
	const element = screen.getByLabelText(/username/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
});

test('renders password field', () => {
	render(<Signup/>);
	const element = screen.getByLabelText(/password/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
});

test('renders sign in button', () => {
	render(<Signup/>);
	const element = screen.getByText(/sign up/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'button');
});
