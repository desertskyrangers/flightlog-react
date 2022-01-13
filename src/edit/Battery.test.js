import {render, screen} from "@testing-library/react"
import {MemoryRouter as Router, Route, Routes} from "react-router-dom"
import AppPath from "../AppPath"
import Battery from "./Battery"

test('renders name field', () => {
	render(<Router><Battery/></Router>)
	const element = screen.getByLabelText(/name/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders status field', () => {
	render(<Router><Battery/></Router>)
	const element = screen.getByLabelText(/status/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field')
})

test('renders make field', () => {
	render(<Router><Battery/></Router>)
	const element = screen.getByLabelText(/manufacturer/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders model field', () => {
	render(<Router><Battery/></Router>)
	const element = screen.getByLabelText(/model/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('INPUT')
	expect(element).toHaveAttribute('type', 'text')
	expect(element).toHaveClass('page-field')
})

test('renders type field', () => {
	render(<Router><Battery/></Router>)
	const element = screen.getByLabelText(/type/i)
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('SELECT')
	expect(element).toHaveClass('page-field')
})

test('renders update button', () => {
	render(<Router><Battery/></Router>);
	const element = screen.getByText('Update')
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('BUTTON')
})

test('renders save button', () => {
	render(
		<Router initialEntries={[AppPath.BATTERY + '/new']}>
			<Routes>
				<Route exact path={AppPath.BATTERY + '/:id'} element={<Battery/>}/>
			</Routes>
		</Router>
	)

	const element = screen.getByText('Save')
	expect(element).toBeInTheDocument()
	expect(element.nodeName).toBe('BUTTON')
})
