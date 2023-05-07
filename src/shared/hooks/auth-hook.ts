import { useState, useCallback, useEffect } from 'react';

let logoutTimer: ReturnType<typeof setTimeout>;

interface User {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	image?: string;
}

const useAuth = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<User | null>(null);
	const [tokenExpirationDate, setTokenExpirationDate] = useState<Date | null>(null);
	const [expiresIn, setExpiresIn] = useState(0);

	const login = useCallback((token: string, expiresIn: number, user: User, expirationDate?: Date) => {
		setToken(token);
		setExpiresIn(expiresIn);
		setUser(user);
		const tokenLoginExpirationDate = expirationDate || new Date(new Date().getTime() + expiresIn);
		setTokenExpirationDate(tokenLoginExpirationDate);
		localStorage.setItem(
			'data',
			JSON.stringify({
				token,
				user,
				expiration: tokenLoginExpirationDate.toLocaleString(),
			})
		);
	}, []);

	const logout = useCallback(() => {
		setToken('');
		setUser(null);
		setTokenExpirationDate(null);
		localStorage.removeItem('data');
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
		const storedData = JSON.parse(localStorage.getItem('data') || 'null');
		if (storedData && storedData.token && new Date(storedData.expiration) > new Date()) {
			login(storedData.token, expiresIn, storedData.user, new Date(storedData.expiration));
		}
		setIsLoading(false);
	}, [login]);

	return { isLoading, token, user, login, logout };
};

export default useAuth;
