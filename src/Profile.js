import React from "react";
import Notice from "./Notice";
import Config from "./AppConfig";
import {isEqual} from "lodash";
import UserService from "./api/UserService";
import TokenService from "./api/TokenService";

export default class Profile extends React.Component {

	state = {
		id: this.props.id || '',
		firstName: this.props.firstName || '',
		lastName: this.props.lastName || '',
		preferredName: this.props.preferredName || '',
		email: this.props.email || '',
		emailVerified: this.props.emailVerified || '',
		smsNumber: this.props.smsNumber || '',
		smsCarrier: this.props.smsCarrier || '',
		smsVerified: this.props.smsVerified || '',
		messages: this.props.messages || [],
	}

	notice = <Notice priority='error'/>

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

	updateField = (event) => {
		this.setState({[event.target.name]: event.target.value})

		if (event.target.name === 'firstName') {
			this.updatePreferredName(this.oldFirstName, this.oldLastName, event.target.value, this.state.lastName)
			this.oldFirstName = event.target.value
		}
		if (event.target.name === 'lastName') {
			this.updatePreferredName(this.oldFirstName, this.oldLastName, this.state.firstName, event.target.value)
			this.oldLastName = event.target.value
		}
	}

	updatePreferredName(oldFirstName, oldLastName, newFirstName, newLastName) {
		const oldPreferredName = oldFirstName + " " + oldLastName
		const newPreferredName = newFirstName + " " + newLastName
		if( this.state.preferredName === oldPreferredName ) this.setState({preferredName: newPreferredName})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	componentDidMount() {
		const id = TokenService.getUserId();
		UserService.profile(id, (success => {
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
		}), (failure) => {
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
			<div className='login-container'>
				<div className='login-banner'>
					<img src='/logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<div>User Profile</div>
				</div>
				<div className='login-body'>
					<div className='login-form'>
						<ProfileField id='firstName' text='First Name' type='text' autoFocus='autofocus' value={this.state.firstName} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<ProfileField id='lastName' text='Last Name' type='text' autoFocus='autofocus' value={this.state.lastName} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<ProfileField id='preferredName' text='Preferred Name' type='text' autoFocus='autofocus' value={this.state.preferredName} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<ProfileField id='email' text='Email' type='text' autoFocus='autofocus' value={this.state.email} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<ProfileField id='smsNumber' text='SMS Number' type='text' autoFocus='autofocus' value={this.state.smsNumber} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<ProfileField id='smsCarrier' text='SMS Carrier' type='text' autoFocus='autofocus' value={this.state.smsCarrier} onChange={this.updateField} onKeyDown={this.onKeyDown}/>
						<Notice priority='error' messages={this.state.messages} clearMessages={this.clearMessages}/>
						<button disabled={this.state.messages.length > 0} className='login-submit' onClick={this.update}>Update</button>
					</div>
				</div>
			</div>
		)
	}

}

class ProfileField extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor={this.props.id} className='login-label'>{this.props.text}</label>
				<input id={this.props.id} name={this.props.id} type={this.props.type} placeholder={this.props.text} autoCapitalize='none' autoCorrect='off' className='login-field' autoFocus={this.props.autoFocus} value={this.props.value}
							 onChange={this.props.onChange} onKeyDown={this.props.onKeyDown}/>
			</div>
		);
	}

}
