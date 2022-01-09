import React from "react";
import Notice from "../part/Notice";
import Config from "../AppConfig";
import {isEqual} from "lodash";
import UserService from "../api/UserService";
import TokenService from "../api/TokenService";
import LookupService from "../api/LookupService";
import EntryField from "../part/EntryField";
import Icons from "../Icons";

export default class Profile extends React.Component {

	state = {
		id: this.props.id || '',
		firstName: this.props.firstName || '',
		lastName: this.props.lastName || '',
		preferredName: this.props.preferredName || '',
		email: this.props.email || '',
		emailVerified: this.props.emailVerified || '',
		smsNumber: this.props.smsNumber || '',
		smsCarrier: this.props.smsCarrier || 'verizon',
		smsVerified: this.props.smsVerified || '',
		messages: this.props.messages || [],
		smsCarriers: [],
	}

	notice = <Notice priority='error'/>

	close() {
		//navigate(-1)
	}

	update = () => {
		console.log("Update profile")
		UserService.update(this.state, () => {
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		})
	}

	onKeyDown = (event) => {
		if (event.key === 'Enter') this.update();
	}

	updateFirstName = (event) => {
		this.updatePreferredName(this.oldFirstName, this.oldLastName, event.target.value, this.state.lastName)
		this.oldFirstName = event.target.value
	}

	updateLastName = (event) => {
		this.updatePreferredName(this.oldFirstName, this.oldLastName, this.state.firstName, event.target.value)
		this.oldLastName = event.target.value
	}

	updateField = (event) => {
		this.setState({[event.target.name]: event.target.value})
	}

	updatePreferredName(oldFirstName, oldLastName, newFirstName, newLastName) {
		const oldPreferredName = oldFirstName + " " + oldLastName
		const newPreferredName = newFirstName + " " + newLastName
		if (this.state.preferredName === oldPreferredName) this.setState({preferredName: newPreferredName})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	componentDidMount() {
		const id = TokenService.getUserId();
		UserService.profile(id, (success) => {
			this.setState({
				id: success.account.id,
				firstName: success.account.firstName || '',
				lastName: success.account.lastName || '',
				preferredName: success.account.preferredName || '',
				email: success.account.email || '',
				emailVerified: success.account.emailVerified || false,
				smsNumber: success.account.smsNumber || '',
				smsCarrier: success.account.smsCarrier || '',
				messages: success.messages || []
			})
			this.oldFirstName = success.account.firstName
			this.oldLastName = success.account.lastName
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		})

		LookupService.getSmsCarriers((success) => {
			this.setState({smsCarriers: success})
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		})
	}

	componentDidUpdate(prevProps, prevState) {
		const firstNameTooLong = !!this.state.firstName && this.state.firstName.length >= 64;
		const lastNameTooLong = !!this.state.lastName && this.state.lastName.length >= 64;
		const validEmail = !this.state.email || this.state.email.match(Config.EMAIL_PATTERN)
		const validSmsNumber = !this.state.smsNumber || this.state.smsNumber.match(Config.PHONE_PATTERN)

		let messages = [];
		if (firstNameTooLong) messages.push('First name too long')
		if (lastNameTooLong) messages.push('Last name too long')
		if (!validEmail) messages.push('Invalid email address')
		if (!validSmsNumber) messages.push('Invalid SMS number')
		if (!isEqual(messages, prevState.messages)) this.setState({messages: messages})
	}

	render() {
		return (
			<div className='page-container'>
				<div className='page-body'>
					<div className='page-form'>
						<EntryField id='firstName' text='First Name' type='text' autoFocus='autofocus' value={this.state.firstName} onChange={this.updateFirstName} onKeyDown={this.onKeyDown} icon={Icons.CLOSE} onIconClick={this.close}/>
						<EntryField id='lastName' text='Last Name' type='text' value={this.state.lastName} onChange={this.updateLastName} onKeyDown={this.onKeyDown}/>
						<EntryField id='preferredName' text='Preferred Name' type='text' value={this.state.preferredName} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<EntryField id='email' text='Email' type='text' value={this.state.email} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<EntryField id='smsNumber' text='SMS Number' type='text' value={this.state.smsNumber} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<div>
							<label htmlFor='smsCarrier' className='page-label'>SMS Carrier</label>
							<select id='smsCarrier' name='smsCarrier' value={this.state.smsCarrier} className='page-field' onChange={this.updateField}>
								{this.state.smsCarriers.map((carrier) => <option key={carrier.id} value={carrier.id}>{carrier.name}</option>)}
							</select>
						</div>
						<Notice priority='error' messages={this.state.messages} clearMessages={this.clearMessages}/>
						<button disabled={this.state.messages.length > 0} className='page-submit' onClick={this.update}>Update</button>
					</div>
				</div>
			</div>
		)
	}

}
