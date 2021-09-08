import {configureStore} from '@reduxjs/toolkit';

import PostsReducer from './Component/Posts/PostsSlice';
import UsersReducer from './Component/Users/UsersSlice';

export default configureStore({
	reducer: {
		posts: PostsReducer,
		users: UsersReducer
	}
})