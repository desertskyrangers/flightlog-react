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
import Profile from "./Profile";
import Settings from "./Settings";

function App() {

	//const atRoot = window.location.pathname === '/';

	return (

		<div className="app">
			<Header/>
			{/*{atRoot?<Header/>:<HeaderThin/>}*/}
			<div className='content'>
				<Router>
					<Routes>
						<Route exact path={ApiPath.LEGAL} element={<Legal/>}/>
						<Route exact path={ApiPath.LOGIN} element={<Login/>}/>
						<Route exact path={ApiPath.REGISTER} element={<Register/>}/>
						<Route exact path={ApiPath.VERIFY + "/:id"} element={<Verify/>}/>
						<Route exact path={ApiPath.VERIFY + "/:id/:code"} element={<Verify/>}/>

						<Route exact path={ApiPath.HOME} element={<Protect> <Home/> </Protect>}/>
						<Route exact path={ApiPath.PROFILE} element={<Protect> <Profile/> </Protect>}/>
						<Route exact path={ApiPath.SETTINGS} element={<Protect> <Settings/> </Protect>}/>

						<Route path='*' element={<NotFound/>}/>
					</Routes>
				</Router>
			</div>
			<Footer/>
		</div>
	);

}

function Protect({children}) {
	let isAuthenticated = TokenService.isAuthenticated();
	return isAuthenticated ? children : <Navigate to='/login'/>;
}

export default App;
