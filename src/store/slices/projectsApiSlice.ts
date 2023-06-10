import apiSlice from 'store/slices/apiSlice';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const PROJECTS_URL = `${BASE_URL}/api/projects`;

export const projectsApi = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProjectsInfo: builder.query({
			query: year => ({
				url: `${PROJECTS_URL}/info?year=${year}`,
				credentials: 'include',
			}),
		}),
	}),
});

export const { useGetProjectsInfoQuery } = projectsApi;
