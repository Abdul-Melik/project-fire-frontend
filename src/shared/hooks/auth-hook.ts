import { useState, useCallback, useEffect } from 'react';

let logoutTimer: ReturnType<typeof setTimeout>;

const useAuth = () => {
	const [token, setToken] = useState<string | null>(null);
	const [userId, setUserId] = useState<string | null>(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(null);
	const [expiresIn, setExpiresIn] = useState<number>(0);

	const login = useCallback((token: string, expiresIn: number, userId: string, expirationDate?: Date) => {
		setToken(token);
		setUserId(userId);
		setExpiresIn(expiresIn);

		const tokenLoginExpirationDate = expirationDate || new Date(new Date().getTime() + expiresIn);
		setTokenExpirationDate(tokenLoginExpirationDate);
		localStorage.setItem(
			'userData',
			JSON.stringify({
				token,
				userId,
				expiration: tokenLoginExpirationDate.toLocaleString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken('');
		setUserId(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('userData');
		clearTimeout(logoutTimer);
	}, [logoutTimer]);

	useEffect(() => {
		if (token && tokenExpirationDate) {
			const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
			logoutTimer = setTimeout(logout, remainingTime);
		} else {
			clearTimeout(logoutTimer);
		}

		return () => clearTimeout(logoutTimer);
	}, [token, tokenExpirationDate, logout]);

	useEffect(() => {
		const storedData = JSON.parse(localStorage.getItem('userData') || 'null');

		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.token, expiresIn, storedData.userId, new Date(storedData.expiration));
		}
	}, [login]);

	return { token, userId, login, logout };
};

export default useAuth;
