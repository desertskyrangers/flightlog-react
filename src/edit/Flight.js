import EntryField from "../part/EntryField";
import Notice from "../part/Notice";
import Icons from "../Icons";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../api/UserService";
import EntrySelect from "../part/EntrySelect";
import AppConfig from "../AppConfig";
import {isEqual} from "lodash";
import FlightService from "../api/FlightService";

export default function Flight(props) {

	const navigate = useNavigate();

	const idParam = useParams().id;
	const isNew = idParam === 'new'

	const [id, setId] = useState(props.id || '')
	const [pilot, setPilot] = useState(props.pilot || '')
	const [unlistedPilot, setUnlistedPilot] = useState(props.unlistedPilot || '')
	const [observer, setObserver] = useState(props.observer || '')
	const [unlistedObserver, setUnlistedObserver] = useState(props.unlistedObserver || '')
	const [aircraft, setAircraft] = useState(props.aircraft || '')
	const [battery, setBattery] = useState(props.battery || '')
	const [startTime, setStartTime] = useState(props.startTime || '')
	const [duration, setDuration] = useState(props.duration || '')
	const [notes, setNotes] = useState(props.notes || '')

	// Not using locations yet
	//const [locationOptions, setLocationOptions] = useState([])

	const [messages, setMessages] = useState([])
	const [pilotOptions, setPilotOptions] = useState([])
	const [observerOptions, setObserverOptions] = useState([])
	const [aircraftOptions, setAircraftOptions] = useState([])
	const [batteryOptions, setBatteryOptions] = useState([])
	const [requestDelete, setRequestDelete] = useState(false)

	const [canSave, setCanSave] = useState(false)
	const previousMessages = useRef(messages)
	const timestamp = useRef(props.timestamp)

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

	function loadFlight(id) {
		if (isNew) {
			setTimestamp(new Date())
		} else {
			FlightService.getFlight(id, (result) => {
				setId(result.flight.id)
				setPilot(result.flight.pilot || '')
				setUnlistedPilot(result.flight.unlistedPilot)
				setObserver(result.flight.observer || '')
				setUnlistedObserver(result.flight.unlistedObserver)
				setAircraft(result.flight.aircraft || '')
				setBattery(result.flight.battery || '')
				setTimestamp(result.flight.timestamp ? new Date() : result.flight.timestamp)
				setDuration(result.flight.duration || '')
				setNotes(result.flight.notes || '')

				timestamp.current = result.flight.timestamp
			}, (failure) => {
				let messages = failure.messages
				if (!!!messages) messages = [failure.message]
				if (!!messages) setMessages(messages)
			})
		}
	}

	function update() {
		console.log("Update flight=" + id)
		FlightService.updateFlight({
			id: idParam,
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
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function doDelete() {
		console.log("Delete flight=" + id)
		FlightService.deleteFlight(id, (result) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function setTimestamp(value) {
		timestamp.current = value
		setStartTime(value.dateHourMin())
	}

	function updateStartTime(value) {
		timestamp.current = new Date(String(value))
		setStartTime(value)
	}

	function doSetStartTime() {
		setTimestamp(new Date())
	}

	function doSetDuration() {
		if (!startTime) {
			setMessages(['Start time not set'])
		} else {
			setMessages([])
			setDuration(Math.round((new Date() - new Date(String(startTime))) / 60000))
		}
	}

	useLayoutEffect(() => {
		const validPilot = !!pilot && pilot !== ''
		const validObserver = !!observer && observer !== ''
		const validAircraft = !!aircraft && aircraft !== ''
		const validTimestamp = !startTime || String(startTime).match(AppConfig.TIMESTAMP_PATTERN) != null
		const validDuration = !duration || String(duration).match(AppConfig.DURATION_PATTERN) != null

		//console.log("timestamp=" + startTime.toISOString())

		let messages = [];
		if (!validPilot) messages.push('Invalid pilot')
		if (!validObserver) messages.push('Invalid observer')
		if (!validAircraft) messages.push('Invalid aircraft')
		if (!validTimestamp) messages.push('Invalid start time')
		if (!validDuration) messages.push('Invalid duration')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages)
		previousMessages.current = messages

		setCanSave(validPilot && validObserver && validAircraft && validTimestamp && validDuration)
	}, [pilot, aircraft, startTime, duration])

	useEffect(() => loadPilotOptions(), [])
	useEffect(() => loadObserverOptions(), [])
	useEffect(() => loadAircraftOptions(), [])
	useEffect(() => loadBatteryOptions(), [])
	useEffect(() => loadFlight(idParam), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntrySelect id='pilot' text='Pilot' value={pilot} required onChange={(event) => setPilot(event.target.value)} labelActionIcon={Icons.CLOSE} onLabelAction={close}>
						{pilotOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					<EntrySelect id='observer' text='Observer' value={observer} required onChange={(event) => setObserver(event.target.value)}>
						{observerOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntrySelect id='aircraft' text='Aircraft' value={aircraft} required onChange={(event) => setAircraft(event.target.value)}>
						{aircraftOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					<EntrySelect id='battery' text='Battery' value={battery} onChange={(event) => setBattery(event.target.value)}>
						{batteryOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntryField id='startTime' text='Start time' type='datetime-local' value={startTime} required onChange={(event) => updateStartTime(event.target.value)} onKeyDown={onKeyDown} fieldActionIcon={Icons.CALENDAR} onFieldAction={doSetStartTime}/>
					<EntryField id='duration' text='Duration (mins)' type='number' min='0' value={duration} onChange={(event) => setDuration(event.target.value)} onKeyDown={onKeyDown} fieldActionIcon={Icons.CLOCK} onFieldAction={doSetDuration}/>
					<EntryField id='notes' text='Notes' type='area' value={notes} onChange={(event) => setNotes(event.target.value)} onKeyDown={onKeyDown}/>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNew ? null : <button className='icon-button' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE_UP : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={!canSave} className='page-submit' onClick={update}>{isNew ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='date of the flight' placeholder={new Date(timestamp.current).isoDate()} name={new Date(timestamp.current).isoDate()} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}
				</div>
			</div>
		</div>
	)

}
