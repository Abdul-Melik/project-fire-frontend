import apiSlice from 'store/slices/apiSlice';
import { setCredentials, clearCredentials } from 'store/slices/authSlice';

export const authApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		register: builder.mutation({
			query: data => ({
				url: '/auth/register',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCredentials(data));
				} catch (error) {}
			},
		}),
		login: builder.mutation({
			query: data => ({
				url: '/auth/login',
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					const { data } = await queryFulfilled;
					dispatch(setCredentials(data));
				} catch (error) {}
			},
		}),
		logout: builder.mutation({
			query: () => ({
				url: '/auth/logout',
				method: 'POST',
			}),
			async onQueryStarted(args, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(clearCredentials());
				} catch (error) {}
			},
		}),
		sendResetPasswordEmail: builder.mutation({
			query: data => ({
				url: '/auth/reset-password',
				method: 'POST',
				body: data,
			}),
		}),
		resetPassword: builder.mutation({
			query: ({ userId, token, password }) => ({
				url: `/auth/${userId}/reset-password/${token}`,
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
	useSendResetPasswordEmailMutation,
	useResetPasswordMutation,
} = authApiSlice;
