import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAppSelector } from 'store/hooks';
import { selectIsAuthenticated } from 'store/slices/authSlice';
import Login from 'features/auth/Login';
import Register from 'features/auth/Register';
import ForgotPassword from 'features/auth/ForgotPassword';
import ResetPassword from 'features/auth/ResetPassword';
import Home from 'features/home/Home';
import Projects from 'features/projects/Projects';
import CreateNewProject from 'features/projects/CreateNewProject';
import Employees from 'features/employees/Employees';
import FinancialOverview from 'features/financial-overview/FinancialOverview';
import ProjectReporting from 'features/project-reporting/ProjectReporting';
import Invoicing from 'features/invoicing/Invoicing';
import PageNotFound from 'features/other/PageNotFound';

const App = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	const PrivateRoutes = () => {
		return isAuthenticated ? <Outlet /> : <Navigate to='/login' />;
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
		<>
			<Router>
				<Routes>{routes}</Routes>
			</Router>
			<ToastContainer />
		</>
	);
};

export default App;
