import Icons from "../Icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function NoResults(props) {

	const message = props.message || 'no results'

	return (
		<div className='page-result'>{Icons.NO_RESULT} {message}</div>
	)

}
