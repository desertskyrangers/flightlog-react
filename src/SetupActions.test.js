import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import SetupActions from "./SetupActions";

test('renders aircraft button', () => {
	render(<Router><SetupActions/></Router>);
	const element = screen.getByText('Aircraft');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-submit');
});

test('renders batteries button', () => {
	render(<Router><SetupActions/></Router>);
	const element = screen.getByText('Batteries');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-submit');
});

