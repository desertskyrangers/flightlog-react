import React, {useEffect, useState} from "react";
import Times from "./util/Times";
import TokenService from "./api/TokenService";
import UserService from "./api/UserService";
import Notice from "./part/Notice";
import ApiPath from "./AppPath";
import AppPath from "./AppPath";
import {useNavigate} from "react-router-dom";

export default function Dashboard(props) {

	const navigate = useNavigate()

	const [pilotFlightCount, setPilotFlightCount] = useState(props.pilotFlightCount || 0)
	const [pilotFlightTime, setPilotFlightTime] = useState(props.pilotFlightTime || 0)
	const [messages, setMessages] = useState(props.messages || '')

	function clearMessages() {
		setMessages([])
	}

	function loadDashboard() {
		UserService.dashboard(TokenService.getUserId(), (result) => {
			setPilotFlightCount(result.dashboard.pilotFlightCount)
			setPilotFlightTime(result.dashboard.pilotFlightTime)
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
					<div className='hbox'>
						<div className='vbox'>
							<div className='page-header'>Flights</div>
							<div className='page-metric'>{pilotFlightCount}</div>
						</div>
						<div className='v-separator'/>
						<div className='vbox'>
							<div className='page-header'>Flight Time</div>
							<div className='page-metric'>{Times.toHourMinSec(pilotFlightTime * 1000)}</div>
						</div>
					</div>

					<button className='page-action' onClick={() => navigate(ApiPath.FLIGHT_TIMER)}>Time a Flight</button>
					<button className='page-action' onClick={() => navigate(AppPath.FLIGHT + "/new")}>Log a Flight</button>

				</div>
			</div>
		</div>
	)

}
