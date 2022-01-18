class AppConfig {

	HOSTNAME = window && window.location && window.location.hostname
	API_URL = 'https://flightdeck.desertskyrangers.org'
	EMAIL_PATTERN = /[a-z0-9!#$%&'*+\\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/
	PHONE_PATTERN = /^[-+.()0-9 ]*$/

	TIMESTAMP_PATTERN = /^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$/
	DURATION_PATTERN = /^[0-9]*$/

	POSITIVE_INTEGER_PATTERN = /^[0-9]*$/

	UNLISTED_USER_ID = '6e0c4460-357b-4a86-901d-e2ba16000c59'

	constructor() {
		if (this.HOSTNAME === 'localhost') this.API_URL = 'http://localhost:8050';

		console.log("HOSTNAME=" + this.HOSTNAME)
		console.log("API_URL=" + this.API_URL)
	}

}

const instance = new AppConfig()
Object.freeze(instance)
export default instance
