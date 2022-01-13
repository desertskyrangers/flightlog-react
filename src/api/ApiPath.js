class ApiPath {

	ROOT = "/api"

	AIRCRAFT = this.ROOT + "/aircraft"

	BATTERY = this.ROOT + "/battery"

	FLIGHT = this.ROOT + "/flight"

	AUTH = this.ROOT + "/auth"

	USER = this.ROOT + "/user"

	USER_AIRCRAFT = this.USER + "/aircraft"

	USER_BATTERY = this.USER + "/battery"

	USER_FLIGHT = this.USER + "/flight"

	USER_AIRCRAFT_LOOKUP = this.USER_AIRCRAFT + "/lookup"

	USER_BATTERY_LOOKUP = this.USER_BATTERY + "/lookup"
}

const instance = new ApiPath()
Object.freeze(instance)
export default instance
