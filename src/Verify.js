import React from "react";
import Notice from "./Notice";
import AuthService from "./api/AuthService";
import {useSearchParams} from "react-router-dom";

export default function Verify(props) {
	const [searchParams] = useSearchParams();

	return (
		<VerifyAccountEmailComponent vid={searchParams.get("id")} messages={props.messages}/>
	);
}

class VerifyAccountEmailComponent extends React.Component {

	state = {
		id: this.props.vid,
		code: '',
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
			// TODO What to do with a good response??? Since we should have a valid JWT token we can just go home
			console.log(response)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			this.setState({messages: messages})
		})
	}

	resend = () => {
		this.setState({resendMessages: ["Resend not implemented"]})
	}

	clearMessages = () => {
		this.setState({messages: []})
	}

	clearResendMessages = () => {
		this.setState({resendMessages: []})
	}

	render() {
		return (
			<div className='login-container'>
				<div className='login-banner'>
					<img src='logo.png' alt='Logo'/>
					<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<div>Please click on the link in the email you received or enter the verification code:</div>
				</div>
				<div className='login-body'>
					<div className='login-form'>
						<label htmlFor='code' className='login-label'>Verification Code</label>
						<input id='code' name='code' type='text' placeholder='Verification Code' className='login-field' onChange={this.updateCode} onKeyDown={this.onKeyDown}/>
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
