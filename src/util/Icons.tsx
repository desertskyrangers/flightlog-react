import React from 'react'
import {
	faAngleDoubleRight,
	faAngleDown,
	faAngleUp,
	faAsterisk,
	faBan,
	faBars,
	faBatteryEmpty,
	faBatteryFull,
	faBatteryHalf,
	faBatteryQuarter,
	faBatteryThreeQuarters,
	faBinoculars,
	faBuilding,
	faBurst,
	faCalendar,
	faCheck,
	faChevronLeft,
	faChevronRight,
	faClock,
	faCopy,
	faEllipsisH,
	faEllipsisV,
	faEnvelope,
	faGear,
	faHelicopter,
	faHome,
	faKey,
	faPlane,
	faPlaneSlash,
	faPlus,
	faQuestion,
	faShareNodes,
	faSlash,
	faSpinner,
	faTrash,
	faTv,
	faUserAlt,
	faUserFriends,
	faUsers
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import DroneIcon from "../icon/DroneIcon"
import CloseIcon from "../icon/CloseIcon"

class Icons {

	ACCEPT = <FontAwesomeIcon icon={faCheck}/>
	ADD = <FontAwesomeIcon icon={faPlus}/>
	ADVANCED = <FontAwesomeIcon icon={faEllipsisH}/>
	ADVANCED_V = <FontAwesomeIcon icon={faEllipsisV}/>
	AIRCRAFT_DECOMMISSIONED = <FontAwesomeIcon icon={faBurst}/>
	AIRCRAFT_INOPERATIVE = <FontAwesomeIcon icon={faPlaneSlash}/>
	AIRCRAFT_DESTROYED = <FontAwesomeIcon icon={faBurst}/>
	BARS = <FontAwesomeIcon icon={faBars}/>
	BATTERY = <FontAwesomeIcon icon={faBatteryFull}/>
	BATTERY_NEW = <span className='fa-layers fa-fw'><FontAwesomeIcon icon={faBatteryFull}/><FontAwesomeIcon icon={faAsterisk} transform='shrink-4 up-5 left-7'/></span>
	BATTERY_FULL = <FontAwesomeIcon icon={faBatteryFull}/>
	BATTERY_THREE_QUARTER = <FontAwesomeIcon icon={faBatteryThreeQuarters}/>
	BATTERY_HALF = <FontAwesomeIcon icon={faBatteryHalf}/>
	BATTERY_QUARTER = <FontAwesomeIcon icon={faBatteryQuarter}/>
	BATTERY_EMPTY = <FontAwesomeIcon icon={faBatteryEmpty}/>
	BATTERY_DESTROYED = <span className='fa-layers fa-fw'><FontAwesomeIcon icon={faBatteryEmpty}/><FontAwesomeIcon icon={faSlash}/></span>
	CALENDAR = <FontAwesomeIcon icon={faCalendar}/>
	CANCEL = <FontAwesomeIcon icon={faBan}/>
	CLOCK = <FontAwesomeIcon icon={faClock}/>
	CLOSE = <CloseIcon/>
	CLUB = <FontAwesomeIcon icon={faUserFriends}/>
	COLLAPSE = <FontAwesomeIcon icon={faAngleUp}/>
	COMPANY = <FontAwesomeIcon icon={faBuilding}/>
	COPY = <FontAwesomeIcon icon={faCopy}/>
	DASHBOARD = <FontAwesomeIcon icon={faTv}/>
	DELETE = <FontAwesomeIcon icon={faTrash}/>
	DRONE = <DroneIcon/>
	ENVELOPE = <FontAwesomeIcon icon={faEnvelope}/>
	EXPAND = <FontAwesomeIcon icon={faAngleDown}/>
	FLIGHTS = <FontAwesomeIcon icon={faBars}/>
	GROUP = <FontAwesomeIcon icon={faUsers}/>
	GROUP_ADD = <FontAwesomeIcon icon={faPlus}/>
	HELICOPTER = <FontAwesomeIcon icon={faHelicopter}/>
	HOME = <FontAwesomeIcon icon={faHome}/>
	INVITE = <FontAwesomeIcon icon={faPlus}/>
	KEY = <FontAwesomeIcon icon={faKey}/>
	MEMBER = <FontAwesomeIcon icon={faUserAlt}/>
	MEMBERSHIP = <FontAwesomeIcon icon={faUserAlt}/>
	NO_RESULT = <FontAwesomeIcon icon={faBan}/>
	OBSERVER = <FontAwesomeIcon icon={faBinoculars}/>
	OWNER = <FontAwesomeIcon icon={faKey}/>
	PAGE_NEXT = <FontAwesomeIcon icon={faChevronRight}/>
	PAGE_PRIOR = <FontAwesomeIcon icon={faChevronLeft}/>
	PILOT = <FontAwesomeIcon icon={faUserAlt}/>
	PLANE = <FontAwesomeIcon icon={faPlane}/>
	REVOKE = <FontAwesomeIcon icon={faBan}/>
	SEND = <FontAwesomeIcon icon={faAngleDoubleRight}/>
	SETUP = <FontAwesomeIcon icon={faGear}/>
	SHARE = <FontAwesomeIcon icon={faShareNodes}/>
	UNKNOWN = <FontAwesomeIcon icon={faQuestion}/>
	USER = <FontAwesomeIcon icon={faUserAlt}/>
	WAIT = <FontAwesomeIcon icon={faSpinner}/>

	private aircraftTypeIcons = {
		fixedwing: this.PLANE,
		helicopter: this.HELICOPTER,
		multirotor: this.DRONE,
		other: this.DRONE
	}

	private aircraftStatusIcons = {
		preflight: this.PLANE,
		airworthy: this.PLANE,
		inoperative: this.AIRCRAFT_INOPERATIVE,
		decommissioned: this.AIRCRAFT_DECOMMISSIONED,
		destroyed: this.AIRCRAFT_DESTROYED
	}

	private userFlightRoleIcons = {
		pilot: this.PILOT,
		observer: this.OBSERVER,
		owner: this.OWNER,
		other: this.UNKNOWN
	}

	private groupTypeIcons = {
		club: this.CLUB,
		company: this.COMPANY,
		group: this.GROUP,
	}

	private batteryStatusIcons = {
		new: this.BATTERY_NEW,
		available: this.BATTERY,
		destroyed: this.BATTERY_DESTROYED
	}

	fromAircraftType(type) {
		let icon = instance.aircraftTypeIcons[type]
		if (!icon) icon = instance.PLANE
		return icon
	}

	fromUserFlightRole(role) {
		let icon = instance.userFlightRoleIcons[role]
		if (!icon) icon = instance.PLANE
		return icon
	}

	fromGroupType(type) {
		let icon = instance.groupTypeIcons[type]
		if (!icon) icon = instance.GROUP
		return icon
	}

	fromAircraftStatus(status) {
		let icon = instance.aircraftStatusIcons[status]
		if (!icon) icon = instance.PLANE
		return icon
	}

	fromAircraftTypeAndStatus(type, status) {
		if (status === 'airworthy' || status === 'preflight') {
			return this.fromAircraftType(type)
		} else {
			return this.fromAircraftStatus(status);
		}
	}

	fromBatteryStatus(status) {
		let icon = instance.batteryStatusIcons[status]
		if (!icon) icon = instance.BATTERY
		return icon
	}

	fromBatteryStatusAndLife(status, life) {
		if (status !== "available") {
			return this.fromBatteryStatus(status)
		} else {
			if (life > 80) return this.BATTERY_FULL;
			if (life > 60) return this.BATTERY_THREE_QUARTER;
			if (life > 40) return this.BATTERY_HALF;
			if (life > 20) return this.BATTERY_QUARTER;
			return this.BATTERY_EMPTY;
		}
	}
}

const instance = new Icons()
Object.freeze(instance)
export default instance
