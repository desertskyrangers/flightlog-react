import React from "react";
import CopyrightText from "./CopyrightText";

export default class Footer extends React.Component {

	render() {
		return (
			<div className='footer'>
				<div className='copyright'><a href='/legal'><CopyrightText/></a></div>
				<div className='tag-line'><q>A true master is always learning</q> -Unknown</div>
			</div>
		);
	}

}
