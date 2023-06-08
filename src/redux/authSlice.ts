import { createSlice } from '@reduxjs/toolkit';

type Role = 'Admin' | 'Guest';

type UserInfo = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	image: string | null;
	role: Role;
};

const initialState = {
	userInfo: localStorage.getItem('userInfo')
		? (JSON.parse(JSON.stringify(localStorage.getItem('userInfo'))) as UserInfo)
		: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userInfo = action.payload;
			localStorage.setItem('userInfo', JSON.stringify(action.payload));
		},
		clearCredentials: state => {
			state.userInfo = null;
			localStorage.removeItem('userInfo');
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;

export default authSlice.reducer;
