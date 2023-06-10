import apiSlice from 'store/slices/apiSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const USERS_URL = `${BASE_URL}/api/users`;

export const usersApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/register`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
		}),
		login: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/login`,
				method: 'POST',
				body: data,
				credentials: 'include',
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: 'POST',
				credentials: 'include',
			}),
		}),
		sendEmail: builder.mutation({
			query: data => ({
				url: `${USERS_URL}/reset-password`,
				method: 'POST',
				body: data,
			}),
		}),
		resetPassword: builder.mutation({
			query: ({ userId, token, password }) => ({
				url: `${USERS_URL}/${userId}/reset-password/${token}`,
				method: 'POST',
				body: { password },
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useLoginMutation,
	useLogoutMutation,
	useSendEmailMutation,
	useResetPasswordMutation,
} = usersApi;
