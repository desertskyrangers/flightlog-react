import ApiService from "./ApiService";
import Config from "../AppConfig";

export class LookupService extends ApiService {

	getAircraftStatuses(successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/lookup/aircraft/status`, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getAircraftTypes(successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/lookup/aircraft/type`, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getSmsCarriers(successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/lookup/sms/carriers`, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}

const instance = new LookupService()
Object.freeze(instance)
export default instance
