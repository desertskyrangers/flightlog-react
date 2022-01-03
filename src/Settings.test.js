import {render, screen} from "@testing-library/react";
import {BrowserRouter} from "react-router-dom";
import Profile from "./Profile";

test('renders DSR FlightLog text', () => {
	render(<BrowserRouter><Profile/></BrowserRouter>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

