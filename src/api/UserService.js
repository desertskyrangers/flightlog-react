import ApiService from "./ApiService";
import Config from "../AppConfig";

export class UserService extends ApiService {

	profile(id, successCallback, failureCallback) {
		this.fetchNoAuth(Config.API_URL + `/api/user/${id}`, {
			method: 'GET',
			body: JSON.stringify({})
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
