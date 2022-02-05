import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import SetupActions from "./SetupActions";

test('renders aircraft button', () => {
	render(<Router><SetupActions/></Router>);
	const element = screen.getByText(/aircraft/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

test('renders batteries button', () => {
	render(<Router><SetupActions/></Router>);
	const element = screen.getByText(/batteries/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-action');
});

// test('renders groups button', () => {
// 	render(<Router><SetupActions/></Router>);
// 	const element = screen.getByText(/groups/i);
// 	expect(element).toBeInTheDocument();
// 	expect(element.nodeName).toBe('BUTTON');
// 	expect(element).toHaveClass('page-action');
// });
