import apiSlice from 'store/slices/apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProjectsInfo: builder.query({
			query: ({ year }) => ({
				url: `/projects/info?year=${year}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetProjectsInfoQuery } = projectsApiSlice;
