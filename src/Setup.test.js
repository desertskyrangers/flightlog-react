import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Setup from "./Setup";

test('renders aircraft button', () => {
	render(<Router><Setup/></Router>);
	const element = screen.getByText('Aircraft');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

test('renders batteries button', () => {
	render(<Router><Setup/></Router>);
	const element = screen.getByText('Batteries');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

