import {useState} from "react";

export default function AircraftList() {

	const [aircraft,setAircraft] = useState()

	if( !aircraft ) {
		// Still loading
	} else if( aircraft.length === 0 ) {
		// No aircraft
	} else {
		// make a row for each aircraft
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div>Aircraft List</div>
			</div>
			<div className='page-body'>
				<div className='page-form'>
					<AircraftRow/>
				</div>
			</div>
		</div>
	)
}

function AircraftRow() {

	return (
		<div>Aircraft</div>
	)

}
