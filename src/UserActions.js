import React from "react";
import ApiPath from "./AppPath";
import {useNavigate} from "react-router-dom";
import AuthService from "./api/AuthService";

export default function UserActions() {
	const navigate = useNavigate();

	function profile() {
		navigate(ApiPath.PROFILE)
	}

	function logout() {
		AuthService.logout(() => {
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			console.log("API logout error=" + JSON.stringify(messages))
		})
	}

	function about() {
		navigate(ApiPath.ABOUT)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<button className='page-submit' onClick={profile}>Profile</button>
					<button className='page-submit' onClick={logout}>Logout</button>
					<button className='page-submit' onClick={about}>About</button>
				</div>
			</div>
		</div>
	)

}
