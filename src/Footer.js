import React from "react";
import CopyrightNotice from "./CopyrightNotice";

export default function Footer() {

	const year = new Date().getFullYear()

	return (
		<div className='footer'>
			<div className='copyright'><a href='/legal'><CopyrightNotice year={year}/></a></div>
			<div className='tag-line'><q>A true master is always learning</q> -Unknown</div>
		</div>
	)

}
