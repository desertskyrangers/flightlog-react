import React, {useEffect, useState} from "react";
import {FlightStats, FlightStatsHeader} from "./part/FlightStats";
import GroupService from "./api/GroupService";

export default function GroupDashboard(props) {

	const [dashboard, setDashboard] = useState(props.dashboard || {
		flightCount: 0,
		flightTime: 0
	})

	function loadDashboards() {
		GroupService.dashboard(props.id, (result) => {
			setDashboard(result.dashboard)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			props.setMessages(messages)
		})
	}

	useEffect(loadDashboards, [props])

	return (
		<div className='page-form-content'>

			{/* TODO IF the user has not joined a group, show a link to join */}

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
	)
}