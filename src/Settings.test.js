import {render, screen} from "@testing-library/react";
import {BrowserRouter as Router} from "react-router-dom";
import Settings from "./Settings";

test('renders DSR FlightLog text', () => {
	render(<Router><Settings/></Router>);
	expect(screen.getByText(/FlightLog/i)).toBeInTheDocument();
});

