import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import Dates from "./util/Dates";

export default function UserFlights() {

	const [flights, setFlights] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	function clearMessages() {
		setMessages([])
	}

	let list;
	if (!!flights) {
		list = <FlightList flights={flights}/>
	} else {
		list = <Loading/>
	}

	function loadFlightPage(page) {
		UserService.getFlightPage(page, (success) => {
			setFlights(success.flights)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadFlightPage(page), [page])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					{list}
					<Notice messages={messages} clearMessages={clearMessages}/>
				</div>
			</div>
		</div>
	)
}

function FlightList(props) {
	const navigate = useNavigate();

	let page
	if (props.flights.length === 0) {
		page = <NoResults message='No flight found'/>
	} else {
		page = props.flights.map((flight) => <FlightRow key={flight.id} value={flight.id} flight={flight}/>)
	}

	function add() {
		navigate(AppPath.FLIGHT + "/new")
	}

	return (
		<div className='vbox'>
			<button className='page-action' onClick={add}>Log a Flight</button>
			{page}
		</div>
	)

}

function FlightRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.FLIGHT + "/" + props.flight.id)
	}

	return (
		<div className='page-result' onClick={open}>{Icons.fromUserFlightRole(props.flight.userFlightRole)} {Dates.humanDateHourMin(new Date(props.flight.timestamp))} {props.flight.name}</div>
	)

}
