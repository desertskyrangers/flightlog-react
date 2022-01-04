import {render, screen} from '@testing-library/react';
import Register from './Register';
import {BrowserRouter as Router} from "react-router-dom";

test('renders username field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Username');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});

test('renders password field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
	expect(element).toHaveClass('login-field');
});

test('renders verify password field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Verify Password');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
	expect(element).toHaveClass('login-field');
});

test('renders email field', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByLabelText('Email Address');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});

test('renders sign in button', () => {
	render(<Router><Register/></Router>);
	const element = screen.getByText('Sign Up');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

test('renders messages', () => {
	render(<Router><Register messages={["HELLO"]}/></Router>);
	const element = screen.getByText(/hello/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('DIV');
	expect(element).toHaveClass('notice-message');
});
