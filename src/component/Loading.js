import Icons from "../Icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function Loading() {

	return (
		<div className='page-field'><FontAwesomeIcon icon={Icons.WAIT}/> loading...</div>
	)

}
