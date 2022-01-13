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

	getBatteryPage(page, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.USER_BATTERY + "/" + page, {
			method: 'GET',
		}).then((response) => {
			console.log(JSON.stringify(response))
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}


const instance = new UserService()
Object.freeze(instance)
export default instance
