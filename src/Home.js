import React from "react";
import AuthService from "./api/AuthService";

export default function Home(props) {
	return (
		<HomeComponent/>
	);
}

class HomeComponent extends React.Component {


	timeFlight = () => {
	}

	planFlight = () => {
	}

	logout = () => {
		AuthService.logout( () => {
			window.location.assign('/')
		})
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='/logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<div className='login-form'>
						<button className='login-submit' onClick={this.timeFlight}>Time a Flight</button>
						<button className='login-submit' onClick={this.planFlight}>Plan a Flight</button>
						<button className='login-submit' onClick={this.logout}>Logout</button>
					</div>
				</div>
			</div>
		);
	}

}
