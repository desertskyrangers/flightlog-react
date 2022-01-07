import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Aircraft from "./Aircraft";

test('renders name field', () => {
	render(<Router><Aircraft id='00000000-0000-0000-0000-000000000000' name='ojo'/></Router>);
	const element = screen.getByLabelText('Name');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});

