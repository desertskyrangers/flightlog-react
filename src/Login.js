import './css/page.css';
import Notice from "./Notice";

import React, {useEffect, useState} from 'react';
import AppService from "./api/AppService";
import AuthService from "./api/AuthService";
import {useNavigate} from 'react-router-dom';
import ApiPath from "./api/ApiPath";

export default function Login(props) {

	const navigate = useNavigate();

	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [messages, setMessages] = useState(props.messages || [])
	const [status, setStatus] = useState('')

	useEffect(() => {
		loadProgramInformation();
	})

	function loadProgramInformation() {
		if (status === '') {
			AppService.getProgramInformation((program) => {
				setStatus(program)
			}, (message) => {
				console.log(message);
			})
		}
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') login();
	}

	function login() {
		setMessages([])
		AuthService.login(username, password, (success) => {
			navigate(ApiPath.HOME)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		});
	}

	function updateUsername(event) {
		setUsername(event.target.value)
	}

	function updatePassword(event) {
		setPassword(event.target.value)
	}

	function clearMessages() {
		setMessages([])
	}

	function navRegister() {
		navigate(ApiPath.REGISTER)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<Username onChange={updateUsername} onKeyDown={onKeyDown}/>
					<Password onChange={updatePassword} onKeyDown={onKeyDown}/>
					<button className='page-submit' onClick={login}>Sign In</button>
					<Notice messages={messages} priority='error' clearMessages={clearMessages}/>
				</div>
				<div>
					Need an account? <button onClick={navRegister}>Register Here</button>
				</div>
			</div>
			<div className='page-label'>Version: {status.version}</div>
		</div>
	)
}

function Username(props) {
	return (
		<div>
			<label htmlFor='username' className='page-label'>Username or email address</label>
			<input id='username'
						 name='username'
						 type='text'
						 placeholder='Username'
						 autoCapitalize='none'
						 autoCorrect='off'
						 autoComplete='username'
						 autoFocus='autofocus'
						 className='page-field'
						 onChange={props.onChange}
						 onKeyDown={props.onKeyDown}/>
		</div>
	)
}

function Password(props) {
	return (
		<div>
			<label htmlFor='password' className='page-label'>Password</label>
			<input id='password'
						 name='password'
						 type='password'
						 placeholder='Password'
						 autoCapitalize='none'
						 autoCorrect='off'
						 autoComplete='current-password'
						 className='page-field'
						 onChange={props.onChange}
						 onKeyDown={props.onKeyDown}/>
		</div>
	)
}
