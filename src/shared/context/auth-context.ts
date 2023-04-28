import { createContext } from 'react';

interface IAuthContext {
	isLoggedIn: boolean;
	token: string | null;
	userId: string | null;
	login: (token: string, expiresIn: number, userId: string) => void;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
	isLoggedIn: false,
	token: null,
	userId: null,
	login: () => {},
	logout: () => {},
});

export default AuthContext;
