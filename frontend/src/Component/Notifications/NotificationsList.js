import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {selectAllNotifications, fecthNotifications} from './NotificationsSlice';
import {selectAll} from '../Users/UsersSlice';
import {parseISO, formatDistanceToNow} from 'date-fns';
import classnames from 'classnames';

export const NotificationsList = () => {
	const dispatch = useDispatch();
	const notifications = useSelector(selectAllNotifications);
	const users = useSelector(selectAll);
	
	
	useEffect(() => {
		dispatch(fecthNotifications());
	});
	
	const renderedNotifications = notifications.map(notification => {
		const date = parseISO(notification.date);
		const timeAgo = formatDistanceToNow(date);
		const user = users.find(user => user.id === notification.user)
		|| {name: 'Unknown'}
		
		const notificationClassname = classnames('notification', {
			new: notification.isNew
		});
		
		return (
			<div key={notification.id} className={notificationClassname}>
				<h2>{notification.title}</h2>
				
				<div>
					{notification.message}
				</div>
				
				<div>
					{timeAgo} Ago
				</div>
			</div>
		)
	})
	
	return (
		<section>
			<h2>Notifications</h2>
			
			{renderedNotifications}
		</section>
	)
}
