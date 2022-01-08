import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import AircraftApi from "./api/AircraftService";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
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
		page = <NoResults/>
	} else {
		page = props.aircraft.map((craft) => <AircraftRow key={craft.id} value={craft.id} icon={Icons.PLANE} name={craft.name}/>)
	}

	function add() {
		navigate(AppPath.AIRCRAFT + "/new")
	}

	return (
		<div>
			{page}
			<button className='page-submit' onClick={add}>Add an Aircraft</button>
		</div>
	)

}

function AircraftRow(props) {

	return (
		<div><FontAwesomeIcon icon={props.icon}/> {props.name}</div>
	)

}
