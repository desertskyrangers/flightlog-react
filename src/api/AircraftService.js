import Config from "../AppConfig";
import ApiPath from "./ApiPath";
import ApiService from "./ApiService"

class AircraftService extends ApiService {

	getAircraftPage(page, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_AIRCRAFT + "/" + page, {
			method: 'GET',
		}).then((response) => {
			console.log(JSON.stringify(response))
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	updateAircraft(aircraft, successCallback, failureCallback) {
		const url = Config.API_URL + ApiPath.USER_AIRCRAFT + (aircraft.id === 'new' ? '' : '/' + aircraft.id)
		const method = aircraft.id === 'new' ? 'POST' : 'PUT'
		this.fetch(url, {
			method: method,
			body: JSON.stringify(aircraft)
		}).then((response) => {
			console.log(JSON.stringify(response))
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	deleteAircraft(id, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_AIRCRAFT + "/" + id, {
			method: 'DELETE'
		}).then((response) => {
			console.log(JSON.stringify(response))
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}

const instance = new AircraftService()
Object.freeze(instance)
export default instance
