import React, {useState} from 'react'
import {SketchPicker} from 'react-color'
import Numbers from '../util/Numbers'

export default function EntryColor(props) {

	const isRequired: boolean = props.required
	const help: string = !props.help ? '' : '(' + props.help + ')'
	const text: string = props.text + (isRequired ? ' *' : '')

	const [colorPickerVisible, setColorPickerVisible] = useState<boolean>(props.colorPickerVisibile || false)

	function openColorPicker() {
		setColorPickerVisible(!colorPickerVisible)
	}

	function changeColor(color) {
		setColorPickerVisible(false)
		props.onChange({target: {value: fromReactColor(color)}})
	}

	function toReactColor(color) {
		const r = Number.parseInt(color.substring(0,2), 16);
		const g = Number.parseInt(color.substring(2,2), 16);
		const b = Number.parseInt(color.substring(4,2), 16);
		const a = Number.parseInt(color.substring(6,2), 16);
		return { r: r, g: g, b: b, a: a };
	}

	function fromReactColor(reactColor) {
		const r = Numbers.decimalToHex(reactColor.rgb.r, 2)
		const g = Numbers.decimalToHex(reactColor.rgb.g, 2)
		const b = Numbers.decimalToHex(reactColor.rgb.b, 2)
		const a = Numbers.decimalToHex(255 * reactColor.rgb.a, 2)
		return "#" + r + g + b + a;
	}

	return (
		<div>
			{
				!!props.text ?
					<div className='page-label-row'>
						<label htmlFor={props.id} className='page-label'>{text}</label>
						<span className='icon' onClick={props.onIconClick}>{props.icon}</span>
						{props.labelActionIcon ? <span className='icon page-label-action-button' onClick={props.onLabelAction}>{props.labelActionIcon}</span> : null}
					</div> : null
			}
			{
				!!help ?
					<div className='page-label-row'>
						<label className='page-label'>{help}</label>
					</div> : null
			}
			<div className='hbox'>
				<span style={{'backgroundColor': props.value, 'width': '100%'}} onClick={openColorPicker}>&nbsp;</span>
				{props.fieldActionIcon ? <button className='icon page-field-action-button' title={props.fieldActionTitle} onClick={props.onFieldAction}>{props.fieldActionIcon}</button> : null}
			</div>
			{colorPickerVisible ? <div className='hbox'><SketchPicker color={toReactColor(props.value)} onChangeComplete={changeColor}/></div> : null}
		</div>
	)

}
