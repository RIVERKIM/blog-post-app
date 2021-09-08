import React from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect
} from 'react-router-dom';

import { AddPostForm } from './Component/Posts/AddPostForm';
import { PostsList } from './Component/Posts/PostsList';

import {Navbar} from './Component/Navbar/Navbar';
import {SinglePostPage} from './Component/Posts/SinglePostPage'
import {EditPostForm} from './Component/Posts/EditPostForm';
import {LoginForm} from './Component/Auth/LoginForm';
import {AddUserForm} from './Component/Users/AddUserForm';

const Root = () => {
	return (
		<Router>
			<Navbar />
			
			<Switch>
				<Route
					exact
					path="/"
					render={() => (
						<>
						<AddPostForm/>
						<PostsList/>
						</>
					)}
					>
				</Route>
				
				<Route 
					exact
					path="/posts/:postId"
					component={SinglePostPage}>
				</Route>
				<Route
					exact
					path="/editPost/:postId"
					component={EditPostForm}>
				</Route>
				
				<Route
					exact
					path="/auth/login"
					render={() => (<LoginForm/>)}
					>
				</Route>
				
				<Route
					exact
					path="/auth/">
				</Route>
			</Switch>
			
		</Router>
	)
}

export default Root;