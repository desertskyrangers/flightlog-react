import React from "react";
import AuthService from "./api/AuthService";
import ApiPath from "./api/ApiPath";
import {useNavigate} from "react-router-dom";
import NavBar from "./NavBar";

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
		this.props.navigate(ApiPath.SETUP)
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-body'>
					<div className='login-form'>
						<button className='login-submit' onClick={this.timeFlight}>Time a Flight</button>
						<button className='login-submit' onClick={this.planFlight}>Plan a Flight</button>
					</div>
				</div>
			</div>
		);
	}

}
