import Config from "../AppConfig";
import ApiPath from "./ApiPath";
import ApiService from "./ApiService"

class GroupService extends ApiService {

	getAvailableGroups(successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.GROUPS_AVAILABLE, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	getGroup(id, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.GROUP + "/" + id, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	updateGroup(aircraft, successCallback, failureCallback) {
		const method = aircraft.id === 'new' ? 'POST' : 'PUT'
		this.fetch(Config.API_URL + ApiPath.GROUP, {
			method: method,
			body: JSON.stringify(aircraft)
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	deleteGroup(id, successCallback, failureCallback) {
		this.fetch(Config.API_URL + ApiPath.GROUP, {
			method: 'DELETE',
			body: JSON.stringify({id: id})
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}

const instance = new GroupService()
Object.freeze(instance)
export default instance
