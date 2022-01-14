import React from "react";

export default function EntrySelect(props) {

	const isRequired=props.required
	const text = props.text + (isRequired ? " *" : "" )

	return (
		<div>
			<div className='page-label-row'>
				<label htmlFor={props.id} className='page-label'>{text}</label>
				{props.labelActionIcon ? <span className='icon page-label-action-button' onClick={props.onLabelAction}>{props.labelActionIcon}</span> : null}
			</div>
			<select id={props.id} name={props.id} value={props.value} className='page-field' onChange={props.onChange} onKeyDown={props.onKeyDown}>
				{props.children}
			</select>
		</div>
	)

}
