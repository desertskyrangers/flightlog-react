import {faBars, faHome, faPlane, faSpinner, faBan, faUser} from '@fortawesome/free-solid-svg-icons'

class Icons {

	BARS = faBars
	HOME = faHome
	NO_RESULT = faBan
	PLANE = faPlane
	USER = faUser
	WAIT = faSpinner

}

const instance = new Icons()
Object.freeze(instance)
export default instance
