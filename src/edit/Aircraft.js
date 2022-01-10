import Notice from "../part/Notice";
import React, {useEffect, useState} from "react";
import LookupService from "../api/LookupService";
import {useNavigate, useParams} from "react-router-dom";
import AircraftService from "../api/AircraftService";
import Icons from "../Icons";
import EntryField from "../part/EntryField";

export default function Aircraft(props) {
	const navigate = useNavigate();

	const idParam = useParams().id;

	const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [type, setType] = useState(props.type || 'multirotor')
	const [make, setMake] = useState(props.make || '')
	const [model, setModel] = useState(props.model || '')
	const [status, setStatus] = useState(props.status || 'airworthy')
	const [messages, setMessages] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
	const [typeOptions, setTypeOptions] = useState([])
	const [requestDelete, setRequestDelete] = useState(false)

	function update() {
		AircraftService.updateAircraft({
			id: id,
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

	useEffect(() => {
		if (statusOptions.length === 0) loadAircraftStatusOptions()
		if (typeOptions.length === 0) loadAircraftTypeOptions()
		if (idParam !== 'new' && id === '') loadAircraft(idParam)
	})

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntryField id='name' text='Name' type='text' autoFocus='autofocus' value={name} onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown} icon={Icons.CLOSE} onIconClick={close}/>

					<div>
						<label htmlFor='type' className='page-label'>Type</label>
						<select id='type' name='type' value={type} className='page-field' onChange={(event) => setType(event.target.value)}>
							{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
						</select>
					</div>

					<EntryField id='make' text='Manufacturer or Designer' type='text' value={make} onChange={(event) => setMake(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='model' text='Model' type='text' value={model} onChange={(event) => setModel(event.target.value)} onKeyDown={onKeyDown}/>

					<div>
						<label htmlFor='status' className='page-label'>Status</label>
						<select id='status' name='status' value={status} className='page-field' onChange={(event) => setStatus(event.target.value)}>
							{statusOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
						</select>
					</div>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						<button className='icon-button' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE_UP : Icons.DELETE}</button>
						{requestDelete ? null : <button disabled={messages.length > 0} className='page-submit' onClick={update}>{id === 'new' ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='aircraft' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}

				</div>
			</div>
		</div>
	)

}

function DeleteWithConfirm(props) {

	const [name, setName] = useState('')
	const [canDelete, setCanDelete] = useState(false)

	function doDelete() {
		props.onDelete()
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') document.getElementById('submit-delete').click()
	}

	function updateName(event) {
		setName(event.target.value)
		setCanDelete(event.target.value === props.name)
	}

	return (
		<div className='vbox'>
			WARNING: This action cannot be undone. Please type the name of the {props.entity} to confirm:
			<input id='name' name='name' value={name} type='text' className='page-field' onChange={updateName} onKeyDown={onKeyDown}/>
			<button id='submit-delete' disabled={!canDelete} className='page-action' onClick={doDelete}>Delete</button>
		</div>


	)

}
