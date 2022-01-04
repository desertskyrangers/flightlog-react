import {render, screen} from '@testing-library/react';
import Home from './Home';
import {BrowserRouter as Router} from 'react-router-dom'

test('renders home text', () => {
	render(<Router><Home/></Router>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});
