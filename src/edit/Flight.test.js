import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router} from "react-router";
import Flight from "./Flight";

test('renders name field', () => {
	render(<Router><Flight/></Router>);
	const element = screen.getByLabelText('Aircraft');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'select');
	expect(element).toHaveClass('page-field');
});
