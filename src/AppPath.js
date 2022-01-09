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
	PROFILE = this.USER + "/profile"
	AIRCRAFT = this.ROOT + "/aircraft"
	ORG_AIRCRAFT = this.AIRCRAFT + "/org"
	USER_AIRCRAFT = this.AIRCRAFT + "/user"
}

const instance = new AppPath()
Object.freeze(instance)
export default instance
