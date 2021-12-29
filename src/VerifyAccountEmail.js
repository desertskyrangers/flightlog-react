import React from "react";
import Notice from "./Notice";
import AuthService from "./api/AuthService";
import {useSearchParams} from "react-router-dom";

export default function VerifyAccountEmail() {
	const searchParams = useSearchParams();

	return (
		<InternalVerifyAccountEmail vid={searchParams.get("id")}/>
	);
}

class InternalVerifyAccountEmail extends React.Component {

	state = {
		id: this.props.vid,
		code: '',
		messages: [],
		resendMessages: []
	}

	updateCode = (event) => {
		this.setState({code: event.target.value})
	}

	verify = () => {
		AuthService.verify(this.state.id, this.state.code, () => {

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
					<form className='login-form'>
						<input id='code' name='code' type='text' className='login-field' onChange={this.updateCode}/>
						<input type='button' className='login-submit' value='Verify' onClick={this.verify}/>
						<Notice messages={this.state.messages} priority='error' clearMessages={this.clearMessages}/>
					</form>
				</div>
				<div className='login-body'>
					<p>Didn't receive the email? <a className='button' onClick={this.resend}>Resend</a></p>
					<Notice messages={this.state.resendMessages} clearMessages={this.clearResendMessages}/>
				</div>
			</div>
		)
	}

}
