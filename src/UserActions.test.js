import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import UserActions from "./UserActions";

test('renders profile button', () => {
	render(<Router><UserActions/></Router>);
	const element = screen.getByText('Profile');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

test('renders log out button', () => {
	render(<Router><UserActions/></Router>);
	const element = screen.getByText('Logout');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

