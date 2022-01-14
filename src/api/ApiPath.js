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

	USER_LOOKUP = this.USER + "/lookup"

	USER_AIRCRAFT_LOOKUP = this.USER_LOOKUP + "/aircraft"

	USER_BATTERY_LOOKUP = this.USER_LOOKUP + "/battery"

	USER_OBSERVER_LOOKUP = this.USER_LOOKUP + "/observer"

	USER_PILOT_LOOKUP = this.USER_LOOKUP + "/pilot"
}

const instance = new ApiPath()
Object.freeze(instance)
export default instance
