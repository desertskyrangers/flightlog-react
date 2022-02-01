import React, {useEffect, useState} from "react";
import Loading from "./part/Loading";
import NoResults from "./part/NoResults";
import Icons from "./util/Icons";
import Notice from "./part/Notice";
import {useNavigate} from "react-router-dom";
import AppPath from "./AppPath";
import UserService from "./api/UserService";
import EntrySelect from "./part/EntrySelect";
import GroupService from "./api/GroupService";

export default function UserGroups(props) {

	const [groups, setGroups] = useState()
	const [page] = useState(0)
	const [messages, setMessages] = useState([])

	// Actions
	const [joinRequest, setJoinRequest] = useState(false)

	let list;
	if (!!groups) {
		list = <GroupList orgs={groups}/>
	} else {
		list = <Loading/>
	}

	function toggleJoinRequest() {
		setJoinRequest(!joinRequest)
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
					<button className='page-action' onClick={() => toggleJoinRequest()}>Join a Group</button>
					{joinRequest ? <JoinRequest/> : null}
				</div>
			</div>
		</div>
	)
}

function JoinRequest(props) {

	const [group, setGroup] = useState(props.group || '')
	const [groupOptions, setGroupOptions] = useState(props.groupOptions || [])

	function loadGroups() {
		GroupService.getAvailableGroups((success) => {
			setGroupOptions(success)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			console.log(messages)
			// if (!!messages) setMessages(messages)
		})
	}

	function getContent() {
		const hasOptions = !!groupOptions && groupOptions.length > 0

		return hasOptions ?
			<EntrySelect id='group' text='Group' value={group} required defaultValue='unspecified' onChange={(event) => setGroup(event.target.value)} fieldActionIcon={Icons.GROUP_ADD} onFieldAction={() => {
			}}>
				<option key='unspecified' hidden>Select a group</option>
				{groupOptions.map((option) => <option key={option.id} value={option.id}>{option.name}</option>)}
			</EntrySelect> : <div>No groups available to join</div>
	}

	useEffect(() => loadGroups(), [])

	return (
		getContent()
	)

}

function GroupList(props) {
	const navigate = useNavigate();

	let page
	if (props.orgs.length === 0) {
		page = <NoResults message='No groups owned by user'/>
	} else {
		page = props.orgs.map((craft) => <GroupRow key={craft.id} value={craft.id} org={craft}/>)
	}

	return (
		<div className='vbox'>
			<button className='page-action' onClick={() => navigate(AppPath.GROUP + "/new")}>Create a Group</button>
			{page}
		</div>
	)

}

function GroupRow(props) {

	const navigate = useNavigate();

	return (
		<div className='page-result' onClick={() => navigate(AppPath.GROUP + "/" + props.org.id)}>{Icons.fromGroupType(props.org.type)} {props.org.name}</div>
	)

}
