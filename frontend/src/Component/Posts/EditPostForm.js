import {useSelector, useDispatch} from 'react-redux';
import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import {postUpdated} from './PostsSlice';

export const EditPostForm = ({match}) => {
	const {postId} = match.params;
	
	const post = useSelector(state => state.posts.find(post => post.id === postId));
	
	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);
	
	const onTitleChange = e => setTitle(e.target.value);
	const onContentChange = e => setContent(e.target.value);
	
	const dispatch = useDispatch();
	const history = useHistory();
	
	const onSavePostClicked = () => {
		dispatch(postUpdated({id: postId,title, content}));
		history.push(`/posts/${postId}`)
	}
	
	return (
		<section>
			<h2>Edit Post</h2>
			
			<form className="addForm">
				<div>
					<label htmlFor="postTitle">Post Title:</label>
					<input type="text" id="postTitle" name="postTitle" placeholder="What's on your mind?"
						value={title} onChange={onTitleChange}/>
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
				<button type="button" onClick={onSavePostClicked}>
				  Save Post
				</button>
			</form>
		</section>
	)
}