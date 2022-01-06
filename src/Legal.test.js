import {render, screen} from '@testing-library/react';
import {BrowserRouter} from "react-router-dom";
import Legal from "./Legal";

test('renders copyright header', () => {
	render(<BrowserRouter><Legal/></BrowserRouter>);
	const element = screen.getByText('Copyright');
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('H1');
});

test('renders copyright notice', () => {
	render(<BrowserRouter><Legal/></BrowserRouter>);
	const element = screen.getByText(/all content on this website/i);
	expect(element).toBeInTheDocument();
	expect(element.nodeName).toBe('P');
});
