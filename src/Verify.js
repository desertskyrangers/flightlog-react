import React from "react";
import Notice from "./Notice";
import AuthService from "./api/AuthService";
import {useParams} from "react-router-dom";

export default function Verify(props) {
	const {id} = useParams()
	const {code} = useParams()

	return (
		<VerifyAccountEmailComponent id={id} code={code} messages={props.messages}/>
	);
}

class VerifyAccountEmailComponent extends React.Component {

	state = {
		id: this.props.id || '',
		code: this.props.code || '',
		messages: this.props.messages || [],
		resendMessages: []
	}

	updateCode = (event) => {
		this.setState({code: event.target.value})
	}

	onKeyDown = (event) => {
		if (event.key === 'Enter') this.verify();
	}

	verify = () => {
		AuthService.verify(this.state.id, this.state.code, (response) => {
			window.location.assign("/")
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		})
	}

	resend = () => {
		AuthService.resend(this.state.id, (response) => {
			let messages = response.messages
			if (!!!messages) messages = [response.message]
			this.setState({messages: messages})
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	clearResendMessages = () => {
		this.setState({resendMessages: []})
	}

	componentDidMount() {
		if (this.state.code !== '') setTimeout(this.verify, 100)
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='/logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<div>Please click on the link in the email you received or enter the verification code:</div>
				</div>
				<div className='login-body'>
					<div className='login-form'>
						<label htmlFor='code' className='login-label'>Verification Code</label>
						<input id='code' name='code' type='text' value={this.state.code} placeholder='Verification Code' className='login-field' onChange={this.updateCode} onKeyDown={this.onKeyDown}/>
						<button className='login-submit' onClick={this.verify}>Verify</button>
						<Notice messages={this.state.messages} priority='error' clearMessages={this.clearMessages}/>
					</div>
				</div>
				<div className='login-body'>
					<div>Didn't receive the email? <button className='button' onClick={this.resend}>Resend</button></div>
					<Notice messages={this.state.resendMessages} clearMessages={this.clearResendMessages}/>
				</div>
			</div>
		)
	}

}
