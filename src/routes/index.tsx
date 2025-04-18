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
import UploadBiodata from 'pages/apps/uploadBiodata/uploadBiodata';
import PersonalDetails from 'pages/apps/personalDetails/personalDetails';
import Preferences from 'pages/apps/preferences/preferences';
import AdditionalInformation from 'pages/apps/additionalInformation/additionalInformation';
import UploadPhotos from 'pages/apps/uploadPhotos/uploadPhotos';
import Questionare from 'pages/apps/questionare/questionnaire';
import RouteGuard from './RouteGaurd';
import SplashScreen from 'pages/apps/splashScreen/splashScreen';
import ComingSoon from 'pages/maintenance/coming-soon/coming-soon2';
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
      path: '/',
      element: <SplashScreen />,
      children: [
        {
          index: true,
          element: <SplashScreen />
        }
      ]
    },
    // {
    //   path: '/maintenance/coming-soon2',
    //   element: <ComingSoon />,
    //   children: [
    //     {
    //       index: true,
    //       element: <ComingSoon />
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
    {
      path: '/upload-biodata',
      element: (
        <RouteGuard>
          <UploadBiodata />
        </RouteGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <UploadBiodata />
            </RouteGuard>
          )
        }
      ]
    },
    {
      path: '/personal-details',
      element: (
        <RouteGuard>
          <PersonalDetails />
        </RouteGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <PersonalDetails />
            </RouteGuard>
          )
        }
      ]
    },
    {
      path: '/preferences',
      element: (
        <RouteGuard>
          <Preferences />
        </RouteGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <Preferences />
            </RouteGuard>
          )
        }
      ]
    },
    {
      path: '/additional-information',
      element: (
        <RouteGuard>
          <AdditionalInformation />
        </RouteGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <AdditionalInformation />
            </RouteGuard>
          )
        }
      ]
    },
    {
      path: '/upload-photos',
      element: (
        <RouteGuard>
          <UploadPhotos />
        </RouteGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <UploadPhotos />
            </RouteGuard>
          )
        }
      ]
    },
    {
      path: '/questionare',
      element: (
        <RouteGuard>
          <Questionare />
        </RouteGuard>
      ),
      children: [
        {
          index: true,
          element: (
            <RouteGuard>
              <Questionare />
            </RouteGuard>
          )
        }
      ]
    },
    //LoginRoutes,
    MainRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
