import React from "react";

export default class Header extends React.Component {

	render() {
		return (
			<div>
				<div className='login-banner'>
					<img src='/logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
			</div>
		)
	}

}
