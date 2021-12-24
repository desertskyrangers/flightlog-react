import TokenService from "./TokenService"

export default class ApiService {

	fetch(url, options) {
		return this.doFetch(true, url, options)
	}

	fetchNoAuth(url, options) {
		return this.doFetch(false, url, options)
	}

	/*
	 * Perform the api call and return the JSON object or Error if an error occurs.
	 */
	doFetch(auth, url, options) {
		let headers = {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
		}

		if (TokenService.isAuthenticated()) headers['Authorization'] = 'Bearer ' + TokenService.getToken()

		return fetch(url, {
			headers,
			...options
		})
			.then(response => this.checkStatus(auth, response))
			.then(response => response.text().then(text => {
				if ('' === text) text = '{}'
				return JSON.parse(text)
			}))
	}

	/*
	 * Throw an error in case the response status is not a success
	 */
	checkStatus(auth, response) {
		console.log( response )

		// Success status is between 200 and 299
		if (response.ok) return response

		if (auth && response.status === 403) {
			console.log("HTTP 403 - " + response.url)
			//AuthService.reauthenticate()
			return response
		}

		//Error condition
		const error = new Error()
		error.message = 'An error occurred'
		error.status = response.status
		throw error
	}

	saveAs(blob, filename) {
		const anchor = document.createElement('a')
		const url = URL.createObjectURL(blob)
		anchor.href = url
		anchor.download = filename || 'download'

		const blobUrlRevokeHandler = () => {
			setTimeout(() => {
				URL.revokeObjectURL(url)
				anchor.removeEventListener('click', blobUrlRevokeHandler)
			}, 150)
		}

		anchor.addEventListener('click', blobUrlRevokeHandler, false)
		anchor.click()
	}

	download(url, mediaType, options) {
		let headers = {
			'Accept': mediaType,
			'Content-Type': mediaType,
		}

		if (TokenService.isAuthenticated()) headers['Authorization'] = 'Bearer ' + TokenService.getToken()

		return fetch(url, {
			headers,
			...options
		})
			.then(this.checkStatus)
			.then(response => response.blob())
	}

	upload(url, file, progress, load, error) {
		return new Promise((resolve, reject) => {
			const request = new XMLHttpRequest()

			request.upload.addEventListener("progress", event => {
				progress(event)
			})

			request.upload.addEventListener("load", event => {
				resolve(request.response)
				load(event)
			})

			request.upload.addEventListener("error", event => {
				reject(request.response)
				error(event)
			})

			const formData = new FormData()
			formData.append("file", file, file.name)

			request.open("POST", url)
			request.setRequestHeader('Authorization', 'Bearer ' + TokenService.getToken())
			request.send(formData)
		})
	}

}
