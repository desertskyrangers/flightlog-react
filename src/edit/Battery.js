import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import BatteryService from "../api/BatteryService";
import LookupService from "../api/LookupService";
import EntryField from "../part/EntryField";
import Icons from "../util/Icons";
import Notice from "../part/Notice";
import DeleteWithConfirm from "../part/DeleteWithConfirm";
import EntrySelect from "../part/EntrySelect";
import AppConfig from "../AppConfig";
import {isEqual} from "lodash";

export default function Battery(props) {

	const navigate = useNavigate();

	const [id, setId] = useState(props.id || '')
	const [name, setName] = useState(props.name || '')
	const [status, setStatus] = useState(props.status || 'new')
	const [make, setMake] = useState(props.make || '')
	const [model, setModel] = useState(props.model || '')
	const [connector, setConnector] = useState(props.connector || 'xt60')
	const [unlistedConnector, setUnlistedConnector] = useState(props.unlistedConnector || '')

	const [type, setType] = useState(props.type || 'lipo')
	const [cells, setCells] = useState(props.cells || '')
	const [cycles, setCycles] = useState(props.cycles || '')
	const [capacity, setCapacity] = useState(props.capacity || '')
	const [dischargeRating, setDischargeRating] = useState(props.dischargeRating || '')

	const [messages, setMessages] = useState([])
	const [connectorOptions, setConnectorOptions] = useState([])
	const [statusOptions, setStatusOptions] = useState([])
	const [typeOptions, setTypeOptions] = useState([])
	const [requestDelete, setRequestDelete] = useState(false)

	const [canSave, setCanSave] = useState(false)

	const idRef = useRef(useParams().id)
	const isNewRef = useRef(idRef.current === 'new')
	const previousMessages = useRef(messages)

	function close() {
		navigate(-1)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function toggleDelete() {
		setRequestDelete(!requestDelete)
	}

	function clearMessages() {
		setMessages([])
	}

	function loadBatteryConnectorOptions() {
		LookupService.getBatteryConnectors((result) => {
			setConnectorOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadBatteryStatusOptions() {
		LookupService.getBatteryStatuses((result) => {
			setStatusOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadBatteryTypeOptions() {
		LookupService.getBatteryTypes((result) => {
			setTypeOptions(result)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadBattery() {
		if (isNewRef.current) return
		BatteryService.getBattery(idRef.current, (result) => {
			setId(result.battery.id)
			setName(result.battery.name || '')
			setType(result.battery.type || '')
			setMake(result.battery.make || '')
			setModel(result.battery.model || '')
			setConnector(result.battery.connector || '')
			setUnlistedConnector(result.battery.unlistedConnector || '')
			setStatus(result.battery.status || '')
			setCells(result.battery.cells || '')
			setCycles(result.battery.cycles || '')
			setCapacity(result.battery.capacity || '')
			setDischargeRating(result.battery.dischargeRating || '')
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function update() {
		BatteryService.updateBattery({
			id: idRef.current,
			name: name,
			type: type,
			make: make,
			model: model,
			connector: connector,
			unlistedConnector: unlistedConnector,
			status: status,
			cells: cells,
			cycles: cycles,
			capacity: capacity,
			dischargeRating: dischargeRating
		}, (success) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function doDelete() {
		BatteryService.deleteBattery(id, (result) => {
			close()
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useLayoutEffect(() => {
		const validCells = cells === '' || String(cells).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null
		const validCycles = cycles === '' || String(cycles).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null
		const validCapacity = capacity === '' || String(capacity).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null
		const validDischargeRating = dischargeRating === '' || String(dischargeRating).match(AppConfig.POSITIVE_INTEGER_PATTERN) != null

		let messages = [];
		if (!validCells) messages.push('Invalid cells')
		if (!validCycles) messages.push('Invalid cycles')
		if (!validCapacity) messages.push('Invalid capacity')
		if (!validDischargeRating) messages.push('Invalid discharge rating')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages)
		previousMessages.current = messages

		setCanSave(validCells && validCycles && validCapacity && validDischargeRating)
	}, [cells, cycles, capacity, dischargeRating])

	useEffect(() => loadBatteryConnectorOptions(), [])
	useEffect(() => loadBatteryStatusOptions(), [])
	useEffect(() => loadBatteryTypeOptions(), [])
	useEffect(() => loadBattery(), [])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<EntryField id='name' text='Name' type='text' required={true} autoFocus='autofocus' value={name} onChange={(event) => setName(event.target.value)} onKeyDown={onKeyDown} labelActionIcon={Icons.CLOSE} onLabelAction={close}/>
					<EntrySelect id='status' text='Status' value={status} required={true} onChange={(event) => setStatus(event.target.value)}>
						{statusOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					<EntryField id='make' text='Manufacturer' type='text' value={make} onChange={(event) => setMake(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='model' text='Model' type='text' value={model} onChange={(event) => setModel(event.target.value)} onKeyDown={onKeyDown}/>
					<EntrySelect id='connector' text='Connector' value={connector} onChange={(event) => setConnector(event.target.value)}>
						{connectorOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					{connector === 'unlisted' ? <EntryField id='unlistedConnector' text='Unlisted Connector' type='text' value={unlistedConnector} onChange={(event) => setUnlistedConnector(event.target.value)}/> : null}

					<EntrySelect id='type' text='Type' value={type} onChange={(event) => setType(event.target.value)}>
						{typeOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
					</EntrySelect>
					<EntryField id='capacity' text='Capacity (mAh)' type='text' value={capacity} onChange={(event) => setCapacity(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='cells' text='Cells' type='text' value={cells} onChange={(event) => setCells(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='cycles' text='Cycles' type='text' value={cycles} onChange={(event) => setCycles(event.target.value)} onKeyDown={onKeyDown}/>
					<EntryField id='dischargeRating' text='Discharge Rating (C)' type='text' value={dischargeRating} onChange={(event) => setDischargeRating(event.target.value)} onKeyDown={onKeyDown}/>

					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<div className='hbox'>
						{isNewRef.current ? null : <button className='icon-button' onClick={toggleDelete}>{requestDelete ? Icons.COLLAPSE_UP : Icons.DELETE}</button>}
						{requestDelete ? null : <button disabled={!canSave} className='page-submit' onClick={update}>{isNewRef.current ? 'Save' : 'Update'}</button>}
					</div>

					{requestDelete ? <DeleteWithConfirm entity='name of the battery' name={name} onDelete={doDelete} onIconClick={() => toggleDelete()}/> : null}

				</div>
			</div>
		</div>
	)

}

