import { useState, useCallback } from 'react';

const useHttpClient = () => {
	const [error, setError] = useState<string | null>(null);

	const sendRequest = useCallback(async (url: string, method: string = 'GET', body: any = null, headers: any = {}) => {
		try {
			const response = await fetch(url, {
				method,
				body,
				headers,
			});
			const responseData = await response.json();

			if (!response.ok) {
				throw new Error(responseData.message);
			}

			return responseData;
		} catch (err: any) {
			setError(err.message);
			throw err;
		}
	}, []);

	const clearError = () => {
		setError(null);
	};

	return { error, sendRequest, clearError };
};

export default useHttpClient;
