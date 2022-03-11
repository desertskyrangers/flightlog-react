import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import Times from "./util/Times";

export default function UserBatteries() {

	const [batteries, setBatteries] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	let list;
	if (!!batteries) {
		list = <BatteryList batteries={batteries}/>
	} else {
		list = <Loading/>
	}

	function loadBatteryPage(page) {
		UserService.getBatteryPage(page, (success) => {
			setBatteries(success.batteries)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadBatteryPage(page), [page])

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

function BatteryList(props) {
	const navigate = useNavigate();

	let page
	if (props.batteries.length === 0) {
		page = <NoResults message='No batteries found'/>
	} else {
		page = <table className='flight-list'>
			<tbody>
			{props.batteries.map((craft) => <BatteryRow key={craft.id} value={craft.id} battery={craft}/>)}
			</tbody>
		</table>
	}

	function add() {
		navigate(AppPath.BATTERY + "/new")
	}

	return (
		<div className='vbox'>
			<button className='page-action' onClick={add}>Add an Battery</button>
			{page}
		</div>
	)

}

function BatteryRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.BATTERY + "/" + props.battery.id)
	}

	return (
		<tr onClick={open}>
			<td>{Icons.fromBatteryStatusAndLife(props.battery.status, props.battery.life)} {props.battery.name}</td>
			<td>{props.battery.flightCount}</td>
			<td>{Times.toMinSec(props.battery.flightTime)}</td>
		</tr>
	)

}
