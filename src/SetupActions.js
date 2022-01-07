import React from "react";
import ApiPath from "./AppPath";
import {useNavigate} from "react-router-dom";

export default function SetupActions(props) {
	const navigate = useNavigate();

	function aircraft() {
		navigate(ApiPath.AIRCRAFT)
	}

	function batteries() {
		navigate(ApiPath.SETUP)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<button className='page-submit' onClick={aircraft}>Aircraft</button>
					<button className='page-submit' onClick={batteries}>Batteries</button>
				</div>
			</div>
		</div>
	)

}
