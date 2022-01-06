import React from "react";
import ApiPath from "./api/ApiPath";
import {useNavigate} from "react-router-dom";

export default function SetupActions(props) {
	const navigate = useNavigate();

	function aircraft() {
		navigate(ApiPath.SETUP)
	}

	function batteries() {
		navigate(ApiPath.SETUP)
	}

	return (
		<div className='login-container'>
			<div className='login-body'>
				<div className='login-form'>
					<button className='login-submit' onClick={aircraft}>Aircraft</button>
					<button className='login-submit' onClick={batteries}>Batteries</button>
				</div>
			</div>
		</div>
	)

}
