import React, {useEffect, useState} from "react"
import Times from "./util/Times"
import UserService from "./api/UserService"
import Notice from "./part/Notice"
import ApiPath from "./AppPath"
import AppPath from "./AppPath"
import {Link, useNavigate} from "react-router-dom"
import './css/dashboard.css'
import Ago from "./part/Ago";
import {FlightStatsHeader, FlightStats} from "./part/FlightStats"

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
		UserService.dashboard((result) => {
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
						<FlightStatsHeader/>
						<FlightStats count={dashboard.pilotFlightCount} time={dashboard.pilotFlightTime}/>
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

					<LastFlight timestamp={dashboard.lastPilotFlightTimestamp}/>
				</div>
			</div>
		</div>
	)
}

function ObserverStatsHeader() {
	return (
		<tr>
			<td className='dashboard-header'>Flights</td>
			<td rowSpan={2}>
				<div className='v-separator'/>
			</td>
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

function LastFlight(props) {
	return (
		<table className='metrics'>
			<tbody>
			<tr>
				<td>Last flight:</td>
				<td><Ago timestamp={props.timestamp}/></td>
			</tr>
			</tbody>
		</table>
	)
}
