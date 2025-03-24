import { useState, SyntheticEvent, useEffect, useRef, useReducer } from 'react';

declare global {
  interface Window {
    phoneEmailListener: ((userObj: { user_json_url: string; otp: string }) => void) | null;
  }
}
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { preload } from 'swr';

// material-ui
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Stack from '@mui/material/Stack';
import Link from '@mui/material/Link';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControlLabel from '@mui/material/FormControlLabel';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { fetcher } from 'utils/axios';
import 'assets/styles/styles.scss';
// assets
import { Eye, EyeSlash } from 'iconsax-react';
import { Box } from '@mui/material';
// reducer - state management
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import { AuthProps, JWTContextType } from 'types/auth';
import { loginUser } from 'apiServices/authentication';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
//import axios from 'utils/axios';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { KeyedObject } from 'types/root';
interface ErrorData {
  response: any;
}
interface ResponseData {
  created: false;
  expiresMilliseconds: number;
  matrimonialId: string;
  message: string;
  status: string;
  token: string;
  userId: string;
  username: string;
}
// ============================|| JWT - LOGIN ||============================ //

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};

export default function AuthLogin({ forgot }: { forgot?: string }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const [checked, setChecked] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, login } = useAuth();
  const scriptedRef = useScriptRef();
  const [showPassword, setShowPassword] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: SyntheticEvent) => {
    event.preventDefault();
  };
  useEffect(() => {
    if (!buttonRef.current) return;

    // Load the script only if not already included
    if (!document.querySelector('script[src="https://www.phone.email/sign_in_button_v1.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://www.phone.email/sign_in_button_v1.js';
      script.async = true;
      document.body.appendChild(script);
    }

    // Define listener to capture OTP and user JSON URL
    window.phoneEmailListener = async (userObj: { user_json_url: string; otp: string }) => {
      console.log('userObj', userObj);

      try {
        const response = await fetch(userObj.user_json_url);
        const userData = await response.json();

        if (userData && userData.user_phone_number) {
          setPhoneNumber(userData.user_phone_number);
        } else {
          console.warn('Phone number not found in user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    return () => {
      window.phoneEmailListener = null; // Cleanup
    };
  }, []);

  console.log('phoneNumber', phoneNumber);
  useEffect(() => {
    if (phoneNumber) {
      loginUserAPI(phoneNumber);
    }
  }, [phoneNumber]);

  const loginUserAPI = async (phoneNumber: string) => {
    console.log('inLoginUserAPI');
    const loginData = {
      user: phoneNumber,
      password: '12345'
    };
    const registerData = {
      phoneNumber: phoneNumber,
      emailAddress: null,
      googleToken: null,
      appVersion: '1.0.4'
    };
    try {
      await login(registerData);
      // const responseData = response.data as ResponseData;
      // const { token, matrimonialId, username, userId, message } = response.data;
      // localStorage.setItem('userData', JSON.stringify(response.data));
      // localStorage.setItem('token', token);
      // localStorage.setItem('userId', userId);
      // localStorage.setItem('matrimonialId', matrimonialId);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      openSnackbar({
        open: true,
        message: 'Login Successfully',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      window.location.href = '/upload-biodata';
      //navigate('/widget/statistics');
    } catch (error) {
      console.error('Error fetching customers:', error);
      const errorData = error as ErrorData;
      openSnackbar({
        open: true,
        message: errorData.response.data.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    }
  };
  return (
    <>
      {/* <Formik
        initialValues={{
          email: 'info@phoenixcoded.co',
          password: '123456',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
          password: Yup.string().max(255).required('Password is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            await login(values.email, values.password);
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              //preload('api/menu/dashboard', fetcher); // load menu on login success
              //preload('/dashboard/dashboard', fetcher);
              // navigate('/dashboard/default');
              navigate('/upload-biodata');
            }
          } catch (err: any) {
            console.error(err);
            if (scriptedRef.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3} justifyContent={'center'}>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">User</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="email"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setUser(e.target.value); // Update email state
                    }}
                    placeholder="Enter email address"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                    className="inputFieldLogin"
                  />
                </Stack>
                {touched.email && errors.email && (
                  <FormHelperText error id="standard-weight-helper-text-email-login">
                    {errors.email}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    id="-password-login"
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={(e) => {
                      handleChange(e);
                      setPassword(e.target.value); // Update password state
                    }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <Eye /> : <EyeSlash />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                    className="inputFieldLogin"
                  />
                </Stack>
                {touched.password && errors.password && (
                  <FormHelperText error id="standard-weight-helper-text-password-login">
                    {errors.password}
                  </FormHelperText>
                )}
              </Grid>
              <Grid item xs={12} sx={{ mt: -1 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={checked}
                        onChange={(event) => setChecked(event.target.checked)}
                        name="checked"
                        //color="primary"
                        size="small"
                        className="inputFieldCheckbox"
                      />
                    }
                    label={<Typography variant="h6">Remember Me</Typography>}
                  />

                  <Link variant="h6" component={RouterLink} to={isLoggedIn && forgot ? forgot : '/forgot-password'} color="text.primary">
                    Forgot Password?
                  </Link>
                </Stack>
              </Grid>
              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    className="buttonStyle"
                  >
                    Login
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik> */}

      {/* Phone Verification Button */}
      <Grid container spacing={3} justifyContent={'center'}>
        <div style={{ textAlign: 'center', marginTop: '0px' }}>
          <div ref={buttonRef} className="pe_signin_button" data-client-id="13139718047550239662" style={{ width: '100%' }}></div>
        </div>
      </Grid>
    </>
  );
}
