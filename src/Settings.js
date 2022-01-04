import React from "react";
import ApiPath from "./api/ApiPath";
import {useNavigate} from "react-router-dom";

export default function Settings(props) {
	const navigate = useNavigate();

	return (
		<SettingsComponent navigate={navigate}/>
	);
}

class SettingsComponent extends React.Component {

	profile = () => {
		this.props.navigate(ApiPath.PROFILE)
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='/logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<div>Settings</div>
				</div>
				<div className='login-body'>
					<div className='login-form'>
						<button className='login-submit' onClick={this.profile}>Profile</button>
						<button className='login-submit' onClick={this.timeFlight}>Aircraft</button>
						<button className='login-submit' onClick={this.planFlight}>Batteries</button>
						<button className='login-submit' onClick={this.logout}>Flights</button>
					</div>
				</div>
			</div>
		)
	}

}
