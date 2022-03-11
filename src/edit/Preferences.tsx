import React, {useEffect, useState} from "react";
import Icons from "../util/Icons";
import {useNavigate} from "react-router-dom";
import EntrySelect from "../part/EntrySelect";
import EntryCheck from "../part/EntryCheck";
import AppPath from "../AppPath";
import UserService from "../api/UserService";
import TokenService from "../api/TokenService";
import Notice from "../part/Notice";
import AppConfig from "../AppConfig";
import EntryLink from "../part/EntryLink";

export default function Preferences(props) {
	const navigate = useNavigate();

	const [preferences, setPreferences] = useState(props.preferences || {
		showObserverStats: false,
		showAircraftStats: false,
		enablePublicDashboard: false,
		showPublicObserverStats: false,
		showPublicAircraftStats: false,
		flightListView: 'week',
		showObserverFlights: false,
		showOwnerFlights: false
	})

	const [messages, setMessages] = useState(props.messages || [])

	function close() {
		navigate(AppPath.USER)
	}

	function clearMessages() {
		setMessages([])
	}

	function loadPreferences() {
		UserService.getPreferences((success) => {
			setPreferences(p => {
				return {...p, ...success.data}
			})
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function updatePreference(name: string, value: Object) {
		UserService.setPreferences(TokenService.getUserId(), {...preferences, ...{[name]: value}}, (success) => {
			setPreferences({...preferences, ...success.data})
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function copyToClipboard(content: string) {
		return navigator.clipboard.writeText(content)
	}

	useEffect(loadPreferences, [])

	const dashboardIdUrl = AppConfig.APP_URL + AppPath.DASHBOARD + "/" + TokenService.getUserId()
	const dashboardUsernameUrl = AppConfig.APP_URL + AppPath.DASHBOARD + "/" + preferences.username

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<div className='hbox'>
						<div className='page-header'>Preferences</div>
						<span className='icon' onClick={close}>{Icons.CLOSE}</span>
					</div>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>

					<PreferenceSection preferences={preferences} title='Private Dashboard'>
						<EntryCheck
							id='show-observer-stats'
							text='Show observer statistics'
							checked={preferences.showObserverStats}
							onChange={() => {
								updatePreference('showObserverStats', !preferences.showObserverStats)
							}}
						/>
						<EntryCheck
							id='show-aircraft-stats'
							text='Show aircraft statistics'
							checked={preferences.showAircraftStats}
							onChange={() => {
								updatePreference('showAircraftStats', !preferences.showAircraftStats)
							}}
						/>
					</PreferenceSection>
					<PreferenceSection preferences={preferences} title='Public Dashboard'>
						<EntryCheck
							id='enable-public-dashboard'
							text='Enable public dashboard'
							checked={preferences.enablePublicDashboard}
							onChange={() => {
								updatePreference('enablePublicDashboard', !preferences.enablePublicDashboard)
							}}
						/>
						{preferences.enablePublicDashboard ? <EntryLink to={dashboardIdUrl} value='Forever Link' fieldActionIcon={Icons.COPY} fieldActionTitle='Copy Link' onFieldAction={() => {
							copyToClipboard(dashboardIdUrl)
						}}/> : null}
						{preferences.enablePublicDashboard ? <EntryLink to={dashboardUsernameUrl} value='Username Link' fieldActionIcon={Icons.COPY} fieldActionTitle='Copy Link' onFieldAction={() => {
							copyToClipboard(dashboardUsernameUrl)
						}}/> : null}
						<EntryCheck
							id='show-public-observer-stats'
							text='Show observer statistics'
							checked={preferences.showPublicObserverStats}
							onChange={() => {
								updatePreference('showPublicObserverStats', !preferences.showPublicObserverStats)
							}}
						/>
						<EntryCheck
							id='show-public-aircraft-stats'
							text='Show aircraft statistics'
							checked={preferences.showPublicAircraftStats}
							onChange={() => {
								updatePreference('showPublicAircraftStats', !preferences.showPublicAircraftStats)
							}}
						/>
					</PreferenceSection>
					<PreferenceSection preferences={preferences} title='Flights'>
						<EntrySelect id='flight-list-view' text='Flight list' value={preferences.flightListView} onChange={(event) => updatePreference('flightListView', event.target.value)}>
							<option key='month' value='month'>Show last month of flights</option>
							<option key='week' value='week'>Show last week of flights</option>
							<option key='day' value='day'>Show last day of flights</option>
							<option key='20' value='20'>Show last 20 flights</option>
							<option key='10' value='10'>Show last 10 flights</option>
							<option key='1' value='1'>Show last 1 flight</option>
						</EntrySelect>
						<EntryCheck
							id='show-observer-flights'
							text='Show observer flights'
							checked={preferences.showObserverFlights}
							onChange={() => {
								updatePreference('showObserverFlights', !preferences.showObserverFlights)
							}}
						/>
						<EntryCheck
							id='show-owner-flights'
							text='Show owner flights'
							checked={preferences.showOwnerFlights}
							onChange={() => {
								updatePreference('showOwnerFlights', !preferences.showOwnerFlights)
							}}
						/>
					</PreferenceSection>
				</div>
			</div>
		</div>
	)

}

function PreferenceSection(props) {

	const [expanded, setExpanded] = useState(props.expanded || false)

	return (
		<div className={'vbox'}>
			<div className={'page-section'} onClick={() => setExpanded(!expanded)}>
				<div className='page-header'>{props.title}</div>
				<span className='icon'>{expanded ? Icons.COLLAPSE : Icons.EXPAND}</span>
			</div>
			{expanded ? props.children : null}
		</div>
	)

}
