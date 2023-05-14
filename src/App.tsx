import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';

import AuthContext from 'src/shared/context/auth-context';
import useAuth from 'src/shared/hooks/auth-hook';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';
import Login from 'src/pages/Login';
import Home from 'src/pages/Home';
import Projects from 'src/pages/Projects';
import Employees from 'src/pages/Employees';
import FinancialOverview from 'src/pages/FinancialOverview';
import ProjectReporting from 'src/pages/ProjectReporting';
import Invoicing from 'src/pages/Invoicing';
import ForgotPassword from 'src/pages/ForgotPassword';
import ResetPassword from 'src/pages/ResetPassword';

const App = () => {
	const { isLoading, token, user, login, logout } = useAuth();

	const PrivateRoutes = () => {
		if (isLoading) return <LoadingSpinner />;
		return !!token ? <Outlet /> : <Navigate to='/login' />;
	};

	const routes = (
		<>
			<Route path='/login' element={<Login />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/:userId/reset-password/:token' element={<ResetPassword />} />
			<Route element={<PrivateRoutes />}>
				<Route path='/home' element={<Home />} />
				<Route path='/projects' element={<Projects />} />
				<Route path='/employees' element={<Employees />} />
				<Route path='/financial-overview' element={<FinancialOverview />} />
				<Route path='/project-reporting' element={<ProjectReporting />} />
				<Route path='/invoicing' element={<Invoicing />} />
			</Route>
			<Route path='/*' element={<Navigate to='/login' />} />
		</>
	);

	return (
		<AuthContext.Provider
			value={{
				token,
				user,
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
