import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
	return (
		<nav>
			<section className="navSection">
				<div className="navContent">
					<div className="navLinks">
						<Link to="/">Posts</Link>
						<Link to="/users">Users</Link>
						<Link to="/notifications">Notifications</Link>
					</div>
					
					<button className="button">
						Refresh Notifications
					</button>
				</div>
				
				
			</section>
			
			<Link to="/auth/login">Login</Link>
		</nav>
	)
}