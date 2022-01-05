import React from "react";
import ApiPath from "./api/ApiPath";
import {useNavigate} from "react-router-dom";
import AuthService from "./api/AuthService";

export default function UserActions(props) {
	const navigate = useNavigate();

	return (
		<UserActionsComponent navigate={navigate}/>
	);
}

class UserActionsComponent extends React.Component {

	profile = () => {
		this.props.navigate(ApiPath.PROFILE)
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
				<div className='login-body'>
					<div className='login-form'>
						<button className='login-submit' onClick={this.profile}>Profile</button>
						<button className='login-submit' onClick={this.logout}>Logout</button>
					</div>
				</div>
			</div>
		)
	}

}
