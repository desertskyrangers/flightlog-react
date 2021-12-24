import './css/signup.css';

import AuthService from "./api/AuthService";
import Config from "./Config";
import Notice from "./Notice";

import React from "react";
import {isEqual} from "lodash";

export default class Signup extends React.Component {

	state = {
		username: '',
		password: '',
		verifyPassword: '',
		email: '',
		messages: []
	}

	notice = <Notice priority='error'/>

	doSignup = (event) => {
		AuthService.signup(this.state.username, this.state.password, this.state.email, () => {
			console.log("signup success");
			// Redirect to wait/verify page...
			window.location.assign("/verify");
		}, (error) => {
			console.log("error=" + JSON.stringify(error))
			//this.setState({message: error.message})
		});
		event.preventDefault();
	}

	updateUsername = (event) => {
		this.setState({username: event.target.value})
	}

	updatePassword = (event) => {
		this.setState({password: event.target.value})
	}

	updateVerifyPassword = (event) => {
		this.setState({verifyPassword: event.target.value})
	}

	updateEmail = (event) => {
		this.setState({email: event.target.value})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	componentDidUpdate(prevProps, prevState) {
		const validUsername = !!this.state.username && this.state.username.match(Config.USERNAME_PATTERN)
		const validPassword = !!this.state.password && this.state.password === this.state.verifyPassword
		const validEmail = !!this.state.email && this.state.email.match(Config.EMAIL_PATTERN)

		let messages = [];
		if (!validUsername) messages.push('Invalid username')
		if (!validPassword) messages.push('Passwords do not match')
		if (!validEmail) messages.push('Invalid email address')
		if (!isEqual(messages, prevState.messages)) this.setState({messages: messages})
	}

	render() {
		return (
			<div className='signup-container'>
				<div className='signup-banner'>
					<img src='logo192.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='signup-body'>
					<form className='signup-form'>
						<SignupField id='username' text='Username' type='text' autoFocus='autofocus' value={this.state.username} onChange={this.updateUsername}/>
						<SignupField id='password' text='Password' type='password' value={this.state.password} onChange={this.updatePassword}/>
						<SignupField id='verify-password' text='Verify Password' type='password' value={this.state.verifyPassword} onChange={this.updateVerifyPassword}/>
						<SignupField id='email' text='Email Address' type='text' value={this.state.email} onChange={this.updateEmail}/>
						<input id='login' type='button' value='Sign Up' disabled={this.state.messages.length > 0} className='signup-submit' onClick={this.doSignup}/>
						<Notice priority='error' messages={this.state.messages} clearMessages={this.clearMessages}/>
					</form>
				</div>
			</div>
		);
	}

}

class SignupField extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor={this.props.id} className='signup-label'>{this.props.text}</label>
				<input id={this.props.id} name={this.props.id} type={this.props.type} placeholder={this.props.text} autoCapitalize='none' autoCorrect='off' className='signup-field' autoFocus={this.props.autoFocus} value={this.props.value}
							 onChange={this.props.onChange}/>
			</div>
		);
	}

}
