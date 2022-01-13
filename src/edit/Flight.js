// import {useNavigate, useParams} from "react-router-dom";
// import {useState} from "react";

import EntryField from "../part/EntryField";
import Notice from "../part/Notice";
import Icons from "../Icons";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import UserService from "../api/UserService";
import EntrySelect from "../part/EntrySelect";

export default function Flight(props) {

	const navigate = useNavigate();

	const idParam = useParams().id;

	const [id, setId] = useState(props.id || '')
	const [aircraft, setAircraft] = useState(props.aircraft || '')
	const [battery, setBattery] = useState()
	const [startTime, setStartTime] = useState()
	const [duration, setDuration] = useState()

	// Not using locations yet
	//const [locationOptions, setLocationOptions] = useState([])

	const [messages, setMessages] = useState([])
	const [aircraftOptions, setAircraftOptions] = useState([])
	const [batteryOptions, setBatteryOptions] = useState([])
	const [requestDelete, setRequestDelete] = useState(false)

	const [canSave, setCanSave] = useState(false)
	const previousMessages = useRef(messages)

	const isNew = idParam === 'new'

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

	function loadAircraftOptions() {
		UserService.getAircraftOptions((success) => {
			setAircraftOptions(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadFlight(id) {
		console.log("Load flight=" + id)
		// 	setId('')
	}

	function update() {
		console.log("Update flight=" + id)
		// 	{id, startTime,duration}
	}

	function doDelete() {
		console.log("Delete flight=" + id)
		// FlightService.deleteFlight(id, (result) => {
		// 	close()
		// }, (failure) => {
		// 	let messages = failure.messages
		// 	if (!!!messages) messages = [failure.message]
		// 	if (!!messages) setMessages(messages)
		// })
	}

	useEffect(() => {
		if (aircraftOptions.length === 0) loadAircraftOptions()
		if (!isNew && id === '') loadFlight(idParam)
	})

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntrySelect id='aircraft' text='Aircraft' value={aircraft} required={true} onChange={(event) => setAircraft(event.target.value)}>
						{aircraftOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntryField id='duration' text='Duration (hh:mm:ss)' type='text' value={duration} onChange={(event) => setDuration(event.target.value)} onKeyDown={onKeyDown}/>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNew ? null : <button className='icon-button' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE_UP : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={!canSave} className='page-submit' onClick={update}>{isNew ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='battery' name={duration} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}
				</div>
			</div>
		</div>
	)

}
