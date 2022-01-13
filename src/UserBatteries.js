import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";

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

	useEffect(() => {
		if (!batteries) loadBatteryPage(page)
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

function BatteryList(props) {
	const navigate = useNavigate();

	let page
	if (props.batteries.length === 0) {
		page = <NoResults message='No batteries found'/>
	} else {
		page = props.batteries.map((craft) => <BatteryRow key={craft.id} value={craft.id} battery={craft}/>)
	}

	function add() {
		navigate(AppPath.BATTERY + "/new")
	}

	return (
		<div className='vbox'>
			{page}
			<button className='page-action' onClick={add}>Add an Battery</button>
		</div>
	)

}

function BatteryRow(props) {

	const navigate = useNavigate();

	function open() {
		console.log("Open battery...")
		navigate(AppPath.BATTERY + "/" + props.battery.id)
	}

	return (
		<div className='page-result' onClick={open}>{Icons.BATTERY} {props.battery.name}</div>
	)

}
