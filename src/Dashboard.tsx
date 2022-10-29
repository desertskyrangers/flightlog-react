import React, {useEffect, useState} from "react"
import Times from "./util/Times"
import UserService from "./api/UserService"
import ApiPath from "./AppPath"
import AppPath from "./AppPath"
import {Link, useNavigate} from "react-router-dom"
import './css/dashboard.css'
import Ago from "./part/Ago";
import {FlightStats, FlightStatsHeader} from "./part/FlightStats"
import Icons from "./util/Icons";
import GroupService from "./api/GroupService";

export default function Dashboard(props) {
	const navigate = useNavigate()

	const [dashboard, setDashboard] = useState(props.dashboard || {
		pilotFlightCount: 0,
		pilotFlightTime: 0
	})

	function loadDashboard() {
		UserService.dashboard((result) => {
			setDashboard(result.data)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			props.setMessages(messages)
		})
	}

	function groupCallout(groupId) {
		GroupService.callout(groupId, (result) => {
			let messages = result.messages
			if (!!!messages) messages = [result.message]
			props.setMessages(messages, 'info')
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			props.setMessages(messages)
		})
	}

	function groupCalloutChange(event) {
		if (event.target.value === 'callout') return
		groupCallout(event.target.value)
	}

	useEffect(loadDashboard, [props])

	const groupCount = !!!dashboard.groups ? 0 : dashboard.groups.length

	let callout = <button className='page-action' disabled={groupCount === 0} onClick={() => groupCallout(dashboard.groups[0].id)}>{Icons.CALLOUT} Callout</button>
	if (groupCount > 1) callout = <select id='groupCallout' name='groupCallout' className='page-field' onChange={groupCalloutChange} onKeyDown={props.onKeyDown}>
		<option key='callout' value='callout'>Callout</option>
		{dashboard.groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
	</select>

	return (
		<div className='page-form-content'>

			<table className='dashboard'>
				<tbody>
				<FlightStatsHeader/>
				<FlightStats count={dashboard.pilotFlightCount} time={dashboard.pilotFlightTime}/>
				{!!dashboard.observerFlightCount ? <ObserverStatsHeader/> : null}
				{!!dashboard.observerFlightCount ? <ObserverStats count={dashboard.observerFlightCount} time={dashboard.observerFlightTime}/> : null}
				</tbody>
			</table>

			<div className='hbox'>
				{callout}
			</div>
			<div className='hbox'>
				<button className='page-action' onClick={() => navigate(ApiPath.FLIGHT_TIMER)}>{Icons.TIMER}</button>
				<button className='page-action' onClick={() => navigate(AppPath.FLIGHT + "/new")}>{Icons.LOG}</button>
			</div>

			{!!dashboard.aircraftStats ?
				<table className='stats'>
					<tbody>
					{dashboard.aircraftStats.map((craft) => <AircraftRow key={craft.id} value={craft.id} aircraft={craft}/>)}
					</tbody>
				</table>
				: null}

			<Location/>

			<LastFlight timestamp={dashboard.pilotLastFlightTimestamp}/>
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
			<td className='page-metric'>{Times.toSummaryFlightTime(props.time)}</td>
		</tr>
	)
}

function AircraftRow(props) {
	return (
		<tr>
			<td>
				<span style={{'color': props.aircraft.trimColor, 'backgroundColor': props.aircraft.baseColor, 'padding': '0.2rem', 'borderRadius': '0.2rem', 'display': 'inline-block'}}>
					{Icons.fromAircraftTypeAndStatus(props.aircraft.type, props.aircraft.status)}
				</span>
			</td>
			<td><Link to={AppPath.AIRCRAFT + "/" + props.aircraft.id}>{props.aircraft.name}</Link></td>
			<td>{props.aircraft.flightCount}</td>
			<td>{Times.toSummaryFlightTime(props.aircraft.flightTime)}</td>
		</tr>
	)
}

function Location(props) {

	const [latitude, setLatitude] = useState(props.latitude || "")
	const [accuracy, setAccuracy] = useState(props.accuracy || "")
	const [longitude, setLongitude] = useState(props.longitude || "")
	const [altitude, setAltitude] = useState(props.altitude || "")
	const [altitudeAccuracy, setAltitudeAccuracy] = useState(props.altitudeAccuracy || "")

	function onSuccess(position) {
		setLatitude(position.coords.latitude)
		setLongitude(position.coords.longitude)
		setAccuracy(position.coords.accuracy)
		setAltitude(position.coords.altitude)
		setAltitudeAccuracy(position.coords.altitudeAccuracy)
	}

	function onError() {
	}

	function setup() {
		navigator.geolocation.getCurrentPosition(onSuccess, onError)
	}

	useEffect(setup)

	return (
		<div>
			<div>Lat: {latitude}</div>
			<div>Lon: {longitude}</div>
			<div>Acc: {accuracy} m</div>
			<div>Alt: {altitude}</div>
			<div>Acc: {altitudeAccuracy} m</div>
		</div>
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
