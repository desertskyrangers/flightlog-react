import Config from "../AppConfig";
import ApiService from "./ApiService"

class AppService extends ApiService {

	getProgramInformation(successCallback, failureCallback) {
		console.log("get program info...")
		this.fetchNoAuth(Config.API_URL + '/api/monitor/status', {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}

const instance = new AppService()
Object.freeze(instance)
export default instance
