import {render, screen} from '@testing-library/react';
import Home from './Home';
import Login from "./Login";

test('renders home text', () => {
    render(<Home/>);
    expect(screen.getByText(/Home/i)).toBeInTheDocument();
});
