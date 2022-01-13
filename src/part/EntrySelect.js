import React from "react";

export default function EntrySelect(props) {

	const isRequired=props.required
	const text = props.text + (isRequired ? " *" : "" )

	return (
		<div>
			<label htmlFor={props.id} className='page-label'>{text}</label>
			<select id={props.id} name={props.id} value={props.value} className='page-field' onChange={props.onChange} onKeyDown={props.onKeyDown}>
				{props.children}
			</select>
		</div>
	)

}
