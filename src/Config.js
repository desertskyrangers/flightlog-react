// https://daveceddia.com/multiple-environments-with-react/

import app from "./App";

const HOSTNAME = window && window.location && window.location.hostname;
console.log("HOSTNAME=" + HOSTNAME)

let backendUri;
if( HOSTNAME === 'localhost' ) {
	backendUri = 'http://localhost:8050';
	// app.use(function (req, res, next) {
	// 	res.header("Access-Control-Allow-Origin", "*");
	// 	res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
	// 	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	// 	if ('OPTIONS' === req.method) {
	// 		res.sendStatus(200);
	// 	} else {
	// 		next();
	// 	}
	// });
} else {
	backendUri = 'https://flightlog.desertskyrangers.com';
}

export const API_URL = backendUri;
export const EMAIL_PATTERN = /[a-z0-9!#$%&'*+\\/=?^_{|}~-]+(?:\.[a-z0-9!#$%&'*+\\/=?^_{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9][a-z0-9-]*[a-z0-9]/;
export const PHONE_PATTERN = /[-+.()0-9 ]*/;
