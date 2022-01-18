import EntryField from "../part/EntryField";
import Notice from "../part/Notice";
import Icons from "../util/Icons";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../api/UserService";
import EntrySelect from "../part/EntrySelect";
import AppConfig from "../AppConfig";
import {isEqual} from "lodash";
import FlightService from "../api/FlightService";
import Dates from "../util/Dates";
import AppPath from "../AppPath";

export default function Flight(props) {

	const navigate = useNavigate();

	const paramTimestamp = useParams().timestamp
	const paramDuration = useParams().duration

	const [id, setId] = useState(props.id || '')
	const [pilot, setPilot] = useState(props.pilot || '')
	const [unlistedPilot, setUnlistedPilot] = useState(props.unlistedPilot || '')
	const [observer, setObserver] = useState(props.observer || '')
	const [unlistedObserver, setUnlistedObserver] = useState(props.unlistedObserver || '')
	const [aircraft, setAircraft] = useState(props.aircraft || '')
	const [battery, setBattery] = useState(props.battery || '')
	const [startTime, setStartTime] = useState(props.startTime || '')
	const [duration, setDuration] = useState(paramDuration || '')
	const [notes, setNotes] = useState(props.notes || '')
	//const [locationOptions, setLocationOptions] = useState([])
	const [messages, setMessages] = useState([])

	// Options
	const [pilotOptions, setPilotOptions] = useState([])
	const [observerOptions, setObserverOptions] = useState([])
	const [aircraftOptions, setAircraftOptions] = useState([])
	const [batteryOptions, setBatteryOptions] = useState([])

	// Actions
	const [requestDelete, setRequestDelete] = useState(false)
	const [canSave, setCanSave] = useState(false)

	// References
	const idRef = useRef(useParams().id)
	const paramTimestampRef = useRef(new Date(Number.parseInt(paramTimestamp)))
	const previousMessages = useRef(messages)
	const timestamp = useRef(props.timestamp)
	const isNewRef = useRef(idRef.current === 'new')

	// Method references
	const setTimestampRef = useRef(setTimestamp)

	function goToUserFlights() {
		navigate(AppPath.USER_FLIGHTS)
	}

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function clearMessages() {
		setMessages([])
	}

	function toggleDelete() {
		setRequestDelete(!requestDelete)
	}

	function loadPilotOptions() {
		UserService.getPilotOptions((result) => {
			setPilotOptions(result)
			setPilot(result[0].id)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadObserverOptions() {
		UserService.getObserverOptions((result) => {
			setObserverOptions(result)
			setObserver(result[0].id)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadAircraftOptions() {
		UserService.getAircraftOptions((result) => {
			setAircraftOptions(result)
			if (!!result && result.length > 0) setAircraft(result[0].id)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadBatteryOptions() {
		UserService.getBatteryOptions((result) => {
			setBatteryOptions(result)
			if (!!result && result.length > 0) setBattery(result[0].id)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadFlight() {
		if (isNewRef.current) {
			setTimestampRef.current(Dates.isValidDate(paramTimestampRef.current) ? paramTimestampRef.current : new Date())
		} else {
			FlightService.getFlight(idRef.current, (result) => {
				setId(result.flight.id)
				setPilot(result.flight.pilot || '')
				setUnlistedPilot(result.flight.unlistedPilot || '')
				setObserver(result.flight.observer || '')
				setUnlistedObserver(result.flight.unlistedObserver || '')
				setAircraft(result.flight.aircraft || '')
				setBattery(result.flight.battery || '')
				setTimestampRef.current(result.flight.timestamp ? new Date(result.flight.timestamp) : new Date())
				setDuration(result.flight.duration || '')
				setNotes(result.flight.notes || '')
			}, (failure) => {
				let messages = failure.messages
				if (!!!messages) messages = [failure.message]
				if (!!messages) setMessages(messages)
			})
		}
	}

	function update() {
		FlightService.updateFlight({
			id: idRef.current,
			pilot: pilot,
			unlistedPilot: unlistedPilot,
			observer: observer,
			unlistedObserver: unlistedObserver,
			aircraft: aircraft,
			battery: battery,
			timestamp: timestamp.current.getTime(),
			duration: duration,
			notes: notes,
		}, (result) => {
			goToUserFlights()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function doDelete() {
		FlightService.deleteFlight(id, (result) => {
			goToUserFlights()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function setTimestamp(value) {
		timestamp.current = value
		setStartTime(Dates.isoDateHourMin(new Date(value)))
	}

	function updateStartTime(value) {
		setTimestamp(new Date(String(value)))
	}

	/* This should only be called from field.onChange */
	function doSetStartTime() {
		setTimestamp(new Date())
	}

	function doSetDuration() {
		if (!startTime) {
			setMessages(['Start time not set'])
		} else {
			setMessages([])
			setDuration(Math.floor((new Date() - new Date(String(startTime))) / 1000))
		}
	}

	useLayoutEffect(() => {
		const validPilot = !!pilot && pilot !== ''
		const validObserver = !!observer && observer !== ''
		const validAircraft = !!aircraft && aircraft !== ''
		const validTimestamp = !startTime || String(startTime).match(AppConfig.TIMESTAMP_PATTERN) != null
		const validDuration = !duration || String(duration).match(AppConfig.DURATION_PATTERN) != null

		let messages = [];
		if (!validPilot) messages.push('Invalid pilot')
		if (!validObserver) messages.push('Invalid observer')
		if (!validAircraft) messages.push('Invalid aircraft')
		if (!validTimestamp) messages.push('Invalid start time: ' + startTime)
		if (!validDuration) messages.push('Invalid duration')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages)
		previousMessages.current = messages

		setCanSave(validPilot && validObserver && validAircraft && validTimestamp && validDuration)
	}, [pilot, observer, aircraft, startTime, duration])

	useEffect(() => loadPilotOptions(), [])
	useEffect(() => loadObserverOptions(), [])
	useEffect(() => loadAircraftOptions(), [])
	useEffect(() => loadBatteryOptions(), [])
	useEffect(() => loadFlight(), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntrySelect id='pilot' text='Pilot' value={pilot} required onChange={(event) => setPilot(event.target.value)} labelActionIcon={Icons.CLOSE} onLabelAction={close}>
						{pilotOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					{pilot === AppConfig.UNLISTED_USER_ID ? <EntryField id='unlistedPilot' text='Unlisted Pilot' type='text' value={unlistedPilot} onChange={(event) => setUnlistedPilot(event.target.value)}/> : null}
					<EntrySelect id='observer' text='Observer' value={observer} required onChange={(event) => setObserver(event.target.value)}>
						{observerOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					{observer === AppConfig.UNLISTED_USER_ID ? <EntryField id='unlistedObserver' text='Unlisted Observer' type='text' value={unlistedObserver} onChange={(event) => setUnlistedObserver(event.target.value)}/> : null}

					<EntrySelect id='aircraft' text='Aircraft' value={aircraft} required onChange={(event) => setAircraft(event.target.value)}>
						{aircraftOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					<EntrySelect id='battery' text='Battery' value={battery} onChange={(event) => setBattery(event.target.value)}>
						{batteryOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntryField id='startTime'
											text='Start time'
											type='datetime-local'
											value={startTime}
											required
											onChange={(event) => updateStartTime(event.target.value)}
											onKeyDown={onKeyDown}
											fieldActionIcon={Icons.CALENDAR}
											onFieldAction={doSetStartTime}/>
					<EntryField id='duration' text='Duration (sec)' type='number' min='0' value={duration} onChange={(event) => setDuration(event.target.value)} onKeyDown={onKeyDown} fieldActionIcon={Icons.CLOCK} onFieldAction={doSetDuration}/>
					<EntryField id='notes' text='Notes' type='area' value={notes} onChange={(event) => setNotes(event.target.value)} onKeyDown={onKeyDown}/>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNewRef.current ? null : <button className='icon-button' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE_UP : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={!canSave} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ?
						<DeleteWithConfirm entity='date of the flight' placeholder={Dates.isoDate(new Date(timestamp.current))} name={Dates.isoDate(new Date(timestamp.current))} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}
				</div>
			</div>
		</div>
	)

}
