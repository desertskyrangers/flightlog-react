import './css/app.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import Header from "./Header";
import Home from "./Home";
import Footer from "./Footer";
import Legal from "./Legal";

function App() {

	//const atHome = window.location.pathname === '/';

	return (

		<div className="app">
			<Header/>
			{/*{atHome?<Header/>:<HeaderThin/>}*/}
			<div className='content'>
				<Router>
					<Switch>
						<Route exact path="/" component={Home}/>
						{/*<Route exact path="/about" component={About}/>*/}
						{/*<Route exact path="/activities" component={Activities}/>*/}
						<Route exact path="/legal" component={Legal}/>
						{/*<Route exact path="/members" component={Members}/>*/}

						{/*<Route exact path="/articles" component={Articles}/>*/}
						{/*<Route exact path="/articles/northern-utah-flying-season-2021-01" component={NorthernUtahFlyingSeason}/>*/}
						{/*<Route exact path="/articles/aa-transmitter-battery-study-2021-01" component={AaTransmitterBatteryStudy}/>*/}

						{/*/!* Default route *!/*/}
						{/*<Route component={NotFound}/>*/}
					</Switch>
				</Router>
			</div>
			<Footer/>
		</div>
	);

}

export default App;
