import './css/app.css'
import './css/notice.css'

import React from 'react';

export default class Notice extends React.Component {

	state = {
		visible: this.props.visible
	}

	closeNotice = () => {
		console.log("Close notice")
		this.setState(prevState => (
			{
				visible: !prevState.visible
			}
		));
	}

	render() {
		return this.state.visible ? <NoticeElement message={this.props.message} priority={this.props.priority} onClick={this.closeNotice}/> : null;
	}
}

class NoticeElement extends React.Component {

	render() {
		const priorityClass = 'notice-' + this.props.priority;
		return (
			<div className={'notice ' + priorityClass} hidden='hidden'>
				<div className='notice-message'>{this.props.message}</div>
				<CloseButton onClick={this.props.onClick}/>
			</div>
		);
	}
}

class CloseButton extends React.Component {

	render() {
		return (
			<button type='button' className='notice-close' onClick={this.props.onClick}>
				<svg width='16' height='16' viewBox='0 0 16 16' className='icon'>
					<path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"/>
				</svg>
			</button>
		);
	}

}
