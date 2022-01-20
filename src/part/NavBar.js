import Icons from '../util/Icons'
import '../css/nav.css'
import {Link} from "react-router-dom";
import ApiPath from "../AppPath";

export default function NavBar(props) {

	return (
		<div className='nav-bar'>
			<NavButton to={ApiPath.HOME} icon={Icons.DASHBOARD}/>
			<NavButton to={ApiPath.USER_FLIGHTS} icon={Icons.PLANE}/>
			<NavButton to={ApiPath.SETUP} icon={Icons.BARS}/>
			<NavButton to={ApiPath.USER} icon={Icons.USER}/>
		</div>
	)

}

function NavButton(props) {

	return (
		<Link to={props.to}>
			<div className='nav-button'>{props.icon}</div>
		</Link>
	)

}
