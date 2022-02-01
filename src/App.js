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
import {useEffect, useState} from "react";
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
			{/*{atRoot?<Header/>:<HeaderThin/>}*/}
			<Router>
				<Header/>
				<div className='content'>
					<Routes>
						{/* Login */}
						<Route exact path={AppPath.ABOUT} element={<About version={version}/>}/>
						<Route exact path={AppPath.LEGAL} element={<Legal/>}/>
						<Route exact path={AppPath.LOGIN} element={<Login version={version}/>}/>
						<Route exact path={AppPath.RECOVER} element={<Recover/>}/>
						<Route exact path={AppPath.REGISTER} element={<Register/>}/>
						<Route exact path={AppPath.RESET} element={<Reset/>}/>
						<Route exact path={AppPath.VERIFY + "/:id"} element={<Verify/>}/>
						<Route exact path={AppPath.VERIFY + "/:id/:code"} element={<Verify/>}/>

						{/* Home */}
						<Route exact path={AppPath.HOME} element={<Protect> <Dashboard/> </Protect>}/>

						{/* Menus */}
						<Route exact path={AppPath.FLIGHTS} element={<Protect> <FlightActions/> </Protect>}/>
						<Route exact path={AppPath.SETUP} element={<Protect> <SetupActions/> </Protect>}/>
						<Route exact path={AppPath.USER} element={<Protect> <UserActions/> </Protect>}/>

						{/* Entry */}
						<Route exact path={AppPath.AIRCRAFT + "/:id"} element={<Protect><Aircraft/></Protect>}/>
						<Route exact path={AppPath.BATTERY + "/:id"} element={<Protect><Battery/></Protect>}/>
						<Route exact path={AppPath.FLIGHT + "/:id"} element={<Protect><Flight/></Protect>}/>
						<Route exact path={AppPath.FLIGHT_TIMER} element={<Protect> <FlightTimer/> </Protect>}/>
						<Route exact path={AppPath.FLIGHT + "/:id/:timestamp/:duration"} element={<Protect> <Flight/> </Protect>}/>
						<Route exact path={AppPath.GROUP + "/:id"} element={<Protect><Group/></Protect>}/>
						<Route exact path={AppPath.PASSWORD} element={<Protect> <Password/> </Protect>}/>
						<Route exact path={AppPath.PROFILE} element={<Protect> <Profile/> </Protect>}/>
						{/*<Route exact path={AppPath.ORG + "/:id"} element={<Protect><Org/></Protect>}/>*/}
						<Route exact path={AppPath.USER_AIRCRAFT} element={<Protect><UserAircraft/></Protect>}/>
						<Route exact path={AppPath.USER_BATTERIES} element={<Protect><UserBatteries/></Protect>}/>
						<Route exact path={AppPath.USER_FLIGHTS} element={<Protect><UserFlights/></Protect>}/>
						<Route exact path={AppPath.USER_GROUPS} element={<Protect><UserGroups/></Protect>}/>

						<Route path='*' element={<NotFound/>}/>
					</Routes>
				</div>
				<Footer version={version}/>
			</Router>
		</div>
	);

}

function Protect({children}) {
	return TokenService.isAuthenticated() ? <div><NavBar/>{children}</div> : <Navigate to={ApiPath.LOGIN}/>;
}

export default App;
