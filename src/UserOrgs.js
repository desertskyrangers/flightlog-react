import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import Dates from "./util/Dates";

export default function UserOrgs(props) {

	const [orgs, setOrgs] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	let list;
	if (!!orgs) {
		list = <OrgList orgs={orgs}/>
	} else {
		list = <Loading/>
	}

	function loadGroupPage(page) {
		UserService.getGroupPage(page, (success) => {
			setOrgs(success.groups)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadGroupPage(page), [page])

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					{list}
					<Notice priority='error' messages={messages}/>
				</div>
			</div>
		</div>
	)
}

function OrgList(props) {
	const navigate = useNavigate();

	let page
	if (props.orgs.length === 0) {
		page = <NoResults message='No groups owned by user'/>
	} else {
		page = props.orgs.map((craft) => <OrgRow key={craft.id} value={craft.id} org={craft}/>)
	}

	function add() {
		navigate(AppPath.ORG + "/new")
	}

	return (
		<div className='vbox'>
			<button className='page-action' onClick={add}>Create a Group</button>
			{page}
		</div>
	)

}

function OrgRow(props) {

	const navigate = useNavigate();

	function open() {
		navigate(AppPath.ORG + "/" + props.org.id)
	}

	return (
		<div className='page-result' onClick={open}>{Icons.fromOrgType(props.org.type)} {Dates.humanDateHourMin(new Date(props.org.timestamp))} {props.org.name}</div>
	)

}
