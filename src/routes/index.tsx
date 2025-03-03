import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

// project-imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import { SimpleLayoutType } from 'config';
import Loadable from 'components/Loadable';
import Login from 'pages/auth/auth1/login';
import Register from 'pages/auth/auth1/register';
import ForgotPassword from 'pages/auth/auth1/forgot-password';

// render - landing page
const PagesLanding = Loadable(lazy(() => import('pages/landing')));

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter(
  [
    // {
    //   path: '/',
    //   element: <SimpleLayout layout={SimpleLayoutType.LANDING} />,
    //   children: [
    //     {
    //       index: true,
    //       element: <PagesLanding />
    //     }
    //   ]
    // },
    {
      path: '/login',
      element: <Login />,
      children: [
        {
          index: true,
          element: <Login />
        }
      ]
    },
    {
      path: '/register',
      element: <Register />,
      children: [
        {
          index: true,
          element: <Register />
        }
      ]
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />,
      children: [
        {
          index: true,
          element: <ForgotPassword />
        }
      ]
    },
    //LoginRoutes,
    MainRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
