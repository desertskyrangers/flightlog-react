import {faHome, faPlane, faUser, faBars} from '@fortawesome/free-solid-svg-icons'

class Icons {

	BARS = faBars
	HOME = faHome
	PLANE = faPlane
	USER = faUser

}

const instance = new Icons()
Object.freeze(instance)
export default instance
