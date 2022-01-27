class AppPath {

	ROOT = ""

	// Not protected (does not require authentication)
	ABOUT = this.ROOT + "/about"
	LEGAL = this.ROOT + "/legal"
	LOGIN = this.ROOT + "/login"
	RECOVER = this.ROOT + "/recover"
	REGISTER = this.ROOT + "/register"
	RESET = this.ROOT + "/reset"
	VERIFY = this.ROOT + "/verify"

	// Protected (requires authentication)
	HOME = this.ROOT + "/"

	AIRCRAFT = this.ROOT + "/aircraft"
	ORG_AIRCRAFT = this.AIRCRAFT + "/org"
	USER_AIRCRAFT = this.AIRCRAFT + "/user"

	BATTERY = this.ROOT + "/battery"
	USER_BATTERIES = this.BATTERY + "/user"

	FLIGHT = this.ROOT + "/flight"
	FLIGHT_TIMER = this.FLIGHT + "/timer"

	FLIGHTS = this.ROOT + "/flights"
	ORG_FLIGHTS = this.FLIGHTS + "/org"
	USER_FLIGHTS = this.FLIGHTS + "/user"

	ORG = this.ROOT + "/org"
	USER_ORGS = this.ORG + "/user"

	SETUP = this.ROOT + "/settings"

	USER = this.ROOT + "/user"
	PASSWORD = this.USER + "/password"
	PROFILE = this.USER + "/profile"
}

const instance = new AppPath()
Object.freeze(instance)
export default instance
