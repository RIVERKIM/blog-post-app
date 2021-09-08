import React, {useState} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import {addNewPost} from './PostsSlice';
import {unwrapResult} from '@reduxjs/toolkit';

export const AddPostForm = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [author, setAuthor] = useState('Unknown');
	const [addRequestStatus, setAddRequestStatus] = useState('idle');
	
	const dispatch = useDispatch();
	
	const users = useSelector(state => state.users);
	
	const onTitleChange = e => setTitle(e.target.value);
	const onContentChange = e => setContent(e.target.value);
	const onAuthorChange = e => setAuthor(e.target.value);
	
	const canSave = [title, content, author].every(Boolean) && (addRequestStatus === 'idle')
	const onSavePostClicked = async () => {
		if(canSave) {
			try {
				setAddRequestStatus('pending');
				const result = await dispatch(addNewPost({title, content, user: author}));
				unwrapResult(result);
				setTitle('');
				setContent('');
			} catch(err) {
				console.error(err);
			} finally {
				setAddRequestStatus('idle');
			}
		}
	}
	
	const userOptions = (
		<option value="Unknown">
			Unknown
		</option>
	)
	
	
	return (
		<section className="addSection">
			<h2>Add a New Post</h2>
			
			<form className="addForm">
				<div>
					<label htmlFor="postTitle">Post Title:</label>
					<input type="text" id="postTitle" name="postTitle" placeholder="What's on your mind?"
						value={title} onChange={onTitleChange}/>

					
				</div>
				
				<div>
					<label htmlFor="postAuthor">Author:</label>
					<select id="postAuthor" value={author} onChange={onAuthorChange}>
						{userOptions}
					</select>
				</div>
				
				<div>
					<label htmlFor="postContent">Content:</label>
					<textarea
					  id="postContent"
					  name="postContent"
					  value={content}
					  onChange={onContentChange}
					/>
				</div>
				<button type="button" onClick={onSavePostClicked} disabled={!canSave}>
				  Save Post
				</button>
			</form>
		</section>
	)
}