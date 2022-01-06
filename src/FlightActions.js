import React from "react";
import {useNavigate} from "react-router-dom";

export default function FlightActions(props) {

	const navigate = useNavigate();

	function timeFlight() {
	}

	function logFlight() {
	}

	function flightLog() {
	}

	return (
		<div className='login-container'>
			<div className='login-body'>
				<div className='login-form'>
					<button className='login-submit' onClick={timeFlight}>Time a Flight</button>
					<button className='login-submit' onClick={logFlight}>Log a Flight</button>
					<button className='login-submit' onClick={flightLog}>My Flight Log</button>
				</div>
			</div>
		</div>
	);

}
