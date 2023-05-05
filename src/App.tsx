import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import AuthContext from "./shared/context/auth-context";
import useAuth from "./shared/hooks/auth-hook";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import FinancialOverview from "./pages/FinancialOverview";
import ProjectReporting from "./pages/ProjectReporting";
import Invoicing from "./pages/Invoicing";
import RevenuePerMonth from "./components/home/RevenuePerMonth";

const App = () => {
  const { token, userId, login, logout } = useAuth();

  const routes = (
    <>
      <Route path="/revenue" element={<RevenuePerMonth />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/employees" element={<Employees />} />
      <Route path="/financial-overview" element={<FinancialOverview />} />
      <Route path="/project-reporting" element={<ProjectReporting />} />
      <Route path="/invoicing" element={<Invoicing />} />
      <Route path="/*" element={<Navigate to="/login" />} />
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
