import React from "react";
import CopyrightNotice from "./CopyrightNotice";

export default function Footer(props) {

	const year = new Date().getFullYear()

	return (
		<div className='footer'>
			<div className='copyright'><a href='/legal'><CopyrightNotice year={year}/></a></div>
			<div className='tag-line'>v{props.version}</div>
		</div>
	)

}
