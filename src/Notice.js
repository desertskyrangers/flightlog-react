import './css/app.css'
import './css/notice.css'

import React from 'react';

export default function Notice(props) {
	const visible = props.messages.length > 0
	return visible ? <NoticeElement messages={props.messages} priority={props.priority} onClick={props.clearMessages}/> : null;
}

function NoticeElement(props) {
	const priorityClass = 'notice-' + props.priority;

	return (
		<div className={'notice ' + priorityClass} hidden='hidden'>
			<div className='notice-messages'>
				{props.messages.map((message, index) => {
					return (<div key={index} className='notice-message'>{message}</div>)
				})}
			</div>
			<CloseButton onClick={props.onClick}/>
		</div>
	)
}

function CloseButton(props) {
	return (
		<button type='button' className='notice-close' onClick={props.onClick}>
			<svg width='16' height='16' viewBox='0 0 16 16' className='icon'>
				<path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
			</svg>
		</button>
	)
}
