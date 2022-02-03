import MembershipIcon from "./MembershipStatusIcon";

export function MembershipUser(props) {
	//const navigate = useNavigate();

	function doClick() {
		//if (props.membership.status === 'owner') navigate(AppPath.GROUP + "/" + props.membership.group.id)
	}

	return (
		<div className='page-result' onClick={doClick}>
			<MembershipIcon status={props.membership.status}/>
			{/*&nbsp;{Icons.fromGroupType(props.membership.group.type)}*/}
			&nbsp;{props.membership.user.preferredName}
			{props.actionIcon ? <button className='icon-button page-field-action-button' onClick={props.onAction}>{props.actionIcon}</button> : null}
		</div>
	)
}
