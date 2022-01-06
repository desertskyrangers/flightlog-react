import React from "react";

export default function FlightActions() {

	function timeFlight() {
	}

	function logFlight() {
	}

	function flightLog() {
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<button className='page-submit' onClick={timeFlight}>Time a Flight</button>
					<button className='page-submit' onClick={logFlight}>Log a Flight</button>
					<button className='page-submit' onClick={flightLog}>My Flight Log</button>
				</div>
			</div>
		</div>
	);

}
