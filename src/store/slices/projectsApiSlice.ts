import apiSlice from 'store/slices/apiSlice';

export const projectsApiSlice = apiSlice.injectEndpoints({
	endpoints: builder => ({
		getProjects: builder.query({
			query: ({ searchTerm, projectStatus, orderByField, orderDirection, projectsPerPage, currentPage }) => ({
				url: `/projects?name=${searchTerm}&projectStatus=${projectStatus}&orderByField=${orderByField}&orderDirection=${orderDirection}&take=${projectsPerPage}&page=${currentPage}`,
				method: 'GET',
			}),
		}),
		getProjectsInfo: builder.query({
			query: ({ year }) => ({
				url: `/projects/info?year=${year}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { usePrefetch, useGetProjectsQuery, useGetProjectsInfoQuery } = projectsApiSlice;
