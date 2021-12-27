class Config {

	HOSTNAME = window && window.location && window.location.hostname
	API_URL = 'https://flightlog.desertskyrangers.com'
	USERNAME_PATTERN = /^[a-zA-Z0-9-_]+$/;
	EMAIL_PATTERN = /[a-z0-9!#$%&'*+\\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
	PHONE_PATTERN = /^[-+.()0-9 ]*$/;

	constructor() {
		if (this.HOSTNAME === 'localhost') this.API_URL = 'http://localhost:8050';

		console.log("HOSTNAME=" + this.HOSTNAME)
		console.log("API_URL=" + this.API_URL)
	}

}

const instance = new Config()
Object.freeze(instance)
export default instance
