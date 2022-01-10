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
					<button className='page-action' onClick={timeFlight}>Time a Flight</button>
					<button className='page-action' onClick={logFlight}>Log a Flight</button>
					<button className='page-action' onClick={flightLog}>My Flight Log</button>
				</div>
			</div>
		</div>
	);

}
