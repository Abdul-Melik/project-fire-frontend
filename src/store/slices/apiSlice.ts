import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type { RootState } from 'src/store';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const baseQuery = fetchBaseQuery({
	baseUrl: `${BASE_URL}/api`,
	credentials: 'include',
	prepareHeaders: (headers, { getState }) => {
		const accessToken = (getState() as RootState).auth.accessToken;
		if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
		return headers;
	},
});

const apiSlice = createApi({
	baseQuery,
	endpoints: () => ({}),
});

export default apiSlice;
