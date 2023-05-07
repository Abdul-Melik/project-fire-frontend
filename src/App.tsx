import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import AuthContext from 'src/shared/context/auth-context';
import useAuth from 'src/shared/hooks/auth-hook';
import Login from 'src/pages/Login';
import Home from 'src/pages/Home';
import Projects from 'src/pages/Projects';
import Employees from 'src/pages/Employees';
import FinancialOverview from 'src/pages/FinancialOverview';
import ProjectReporting from 'src/pages/ProjectReporting';
import Invoicing from 'src/pages/Invoicing';

const App = () => {
	const { token, userId, login, logout } = useAuth();

	const routes = (
		<>
			<Route path='/login' element={<Login />} />
			<Route path='/home' element={<Home />} />
			<Route path='/projects' element={<Projects />} />
			<Route path='/employees' element={<Employees />} />
			<Route path='/financial-overview' element={<FinancialOverview />} />
			<Route path='/project-reporting' element={<ProjectReporting />} />
			<Route path='/invoicing' element={<Invoicing />} />
			<Route path='/*' element={<Navigate to='/login' />} />
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
