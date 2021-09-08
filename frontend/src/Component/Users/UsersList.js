import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export const UsersList = () => {
	const users = useSelector(state => state.users);
	
	const renderedList = users.map(user => {
		return (
			<li key={user.id}>
				<Link to={`/users/${user.id}`}>
					{user.name}
				</Link>
			</li>
		)
	})
	
	return (
		<section>
			<h2>Users</h2>
			<ul>
				{renderedList}
			</ul>
		</section>
		
	)
}