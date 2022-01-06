import {render, screen} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom'
import FlightActions from "./FlightActions";

test('renders time a flight button', () => {
	render(<Router><FlightActions/></Router>);
	const element = screen.getByText('Time a Flight');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-submit');
});

test('renders plan a flight button', () => {
	render(<Router><FlightActions/></Router>);
	const element = screen.getByText('Log a Flight');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('page-submit');
});

