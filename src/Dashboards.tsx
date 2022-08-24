import React, {useEffect, useState} from "react";
import Notice from "./part/Notice";
import UserService from "./api/UserService";
import Dashboard from "./Dashboard";
import GroupDashboard from "./GroupDashboard";

export default function Dashboards(props) {

	const [messages, setMessages] = useState(props.messages || [])
	const [user, setUser] = useState(props.user || {})
	const [memberships, setMemberships] = useState(props.memberships || [])
	const [dashboard, setDashboard] = useState(props.dashboard || <Dashboard messages={messages}/>)

	function loadProfile() {
		UserService.profile((result) => {
			setUser(result.account)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	function loadMemberships() {
		UserService.getMemberships((response) => {
			setMemberships(response.data)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	function clearMessages() {
		setMessages([])
	}

	function changeDashboard(event) {
		const index = event.target.selectedIndex
		const id = event.target.value

		clearMessages()

		if (index === 0) {
			setDashboard(<Dashboard setMessages={setMessages}/>)
		} else {
			setDashboard(<GroupDashboard id={id} setMessages={setMessages}/>)
		}

		console.log("dashboard change...")
		console.log("dashboard id=" + id)
	}

	useEffect(loadProfile, [])
	useEffect(loadMemberships, [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>

					<select id='dashboard' name='dashboard' value={props.value} className='page-field' onChange={changeDashboard} onKeyDown={props.onKeyDown}>
						<option key='self' value='self'>{user.name}</option>
						{memberships.map((membership) => <option key={membership.group.id} value={membership.group.id}>{membership.group.name}</option>)}
					</select>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>

					{dashboard}

				</div>
			</div>
		</div>
	)

}