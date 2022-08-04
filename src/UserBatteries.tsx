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
	const [page, setPage] = useState()
	const [messages, setMessages] = useState([])

	let list;
	if (!!batteries) {
		list = <BatteryList page={page} batteries={batteries} loadBatteryPage={loadBatteryPage}/>
	} else {
		list = <Loading/>
	}

	function loadBatteryPage(page) {
		UserService.getBatteryPage(page, (success) => {
			console.log(JSON.stringify(success.page))
			setBatteries(success.page.content)
			setPage(success.page)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadBatteryPage(0), [])

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

	let content
	if (props.batteries.length === 0) {
		content = <NoResults message='No batteries found'/>
	} else {
		content = <table className='flight-list'>
			<tbody>
			{props.batteries.map((craft) => <BatteryRow key={craft.id} value={craft.id} battery={craft}/>)}
			</tbody>
		</table>
	}

	function add() {
		navigate(AppPath.BATTERY + "/new")
	}

	function prior() {
		props.loadBatteryPage(props.page.number - 1)
	}

	function next() {
		props.loadBatteryPage(props.page.number + 1)
	}

	return (
		<div className='vbox'>
			<div className='hbox'>
				<button className='page-action icon' onClick={prior} disabled={props.page.first}>&lt;</button>
				<button className='page-action main' onClick={add}>Add a Battery</button>
				<button className='page-action icon' onClick={next} disabled={props.page.last}>&gt;</button>
			</div>
			{content}
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
			<td className='no-wrap'>{Icons.fromBatteryStatusAndLife(props.battery.status, props.battery.life)} {props.battery.name}</td>
			<td>{props.battery.flightCount}</td>
			<td>{Times.toHourMinSec(props.battery.flightTime)}</td>
		</tr>
	)

}
