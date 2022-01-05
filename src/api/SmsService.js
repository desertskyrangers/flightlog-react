import ApiService from "./ApiService";
import Config from "../AppConfig";

export class SmsService extends ApiService {

	getSmsCarriers(successCallback, failureCallback) {
		this.fetch(Config.API_URL + `/api/sms/carriers`, {
			method: 'GET'
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

}

const instance = new SmsService()
Object.freeze(instance)
export default instance
