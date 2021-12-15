import './App.css';

function App() {
	return (
		<div className="App">
			{/*<a className="secondary button" href='/signup'>Sign Up</a>*/}
			{/*<a className="primary button" href='/login'>Sign In</a>*/}

			<div className='login-container'>
				<div className='login-banner'>
						<img src='logo192.png' alt='Logo'/>
						<h1>FlightLog</h1>
				</div>
				<div className='login-body'>
					<form action='/session' method='post' className='login-form'>
						<label htmlFor='username' className='login-label-first'>Username or email address</label>
						<input id='username' name='username' type='text' autoCapitalize='none' autoCorrect='off' autoComplete='username' autoFocus='autofocus' className='login-field'/>

						<label htmlFor='password' className='login-label'>Password</label>
						<input id='password' name='password' type='password' autoComplete='current-password' className='login-field'/>

						<input id='login' type='button' value='Sign In' className='login-submit'/>
					</form>
				</div>
			</div>
		</div>
	);
}

export default App;
