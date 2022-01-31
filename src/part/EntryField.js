export default function EntryField(props) {

	const isRequired = props.required
	const help = !props.help ? '' : '(' + props.help + ')'
	const text = props.text + (isRequired ? ' *' : '') + ' ' + help

	return (
		<div>
			<div className='page-label-row'>
				<label htmlFor={props.id} className='page-label'>{text}</label>
				<span className='icon' onClick={props.onIconClick}>{props.icon}</span>
				{props.labelActionIcon ? <span className='icon page-label-action-button' onClick={props.onLabelAction}>{props.labelActionIcon}</span> : null}
			</div>
			<div className='hbox'>
				<input id={props.id}
							 name={props.id}
							 type={props.type}
							 min={props.min}
							 max={props.max}
							 placeholder={props.text}
							 autoCapitalize='none'
							 autoCorrect='off'
							 className='page-field'
							 autoFocus={props.autoFocus}
							 value={props.value}
							 onChange={props.onChange}
							 onKeyDown={props.onKeyDown}/>
				{props.fieldActionIcon ? <button className='icon-button page-field-action-button' onClick={props.onFieldAction}>{props.fieldActionIcon}</button> : null}
			</div>
		</div>
	)

}
