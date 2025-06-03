import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode } from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';

// project import
import Loader from 'components/Loader';
//import axios from 'utils/axios';
import axios from 'axios';
import { KeyedObject } from 'types/root';
import { AuthProps, JWTContextType } from 'types/auth';
import { apiUrl } from 'apiServices/apiUrl';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
const chance = new Chance();
interface ErrorData {
  response: any;
}
// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

const verifyToken: (st: string) => boolean = (serviceToken) => {
  if (!serviceToken) {
    return false;
  }
  const decoded: KeyedObject = jwtDecode(serviceToken);
  /**
   * Property 'exp' does not exist on type '<T = unknown>(token: string, options?: JwtDecodeOptions | undefined) => T'.
   */
  return decoded.exp > Date.now() / 1000;
};

const setSession = (serviceToken?: string | null) => {
  if (serviceToken) {
    localStorage.setItem('serviceToken', serviceToken);
    axios.defaults.headers.common.Authorization = `Bearer ${serviceToken}`;
  } else {
    localStorage.removeItem('serviceToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //

const JWTContext = createContext<JWTContextType | null>(null);

export const JWTProvider = ({ children }: { children: React.ReactElement }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const init = async () => {
      try {
        const serviceToken = window.localStorage.getItem('serviceToken');
        if (serviceToken && verifyToken(serviceToken)) {
          setSession(serviceToken);
          const response = await axios.get('/api/account/me');
          const { user } = response.data;
          dispatch({
            type: LOGIN,
            payload: {
              isLoggedIn: true,
              user
            }
          });
        } else {
          dispatch({
            type: LOGOUT
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: LOGOUT
        });
      }
    };

    init();
  }, []);

  // const login = async (email?: string, password?: string, registerData?: any) => {
  const login = async (registerData: any) => {
    try {
      const response = await axios.post(`${apiUrl}/register`, registerData);
      const { token, matrimonialId, username, userId, message, status } = response.data;

      console.log('LoginResponse', response.data);
      console.log('Loginstatus', status);

      if (status === 'success') {
        localStorage.setItem('userData', JSON.stringify(response.data));
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('matrimonialId', matrimonialId);
        setSession(token);
        dispatch({
          type: LOGIN,
          payload: {
            isLoggedIn: true
          }
        });
        openSnackbar({
          open: true,
          message: 'Logged in successfully!',
          variant: 'alert',
          alert: { color: 'success' }
        } as SnackbarProps);
      } else {
        openSnackbar({
          open: true,
          message: message,
          variant: 'alert',
          alert: { color: 'error' }
        } as SnackbarProps);
      }
    } catch (error: any) {
      console.error('Login error:', error);

      const errorMessage = error?.response?.data?.message || error?.message || 'Something went wrong during login. Please try again.';

      openSnackbar({
        open: true,
        message: errorMessage,
        variant: 'alert',
        alert: { color: 'error' }
      } as SnackbarProps);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    // todo: this flow need to be recode as it not verified
    const id = chance.bb_pin();
    const response = await axios.post('/api/account/register', {
      id,
      email,
      password,
      firstName,
      lastName
    });
    let users = response.data;

    if (window.localStorage.getItem('users') !== undefined && window.localStorage.getItem('users') !== null) {
      const localUsers = window.localStorage.getItem('users');
      users = [
        ...JSON.parse(localUsers!),
        {
          id,
          email,
          password,
          name: `${firstName} ${lastName}`
        }
      ];
    }

    window.localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setSession(null);
    localStorage.clear(); // Clears everything from localStorage
    // localStorage.removeItem('userData');
    // localStorage.removeItem('token');
    // localStorage.removeItem('userId');
    // localStorage.removeItem('matrimonialId');
    dispatch({ type: LOGOUT });
  };

  const resetPassword = async (email: string) => {
    console.log('email - ', email);
  };

  const updateProfile = () => {};

  if (state.isInitialized !== undefined && !state.isInitialized) {
    return <Loader />;
  }

  return <JWTContext.Provider value={{ ...state, login, logout, register, resetPassword, updateProfile }}>{children}</JWTContext.Provider>;
};

export default JWTContext;
