import {faBan, faBars, faHelicopter, faHome, faPlane, faSpinner, faTimesCircle, faUser} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DroneIcon from "./icon/DroneIcon";

class Icons {

	BARS = <FontAwesomeIcon icon={faBars}/>
	CLOSE = <FontAwesomeIcon icon={faTimesCircle}/>
	DRONE = <DroneIcon/>
	HELICOPTER = <FontAwesomeIcon icon={faHelicopter}/>
	HOME = <FontAwesomeIcon icon={faHome}/>
	NO_RESULT = <FontAwesomeIcon icon={faBan}/>
	PLANE = <FontAwesomeIcon icon={faPlane}/>
	USER = <FontAwesomeIcon icon={faUser}/>
	WAIT = <FontAwesomeIcon icon={faSpinner}/>

}

const instance = new Icons()
Object.freeze(instance)
export default instance
