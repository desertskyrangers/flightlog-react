import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import Times from "./util/Times";

export default function UserAircraft() {

	const [aircraft, setAircraft] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	let list;
	if (!!aircraft) {
		list = <AircraftList aircraft={aircraft}/>
	} else {
		list = <Loading/>
	}

	function loadAircraftPage(page) {
		UserService.getAircraftPage(page, (success) => {
			setAircraft(success.page.content)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadAircraftPage(page), [page])

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

function AircraftList(props) {
	const navigate = useNavigate();

	let page
	if (props.aircraft.length === 0) {
		page = <NoResults message='No aircraft found'/>
	} else {
		page = <table className='flight-list'>
			<tbody>
			{props.aircraft.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
			</tbody>
		</table>
	}

	function add() {
		navigate(AppPath.AIRCRAFT + "/new")
	}

	return (
		<div className='vbox'>
			<button className='page-action' onClick={add}>Add an Aircraft</button>
			{page}
		</div>
	)

}

function AircraftRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.AIRCRAFT + "/" + props.aircraft.id)
	}

	return (
		<tr onClick={open}>
			<td>{Icons.fromAircraftTypeAndStatus(props.aircraft.type, props.aircraft.status)} {props.aircraft.name}</td>
			<td>{props.aircraft.flightCount}</td>
			<td>{Times.toHourMinSec(props.aircraft.flightTime)}</td>
		</tr>
	)

}
