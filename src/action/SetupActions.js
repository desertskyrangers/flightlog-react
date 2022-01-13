import React from "react";
import ApiPath from "../AppPath";
import {useNavigate} from "react-router-dom";

export default function SetupActions(props) {
	const navigate = useNavigate();

	function aircraft() {
		navigate(ApiPath.USER_AIRCRAFT)
	}

	function batteries() {
		navigate(ApiPath.USER_BATTERIES)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<button className='page-action' onClick={aircraft}>Aircraft</button>
					<button className='page-action' onClick={batteries}>Batteries</button>
				</div>
			</div>
		</div>
	)

}
