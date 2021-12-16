import React from "react";

export default class CopyrightNotice extends React.Component {

	render() {
		return (
			<span>&copy; {this.props.year} Desert Sky Rangers</span>
		);
	}

}
