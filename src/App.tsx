import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AuthContext from 'src/shared/context/auth-context';
import useAuth from 'src/shared/hooks/auth-hook';
import LoadingSpinner from 'src/shared/components/utils/LoadingSpinner';
import Login from 'src/pages/Login';
import Home from 'src/pages/Home';
import Projects from 'src/pages/Projects';
import CreateNewProject from 'src/pages/CreateNewProject';
import Employees from 'src/pages/Employees';
import FinancialOverview from 'src/pages/FinancialOverview';
import ProjectReporting from 'src/pages/ProjectReporting';
import Invoicing from 'src/pages/Invoicing';
import ForgotPassword from 'src/pages/ForgotPassword';
import ResetPassword from 'src/pages/ResetPassword';
import Register from 'src/pages/Register';
import PageNotFound from 'src/pages/PageNotFound';

const App = () => {
	const { isLoading, token, user, login, logout } = useAuth();

	const PrivateRoutes = () => {
		if (isLoading) return <LoadingSpinner />;
		return !!token ? <Outlet /> : <Navigate to='/login' />;
	};

	const routes = (
		<>
			<Route path='/' element={<Login />} />
			<Route path='/login' element={<Login />} />
			<Route path='/register' element={<Register />} />
			<Route path='/forgot-password' element={<ForgotPassword />} />
			<Route path='/:userId/reset-password/:token' element={<ResetPassword />} />
			<Route element={<PrivateRoutes />}>
				<Route path='/home' element={<Home />} />
				<Route path='/projects' element={<Projects />} />
				<Route path='/projects/create' element={<CreateNewProject />} />
				<Route path='/employees' element={<Employees />} />
				<Route path='/financial-overview' element={<FinancialOverview />} />
				<Route path='/project-reporting' element={<ProjectReporting />} />
				<Route path='/invoicing' element={<Invoicing />} />
			</Route>
			<Route path='/*' element={<PageNotFound />} />
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
			<ToastContainer />
		</AuthContext.Provider>
	);
};

export default App;
