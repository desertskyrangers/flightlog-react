import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Verify from "./Verify";

test('renders DSR FlightLog text', () => {
	render(<BrowserRouter><Verify/></BrowserRouter>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

test('renders verify field', () => {
	render(<BrowserRouter><Verify/></BrowserRouter>);
	const element = screen.getByLabelText(/verification code/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
});

test('renders sign in button', () => {
	render(<BrowserRouter><Verify/></BrowserRouter>);
	const element = screen.getByText(/verify/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'button');
});

test('renders resend button', () => {
	render(<BrowserRouter><Verify/></BrowserRouter>);
	const element = screen.getByText(/resend/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});

test('renders messages', () => {
	render(<BrowserRouter><Verify messages={["HELLO"]}/></BrowserRouter>);
	const element = screen.getByText(/hello/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('DIV');
});

