import ApiService from "./ApiService"
import TokenService from "./TokenService"
import {API_URL} from "../Config";

export class AuthService extends ApiService {

	signup(username, password, email, successCallback, failureCallback) {
		this.fetchNoAuth(`${API_URL}/api/auth/signup`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
				email
			})
		}).then((response) => {
			setTimeout(successCallback(response), 100)
		}).catch((error) => {
			console.log(error)
			//setTimeout(failureCallback(error), 100)
			//failureCallback(error)
		})
	}

	login(username, password, successCallback, failureCallback) {
		this.fetchNoAuth(`${API_URL}/api/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(response => {
			TokenService.setToken(response.token)
			setTimeout(successCallback, 100)
		}).catch((error) => {
			console.log(JSON.stringify(error))
			setTimeout(failureCallback(error), 100)
		})
	}

	loggedIn() {
		return TokenService.isAuthenticated()
	}

	reauthenticate() {
		this.logout(() => {
			window.location.replace('/login')
		})
	}

	logout(callback) {
		this.expire()
		this.fetch(`${API_URL}/auth/logout`, {
			method: 'GET'
		}).then(response => {
			//this.props.history.push('/login')
			window.location.replace('/home')
			setTimeout(callback, 100)
		})
	}

	// getProfile() {
	// 	// Using jwt-decode npm package to decode the token
	// 	return decode(this.getToken())
	// }

}

const instance = new AuthService()
Object.freeze(instance)
export default instance
