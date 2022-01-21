import React from "react";
import {useNavigate} from "react-router-dom";
import Icons from "./util/Icons";

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
						<span>Version {props.version}</span>
						<span className='icon' onClick={close}>{Icons.CLOSE}</span>
					</div>
					<hr/>
					<div><span className='page-label'>hosted by</span> Desert Sky Rangers</div>
					<div><span className='page-label'>written by</span> Mark Soderquist</div>
					<hr/>
					<div><a href='https://github.com/desertskyrangers/flightdeck-react/issues/new'>Submit an enhancement request</a></div>
					<div><a href='https://github.com/desertskyrangers/flightdeck-react/issues/new'>Submit a bug report</a></div>
				</div>
			</div>
		</div>
	)
}
