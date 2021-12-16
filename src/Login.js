import './css/login.css';
import Notice from "./Notice";

import React from 'react';
import AuthService from "./api/AuthService";


export default class Login extends React.Component {

	state = {
		errorCode: false,
		errorText: ""
	}

	doLogin = () => {
		console.log("doLogin")
		// AuthService.login("username", "password", (success) => {
		// 	window.location.replace('/');
		// }, (failure) => {
		// 	// Show the error message
		// });
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='logo192.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<form action='/login' method='post' className='login-form'>
						<Username/>
						<Password/>
						<Notice message='Incorrect credentials' priority='error' visible={this.state.error}/>
						<input id='login' type='button' value='Sign In' className='login-submit' onClick={this.doLogin}/>
					</form>
				</div>
				<div className='login-body'>
					<p>Need an account? <a href='/signup' className='button'>Sign up</a></p>
				</div>
			</div>
		);
	}

}

function Username() {

	return (
		<div>
			<label htmlFor='username' className='login-label'>Username or email address</label>
			<input id='username' name='username' type='text' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' className='login-field'/>
		</div>
	);

}

function Password() {

	return (
		<div>
			<label htmlFor='password' className='login-label'>Password</label>
			<input id='password' name='password' type='password' autoComplete='current-password' className='login-field'/>
		</div>
	);

}
