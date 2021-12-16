import React from "react";

export default class CopyrightText extends React.Component {

	render() {
		return (
			<span>&copy; {new Date().getFullYear()} Desert Sky Rangers</span>
		);
	}

}
