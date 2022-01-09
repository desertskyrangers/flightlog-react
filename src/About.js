import React from "react";
import {useNavigate} from "react-router-dom";
import Icons from "./Icons";

export default function About(props) {
	const navigate = useNavigate();

	function close() {
		navigate(-1)
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<div className='page-label-row'>
						<span>version {props.version}</span>
						<span className='icon' onClick={close}>{Icons.CLOSE}</span>
					</div>
					<div>hosted by Desert Sky Rangers</div>
					<div>written by Mark Soderquist</div>
				</div>
			</div>
		</div>
	)
}
