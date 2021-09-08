import {createSlice, createEntityAdapter, createAsyncThunk} from '@reduxjs/toolkit';
import {useEffect} from 'react';
import {Client} from '../../client';
const AuthAdapter = createEntityAdapter({});

const initialState = AuthAdapter.getInitialState({
	isAuthenticated: false,
	error: null
})

export const SignUp = createAsyncThunk('auth/signup', async ({email, name, password}, {rejectWithValue}) => {
	try {
		const response = Client.post('/api/auth/signup', {email, name, password});
		
		return response;
	}catch(err) {
		console.log(err)
		return rejectWithValue(err.response.data);
	}
})

export const SignIn = createAsyncThunk('auth/signin', async ({email, password}, {rejectWithValue}) => {
	try {
			const response = Client.post('/api/auth/signin', {email, password});
			
			return response;
		
	}catch(err) {
		console.log(err)
		return rejectWithValue(err.response.data);
	}
});

export const SignOut = createAsyncThunk('auth/signout', async ({token}, {rejectWithValue}) => {
	try {
		const response = Client.post('/api/auth/signout', {token});
		
		return response;
	}catch(err) {
		console.log(err)
		return rejectWithValue(err.response.data);
	}
})


const AuthSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: {
		[SignIn.fulfilled]: (state, action) => {
			state.isAuthenticated = true;
			AuthAdapter.upsertOne(state, action.payload);
		},
		[SignIn.rejected]: (state, action) => {
			state.error = action.payload;
		}
	}
})

