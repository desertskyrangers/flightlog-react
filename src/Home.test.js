import {render, screen} from '@testing-library/react';
import Home from './Home';
import {BrowserRouter as Router} from 'react-router-dom'

test('renders time a flight button', () => {
	render(<Router><Home/></Router>);
	const element = screen.getByText('Time a Flight');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

test('renders plan a flight button', () => {
	render(<Router><Home/></Router>);
	const element = screen.getByText('Plan a Flight');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('BUTTON');
	expect(element).toHaveClass('login-submit');
});

