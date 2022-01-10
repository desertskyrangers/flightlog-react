import {render, screen} from "@testing-library/react";
import {MemoryRouter as Router, Route, Routes} from "react-router-dom";
import Aircraft from "./Aircraft";
import {createMemoryHistory} from 'history'
import AppPath from "../AppPath";

test('renders name field', () => {
	render(<Router><Aircraft/></Router>);
	const element = screen.getByLabelText('Name');
	expect(element).toBeInTheDocument();
	expect(element).toHaveAttribute('type', 'text');
	expect(element).toHaveClass('page-field');
});


test('renders update button', () => {
	render(<Router><Aircraft/></Router>);
	const element = screen.getByText('Update');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});

test('renders save button', () => {
	const route = AppPath.AIRCRAFT + '/:id'
	const path = AppPath.AIRCRAFT + '/new'

	render(
		<Router initialEntries={[path]} initialIndex={0}>
			<Routes>
				<Route exact path={route} element={<Aircraft/>}/>
			</Routes>
		</Router>
	)

	const element = screen.getByText('Save');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
});

