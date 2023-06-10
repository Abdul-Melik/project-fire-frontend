import { configureStore } from '@reduxjs/toolkit';

import errorLogger from './errorLogger';
import authReducer from 'src/redux/authSlice';
import apiSlice from 'src/redux/apiSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		[apiSlice.reducerPath]: apiSlice.reducer,
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware().concat([apiSlice.middleware, errorLogger]),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
