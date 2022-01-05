import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Setup from "./Setup";

test('renders DSR FlightLog text', () => {
	render(<Router><Setup/></Router>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

