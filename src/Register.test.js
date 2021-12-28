import {render, screen} from '@testing-library/react';
import Register from './Register';

test('renders username field', () => {
	render(<Register/>);
	const element = screen.getByLabelText('Username');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
});

test('renders password field', () => {
	render(<Register/>);
	const element = screen.getByLabelText('Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
});

test('renders verify password field', () => {
	render(<Register/>);
	const element = screen.getByLabelText('Verify Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
});

test('renders sign in button', () => {
	render(<Register/>);
	const element = screen.getByText('Sign Up');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'button');
});
