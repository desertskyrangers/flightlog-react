import {API_URL} from "../Config";
import TokenService from "./TokenService";

export default class ApiService {

	// Initializing important variables
	constructor() {
		// API server domain
		this.uri = `${API_URL}`;

		// React bindings
		this.fetch = this.fetch.bind(this);
		this.upload = this.upload.bind(this);
	}

	fetch(url, options) {
		// performs api calls sending the required authentication headers
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		};

		// Setting Authorization header
		// Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
		if (TokenService.loggedIn()) headers['Authorization'] = 'Bearer ' + TokenService.getToken();

		//console.log("headers=" + JSON.stringify(headers));

		return fetch(url, {
			headers,
			...options
		})
			.then(this.checkStatus)
			.then(response => response.json())
	}

	download(url, mediaType, options) {
		// performs api calls sending the required authentication headers
		let headers = {
			'Accept': mediaType,
			'Content-Type': mediaType,
		};

		// Setting Authorization header
		// Authorization: Bearer xxxxxxx.xxxxxxxx.xxxxxx
		if (TokenService.loggedIn()) headers['Authorization'] = 'Bearer ' + TokenService.getToken();

		//console.log("headers=" + JSON.stringify(headers));
		return fetch(url, {
			headers,
			...options
		})
			.then(this.checkStatus)
			.then(response => response.blob())
	}

	saveAs(blob, filename) {
		const a = document.createElement('a');
		const url = URL.createObjectURL(blob);
		a.href = url;
		a.download = filename || 'download';

		const blobUrlRevokeHandler = () => {
			setTimeout(() => {
				URL.revokeObjectURL(url);
				a.removeEventListener('click', blobUrlRevokeHandler);
			}, 150);
		};

		a.addEventListener('click', blobUrlRevokeHandler, false);
		a.click();
	}

	// Raises an error in case response status is not a success
	checkStatus(response) {
		//console.log("Response: " + response.status + response.statusText);

		// Success status lies between 200 to 300
		if (response.ok) return response;

		if (response.status === 403) {
			console.log("HTTP 403 - " + response.url);
			//AuthService.reauthenticate();
			return response;
		}

		//Error condition
		const error = new Error(response.status);
		error.message = response.message;
		//error.response = response;
		throw error
	}

	upload(url, file, progress, load, error) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest();

			request.upload.addEventListener("progress", event => {
				progress( event );
			});

			request.upload.addEventListener("load", event => {
				resolve(request.response);
				load( event );
			});

			request.upload.addEventListener("error", event => {
				reject(request.response);
				error( event );
			});

			const formData = new FormData();
			formData.append("file", file, file.name);

			request.open("POST", url);
			request.setRequestHeader('Authorization', 'Bearer ' + TokenService.getToken() );
			request.send(formData);
		});
	}

}
