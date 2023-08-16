import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }){
	const history = useHistory()
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div id='navbar'>
			<div id='main-navbar-buttons'>
				<NavLink exact to="/" className="WSCO">WSCO</NavLink>
				{sessionUser ? <NavLink exact to={`/${sessionUser.username}/gallery`} className="profile-signed-in">Profile</NavLink>
				: <NavLink exact to="/login" className="profile-signed-out">Sign In</NavLink>}
			</div>
			{isLoaded && (
				<div id='search-bar-user-dropdown-container'>
					<NavLink exact to="/search">
						<svg viewBox="0 0 1024 1024"><path className="path1" d="M848.471 928l-263.059-263.059c-48.941 36.706-110.118 55.059-177.412 55.059-171.294 0-312-140.706-312-312s140.706-312 312-312c171.294 0 312 140.706 312 312 0 67.294-24.471 128.471-55.059 177.412l263.059 263.059-79.529 79.529zM189.623 408.078c0 121.364 97.091 218.455 218.455 218.455s218.455-97.091 218.455-218.455c0-121.364-103.159-218.455-218.455-218.455-121.364 0-218.455 97.091-218.455 218.455z"></path></svg>
					</NavLink>
					<div className='side-bar-scroll'>
						<ProfileButton user={sessionUser} />
					</div>
				</div>
			)}
		</div>
	);
}

export default Navigation;
