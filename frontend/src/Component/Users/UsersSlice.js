import { createSlice, createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit'
import { Client } from '../../client.js';
const userAdapter = createEntityAdapter();

const initialState = userAdapter.getInitialState({
	isAuthenticated: false,
	error: null
});

export const Login = createAsyncThunk('users/Login', async ({email, password}, {rejectWithValue}) => {
	try {
		const response = await Client.post('/api/users', {email, password});
		return response;
	} catch(err) {
		return rejectWithValue(err.response.data);
	} 
	
});

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers: {
		[Login.fulfilled]: (state, action) => {
			state.isAuthenticated = true;
			userAdapter.upsertOne(state, action.payload);
		},
		[Login.rejected]: (state, action) => {
			state.error = action.payload;
		}
	}
});

export default usersSlice.reducer;


export const {
	selectAll,
	selectById
} = userAdapter.getSelectors((state) => state.users);