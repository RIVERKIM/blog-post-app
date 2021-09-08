import {createSlice,createAsyncThunk, createEntityAdapter} from '@reduxjs/toolkit';

import {Client} from '../../client';

const notificationsAdapter = createEntityAdapter({
	sortComparer: (a, b) => b.date.localeCompare(a.date)
});

export const fecthNotifications = createAsyncThunk('notifications/fecthNotifications', async (_, {rejectWithValue}) => {
	try {
		const response = await Client.get('/api/notifications');
		return response;
	} catch(err) {
		return rejectWithValue(err.response.data);
	}
});

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState: notificationsAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[fecthNotifications.fulfilled]: (state, action) => {
			Object.values(state.entities).forEach(notification => {
				notification.isNew = !notification.read;
			});
			
			notificationsAdapter.upsertMany(state, action.payload);
		}
	}
})

export default notificationsSlice.reducer;

export const {
	selectAll: selectAllNotifications
} = notificationsAdapter.getSelector(state => state.notifications);
