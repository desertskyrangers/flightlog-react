class AppPath {

	ROOT = ""

	// Not protected (does not require authentication)
	ABOUT = this.ROOT + "/about"
	LEGAL = this.ROOT + "/legal"
	LOGIN = this.ROOT + "/login"
	REGISTER = this.ROOT + "/register"
	VERIFY = this.ROOT + "/verify"

	// Protected (requires authentication)
	HOME = this.ROOT + "/"
	FLIGHTS = this.ROOT + "/flights"
	SETUP = this.ROOT + "/settings"

	USER = this.ROOT + "/user"
	AIRCRAFT = this.ROOT + "/aircraft"
	BATTERY = this.ROOT + "/battery"
	FLIGHT = this.ROOT + "/flight"
	FLIGHT_TIMER = this.FLIGHT + "/timer"
	PROFILE = this.USER + "/profile"
	ORG_AIRCRAFT = this.AIRCRAFT + "/org"
	USER_AIRCRAFT = this.AIRCRAFT + "/user"
	USER_BATTERIES = this.BATTERY + "/user"
	USER_FLIGHTS = this.FLIGHTS + "/user"
	//ORG_FLIGHTS = this.FLIGHTS + "/org"
}

const instance = new AppPath()
Object.freeze(instance)
export default instance
