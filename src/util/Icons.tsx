import React from 'react';
import {
    faAngleDoubleRight,
    faAngleUp,
    faBan,
    faBars,
    faBatteryFull,
    faBinoculars,
    faBuilding,
    faCalendar,
    faCheck,
    faClock,
    faEllipsisH,
    faEnvelope,
    faHelicopter,
    faHome,
    faKey,
    faKeyboard,
    faPlane,
    faPlus,
    faQuestion,
    faSpinner,
    faTimesCircle,
    faTrash,
    faUserAlt,
    faUserFriends,
    faUsers
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DroneIcon from "../icon/DroneIcon";

class Icons {

    ACCEPT = <FontAwesomeIcon icon={faCheck}/>
    ADD = <FontAwesomeIcon icon={faPlus}/>
    ADVANCED = <FontAwesomeIcon icon={faEllipsisH}/>
    BARS = <FontAwesomeIcon icon={faBars}/>
    BATTERY = <FontAwesomeIcon icon={faBatteryFull}/>
    CALENDAR = <FontAwesomeIcon icon={faCalendar}/>
    CANCEL = <FontAwesomeIcon icon={faBan}/>
    CLOCK = <FontAwesomeIcon icon={faClock}/>
    CLOSE = <FontAwesomeIcon icon={faTimesCircle}/>
    CLUB = <FontAwesomeIcon icon={faUserFriends}/>
    COLLAPSE_UP = <FontAwesomeIcon icon={faAngleUp}/>
    COMPANY = <FontAwesomeIcon icon={faBuilding}/>
    DASHBOARD = <FontAwesomeIcon icon={faKeyboard}/>
    DELETE = <FontAwesomeIcon icon={faTrash}/>
    DRONE = <DroneIcon/>
    ENVELOPE = <FontAwesomeIcon icon={faEnvelope}/>
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
    OWNER = <FontAwesomeIcon icon={faUserAlt}/>
    PLANE = <FontAwesomeIcon icon={faPlane}/>
    REVOKE = <FontAwesomeIcon icon={faBan}/>
    SEND = <FontAwesomeIcon icon={faAngleDoubleRight}/>
    UNKNOWN = <FontAwesomeIcon icon={faQuestion}/>
    USER = <FontAwesomeIcon icon={faUserAlt}/>
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
