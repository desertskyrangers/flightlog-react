import React, {useEffect, useState} from "react"
import Times from "./util/Times"
import TokenService from "./api/TokenService"
import UserService from "./api/UserService"
import Notice from "./part/Notice"
import ApiPath from "./AppPath"
import AppPath from "./AppPath"
import {Link, useNavigate} from "react-router-dom"
import './css/dashboard.css'

export default function Dashboard(props) {

	const navigate = useNavigate()

	const [dashboard, setDashboard] = useState(props.dashboard || {
		pilotFlightCount: 0,
		pilotFlightTime: 0
	})

	const [messages, setMessages] = useState(props.messages || '')

	function clearMessages() {
		setMessages([])
	}

	function loadDashboard() {
		UserService.dashboard(TokenService.getUserId(), (result) => {
			setDashboard(result.dashboard)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	useEffect(loadDashboard, [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>

					<button className='page-action' onClick={() => navigate(ApiPath.FLIGHT_TIMER)}>Time a Flight</button>

					<div className='hbox'>
						<div className='vbox'>
							<div className='dashboard-header'>Flights</div>
							<div className='page-metric'>{dashboard.pilotFlightCount}</div>
						</div>
						<div className='v-separator'/>
						<div className='vbox'>
							<div className='dashboard-header'>Flight Time</div>
							<div className='page-metric'>{Times.toHourMinSec(dashboard.pilotFlightTime * 1000)}</div>
						</div>
					</div>

					{!!dashboard.observerFlightCount ?
						<div className='hbox'>
							<div className='vbox'>
								<div className='dashboard-header'>Observations</div>
								<div className='page-metric'>{dashboard.observerFlightCount}</div>
							</div>
							<div className='v-separator'/>
							<div className='vbox'>
								<div className='dashboard-header'>Observer Time</div>
								<div className='page-metric'>{Times.toHourMinSec(dashboard.observerFlightTime * 1000)}</div>
							</div>
						</div> : null}

					<button className='page-action' onClick={() => navigate(AppPath.FLIGHT + "/new")}>Log a Flight</button>

					{!!dashboard.aircraftStats ?
						<table className='stats'>
							<tbody>
							{dashboard.aircraftStats.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
							</tbody>
						</table>
						: null}
				</div>
			</div>
		</div>
	)

}

function AircraftRow(props) {

	return (
		<tr>
			<td><Link to={AppPath.AIRCRAFT + "/" + props.aircraft.id}>{props.aircraft.name}</Link></td>
			<td>{props.aircraft.flightCount}</td>
			<td>{Times.toHourMinSec(props.aircraft.flightTime * 1000)}</td>
		</tr>
	)

}
