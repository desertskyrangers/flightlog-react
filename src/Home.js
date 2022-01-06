import React from "react";
import {useNavigate} from "react-router-dom";

export default function Home(props) {
	const navigate = useNavigate();

	return (
		<div className='login-container'>
			<div className='login-body'>
				<div className='login-form'>
					{/* Put user/pilot dashboard data here */}
				</div>
			</div>
		</div>
	);

}
