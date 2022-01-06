import React, {useEffect, useRef, useState} from "react";
import Notice from "./Notice";
import AuthService from "./api/AuthService";
import {useNavigate, useParams} from "react-router-dom";

export default function Verify(props) {
	const navigate = useNavigate();

	const [id, setId] = useState(useParams().id)
	const [code, setCode] = useState(useParams().code)
	const [messages, setMessages] = useState(props.messages || [])
	const [resendMessages, setResendMessages] = useState([])

	const autoVerify = useRef(!!useParams().code)

	function updateCode(event) {
		setCode(event.target.value)
	}

	function onKeyDown(event) {
		if (event.key === 'Enter') verify();
	}

	function verify() {
		AuthService.verify(id, code, (response) => {
			navigate("/")
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	function resend() {
		AuthService.resend(id, (response) => {
			let messages = response.messages
			if (!!!messages) messages = [response.message]
			setMessages(messages)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			setMessages(messages)
		})
	}

	function clearMessages() {
		this.setState({messages: []})
	}

	function clearResendMessages() {
		this.setState({resendMessages: []})
	}

	useEffect(() => {
		if (autoVerify.current) {
			setTimeout(verify, 3000)
			autoVerify.current = false
		}
	})

	return (
		<div className='login-container'>
			<div className='login-body'>
				<div>Please click on the link in the email you received or enter the verification code:</div>
			</div>
			<div className='login-body'>
				<div className='login-form'>
					<label htmlFor='code' className='login-label'>Verification Code</label>
					<input id='code' name='code' type='text' value={code} placeholder='Verification Code' autoComplete='one-time-code' className='login-field' onChange={updateCode} onKeyDown={onKeyDown}/>
					<button className='login-submit' onClick={verify}>Verify</button>
					<Notice messages={messages} priority='error' clearMessages={clearMessages}/>
				</div>
			</div>
			<div className='login-body'>
				<div>Didn't receive the email? <button className='button' onClick={resend}>Resend</button></div>
				<Notice messages={resendMessages} clearMessages={clearResendMessages}/>
			</div>
		</div>
	)
}
