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
import Questionare from 'pages/apps/questionare/questionare';

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
      element: <UploadBiodata />,
      children: [
        {
          index: true,
          element: <UploadBiodata />
        }
      ]
    },
    {
      path: '/personal-details',
      element: <PersonalDetails />,
      children: [
        {
          index: true,
          element: <PersonalDetails />
        }
      ]
    },
    {
      path: '/preferences',
      element: <Preferences />,
      children: [
        {
          index: true,
          element: <Preferences />
        }
      ]
    },
    {
      path: '/additional-information',
      element: <AdditionalInformation />,
      children: [
        {
          index: true,
          element: <AdditionalInformation />
        }
      ]
    },
    {
      path: '/upload-photos',
      element: <UploadPhotos />,
      children: [
        {
          index: true,
          element: <UploadPhotos />
        }
      ]
    },
    {
      path: '/questionare',
      element: <Questionare />,
      children: [
        {
          index: true,
          element: <Questionare />
        }
      ]
    },
    //LoginRoutes,
    MainRoutes
  ],
  { basename: import.meta.env.VITE_APP_BASE_NAME }
);

export default router;
