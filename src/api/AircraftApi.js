import Config from "../AppConfig";
import ApiPath from "./ApiPath";
import ApiService from "./ApiService"

class AircraftService extends ApiService {

	getAircraftPage(page, successCallback, failureCallback) {
		this.fetchNoAuth(Config.API_URL + ApiPath.AIRCRAFT + "/" + page, {
			method: 'GET',
		}).then((response) => {
			console.log( JSON.stringify( response))
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}

const instance = new AircraftService()
Object.freeze(instance)
export default instance
