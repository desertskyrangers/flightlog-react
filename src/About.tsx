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
					<div className='page-header-row'>
						<h1>About</h1>
						<span className='icon' onClick={close}>{Icons.CLOSE}</span>
					</div>
					<div><span className='page-label'>version</span> {props.version}</div>
					<hr/>
					<div><span className='page-label'>hosted by</span> <a href='https://www.desertskyrangers.org/'>Desert Sky Rangers</a></div>
					<div><span className='page-label'>written by</span> Mark Soderquist</div>
					<hr/>
					<div><a href='https://github.com/desertskyrangers/flightdeck/issues/new'>Submit an enhancement request</a></div>
					<div><a href='https://github.com/desertskyrangers/flightdeck/issues/new'>Submit a bug report</a></div>

					<h1>Privacy Policy</h1>

					<div>
						Collection of personal information (name, email, phone number, etc.)
						is for the express purpose to support FlightDeck members. Personal
						information is not released to any other group or entity for any
						purpose except if legally required.
					</div>

				</div>
			</div>
		</div>
	)
}
