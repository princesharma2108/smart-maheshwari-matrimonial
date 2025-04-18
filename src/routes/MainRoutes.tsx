import { Children, lazy } from 'react';

// project-imports
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
import PagesLayout from 'layout/Pages';

import { SimpleLayoutType } from 'config';
import { loader as productsLoader, productLoader } from 'api/products';
import RouteGuard from './RouteGaurd';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));

// render - widget
const WidgetStatistics = Loadable(lazy(() => import('pages/widget/statistics')));

const UserProfile = Loadable(lazy(() => import('pages/apps/profiles/user')));
const UserTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/user/TabPersonal')));
const UserTabPayment = Loadable(lazy(() => import('sections/apps/profiles/user/TabPayment')));
const UserTabPassword = Loadable(lazy(() => import('sections/apps/profiles/user/TabPassword')));
const UserTabSettings = Loadable(lazy(() => import('sections/apps/profiles/user/TabSettings')));
const UserPersonalDetailsEdit = Loadable(lazy(() => import('sections/apps/profiles/user/personalDetailsEdit')));

const AppEditProfile = Loadable(lazy(() => import('pages/apps/editProfile/editProfile')));
const AppPersonalDetailsEdit = Loadable(lazy(() => import('sections/apps/editProfile/editProfile/personalDetailsEdit')));
const EditAdjustPreference = Loadable(lazy(() => import('sections/apps/editProfile/editProfile/preferencesEdit')));
const AppEditPhotos = Loadable(lazy(() => import('sections/apps/editProfile/editProfile/editPhotos')));
const AppLatestMatches = Loadable(lazy(() => import('pages/apps/latestMatches/latestMatches')));
const AppSubscriptionPlan = Loadable(lazy(() => import('pages/apps/subscriptionPlan/subscriptionPlan')));
const AppAdvancedSearch = Loadable(lazy(() => import('pages/apps/advancedSearch/advancedSearch')));
const AppContactSuppport = Loadable(lazy(() => import('pages/apps/contactSupport/contactSupport')));
const AppFeedback = Loadable(lazy(() => import('pages/apps/appFeedback/appFeedback')));
const AppAboutUs = Loadable(lazy(() => import('pages/apps/aboutUs/aboutUs')));

const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));
const AccountTabProfile = Loadable(lazy(() => import('sections/apps/profiles/account/TabProfile')));
const AccountTabPersonal = Loadable(lazy(() => import('sections/apps/profiles/account/TabPersonal')));
const AccountTabAccount = Loadable(lazy(() => import('sections/apps/profiles/account/TabAccount')));
const AccountTabPassword = Loadable(lazy(() => import('sections/apps/profiles/account/TabPassword')));
const AccountTabRole = Loadable(lazy(() => import('sections/apps/profiles/account/TabRole')));
const AccountTabSettings = Loadable(lazy(() => import('sections/apps/profiles/account/TabSettings')));

// pages routing
const AuthLogin = Loadable(lazy(() => import('pages/auth/auth1/login')));
const AuthRegister = Loadable(lazy(() => import('pages/auth/auth1/register')));
const AuthForgotPassword = Loadable(lazy(() => import('pages/auth/auth1/forgot-password')));
const AuthResetPassword = Loadable(lazy(() => import('pages/auth/auth1/reset-password')));
const AuthCheckMail = Loadable(lazy(() => import('pages/auth/auth1/check-mail')));
const AuthCodeVerification = Loadable(lazy(() => import('pages/auth/auth1/code-verification')));

const AuthLogin2 = Loadable(lazy(() => import('pages/auth/auth2/login2')));
const AuthRegister2 = Loadable(lazy(() => import('pages/auth/auth2/register2')));
const AuthForgotPassword2 = Loadable(lazy(() => import('pages/auth/auth2/forgot-password2')));
const AuthResetPassword2 = Loadable(lazy(() => import('pages/auth/auth2/reset-password2')));
const AuthCheckMail2 = Loadable(lazy(() => import('pages/auth/auth2/check-mail2')));
const AuthCodeVerification2 = Loadable(lazy(() => import('pages/auth/auth2/code-verification2')));

const AuthLogin3 = Loadable(lazy(() => import('pages/auth/auth3/login3')));

const MaintenanceError = Loadable(lazy(() => import('pages/maintenance/error/404')));
const MaintenanceError500 = Loadable(lazy(() => import('pages/maintenance/error/500')));
const MaintenanceUnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction')));
const MaintenanceUnderConstruction2 = Loadable(lazy(() => import('pages/maintenance/under-construction/under-construction2')));
const MaintenanceComingSoon = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon')));
const MaintenanceComingSoon2 = Loadable(lazy(() => import('pages/maintenance/coming-soon/coming-soon2')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        // {
        //   path: 'dashboard',
        //   children: [
        //     {
        //       path: 'default',
        //       element: <DashboardDefault />
        //     },
        //     {
        //       path: 'analytics',
        //       element: <DashboardAnalytics />
        //     }
        //   ]
        // },
        {
          path: 'widget',
          children: [
            {
              path: 'statistics',
              element: (
                <RouteGuard>
                  <WidgetStatistics />
                </RouteGuard>
              )
            }
          ]
        },
        {
          path: 'apps',
          children: [
            {
              path: 'aboutUs',
              children: [
                {
                  path: 'aboutUs',
                  element: (
                    <RouteGuard>
                      <AppAboutUs />
                    </RouteGuard>
                  )
                }
              ]
            },
            {
              path: 'latestMatches',
              children: [
                {
                  path: 'latestMatches',
                  element: (
                    <RouteGuard>
                      <AppLatestMatches />
                    </RouteGuard>
                  )
                }
              ]
            },
            {
              path: 'appFeedback',
              children: [
                {
                  path: 'appFeedback',
                  element: (
                    <RouteGuard>
                      <AppFeedback />
                    </RouteGuard>
                  )
                }
              ]
            },
            {
              path: 'contactSupport',
              children: [
                {
                  path: 'contactSupport',
                  element: (
                    <RouteGuard>
                      <AppContactSuppport />
                    </RouteGuard>
                  )
                }
              ]
            },
            {
              path: 'advancedSearch',
              children: [
                {
                  path: 'advancedSearch',
                  element: (
                    <RouteGuard>
                      <AppAdvancedSearch />
                    </RouteGuard>
                  )
                }
              ]
            },
            {
              path: 'subscriptionPlan',
              children: [
                {
                  path: 'subscriptionPlan',
                  element: (
                    <RouteGuard>
                      <AppSubscriptionPlan />
                    </RouteGuard>
                  )
                }
              ]
            },
            {
              path: 'preferencesEdit',
              children: [
                {
                  path: 'preferencesEdit',
                  element: (
                    <RouteGuard>
                      <EditAdjustPreference />
                    </RouteGuard>
                  )
                }
              ]
            },
            {
              path: 'editProfile',
              children: [
                {
                  path: 'editProfile',
                  element: (
                    <RouteGuard>
                      <AppEditProfile />
                    </RouteGuard>
                  ),
                  children: [
                    {
                      path: 'personalDetailsEdit',
                      element: (
                        <RouteGuard>
                          <AppPersonalDetailsEdit />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'preferencesEdit',
                      element: (
                        <RouteGuard>
                          <EditAdjustPreference />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'editPhotos',
                      element: (
                        <RouteGuard>
                          <AppEditPhotos />
                        </RouteGuard>
                      )
                    }
                  ]
                }
              ]
            },
            {
              path: 'profiles',
              children: [
                {
                  path: 'account',
                  element: (
                    <RouteGuard>
                      <AccountProfile />
                    </RouteGuard>
                  ),
                  children: [
                    {
                      path: 'basic',
                      element: (
                        <RouteGuard>
                          <AccountTabProfile />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'personal',
                      element: (
                        <RouteGuard>
                          <AccountTabPersonal />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'my-account',
                      element: (
                        <RouteGuard>
                          <AccountTabAccount />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'password',
                      element: (
                        <RouteGuard>
                          <AccountTabPassword />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'role',
                      element: (
                        <RouteGuard>
                          <AccountTabRole />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'settings',
                      element: (
                        <RouteGuard>
                          <AccountTabSettings />
                        </RouteGuard>
                      )
                    }
                  ]
                },
                {
                  path: 'user',
                  element: (
                    <RouteGuard>
                      <UserProfile />
                    </RouteGuard>
                  ),
                  children: [
                    {
                      path: 'personal',
                      element: (
                        <RouteGuard>
                          <UserTabPersonal />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'payment',
                      element: (
                        <RouteGuard>
                          <UserTabPayment />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'password',
                      element: (
                        <RouteGuard>
                          <UserTabPassword />
                        </RouteGuard>
                      )
                    },
                    {
                      path: 'settings',
                      element: (
                        <RouteGuard>
                          <UserTabSettings />
                        </RouteGuard>
                      )
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/maintenance',
      element: <PagesLayout />,
      children: [
        {
          path: '404',
          element: <MaintenanceError />
        },
        {
          path: '500',
          element: <MaintenanceError500 />
        },
        {
          path: 'under-construction',
          element: <MaintenanceUnderConstruction />
        },
        {
          path: 'under-construction2',
          element: <MaintenanceUnderConstruction2 />
        },
        {
          path: 'coming-soon',
          element: <MaintenanceComingSoon />
        },
        {
          path: 'coming-soon2',
          element: (
            <RouteGuard>
              <MaintenanceComingSoon2 />
            </RouteGuard>
          )
        }
      ]
    },
    {
      path: '/auth',
      element: <PagesLayout />,
      children: [
        {
          path: 'login',
          element: <AuthLogin />
        },
        {
          path: 'register',
          element: <AuthRegister />
        },
        {
          path: 'forgot-password',
          element: <AuthForgotPassword />
        },
        {
          path: 'reset-password',
          element: <AuthResetPassword />
        },
        {
          path: 'check-mail',
          element: <AuthCheckMail />
        },
        {
          path: 'code-verification',
          element: <AuthCodeVerification />
        },
        {
          path: 'login2',
          element: <AuthLogin2 />
        },
        {
          path: 'register2',
          element: <AuthRegister2 />
        },
        {
          path: 'forgot-password2',
          element: <AuthForgotPassword2 />
        },
        {
          path: 'reset-password2',
          element: <AuthResetPassword2 />
        },
        {
          path: 'check-mail2',
          element: <AuthCheckMail2 />
        },
        {
          path: 'code-verification2',
          element: <AuthCodeVerification2 />
        },
        {
          path: 'login3',
          element: <AuthLogin3 />
        }
      ]
    },
    { path: '*', element: <MaintenanceError /> }
  ]
};

export default MainRoutes;
