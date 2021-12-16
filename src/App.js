import './css/app.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';

import Home from "./Home";
import Header from "./Header";
import Footer from "./Footer";
import Legal from "./Legal";
import Login from "./Login";
import Signup from "./Signup";
import NotFound from "./NotFound";

import TokenService from "./api/TokenService";

function App() {

	//const atRoot = window.location.pathname === '/';

	return (

		<div className="app">
			<Header/>
			{/*{atRoot?<Header/>:<HeaderThin/>}*/}
			<div className='content'>
				<Router>
					<Routes>
						<Route exact path='/legal' element={<Legal/>}/>
						<Route exact path='/login' element={<Login/>}/>
						<Route exact path="/signup" element={<Signup/>}/>

						<Route exact path='/' element={<Protect> <Home/> </Protect>}/>

						<Route path='*' element={<NotFound/>}/>
					</Routes>
				</Router>
			</div>
			<Footer/>
		</div>
	);

}

function Protect({children}) {
	let isAuthenticated = TokenService.loggedIn();
	return isAuthenticated ? children : <Navigate to='/login'/>;
}

export default App;
