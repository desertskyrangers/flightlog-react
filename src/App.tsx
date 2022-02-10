import './css/app.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import TokenService from "./api/TokenService";
import ApiPath from "./AppPath";
import AppPath from "./AppPath";

import Header from "./Header";
import Footer from "./Footer";
import Legal from "./Legal";
import Login from "./Login";
import Register from "./Register";
import Verify from "./Verify";
import NotFound from "./part/NotFound";
import FlightActions from "./action/FlightActions";
import SetupActions from "./action/SetupActions";
import UserActions from "./action/UserActions";
import Profile from "./edit/Profile";
import NavBar from "./part/NavBar";
import UserAircraft from "./UserAircraft";
import UserBatteries from "./UserBatteries";
import UserFlights from "./UserFlights"
import Aircraft from "./edit/Aircraft";
import About from "./About";
import React, {useEffect, useState} from "react";
import AppService from "./api/AppService";
import Flight from "./edit/Flight";
import Battery from "./edit/Battery";
import FlightTimer from "./FlightTimer";
import Recover from "./Recover";
import Reset from "./Reset";
import Password from "./edit/Password";
import Dashboard from "./Dashboard";
import UserGroups from "./UserGroups";
import Group from "./edit/Group";

function Protect({children}) {
	return TokenService.isAuthenticated() ? <div><NavBar/>{children}</div> : <Navigate to={ApiPath.LOGIN}/>;
}

function App() {

	const [version, setVersion] = useState()

	useEffect(() => loadProgramInformation(), [])

	function loadProgramInformation() {
		AppService.getProgramInformation((result) => {
			setVersion(result.version)
		}, () => {
		})
	}

	return (

		<div className="app">
			<Router>
				<Header/>
				<div className='content'>
					<Routes>
						{/* Login */}
						<Route path={AppPath.ABOUT} element={<About version={version}/>}/>
						<Route path={AppPath.LEGAL} element={<Legal/>}/>
						<Route path={AppPath.LOGIN} element={<Login version={version}/>}/>
						<Route path={AppPath.RECOVER} element={<Recover/>}/>
						<Route path={AppPath.REGISTER} element={<Register/>}/>
						<Route path={AppPath.RESET} element={<Reset/>}/>
						<Route path={AppPath.VERIFY + "/:id"} element={<Verify/>}/>
						<Route path={AppPath.VERIFY + "/:id/:code"} element={<Verify/>}/>

						{/* Home */}
						<Route path={AppPath.HOME} element={<Protect children={<Dashboard/>}/>}/>

						{/* Menus */}
						<Route path={AppPath.FLIGHTS} element={<Protect children={<FlightActions/>}/>}/>
						<Route path={AppPath.SETUP} element={<Protect children={<SetupActions/>}/>}/>
						<Route path={AppPath.USER} element={<Protect children={<UserActions/>}/>}/>

						{/* Entry */}
						<Route path={AppPath.AIRCRAFT + "/:id"} element={<Protect children={<Aircraft/>}/>}/>
						<Route path={AppPath.BATTERY + "/:id"} element={<Protect children={<Battery/>}/>}/>
						<Route path={AppPath.FLIGHT + "/:id"} element={<Protect children={<Flight/>}/>}/>
						<Route path={AppPath.FLIGHT_TIMER} element={<Protect children={<FlightTimer/>}/>}/>
						<Route path={AppPath.FLIGHT + "/:id/:timestamp/:duration"} element={<Protect children={<Flight/>}/>}/>
						<Route path={AppPath.GROUP + "/:id"} element={<Protect children={<Group/>}/>}/>
						<Route path={AppPath.PASSWORD} element={<Protect children={<Password/>}/>}/>
						<Route path={AppPath.PROFILE} element={<Protect children={<Profile/>}/>}/>
						{/*<Route path={AppPath.ORG + "/:id"} element={<Protect children={<Org/>}/>}/>*/}
						<Route path={AppPath.USER_AIRCRAFT} element={<Protect children={<UserAircraft/>}/>}/>
						<Route path={AppPath.USER_BATTERIES} element={<Protect children={<UserBatteries/>}/>}/>
						<Route path={AppPath.USER_FLIGHTS} element={<Protect children={<UserFlights/>}/>}/>
						<Route path={AppPath.USER_GROUPS} element={<Protect children={<UserGroups/>}/>}/>

						<Route path='*' element={<NotFound/>}/>
					</Routes>
				</div>
				<Footer version={version}/>
			</Router>
		</div>
	)

}

export default App
