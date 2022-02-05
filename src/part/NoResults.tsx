import Icons from "../util/Icons";

export default function NoResults(props) {

	const message = props.message || 'no results'

	return (
		<div className='page-result'>{Icons.NO_RESULT} {message}</div>
	)

}
