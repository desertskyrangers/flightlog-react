import Notice from "../part/Notice";
import React, {useEffect, useState} from "react";
import LookupService from "../api/LookupService";
import {useNavigate, useParams} from "react-router-dom";
import AircraftService from "../api/AircraftService";
import Icons from "../Icons";
import EntryField from "../part/EntryField";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import EntrySelect from "../part/EntrySelect";

export default function Aircraft(props) {
	const navigate = useNavigate();

	const idParam = useParams().id;

	const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [type, setType] = useState(props.type || 'fixedwing')
	const [make, setMake] = useState(props.make || '')
	const [model, setModel] = useState(props.model || '')
	const [status, setStatus] = useState(props.status || 'airworthy')
	const [messages, setMessages] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
	const [typeOptions, setTypeOptions] = useState([])
	const [requestDelete, setRequestDelete] = useState(false)

	const isNew = idParam === 'new'

	function update() {
		AircraftService.updateAircraft({
			id: idParam,
			name: name,
			type: type,
			make: make,
			model: model,
			status: status
		}, (success) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
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

	function loadAircraft(id) {
		if (isNew) return
		AircraftService.getAircraft(id, (result) => {
			setId(result.aircraft.id)
			setName(result.aircraft.name)
			setType(result.aircraft.type)
			setMake(result.aircraft.make || '')
			setModel(result.aircraft.model || '')
			setStatus(result.aircraft.status)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadAircraftStatusOptions() {
		LookupService.getAircraftStatuses((success) => {
			setStatusOptions(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadAircraftTypeOptions() {
		LookupService.getAircraftTypes((success) => {
			setTypeOptions(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function toggleDelete() {
		setRequestDelete(!requestDelete)
	}

	function doDelete() {
		console.log("Delete aircraft=" + id)
		AircraftService.deleteAircraft(id, (result) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadAircraftStatusOptions(), [])
	useEffect(() => loadAircraftTypeOptions(), [])
	useEffect(() => loadAircraft(idParam), [])

	// useEffect(() => {
	// 	if (statusOptions.length === 0) loadAircraftStatusOptions()
	// 	if (typeOptions.length === 0) loadAircraftTypeOptions()
	// 	if (!isNew && id === '') loadAircraft(idParam)
	// })

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntryField id='name' text='Name' type='text' value={name} required={true} autoFocus='autofocus' onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown} labelActionIcon={Icons.CLOSE} onLabelAction={close}/>

					<EntrySelect id='type' name='type' text='Type' value={type} required={true} onChange={(event) => setType(event.target.value)}>
						{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntrySelect id='status' name='status' text='Status' value={status} required={true} onChange={(event) => setStatus(event.target.value)}>
						{statusOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<EntryField id='make' text='Manufacturer or Designer' type='text' value={make} onChange={(event) => setMake(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='model' text='Model' type='text' value={model} onChange={(event) => setModel(event.target.value)} onKeyDown={onKeyDown}/>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNew ? null : <button className='icon-button' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE_UP : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={messages.length > 0} className='page-submit' onClick={update}>{isNew ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='name of the aircraft' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}

				</div>
			</div>
		</div>
	)

}
