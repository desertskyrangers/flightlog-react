import React from "react";
import AuthService from "./api/AuthService";
import ApiPath from "./api/ApiPath";
import {useNavigate} from "react-router-dom";

export default function Home(props) {
	const navigate = useNavigate();

	return (
		<HomeComponent navigate={navigate}/>
	);
}

class HomeComponent extends React.Component {


	timeFlight = () => {
	}

	planFlight = () => {
	}

	settings = () => {
		this.props.navigate(ApiPath.SETTINGS)
	}

	logout = () => {
		AuthService.logout(() => {
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			console.log("API logout error=" + JSON.stringify(messages))
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
						{/*<button className='login-submit' onClick={this.profile}>Profile</button>*/}
						<button className='login-submit' onClick={this.settings}>Settings</button>
						<button className='login-submit' onClick={this.logout}>Logout</button>
					</div>
				</div>
			</div>
		);
	}

}
