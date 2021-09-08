import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {PostAuthor} from './postAuthor';
import {Link} from 'react-router-dom';
import {TimeAgo} from './TimeAgo';
import {ReactionButton} from './ReactionButton';
import {selectById, selectIds, fetchPosts} from './PostsSlice';


const PostExcerpt = ({postId}) => {
	const post = useSelector(state => selectById(state, postId));
	
	return (
		<article className="post-excerpt" key={post.id}>
				<h3>{post.title}</h3>
				<div className="details">
					<PostAuthor userId={post.user}/>
					<TimeAgo timestamp={post.date}/>
				</div>
				
				<p>{post.content.substring(0, 100)}</p>
				<ReactionButton post={post}/>
				<Link to={`/posts/${post.id}`} className="button muted-button">View Post
				</Link>
			</article>
	)
}

export const PostsList = () => {
	const dispatch = useDispatch();
	const orderedPostIds = useSelector(selectIds);
	
	const status = useSelector(state => state.posts.status);
	const error = useSelector(state => state.posts.error);
	
	useEffect(() => {
		if(status === 'idle') {
			dispatch(fetchPosts());
		}
	},[status, dispatch]);
	
	let content;
	
	if(status === 'pending') {
		content = (<div>Loading...</div>)
	} else if(status === 'fulfilled') {
		content = orderedPostIds.map(postId => (
			<PostExcerpt key={postId} postId={postId} />
		))
	} else if(status === 'rejected'){
		content = <div>{error}</div>
	}
	
	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{content}
		</section>
	)
}