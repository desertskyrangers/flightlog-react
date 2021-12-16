import ApiService from "./ApiService";
import TokenService from "./TokenService";

export class AuthService extends ApiService {

	login(username, password, successCallback, failureCallback) {
		this.fetch(`${this.uri}/auth/login`, {
			method: 'POST',
			body: JSON.stringify({
				username,
				password
			})
		}).then(response => {
			TokenService.setToken(response.token);
			setTimeout(successCallback, 100);
		}).catch((error) => {
			setTimeout(failureCallback(error), 100);
		});
	};

	loggedIn() {
		return TokenService.loggedIn();
	}

	reauthenticate() {
		window.location.replace('/login');
	}

	logout(callback) {
		this.expire();
		this.fetch(`${this.uri}/auth/logout`, {
			method: 'GET'
		}).then(response => {
			//this.props.history.push('/login');
			window.location.replace('/home');
			setTimeout(callback, 100);
		});
	}

	// getProfile() {
	// 	// Using jwt-decode npm package to decode the token
	// 	return decode(this.getToken());
	// }

}

const instance = new AuthService();
Object.freeze(instance);
export default instance;
