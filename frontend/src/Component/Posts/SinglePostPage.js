import React from 'react';
import {useSelector} from 'react-redux';
import {PostAuthor} from './postAuthor';
import {Link} from 'react-router-dom';
import {TimeAgo} from './TimeAgo';
import {ReactionButton} from './ReactionButton';
import {selectById} from './PostsSlice';

export const SinglePostPage = ({match}) => {
	const {postId} = match.params;
	const post = useSelector((state) =>selectById(state, postId));
	
	if(!post) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}
	
	return (
		<section className="singlePostSection">
			<article className="post-excerpt" key={post.id}>
				<h3>{post.title}</h3>
				<div className="details">
					<PostAuthor userId={post.user}/>
					<TimeAgo timestamp={post.date}/>
				</div>
				
				<p>{post.content.substring(0, 100)}</p>
				<ReactionButton post={post}/>
				<Link to={`/editPost/${post.id}`} className="button muted-button">Edit Post
				</Link>
			</article>
		</section>
	)
}