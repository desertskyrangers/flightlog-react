import {render, screen} from '@testing-library/react';
import Signup from './Signup';

test('renders username field', () => {
	render(<Signup/>);
	const element = screen.getByLabelText('Username');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
});

test('renders password field', () => {
	render(<Signup/>);
	const element = screen.getByLabelText('Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
});

test('renders verify password field', () => {
	render(<Signup/>);
	const element = screen.getByLabelText('Verify Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
});

test('renders sign in button', () => {
	render(<Signup/>);
	const element = screen.getByText('Sign Up');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'button');
});
