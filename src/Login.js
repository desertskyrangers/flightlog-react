
function Login() {
    return (
        <div className='login'>
            <form>
            <label htmlFor='username'>Username:</label>
            <input id='username' name='username' type='text'/>

            <label htmlFor='password'>Password:</label>
            <input id='password' name='password' type='password'/>

            <input id='login' type='button' value='Sign In'/>
            </form>
        </div>
    );
}

export default Login;
