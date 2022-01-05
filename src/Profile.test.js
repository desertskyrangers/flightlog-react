import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Profile from "./Profile";

test('renders DSR FlightLog text', () => {
	render(<Router><Profile/></Router>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

test('renders first name field', () => {
	render(<Router><Profile/></Router>);
	const element = screen.getByLabelText('First Name');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});

test('renders last name field', () => {
	render(<Router><Profile/></Router>);
	const element = screen.getByLabelText('Last Name');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});

test('renders email field', () => {
	render(<Router><Profile/></Router>);
	const element = screen.getByLabelText('Email');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});

test('renders sms number field', () => {
	render(<Router><Profile/></Router>);
	const element = screen.getByLabelText('SMS Number');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});

test('renders sms carrier field', () => {
	render(<Router><Profile/></Router>);
	const element = screen.getByLabelText('SMS Carrier');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('login-field');
});
