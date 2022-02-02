import "./css/member.css"
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
import TokenService from "./api/TokenService";

export default function UserGroups(props) {

	const [page] = useState(0)
	const [groups, setGroups] = useState([])
	const [memberships, setMemberships] = useState([])
	const [messages, setMessages] = useState([])

	function clearMessages() {
		setMessages([])
	}

	function loadGroupPage(page) {
		UserService.getGroupPage(page, (response) => {
			setGroups(response.groups)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function loadMemberships() {
		UserService.getMemberships((response) => {
			setMemberships(response.memberships)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	function requestMembership(group) {
		UserService.requestMembership(TokenService.getUserId(), group, 'requested', (response) => {
			setMemberships(response.memberships)
		}, (failure) => {
			let messages = failure.messages
			if (!!!messages) messages = [failure.message]
			if (!!messages) setMessages(messages)
		})
	}

	useEffect(() => loadGroupPage(page), [page])
	useEffect(() => loadMemberships(), [])

	let list;
	if (!!groups) {
		list = <GroupList orgs={groups}/>
	} else {
		list = <Loading/>
	}

	return (
		<div className='page-container'>
			<div className='page-body'>
				<div className='page-form'>
					<MembershipList memberships={memberships} onMembershipRequest={requestMembership}/>
					{list}
					<Notice priority='error' messages={messages} clearMessages={clearMessages}/>
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

	function requestMembership() {
		props.onMembershipRequest(group)
		props.onClose()
	}

	function getContent() {
		const hasOptions = !!groupOptions && groupOptions.length > 0

		return hasOptions ?
			<EntrySelect id='group' text='Group' value={group} required defaultValue='unspecified' onChange={(event) => setGroup(event.target.value)} fieldActionIcon={Icons.GROUP_ADD} onFieldAction={requestMembership}>
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
		page = props.orgs.map((group) => <GroupRow key={group.id} group={group}/>)
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
		<div className='page-result' onClick={() => navigate(AppPath.GROUP + "/" + props.group.id)}>{Icons.fromGroupType(props.group.type)} {props.group.name}</div>
	)
}

function MembershipList(props) {
	// Actions
	const [joinRequest, setJoinRequest] = useState(false)

	function toggleJoinRequest() {
		setJoinRequest(!joinRequest)
	}

	return (
		<div className='vbox'>
			<button className='page-action' onClick={() => toggleJoinRequest()}>Join a Group</button>
			{joinRequest ? <JoinRequest onClose={toggleJoinRequest} onMembershipRequest={props.onMembershipRequest}/> : null}
			{props.memberships.map((membership) => <MembershipRow key={membership.id} membership={membership}/>)}
		</div>
	)
}

function MembershipRow(props) {
	return (
		<div className='page-result'><MembershipStatus status={props.membership.status}/> {props.membership.group.name} </div>
	)
}

function MembershipStatus(props) {

	function getIcon(key) {
		switch (key) {
			case'owner':
				return Icons.OWNER
			case'accepted':
				return Icons.MEMBER
			case'invited':
				return Icons.ENVELOPE
			case'requested':
				return Icons.ENVELOPE
			case'revoked':
				return Icons.CANCEL
			default:
				return Icons.UNKNOWN
		}
	}

	// function getText(key) {
	// 	switch (key) {
	// 		case 'owner':
	// 			return 'Owner'
	// 		case 'accepted':
	// 			return 'Accepted'
	// 		case 'invited':
	// 			return 'Invited'
	// 		case 'requested':
	// 			return 'Requested'
	// 		case 'revoked':
	// 			return 'Revoked'
	// 		default:
	// 			return key
	// 	}
	// }

	return (
		<span className={'membership-status ' + props.status}>{getIcon(props.status)}</span>
	)

}
