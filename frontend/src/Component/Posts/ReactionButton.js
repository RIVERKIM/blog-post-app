import React from 'react';
import { useDispatch } from 'react-redux';
import {reactionAdded} from './PostsSlice';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

export const ReactionButton = ({post}) => {
	const dispatch = useDispatch();
	
	const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
        key={name}
        type="button"
        className="reaction-button"
        onClick={() =>
          dispatch(reactionAdded({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
		)
	})
	
	return (
		<div className="reactions">
			{reactionButtons}
		</div>
	)
}