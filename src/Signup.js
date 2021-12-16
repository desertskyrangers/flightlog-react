import './css/signup.css';
import Notice from "./Notice";

function Login() {
	const inError = false;

	return (
		<div className='signup-container'>
			<div className='signup-banner'>
				<img src='logo192.png' alt='Logo'/>
				<h1>FlightLog</h1>
			</div>
			<div className='signup-body'>
				<form action='/login' method='post' className='signup-form'>
					<Email/>
					<Username/>
					<Password/>
					<Notice message='Incorrect credentials' priority='error' visible={inError}/>
					<input id='login' type='button' value='Sign Up' className='signup-submit'/>
				</form>
			</div>
		</div>
	);

}

function Email() {

	return (
		<div>
			<label htmlFor='email' className='signup-label'>Email address</label>
			<input id='email' name='username' type='text' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' className='signup-field'/>
		</div>
	);

}

function Username() {

	return (
		<div>
			<label htmlFor='username' className='signup-label'>Username</label>
			<input id='username' name='username' type='text' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' className='signup-field'/>
		</div>
	);

}

function Password() {

	return (
		<div>
			<label htmlFor='password' className='signup-label'>Password</label>
			<input id='password' name='password' type='password' autoComplete='current-password' className='signup-field'/>
		</div>
	);

}

export default Login;
