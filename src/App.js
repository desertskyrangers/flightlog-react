import './css/app.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import TokenService from "./api/TokenService";
import ApiPath from "./api/ApiPath";

import Header from "./Header";
import Footer from "./Footer";
import Legal from "./Legal";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";
import NotFound from "./NotFound";
import Flights from "./Flights";
import Setup from "./Setup";
import UserActions from "./UserActions";
import Profile from "./Profile";

function App() {

	//const atRoot = window.location.pathname === '/';

	return (

		<div className="app">
			{/*{atRoot?<Header/>:<HeaderThin/>}*/}
			<Router>
				<Header/>
				<div className='content'>
					<Routes>
						<Route exact path={ApiPath.LEGAL} element={<Legal/>}/>
						<Route exact path={ApiPath.LOGIN} element={<Login/>}/>
						<Route exact path={ApiPath.REGISTER} element={<Register/>}/>
						<Route exact path={ApiPath.VERIFY + "/:id"} element={<Verify/>}/>
						<Route exact path={ApiPath.VERIFY + "/:id/:code"} element={<Verify/>}/>

						<Route exact path={ApiPath.HOME} element={<Protect> <Home/> </Protect>}/>
						<Route exact path={ApiPath.FLIGHTS} element={<Protect> <Flights/> </Protect>}/>
						<Route exact path={ApiPath.SETUP} element={<Protect> <Setup/> </Protect>}/>

						<Route exact path={ApiPath.USER} element={<Protect> <UserActions/> </Protect>}/>
						<Route exact path={ApiPath.PROFILE} element={<Protect> <Profile/> </Protect>}/>

						<Route path='*' element={<NotFound/>}/>
					</Routes>
				</div>
				<Footer/>
			</Router>
		</div>
	);

}

function Protect({children}) {
	let isAuthenticated = TokenService.isAuthenticated();
	return isAuthenticated ? children : <Navigate to='/login'/>;
}

export default App;
