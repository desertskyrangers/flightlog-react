import React from "react";
import ApiPath from "../AppPath";
import {useNavigate} from "react-router-dom";
import AuthService from "../api/AuthService";

export default function UserActions() {
	const navigate = useNavigate();

	function logout() {
		AuthService.logout(() => {
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			console.log("API logout error=" + JSON.stringify(messages))
		})
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<button className='page-action' onClick={() => navigate(ApiPath.PROFILE)}>Profile</button>
					<button className='page-action' onClick={() => navigate(ApiPath.PASSWORD)}>Password</button>
					<button className='page-action' onClick={() => navigate(ApiPath.ABOUT)}>About</button>
					<div/>
					<button className='page-action' onClick={logout}>Logout</button>
				</div>
			</div>
		</div>
	)

}
