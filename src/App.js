import './css/app.css';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import TokenService from "./api/TokenService";
import ApiPath from "./AppPath";

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

function App() {

	const [version, setVersion] = useState()

	useEffect(() => {
		if (!version) loadProgramInformation()
	})

	function loadProgramInformation() {
		AppService.getProgramInformation((result) => {
			setVersion(result.version)
		}, () => {
		})
	}

	Date.prototype.isoDate = function () {
		let YYYY = this.getFullYear();
		let MM = this.getMonth() + 1; // getMonth() is zero-based
		let DD = this.getDate();

		return [YYYY, (MM > 9 ? '' : '0') + MM, (DD > 9 ? '' : '0') + DD].join('-');
	};

	Date.prototype.isoDateHourMin = function () {
		let YYYY = this.getFullYear();
		let MM = this.getMonth() + 1; // getMonth() is zero-based
		let DD = this.getDate();
		let hh = this.getHours();
		let mm = this.getMinutes();

		return [YYYY, (MM > 9 ? '' : '0') + MM, (DD > 9 ? '' : '0') + DD].join('-') + 'T' + [(hh>9 ? '':'0')+hh,(mm>9 ? '':'0')+mm].join(':');
	};

	return (

		<div className="app">
			{/*{atRoot?<Header/>:<HeaderThin/>}*/}
			<Router>
				<Header/>
				<div className='content'>
					<Routes>
						{/* Login */}
						<Route exact path={ApiPath.ABOUT} element={<About version={version}/>}/>
						<Route exact path={ApiPath.LEGAL} element={<Legal/>}/>
						<Route exact path={ApiPath.LOGIN} element={<Login version={version}/>}/>
						<Route exact path={ApiPath.REGISTER} element={<Register/>}/>
						<Route exact path={ApiPath.VERIFY + "/:id"} element={<Verify/>}/>
						<Route exact path={ApiPath.VERIFY + "/:id/:code"} element={<Verify/>}/>

						{/* Home */}
						<Route exact path={ApiPath.HOME} element={<Protect> <FlightActions/> </Protect>}/>

						{/* Menus */}
						<Route exact path={ApiPath.FLIGHTS} element={<Protect> <FlightActions/> </Protect>}/>
						<Route exact path={ApiPath.SETUP} element={<Protect> <SetupActions/> </Protect>}/>
						<Route exact path={ApiPath.USER} element={<Protect> <UserActions/> </Protect>}/>

						{/* Entry */}
						<Route exact path={ApiPath.AIRCRAFT + "/:id"} element={<Protect><Aircraft/></Protect>}/>
						<Route exact path={ApiPath.BATTERY + "/:id"} element={<Protect><Battery/></Protect>}/>
						<Route exact path={ApiPath.FLIGHT + "/:id"} element={<Protect><Flight/></Protect>}/>
						<Route exact path={ApiPath.PROFILE} element={<Protect> <Profile/> </Protect>}/>
						<Route exact path={ApiPath.USER_AIRCRAFT} element={<Protect><UserAircraft/></Protect>}/>
						<Route exact path={ApiPath.USER_BATTERIES} element={<Protect><UserBatteries/></Protect>}/>
						<Route exact path={ApiPath.USER_FLIGHTS} element={<Protect><UserFlights/></Protect>}/>

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
