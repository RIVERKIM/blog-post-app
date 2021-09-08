import {createAsyncThunk,
	   createSelector,
	   createEntityAdapter,
	   createSlice} from '@reduxjs/toolkit';
import {sub} from 'date-fns';
import {Client} from '../../client';

const postsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date) 
})

const initialState = postsAdapter.getInitialState({
	status: 'idle',
	error: null
});


export const fetchPosts = createAsyncThunk('posts/fecthPosts', async (_, {rejectWithValue}) =>{
	try {
		const response = await Client.get('/api/posts');		
		
		return response;
	}catch (err) {
		return rejectWithValue(err.response.data);
	}
	
})

export const addNewPost = createAsyncThunk('posts/addNewPost', async (initialPost,{rejectWithValue}) => {
	try {
		const response = await Client.post('/api/posts', {post: initialPost});
		
		return response;
	} catch(err) {
		rejectWithValue(err.response.data);
	}
	
})


const PostsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		reactionAdded(state, action) {
			const {postId, reaction} = action.payload;
			const post = state.entities[postId];
			if(post) {
				post.reactions[reaction]+=1;
			}
		},
		postUpdated(state, action) {
			const {id, title, content} = action.payload;
			const post = state.entities[id]; 
			if(post) {
				post.title = title;
				post.content = content;
			}
		}
	},
	extraReducers: {
		[fetchPosts.pending]: (state, action) => {
			state.status = 'pending';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.status = 'fulfilled';
			postsAdapter.upsertMany(state,action.payload)
		},
		[fetchPosts.rejected]: (state, action) => {
			state.status = 'rejected';
			state.error = action.payload
		},
		[addNewPost.fulfilled]: (state, action) => {
			postsAdapter.addOne(state, action.payload);
		}
	}
});

export const {postAdded, reactionAdded, postUpdated} = PostsSlice.actions;

export const {
	selectById,
	selectAll,
	selectIds
} = postsAdapter.getSelectors(state => state.posts);


export const selectPostsByUser = createSelector(
	[selectAll, (state, userId) => userId],
	(posts, userId) => posts.filter(post => post.user === userId)
);

export default PostsSlice.reducer;