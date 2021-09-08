import React from 'react';
import { useSelector} from 'react-redux';
import {selectById} from '../Users/UsersSlice';

export const PostAuthor = ({userId}) => {
	const author = null;
	
	return (
		<span>by {author ? author.name : "Unknonw"}</span>
	)
}