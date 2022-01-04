import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Profile from "./Profile";

test('renders DSR FlightLog text', () => {
	render(<Router><Profile/></Router>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

