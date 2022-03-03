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

	const [messages, setMessages] = useState(props.messages || [])

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

					<table className='dashboard'>
						<tbody>
						<PilotStatsHeader/>
						<PilotStats count={dashboard.pilotFlightCount} time={dashboard.pilotFlightTime}/>
						{!!dashboard.observerFlightCount ? <ObserverStatsHeader/> : null}
						{!!dashboard.observerFlightCount ? <ObserverStats count={dashboard.observerFlightCount} time={dashboard.observerFlightTime}/> : null}
						</tbody>
					</table>

					<button className='page-action' onClick={() => navigate(AppPath.FLIGHT + "/new")}>Log a Flight</button>

					{!!dashboard.aircraftStats ?
						<table className='stats'>
							<tbody>
							{dashboard.aircraftStats.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
							</tbody>
						</table>
						: null}

					<WeeklyFlights></WeeklyFlights>
				</div>
			</div>
		</div>
	)

}

function PilotStatsHeader() {
	return (
		<tr>
			<td className='dashboard-header'>Flights</td>
			<td className='dashboard-header'>Flight Time</td>
		</tr>
	)
}

function PilotStats(props) {

	return (
		<tr>
			<td className='page-metric'>{props.count}</td>
			<td className='page-metric'>{Times.toHourMinSec(props.time)}</td>
		</tr>
	)

}

function ObserverStatsHeader() {
	return (
		<tr>
			<td className='dashboard-header'>Flights</td>
			<td className='dashboard-header'>Observer Time</td>
		</tr>
	)
}

function ObserverStats(props) {
	return (
		<tr>
			<td className='page-metric'>{props.count}</td>
			<td className='page-metric'>{Times.toHourMinSec(props.time)}</td>
		</tr>
	)
}

function AircraftRow(props) {

	return (
		<tr>
			<td><Link to={AppPath.AIRCRAFT + "/" + props.aircraft.id}>{props.aircraft.name}</Link></td>
			<td>{props.aircraft.flightCount}</td>
			<td>{Times.toHourMinSec(props.aircraft.flightTime)}</td>
		</tr>
	)

}

function WeeklyFlights(props) {
	const [flightCount] = useState(props.flightCount || 14)
	return (
		<div>Flights this week: {flightCount}</div>
	)
}
