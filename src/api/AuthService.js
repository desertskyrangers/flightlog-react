import ApiService from "./ApiService"
import TokenService from "./TokenService"
import Config from "../AppConfig";

class AuthService extends ApiService {

	register(username, password, email, successCallback, failureCallback) {
		this.fetchNoAuth(Config.API_URL + '/api/auth/register', {
			method: 'POST',
			body: JSON.stringify({
				username,
				password,
				email
			})
		}).then((response) => {
			TokenService.setToken(response.jwt.token)
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	resend(id, successCallback, failureCallback) {
		this.fetchNoAuth(Config.API_URL + '/api/auth/resend', {
			method: 'POST',
			body: JSON.stringify({
				"id": id
			})
		}).then(response => {
			successCallback(response)
		}).catch((error) => {
			failureCallback(error)
		})
	}

	verify(id, code, successCallback, failureCallback) {
		this.fetchNoAuth(Config.API_URL + '/api/auth/verify', {
			method: 'POST',
			body: JSON.stringify({
				"id": id,
				"code": code
			})
		}).then(response => {
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
			TokenService.setToken(response.jwt.token)
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
			window.location.assign('/login')
		})
	}

	logout(callback, failureCallback) {
		// Call api logout before expiring the token
		this.fetch(Config.API_URL + '/api/auth/logout', {
			method: 'POST',
			body: JSON.stringify({})
		}).then(response => {
			callback()
		}).catch(failure => {
			failureCallback(failure)
		})

		// Expire the token after calling api logout
		TokenService.expire()
		window.location.assign('/')
	}

}

const instance = new AuthService()
Object.freeze(instance)
export default instance
