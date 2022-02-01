import {faAngleUp, faBan, faBars, faBatteryFull, faBuilding, faCalendar, faClock, faEllipsisH, faHelicopter, faHome, faKeyboard, faPlane, faPlus, faSpinner, faTimesCircle, faTrash, faUser, faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DroneIcon from "../icon/DroneIcon";

class Icons {

	ADVANCED = <FontAwesomeIcon icon={faEllipsisH}/>
	BARS = <FontAwesomeIcon icon={faBars}/>
	BATTERY = <FontAwesomeIcon icon={faBatteryFull}/>
	CALENDAR = <FontAwesomeIcon icon={faCalendar}/>
	CLOCK = <FontAwesomeIcon icon={faClock}/>
	CLOSE = <FontAwesomeIcon icon={faTimesCircle}/>
	CLUB = <FontAwesomeIcon icon={faUsers}/>
	COLLAPSE_UP = <FontAwesomeIcon icon={faAngleUp}/>
	COMPANY = <FontAwesomeIcon icon={faBuilding}/>
	DASHBOARD = <FontAwesomeIcon icon={faKeyboard}/>
	DELETE = <FontAwesomeIcon icon={faTrash}/>
	DRONE = <DroneIcon/>
	GROUP = <FontAwesomeIcon icon={faUsers}/>
	GROUP_ADD = <FontAwesomeIcon icon={faPlus}/>
	HELICOPTER = <FontAwesomeIcon icon={faHelicopter}/>
	HOME = <FontAwesomeIcon icon={faHome}/>
	NO_RESULT = <FontAwesomeIcon icon={faBan}/>
	PLANE = <FontAwesomeIcon icon={faPlane}/>
	USER = <FontAwesomeIcon icon={faUser}/>
	WAIT = <FontAwesomeIcon icon={faSpinner}/>

	fromAircraftType(type) {
		const aircraftTypeIcons = {
			fixedwing: instance.PLANE,
			helicopter: instance.HELICOPTER,
			multirotor: instance.DRONE,
			other: instance.DRONE
		}

		let icon = aircraftTypeIcons[type]
		if (!icon) icon = instance.DRONE

		return icon
	}

	fromGroupType(type) {
		const orgTypeIcons = {
			club: instance.CLUB,
			company: instance.COMPANY,
			group: instance.GROUP,
		}

		let icon = orgTypeIcons[type]
		if (!icon) icon = instance.GROUP

		return icon
	}

}

const instance = new Icons()
Object.freeze(instance)
export default instance
