import {render, screen} from '@testing-library/react';
import Home from './Home';

test('renders home text', () => {
	render(<Home/>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});
