import React from "react";

export default class VerifyAccountEmail extends React.Component {

	render() {
		return (
			<div className='signup-container'>
				<div className='signup-banner'>
					<img src='logo192.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='signup-body'>
					<div>Verifying email address...</div>
					<div>This functionality is not complete and does not create an account yet!</div>
				</div>
			</div>
		)
	}

}