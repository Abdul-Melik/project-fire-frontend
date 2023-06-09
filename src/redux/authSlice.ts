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

type authState = {
	userInfo: UserInfo | null;
};

const userInfoString = localStorage.getItem('userInfo');

const initialState: authState = {
	userInfo: userInfoString ? JSON.parse(userInfoString) : null,
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
