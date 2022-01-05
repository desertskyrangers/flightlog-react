import React from "react";
import ApiPath from "./api/ApiPath";
import {useNavigate} from "react-router-dom";

export default function Setup(props) {
	const navigate = useNavigate();

	return (
		<SetupComponent navigate={navigate}/>
	);
}

class SetupComponent extends React.Component {

	profile = () => {
		this.props.navigate(ApiPath.PROFILE)
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-body'>
					<div className='login-form'>
						<button className='login-submit' onClick={this.timeFlight}>Aircraft</button>
						<button className='login-submit' onClick={this.planFlight}>Batteries</button>
					</div>
				</div>
			</div>
		)
	}

}
