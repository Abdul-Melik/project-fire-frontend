import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Projects from './pages/Projects';
import useAuth from './shared/hooks/auth-hook';
import AuthContext from './shared/context/auth-context';

const App = () => {
	const { token, userId, login, logout } = useAuth();
	const routes = (
		<>
			<Route path='/' element={<Login />} />
			<Route path='/login' element={<Login />} />
			<Route path='/dashboard' element={<Dashboard />} />
			<Route path='/home' element={<Home />} />
			<Route path='/projects' element={<Projects />} />
		</>
	);
	return (
		<AuthContext.Provider
			value={{
				isLoggedIn: !!token,
				token,
				userId,
				login,
				logout,
			}}
		>
			<Router>
				<Routes>{routes}</Routes>
			</Router>
		</AuthContext.Provider>
	);
};
export default App;
