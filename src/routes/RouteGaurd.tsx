import { Navigate, useLocation, useNavigationType } from 'react-router-dom';
import { useEffect } from 'react';

const RouteGuard = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigationType = useNavigationType(); // "PUSH", "POP", or "REPLACE"

  useEffect(() => {
    console.log('🛑 RouteGuard Check');
    console.log('  - Current Path:', location.pathname);
    console.log('  - Last Allowed Route:', sessionStorage.getItem('allowedRoute'));
    console.log('  - Navigation Type:', navigationType);

    // 🚫 If trying to access "/apps" directly, redirect to "/login"
    if (location.pathname === '/apps') {
      console.warn('🚫 Access to /apps is restricted. Redirecting to /login...');
      window.location.replace('/login');
      return;
    }
    // If user navigates manually (POP), force them back
    if (navigationType === 'POP') {
      const lastRoute = sessionStorage.getItem('allowedRoute') || '/login';
      if (location.pathname !== lastRoute) {
        console.warn('🔄 User manually changed URL. Redirecting...');
        window.location.replace(lastRoute); // Force reload
      }
    } else {
      // ✅ Ensure sessionStorage is updated
      sessionStorage.setItem('allowedRoute', location.pathname);
    }
  }, [location.pathname, navigationType]);

  // 🔥 Read directly from sessionStorage instead of using useState
  const allowedRoute = sessionStorage.getItem('allowedRoute') || '/';

  return location.pathname === allowedRoute ? children : <Navigate to={allowedRoute} replace />;
};

export default RouteGuard;
