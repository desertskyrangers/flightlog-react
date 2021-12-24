// https://daveceddia.com/multiple-environments-with-react/

const HOSTNAME = window && window.location && window.location.hostname;
console.log("HOSTNAME=" + HOSTNAME)

let backendUri;
if( HOSTNAME === 'localhost' ) {
	backendUri = 'http://localhost:8050';
} else {
	backendUri = 'https://flightlog.desertskyrangers.com';
}

export const API_URL = backendUri;
export const USERNAME_PATTERN = /^[a-zA-Z0-9-_]+$/;
export const EMAIL_PATTERN = /[a-z0-9!#$%&'*+\\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
export const PHONE_PATTERN = /^[-+.()0-9 ]*$/;
