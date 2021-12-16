import './css/signup.css';

import React from "react";

export default class Signup extends React.Component {

	render() {
		return (
			<div className='signup-container'>
				<div className='signup-banner'>
					<img src='logo192.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='signup-body'>
					<form action='/login' method='post' className='signup-form'>
						<Username/>
						<Password/>
						<Email/>
						<input id='login' type='button' value='Sign Up' className='signup-submit'/>
					</form>
				</div>
			</div>
		);
	}

}

function Email() {

	return (
		<div>
			<label htmlFor='email' className='signup-label'>Email address</label>
			<input id='email' name='email' type='text' autoCapitalize='none' autoCorrect='off' autoFocus='autofocus' className='signup-field'/>
		</div>
	);

}

function Username() {

	return (
		<div>
			<label htmlFor='username' className='signup-label'>Username</label>
			<input id='username' name='username' type='text' autoCapitalize='none' autoCorrect='off' className='signup-field'/>
		</div>
	);

}

function Password() {

	return (
		<div>
			<label htmlFor='password' className='signup-label'>Password</label>
			<input id='password' name='password' type='password' className='signup-field'/>
		</div>
	);

}
