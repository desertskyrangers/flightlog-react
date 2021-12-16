import {render, screen} from '@testing-library/react';
import CopyrightNotice from './CopyrightNotice';

test('renders copyright notice', () => {
	render(<CopyrightNotice year={2020}/>);

	const element = screen.getByText(/\u00A9/i);
	expect(element).toBeInTheDocument();
	expect(element).toHaveTextContent('\u00A9 2020 Desert Sky Rangers')
});
