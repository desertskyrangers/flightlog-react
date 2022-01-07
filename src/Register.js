import './css/page.css';

import AuthService from "./api/AuthService";
import Notice from "./part/Notice";

import React, {useLayoutEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import ApiPath from "./AppPath";
import AppConfig from "./AppConfig";
import {isEqual} from "lodash";

export default function Register(props) {
	const navigate = useNavigate();

	const [username, setUsername] = useState(props.username || '');
	const [password, setPassword] = useState(props.password || '');
	const [verifyPassword, setVerifyPassword] = useState(props.verifyPassword || '');
	const [email, setEmail] = useState(props.email || '');
	const [messages, setMessages] = useState([])
	const [canRegister, setCanRegister] = useState(false)

	const previousMessages = useRef(messages)

	function onKeyDown(event) {
		if (event.key === 'Enter') register();
	}

	function register(event) {
		AuthService.register(username, password, email, (verification) => {
			navigate(ApiPath.VERIFY + "/" + verification.id);
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		});
		event.preventDefault();
	}

	function updateUsername(event) {
		setUsername(event.target.value)
	}

	function updatePassword(event) {
		setPassword(event.target.value)
	}

	function updateVerifyPassword(event) {
		setVerifyPassword(event.target.value)
	}

	function updateEmail(event) {
		setEmail(event.target.value)
	}

	function clearMessages() {
		setMessages([])
	}

	useLayoutEffect(() => {
		const validUsername = !!username || username === ''
		const validPassword = !!password || password === ''
		const passwordTooShort = !!password && password.length < 8;
		const passwordTooLong = !!password && password.length >= 128;
		const passwordsMatch = password === verifyPassword
		const validEmail = !email || email.match(AppConfig.EMAIL_PATTERN) != null

		let messages = [];
		if (!validUsername) messages.push('Invalid username')
		if (!validPassword) messages.push('Invalid password')
		if (passwordTooShort) messages.push('Password too short')
		if (passwordTooLong) messages.push('Password too long')
		if (!passwordsMatch) messages.push('Passwords do not match')
		if (!validEmail) messages.push('Invalid email address')
		if (!isEqual(messages, previousMessages.current)) setMessages(messages,)
		previousMessages.current = messages

		const canSubmitUsername = !!username && username !== ''
		const canSubmitPassword = !!password && password !== '' && !passwordTooShort && !passwordTooLong && passwordsMatch
		const canSubmitEmail = !!email && email !== '' && validEmail
		const canSubmit = canSubmitUsername && canSubmitPassword && canSubmitEmail

		setCanRegister(canSubmit)
	},[username, password, verifyPassword, email])

	return (<div className='page-container'>
		<div className='page-body'>
			<div className='page-form'>
				<SignupField id='username' text='Username' type='text' autoFocus='autofocus' value={username} onChange={updateUsername} onKeyDown={onKeyDown}/>
				<SignupField id='password' text='Password' type='password' value={password} onChange={updatePassword} onKeyDown={onKeyDown}/>
				<SignupField id='verify-password' text='Verify Password' type='password' value={verifyPassword} onChange={updateVerifyPassword} onKeyDown={onKeyDown}/>
				<SignupField id='email' text='Email Address' type='text' value={email} onChange={updateEmail} onKeyDown={onKeyDown}/>
				<button disabled={!canRegister} className='page-submit' onClick={register}>Sign Up</button>
				<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
			</div>
		</div>
	</div>);

}

function SignupField(props) {
	return (<div>
		<label htmlFor={props.id} className='page-label'>{props.text}</label>
		<input id={props.id}
					 name={props.id}
					 type={props.type}
					 placeholder={props.text}
					 autoCapitalize='none'
					 autoCorrect='off'
					 className='page-field'
					 autoFocus={props.autoFocus}
					 value={props.value}
					 onChange={props.onChange}
					 onKeyDown={props.onKeyDown}/>
	</div>)
}
