import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";

export default function UserGroups(props) {

	const [groups, setGroups] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	let list;
	if (!!groups) {
		list = <OrgList orgs={groups}/>
	} else {
		list = <Loading/>
	}

	function loadGroupPage(page) {
		UserService.getGroupPage(page, (success) => {
			setGroups(success.groups)
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

	return (
		<div className='vbox'>
			<button className='page-action' onClick={() => navigate(AppPath.GROUP + "/new")}>Create a Group</button>
			{page}
		</div>
	)

}

function OrgRow(props) {

	const navigate = useNavigate();

	return (
		<div className='page-result' onClick={() => navigate(AppPath.GROUP + "/" + props.org.id)}>{Icons.fromGroupType(props.org.type)} {props.org.name}</div>
	)

}
