import './css/signup.css';

import React from "react";

export default class Signup extends React.Component {

	state = {
		username: 'username',
		password: 'password',
		email:'noreply@email.com'
	}

	signup = (event) => {
		//const username = this.state.username;

		console.log("Signup clicked!")
		event.preventDefault();
	}

	updateUsername = (event) => {
		console.log("Username updated!")
		event.preventDefault();
	}

	updatePassword = (event) => {
		console.log("Password updated!")
		event.preventDefault();
	}

	updateEmail = (event) => {
		this.setState( {email: event.target.value })
		console.log("Email updated!")
		event.preventDefault();
	}

	render() {
		return (
			<div className='signup-container'>
				<div className='signup-banner'>
					<img src='logo192.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='signup-body'>
					<form action='/login' method='post' className='signup-form'>
						<Username value={this.state.username} onChange={this.updateUsername}/>
						<Password value={this.state.password} onChange={this.updatePassword}/>
						<Email value={this.state.email} onChange={this.updateEmail}/>
						<input id='login' type='button' value='Sign Up' className='signup-submit' onClick={this.signup}/>
					</form>
				</div>
			</div>
		);
	}

}

class Username extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='username' className='signup-label'>Username</label>
				<input id='username' name='username' type='text' autoCapitalize='none' autoCorrect='off' className='signup-field' autoFocus='autofocus' value={this.props.value} onChange={this.props.onChange}/>
			</div>
		);
	}

}

class Password extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='password' className='signup-label'>Password</label>
				<input id='password' name='password' type='password' className='signup-field' value={this.props.value} onChange={this.props.onChange}/>
			</div>
		);
	}

}

class Email extends React.Component {

	render() {
		return (
			<div>
				<label htmlFor='email' className='signup-label'>Email address</label>
				<input id='email' name='email' type='text' autoCapitalize='none' autoCorrect='off' className='signup-field' value={this.props.value} onChange={this.props.onChange}/>
			</div>
		);
	}

}
