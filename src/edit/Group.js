import EntrySelect from "../part/EntrySelect"
import React, {useEffect, useRef, useState} from "react"
import LookupService from "../api/LookupService"
import {useNavigate, useParams} from "react-router-dom"
import EntryField from "../part/EntryField"
import Icons from "../util/Icons"
import GroupService from "../api/GroupService";
import Notice from "../part/Notice";
import DeleteWithConfirm from "../part/DeleteWithConfirm";

export default function Group(props) {
	const navigate = useNavigate();

	const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [type, setType] = useState(props.type || '')
	const [messages, setMessages] = useState([])

	// Options
	const [typeOptions, setTypeOptions] = useState([])

	// Actions
	const [requestDelete, setRequestDelete] = useState(false)

	// References
	const idRef = useRef(useParams().id)
	const isNewRef = useRef(idRef.current === 'new')

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function clearMessages() {
		setMessages([])
	}

	function loadTypeOptions() {
		LookupService.getGroupTypes((result) => {
			setTypeOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadGroup() {
		if (isNewRef.current) return
		GroupService.getGroup(idRef.current, (result) => {
			setId(result.group.id)
			setName(result.group.name)
			setType(result.group.type)
			// TODO members
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function update() {
		GroupService.updateGroup({
			id: idRef.current,
			name: name,
			type: type
			// TODO members
		}, (success) => {
			close()
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
		GroupService.deleteGroup(id, (result) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadTypeOptions(), [])
	useEffect(() => loadGroup(), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntryField id='name' text='Name' type='text' value={name} required={true} autoFocus='autofocus' onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown} labelActionIcon={Icons.CLOSE} onLabelAction={close}/>

					<EntrySelect id='type' text='Type' value={type} required defaultValue='unspecified' onChange={(event) => setType(event.target.value)}>
						<option key='unspecified' hidden>Select a group type</option>
						{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNewRef.current ? null : <button className='icon-button' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE_UP : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={messages.length > 0} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='name of the group' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}
				</div>
			</div>
		</div>
	)

}
