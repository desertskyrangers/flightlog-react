// https://daveceddia.com/multiple-environments-with-react/

const HOSTNAME = window && window.location && window.location.hostname;
let backendUri;
if (HOSTNAME === 'flightlog.desertskyrangers.com') {
	backendUri = 'https://flightlog.desertskyrangers.com';
} else {
	backendUri = 'http://localhost:8090';
}

export const API_URL = backendUri;
export const EMAIL_PATTERN = /[a-z0-9!#$%&'*+\\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
export const PHONE_PATTERN = /[-+.()0-9 ]*/;
