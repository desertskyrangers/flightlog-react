import {useEffect, useState} from "react";
import Loading from "./component/Loading";
import NoResults from "./component/NoResults";
import AircraftApi from "./api/AircraftApi";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Icons from "./Icons";
import Notice from "./Notice";

export default function AircraftPage() {

	const [aircraft, setAircraft] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	let list;
	if (!!aircraft) {
		list = <AircraftList aircraft={aircraft}/>
	} else {
		list = <Loading/>
	}

	function loadAircraft(page) {
		AircraftApi.getAircraftPage(page, (success) => {
			setAircraft(success.aircraft)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => {
		if (!aircraft) loadAircraft(page)
	})

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					{list}
					<Notice messages={messages}/>
				</div>
			</div>
		</div>
	)
}

function AircraftList(props) {

	let page = null
	if (props.aircraft.length === 0) {
		page = <NoResults/>
	} else {
		page = props.aircraft.map((uav) => <AircraftRow key={uav.id} value={uav.id} icon={Icons.PLANE} name={uav.name}/>)
	}

	return (
		<div>
			{page}
			<div className='page-submit'>Add a UAV</div>
		</div>
	)

}

function AircraftRow(props) {

	return (
		<div><FontAwesomeIcon icon={props.icon}/> {props.name}</div>
	)

}
