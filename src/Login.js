import './css/login.css';
import Notice from "./Notice";

import React from 'react';
import AuthService from "./api/AuthService";
import {Link} from "react-router-dom";

export default class Login extends React.Component {

	state = {
		username: '',
		password: '',
		messages: []
	}

	login = () => {
		this.setState({messages: []})
		AuthService.login(this.state.username, this.state.password, (success) => {
			window.location.replace('/');
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		});
	}

	updateUsername = (event) => {
		this.setState({username: event.target.value})
	}

	updatePassword = (event) => {
		this.setState({password: event.target.value})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<form className='login-form'>
						<Username onChange={this.updateUsername}/>
						<Password onChange={this.updatePassword}/>
						<input id='login' type='button' value='Sign In' className='login-submit' onClick={this.login}/>
						<Notice messages={this.state.messages} priority='error' clearMessages={this.clearMessages}/>
					</form>
				</div>
				<div className='login-body'>
					<p>Need an account? <a href='/register' className='button'>Sign Up</a></p>
				</div>
			</div>
		);
	}

}

class Username extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='username' className='login-label'>Username or email address</label>
				<input id='username' name='username' type='text' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' className='login-field' onChange={this.props.onChange}/>
			</div>
		);
	}

}

class Password extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='password' className='login-label'>Password</label>
				<input id='password' name='password' type='password' autoComplete='current-password' className='login-field' onChange={this.props.onChange}/>
			</div>
		);
	}

}
