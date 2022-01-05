import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Icons from './Icons'
import './css/nav.css'
import {Link} from "react-router-dom";
import ApiPath from "./api/ApiPath";

export default function NavBar(props) {

	return (
		<div className='nav-bar'>
			<Link to={ApiPath.HOME}>
				<div className='nav-button'><FontAwesomeIcon icon={Icons.PLANE}/></div>
			</Link>
			<Link to={ApiPath.SETUP}>
				<div className='nav-button'><FontAwesomeIcon icon={Icons.BARS}/></div>
			</Link>
			<Link to={ApiPath.USER}>
				<div className='nav-button'><FontAwesomeIcon icon={Icons.USER}/></div>
			</Link>
		</div>
	)

}
