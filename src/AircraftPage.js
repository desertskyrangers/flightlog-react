import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import AircraftApi from "./api/AircraftService";
import Icons from "./Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";

export default function AircraftPage() {

	const [aircraft, setAircraft] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	let list;
	if (!!aircraft) {
		list = <AircraftList aircraft={aircraft}/>
	} else {
		list = <Loading/>
	}

	function loadAircraft(page) {
		AircraftApi.getAircraftPage(page, (success) => {
			setAircraft(success.aircraft)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => {
		if (!aircraft) loadAircraft(page)
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

function AircraftList(props) {
	const navigate = useNavigate();


	let page
	if (props.aircraft.length === 0) {
		page = <NoResults message='No aircraft found'/>
	} else {
		page = props.aircraft.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)
	}

	function add() {
		navigate(AppPath.AIRCRAFT + "/new")
	}

	return (
		<div className='page-spaced'>
			{page}
			<button className='page-submit' onClick={add}>Add an Aircraft</button>
		</div>
	)

}

function AircraftRow(props) {

	const type = {
		fixedwing: 'PLANE',
		helicopter: 'HELICOPTER',
		multirotor: 'DRONE',
		other: 'DRONE'
	}

	function open() {
		console.log("Open aircraft...")
	}

	const icon = Icons[type[props.aircraft.type]]

	return (
		<div className='page-result' onClick={open}>{icon} {props.aircraft.name}</div>
	)

}

