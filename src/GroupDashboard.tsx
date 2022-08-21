import Notice from "./part/Notice";
import React, {useEffect, useState} from "react";
import {FlightStats, FlightStatsHeader} from "./part/FlightStats";
import UserService from "./api/UserService";

export default function GroupDashboard(props) {

	const [dashboard, setDashboard] = useState(props.dashboard || {
		name: 'Desert Sky Rangers',
		flightCount: 0,
		flightTime: 0
	})

	const [messages, setMessages] = useState(props.messages || [])

	function clearMessages() {
		setMessages([])
	}

	function loadDashboards() {
		// UserService.groupDashboards((result) => {
		// 	setDashboard(result.dashboard)
		// }, (failure) => {
		// 	let messages = failure.messages
		// 	if (!!!messages) messages = [failure.message]
		// 	setMessages(messages)
		// })
	}

	useEffect(loadDashboards, [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					{/* TODO IF the user has not joined a group, show a link to join */}

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>

					{/* For each group make a section or a dropdown to select */}

					<h1 className='no-wrap'>{dashboard.name}</h1>
					{/*<button className='page-action' onClick={() => navigate(ApiPath.FLIGHT_TIMER)}>Time a Flight</button>*/}

					<table className='dashboard'>
						<tbody>
						<FlightStatsHeader/>
						<FlightStats count={dashboard.flightCount} time={dashboard.flightTime}/>
					{/*	{!!dashboard.observerFlightCount ? <ObserverStatsHeader/> : null}*/}
					{/*	{!!dashboard.observerFlightCount ? <ObserverStats count={dashboard.observerFlightCount} time={dashboard.observerFlightTime}/> : null}*/}
						</tbody>
					</table>

					{/*<button className='page-action' onClick={() => navigate(AppPath.FLIGHT + "/new")}>Log a Flight</button>*/}

					{/*{!!dashboard.aircraftStats ?*/}
					{/*	<table className='stats'>*/}
					{/*		<tbody>*/}
					{/*		{dashboard.aircraftStats.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}*/}
					{/*		</tbody>*/}
					{/*	</table>*/}
					{/*	: null}*/}

					{/*<LastFlight timestamp={dashboard.lastPilotFlightTimestamp}/>*/}
				</div>
			</div>
		</div>
	)
}