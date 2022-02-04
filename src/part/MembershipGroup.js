import {useNavigate} from "react-router-dom";
import AppPath from "../AppPath";
import MembershipIcon from "./MembershipStatusIcon";

export function MembershipGroup(props) {
	const navigate = useNavigate();

	function isOwner() {
		return props.membership.status === 'owner'
	}

	function doClick() {
		if (isOwner()) navigate(AppPath.GROUP + "/" + props.membership.group.id)
	}

	return (
		<div className={isOwner() ? 'page-result' : 'page-row'} onClick={doClick}>
			<MembershipIcon status={props.membership.status}/>
			{/*&nbsp;{Icons.fromGroupType(props.membership.group.type)}*/}
			<span className='page-text'>{props.membership.group.name}</span>
			{props.actionIcon ? <button className='icon page-field-action-button' onClick={props.onAction}>{props.actionIcon}</button> : null}
		</div>
	)
}
