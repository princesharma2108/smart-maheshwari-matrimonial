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
import EditIcon from '@mui/icons-material/Edit';

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
import { Box, MenuItem, Select } from '@mui/material';
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
import { getOTP, getUserStage } from 'apiServices/user';
import { APP_VERSION } from 'config';

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
interface ResponseStageData {
  registrationStage: number;
  message: string;
  status: string;
}
interface ResponseOTPData {
  status: string;
  message: string;
  otp: string;
}
// ============================|| JWT - LOGIN ||============================ //

// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};
type AuthLoginProps = {
  forgot?: string;
  onLoginLoadingChange: (loading: boolean) => void;
  onOTPLoadingChange: (loading: boolean) => void;
  onOTPSent: (value: boolean) => void;
};
export default function AuthLogin({ forgot, onLoginLoadingChange, onOTPLoadingChange, onOTPSent }: AuthLoginProps) {
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
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState<boolean>(false);
  const [isOTPLoading, setIsOTPLoading] = useState<boolean>(false);
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
  // useEffect(() => {
  //   if (phoneNumber) {
  //     loginUserAPI(phoneNumber);
  //   }
  // }, [phoneNumber]);
  const loginUserAPI = async (phoneNumber: string) => {
    // Clear local and session storage BEFORE proceeding
    localStorage.clear();
    sessionStorage.clear();
    const loginData = {
      user: phoneNumber,
      password: '12345'
    };
    const registerData = {
      phoneNumber: phoneNumber,
      emailAddress: '',
      googleToken: '',
      appVersion: APP_VERSION
    };
    try {
      await login(registerData);
      const storedData = localStorage.getItem('userData');
      const userData = storedData ? JSON.parse(storedData) : {};
      openSnackbar({
        open: true,
        message: 'Login Successfully',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      if (userData.created == false) {
        getUserStageAPI();
      } else {
        // ✅ Store route before navigating
        sessionStorage.setItem('allowedRoute', '/upload-biodata');
        navigate('/upload-biodata', { replace: true });
      }
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
  const getUserStageAPI = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserStage(userId);
      const responseData = response.data as ResponseStageData;
      if (responseData.status === 'success') {
        switch (responseData.registrationStage) {
          case 1:
            sessionStorage.setItem('allowedRoute', '/upload-biodata');
            navigate('/upload-biodata', { replace: true });
            break;
          case 2:
            sessionStorage.setItem('allowedRoute', '/personal-details');
            navigate('/personal-details', { replace: true });
            break;
          case 3:
            sessionStorage.setItem('allowedRoute', '/preferences');
            navigate('/preferences', { replace: true });
            break;
          case 4:
            sessionStorage.setItem('allowedRoute', '/upload-photos');
            navigate('/upload-photos', { replace: true });
            break;
          case 5:
            /*For Complete APP*/
            sessionStorage.setItem('allowedRoute', '/dashboard');
            navigate('/dashboard', { replace: true });
            /*For Coming Soon*/
            // sessionStorage.setItem('allowedRoute', '/maintenance/coming-soon2');
            // navigate('/maintenance/coming-soon2', { replace: true });
            break;
          default:
            sessionStorage.setItem('allowedRoute', '/upload-biodata');
            navigate('/upload-biodata');
            break;
        }
      } else {
        sessionStorage.setItem('allowedRoute', '/upload-biodata');
        navigate('/upload-biodata');
      }
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
      <Formik
        initialValues={{
          countryCode: '+91',
          phone: '',
          otp: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          phone: Yup.string()
            .matches(/^\d{10}$/, 'Enter a valid 10-digit phone number')
            .required('Phone number is required'),
          otp: Yup.string()
            .matches(/^\d{4,6}$/, 'Enter a valid OTP')
            .required('OTP is required')
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          onLoginLoadingChange(true);
          const registerData = {
            phoneNumber: values.phone,
            otp: values.otp,
            appVersion: APP_VERSION
          };
          try {
            await login(registerData); // Replace with your OTP verification logic
            onLoginLoadingChange(false);
            const storedData = localStorage.getItem('userData');
            const userData = storedData ? JSON.parse(storedData) : {};
            if (userData.created == false) {
              getUserStageAPI();
            } else {
              // ✅ Store route before navigating
              sessionStorage.setItem('allowedRoute', '/upload-biodata');
              navigate('/upload-biodata', { replace: true });
            }
            if (scriptedRef.current) {
              setStatus({ success: true });
              setSubmitting(false);
              // navigate('/upload-biodata'); // Or your next screen
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
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => {
          const getOTPAPI = async () => {
            onOTPLoadingChange(true);
            const otpData = {
              phoneNumber: values.phone,
              countryCode: values.countryCode
            };
            try {
              const response = await getOTP(otpData);
              const responseData = response.data as ResponseOTPData;
              onOTPLoadingChange(false);
              openSnackbar({
                open: true,
                message: responseData.message,
                variant: 'alert',
                alert: { color: 'success' }
              } as SnackbarProps);
              setIsOtpSent(true);
              onOTPSent(true);
            } catch (error) {
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
              <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={3} justifyContent="center">
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <InputLabel htmlFor="phone-input">Phone Number</InputLabel>
                        {isOtpSent && (
                          <EditIcon
                            onClick={() => {
                              setIsOtpSent(false);
                              onOTPSent(false);
                            }}
                            sx={{ color: '#f00757', cursor: 'pointer' }}
                          />
                        )}
                      </Box>

                      <OutlinedInput
                        id="phone-input"
                        type="tel"
                        value={values.phone}
                        name="phone"
                        onBlur={handleBlur}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          const isValid = /^[0-9\b]*$/.test(newValue); // allow empty & digits

                          if (isValid && newValue.length <= 10) {
                            handleChange(e);
                          }
                        }}
                        placeholder="Enter your phone number"
                        fullWidth
                        error={Boolean(touched.phone && errors.phone)}
                        className="inputFieldLogin"
                        inputProps={{
                          readOnly: isOtpSent && true // ✅ This makes the field read-only
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <Select
                              value={values.countryCode}
                              name="countryCode"
                              onChange={(e) => {
                                handleChange(e);
                                // setCountryCode(e.target.value); // Optional
                              }}
                              variant="standard"
                              disableUnderline
                              sx={{ minWidth: 60, fontWeight: 500 }}
                            >
                              <MenuItem value="+91">+91</MenuItem>
                              <MenuItem value="+1">+1</MenuItem>
                              <MenuItem value="+44">+44</MenuItem>
                              <MenuItem value="+61">+61</MenuItem>
                            </Select>
                          </InputAdornment>
                        }
                      />
                    </Stack>
                    {touched.phone && errors.phone && (
                      <FormHelperText error id="helper-text-phone">
                        {errors.phone}
                      </FormHelperText>
                    )}
                  </Grid>
                  {isOtpSent && (
                    <Grid item xs={12}>
                      <Stack spacing={1}>
                        <InputLabel htmlFor="otp">OTP</InputLabel>
                        <Stack direction="row" spacing={1} justifyContent="center">
                          {[0, 1, 2, 3].map((index) => (
                            <OutlinedInput
                              key={index}
                              inputProps={{
                                maxLength: 1,
                                style: { textAlign: 'center', fontSize: 24 },
                                autoComplete: 'one-time-code' // or use 'off' if you want to fully disable autofill
                              }}
                              type="text"
                              value={values.otp[index] || ''}
                              className="inputFieldLogin"
                              onChange={(e) => {
                                const val = e.target.value.replace(/\D/, '');
                                const otpArr = values.otp.split('');
                                otpArr[index] = val;
                                const newOtp = otpArr.join('');
                                handleChange({
                                  target: { name: 'otp', value: newOtp }
                                });

                                // Auto move to next input
                                if (val && e.target.nextSibling) {
                                  const nextInput = e.target.parentNode?.parentNode?.querySelector(
                                    `input[name="otp${index + 1}"]`
                                  ) as HTMLInputElement;
                                  if (nextInput) nextInput.focus();
                                }
                              }}
                              onKeyDown={(e) => {
                                if (e.key === 'Backspace' && !values.otp[index] && index > 0) {
                                  const prevInput = e.currentTarget.parentNode?.parentNode?.querySelector(
                                    `input[name="otp${index - 1}"]`
                                  ) as HTMLInputElement;
                                  if (prevInput) prevInput.focus();
                                }
                              }}
                              name={`otp${index}`}
                              sx={{ width: 60 }}
                              error={Boolean(touched.otp && errors.otp)}
                            />
                          ))}
                        </Stack>
                        <input type="hidden" name="otp" value={values.otp} />
                      </Stack>
                      {touched.otp && errors.otp && (
                        <FormHelperText error id="helper-text-otp">
                          {errors.otp}
                        </FormHelperText>
                      )}
                    </Grid>
                  )}
                  {errors.submit && (
                    <Grid item xs={12}>
                      <FormHelperText error>{errors.submit}</FormHelperText>
                    </Grid>
                  )}

                  <Grid item xs={12}>
                    {!isOtpSent && (
                      <Typography variant="body1" sx={{ mb: 1 }}>
                        Login is allowed only with your WhatsApp number.
                      </Typography>
                    )}
                    {!isOtpSent ? (
                      <AnimateButton>
                        <Button
                          fullWidth
                          variant="contained"
                          color="primary"
                          className="buttonStyle"
                          onClick={() => {
                            if (/^\d{10}$/.test(values.phone)) {
                              getOTPAPI();
                            }
                          }}
                          disabled={isSubmitting || values.phone.length < 10}
                        >
                          Send OTP
                        </Button>
                      </AnimateButton>
                    ) : (
                      <AnimateButton>
                        <Button
                          fullWidth
                          variant="contained"
                          type="submit"
                          color="secondary"
                          className="buttonStyle"
                          disabled={isSubmitting || values.otp.length < 4}
                        >
                          Login
                        </Button>
                      </AnimateButton>
                    )}
                  </Grid>
                  {/* <Grid item xs={12}>
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
                    Verify OTP
                  </Button>
                </AnimateButton>
              </Grid> */}
                </Grid>
              </form>
            </>
          );
        }}
      </Formik>

      {/* Phone Verification Button */}
      {/* <Grid container spacing={3} justifyContent={'center'}>
        <div style={{ textAlign: 'center', marginTop: '0px' }}>
          <div ref={buttonRef} className="pe_signin_button" data-client-id="13139718047550239662" style={{ width: '100%' }}></div>
        </div>
      </Grid> */}
    </>
  );
}
