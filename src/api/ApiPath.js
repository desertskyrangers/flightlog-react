class ApiPath {

	ROOT = ""

	LEGAL = this.ROOT + "/legal"

	REGISTER = this.ROOT + "/register"
	VERIFY = this.ROOT + "/verify"
	LOGIN = this.ROOT + "/login"

	HOME = this.ROOT + "/"
	PROFILE = "/profile"
	SETTINGS = "/settings"
}

const instance = new ApiPath()
Object.freeze(instance)
export default instance
