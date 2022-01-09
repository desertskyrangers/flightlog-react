import Notice from "../part/Notice";
import React, {useEffect, useState} from "react";
import LookupService from "../api/LookupService";
import {useNavigate, useParams} from "react-router-dom";
import AircraftService from "../api/AircraftService";
import Icons from "../Icons";
import EntryField from "../part/EntryField";

export default function Aircraft(props) {
	const navigate = useNavigate();

	const {id} = useParams();

	const [name, setName] = useState(props.name || '')
	const [type, setType] = useState(props.type || 'multirotor')
	const [make, setMake] = useState(props.make || '')
	const [model, setModel] = useState(props.model || '')
	const [status, setStatus] = useState(props.status || 'airworthy')
	const [messages, setMessages] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
	const [typeOptions, setTypeOptions] = useState([])

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

	useEffect(() => {
		if (statusOptions.length === 0) loadAircraftStatusOptions()
		if (typeOptions.length === 0) loadAircraftTypeOptions()
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
					<button disabled={messages.length > 0} className='page-submit' onClick={update}>{id === 'new' ? 'Save' : 'Update'}</button>
				</div>
			</div>
		</div>
	)

}
