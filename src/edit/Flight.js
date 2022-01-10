import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

export default function Flight(props) {

	const navigate = useNavigate();

	const idParam = useParams().id;

	const [id, setId] = useState(props.id || '')
	const [aircraftOptions, setAircraftOptions] = useState([])
	const [batteryOptions, setBatteryOptions] = useState([])
	const [startTime, setStartTime] = useState()
	const [duration, setDuration] = useState()

	// Not using locations yet
	//const [locationOptions, setLocationOptions] = useState([])

	return (
		<div>Flight</div>
	)

}
