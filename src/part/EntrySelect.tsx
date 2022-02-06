import React from "react";

export default function EntrySelect(props) {

    const isRequired: boolean = props.required
    const help: string = !props.help ? '' : '(' + props.help + ')'
    const text: string = props.text + (isRequired ? ' *' : '') + ' ' + help

    return (
        <div>
            {
                !!props.text ?
                    <div className='page-label-row'>
                        <label htmlFor={props.id} className='page-label'>{text}</label>
                        {props.labelActionIcon ? <span className='icon page-label-action-button' onClick={props.onLabelAction}>{props.labelActionIcon}</span> : null}
                    </div> : null
            }
            <div className='hbox'>
                <select id={props.id} name={props.id} value={props.value} className='page-field' onChange={props.onChange} onKeyDown={props.onKeyDown}>
                    {props.children}
                </select>
                {props.fieldActionIcon ? <button className='icon page-field-action-button' onClick={props.onFieldAction}>{props.fieldActionIcon}</button> : null}
            </div>
        </div>
    )

}
