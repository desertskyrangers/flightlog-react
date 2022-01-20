import ApiService from "./ApiService";
import Config from "../AppConfig";
import ApiPath from "./ApiPath";

class UserService extends ApiService {

	profile(id, successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/profile`, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	update(account, successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/user/${account.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				id: account.id,
				firstName: account.firstName,
				lastName: account.lastName,
				preferredName: account.preferredName,
				email: account.email,
				smsNumber: account.smsNumber,
				smsCarrier: account.smsCarrier
			})
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	updatePassword(id, currentPassword, password, successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/user/${id}/password`, {
			method: 'PUT',
			body: JSON.stringify({
				id: id,
				currentPassword: currentPassword,
				password: password
			})
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getAircraftPage(page, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_AIRCRAFT + "/" + page, {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getBatteryPage(page, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_BATTERY + "/" + page, {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getFlightPage(page, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_FLIGHT + "/" + page, {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getAircraftOptions(successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_AIRCRAFT_LOOKUP, {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getBatteryOptions(successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_BATTERY_LOOKUP, {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getObserverOptions(successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_OBSERVER_LOOKUP, {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getPilotOptions(successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_PILOT_LOOKUP, {
			method: 'GET',
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}


const instance = new UserService()
Object.freeze(instance)
export default instance
