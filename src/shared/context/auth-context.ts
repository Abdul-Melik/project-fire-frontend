import { createContext } from 'react';

type User = {
	id: string;
	email: string;
	firstName: string;
	lastName: string;
	image?: string;
	role: string;
};

interface IAuthContext {
	token: string | null;
	user: User | null;
	login: (token: string, expiresIn: number, user: User) => void;
	logout: () => void;
}

const AuthContext = createContext<IAuthContext>({
	token: null,
	user: null,
	login: () => {},
	logout: () => {},
});

export default AuthContext;
