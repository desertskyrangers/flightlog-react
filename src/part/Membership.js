import {useNavigate} from "react-router-dom";
import AppPath from "../AppPath";
import Icons from "../util/Icons";

export function MembershipRow(props) {
	const navigate = useNavigate();

	function doClick() {
		if (props.membership.status === 'owner') navigate(AppPath.GROUP + "/" + props.membership.group.id)
	}

	return (
		<div className='page-result' onClick={doClick}>
			<MembershipIcon status={props.membership.status}/>
			{/*&nbsp;{Icons.fromGroupType(props.membership.group.type)}*/}
			&nbsp;{props.membership.group.name}
			{props.actionIcon ? <button className='icon-button page-field-action-button' onClick={props.onAction}>{props.actionIcon}</button> : null}
		</div>
	)
}

function MembershipIcon(props) {

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

	function getText(key) {
		switch (key) {
			case 'owner':
				return 'Owner'
			case 'accepted':
				return 'Member'
			case 'invited':
				return 'Invited'
			case 'requested':
				return 'Requested'
			case 'revoked':
				return 'Revoked'
			default:
				return key
		}
	}

	return (
		<span className={'tooltip membership-status ' + props.status}>
			<span className={'tooltiptext membership-status ' + props.status}>{getText(props.status)}</span>
			{getIcon(props.status)}
		</span>
	)

}
