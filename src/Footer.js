import React from "react";
import CopyrightNotice from "./CopyrightNotice";

export default class Footer extends React.Component {

	render() {
		return (
			<div className='footer'>
				<div className='copyright'><a href='/legal'><CopyrightNotice year={new Date().getFullYear()}/></a></div>
				<div className='tag-line'><q>A true master is always learning</q> -Unknown</div>
			</div>
		);
	}

}
