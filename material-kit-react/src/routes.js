import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
import LandingPage from "./Landing/LandingPage";
import RegistrationForm from "./Form/RegistrationForm";
import "./scss/index.scss";

//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import Dropdown from './Form/dropdown';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User /> },
        { path: 'products', element: <Products /> },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/form',
      element: <RegistrationForm />,
      // children: [
      //   { path: 'app', element: <DashboardApp /> },
      //   { path: 'user', element: <User /> },
      //   { path: 'products', element: <Products /> },
      //   { path: 'blog', element: <Blog /> },
      // ],
    },
    {
      path: '/dropdown',
      element: <Dropdown />,
      // children: [
      //   { path: 'app', element: <DashboardApp /> },
      //   { path: 'user', element: <User /> },
      //   { path: 'products', element: <Products /> },
      //   { path: 'blog', element: <Blog /> },
      // ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/Home" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '/Home',
      element: <LandingPage />,
      // children: [
      //   { path: '/', element: <Navigate to="/dashboard/app" /> },
      //   { path: 'login', element: <Login /> },
      //   { path: 'register', element: <Register /> },
      //   { path: '404', element: <NotFound /> },
      //   { path: '*', element: <Navigate to="/404" /> },
      // ],
    },
    { path: '*', element: <NotFound to="/404" replace /> },
  ]);
}
