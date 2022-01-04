import {render, screen} from '@testing-library/react';
import Login from './Login';
import {BrowserRouter} from "react-router-dom";
import Verify from "./Verify";

test('renders DSR FlightLog text', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

test('renders username field', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	const element = screen.getByLabelText(/username/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});

test('renders password field', () => {
	render(<BrowserRouter><Login/></BrowserRouter>);
	const element = screen.getByLabelText(/password/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'password');
	expect(element).toHaveClass('login-field');
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
	const element = screen.getByText(/register/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});


test('renders messages', () => {
	render(<BrowserRouter><Login messages={["HELLO"]}/></BrowserRouter>);
	const element = screen.getByText(/hello/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('DIV');
	expect(element).toHaveClass('notice-message');
});
