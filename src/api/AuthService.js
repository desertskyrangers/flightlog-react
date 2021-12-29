import ApiService from "./ApiService"
import TokenService from "./TokenService"
import Config from "../Config";

export class AuthService extends ApiService {

	signup(username, password, email, successCallback, failureCallback) {
		this.fetchNoAuth(Config.API_URL + '/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
				email
			})
		}).then((response) => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	verify(id, code, successCallback, failureCallback) {
		const url = new URL(Config.API_URL + '/api/auth/verify');
		url.search = new URLSearchParams({id: id, code: code}).toString()

		this.fetchNoAuth(url, {})
			.then((response) => {
				// TODO Store the returned JWT token just like login
				successCallback(response)
			}).catch((error) => {
			  failureCallback(error)
		})
	}

	login(username, password, successCallback, failureCallback) {
		this.fetchNoAuth(Config.API_URL + '/api/auth/login', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(response => {
			TokenService.setToken(response.token)
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
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
		this.fetch(Config.API_URL + '/api/auth/logout', {
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
