export default function EntryField(props) {

	return (
		<div>
			<div className='page-label-row'>
				<label htmlFor={props.id} className='page-label'>{props.text}</label>
				<span className='icon' onClick={props.onIconClick}>{props.icon}</span>
			</div>
			<input id={props.id}
						 name={props.id}
						 type={props.type}
						 placeholder={props.text}
						 autoCapitalize='none'
						 autoCorrect='off'
						 className='page-field'
						 autoFocus={props.autoFocus}
						 value={props.value}
						 onChange={props.onChange}
						 onKeyDown={props.onKeyDown}/>
		</div>
	)

}
