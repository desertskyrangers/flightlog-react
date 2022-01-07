import Notice from "../part/Notice";
import {useState} from "react";

export default function Aircraft(props) {

	const [name, setName] = useState(props.name || '')
	const [messages, setMessages] = useState([])

	function update() {
		console.log("Update aircraft")
	}

	function updateField() {

	}

	function onKeyDown(event) {
		if (event.key === 'Enter') update();
	}

	function clearMessages() {
		setMessages([])
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<ProfileField id='name' text='Name' type='text' autoFocus='autofocus' value={name} onChange={updateField} onKeyDown={onKeyDown}/>
					{/*<ProfileField id='lastName' text='Last Name' type='text' value={this.state.lastName} onChange={this.updateField} onKeyDown={this.onKeyDown}/>*/}
					{/*<ProfileField id='preferredName' text='Preferred Name' type='text' value={this.state.preferredName} onChange={this.updateField} onKeyDown={this.onKeyDown}/>*/}
					{/*<ProfileField id='email' text='Email' type='text' value={this.state.email} onChange={this.updateField} onKeyDown={this.onKeyDown}/>*/}
					{/*<ProfileField id='smsNumber' text='SMS Number' type='text' value={this.state.smsNumber} onChange={this.updateField} onKeyDown={this.onKeyDown}/>*/}
					{/*<div>*/}
					{/*	<label htmlFor='smsCarrier' className='page-label'>SMS Carrier</label>*/}
					{/*	<select id='smsCarrier' name='smsCarrier' value={this.state.smsCarrier} className='page-field' onChange={this.updateField}>*/}
					{/*		{this.state.smsCarriers.map((carrier) => <option key={carrier.id} value={carrier.id}>{carrier.name}</option>)}*/}
					{/*	</select>*/}
					{/*</div>*/}
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
					<button disabled={messages.length > 0} className='page-submit' onClick={update}>Update</button>
				</div>
			</div>
		</div>
	)

}

function ProfileField(props) {

	return (
		<div>
			<label htmlFor={props.id} className='page-label'>{props.text}</label>
			<input id={props.id} name={props.id} type={props.type} placeholder={props.text} autoCapitalize='none' autoCorrect='off' className='page-field' autoFocus={props.autoFocus} value={props.value} onChange={props.onChange}
						 onKeyDown={props.onKeyDown}/>
		</div>
	);

}
