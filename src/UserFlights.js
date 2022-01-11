import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";

export default function UserAircraft() {

	const [flights] = useState()
	const [page] = useState(0)
	const [messages] = useState([])

	let list;
	if (!!flights) {
		list = <FlightList flight={flights}/>
	} else {
		list = (
			<div>
				<div>Flight List</div>
				<Loading/>
			</div>
		)
	}

	function loadFlightPage(page) {
		// UserService.getFlightPage(page, (success) => {
		// 	setFlights(success.flight)
		// }, (failure) => {
		// 	let messages = failure.messages
		// 	if (!!!messages) messages = [failure.message]
		// 	if (!!messages) setMessages(messages)
		// })
	}

	useEffect(() => {
		if (!flights) loadFlightPage(page)
	})

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					{list}
					<Notice messages={messages}/>
				</div>
			</div>
		</div>
	)
}

function FlightList(props) {
	const navigate = useNavigate();

	let page
	if (props.flight.length === 0) {
		page = <NoResults message='No flight found'/>
	} else {
		page = props.flight.map((craft) => <FlightRow key={craft.id} value={craft.id} flight={craft}/>)
	}

	function add() {
		navigate(AppPath.AIRCRAFT + "/new")
	}

	return (
		<div className='vbox'>
			{page}
			<button className='page-action' onClick={add}>Add a Flight</button>
		</div>
	)

}

function FlightRow(props) {

	const navigate = useNavigate();

	const type = {
		fixedwing: 'PLANE',
		helicopter: 'HELICOPTER',
		multirotor: 'DRONE',
		other: 'DRONE'
	}

	function open() {
		console.log("Open flight...")
		navigate(AppPath.AIRCRAFT + "/" + props.flight.id)
	}

	const icon = Icons[type[props.flight.type]]

	return (
		<div className='page-result' onClick={open}>{icon} {props.flight.name}</div>
	)

}
