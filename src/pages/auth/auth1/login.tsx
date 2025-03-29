import { Link, useNavigate } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import Logo from 'components/logo';
import useAuth from 'hooks/useAuth';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthDivider from 'sections/auth/AuthDivider';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// assets
import imgFacebook from 'assets/images/auth/facebook.svg';
import imgTwitter from 'assets/images/auth/twitter.svg';
import imgGoogle from 'assets/images/auth/google.svg';
import { Box } from '@mui/material';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'config/firebase';
import { useEffect, useReducer, useState } from 'react';
import { LOGIN, LOGOUT } from 'contexts/auth-reducer/actions';
import authReducer from 'contexts/auth-reducer/auth';
import { AuthProps, JWTContextType } from 'types/auth';
import { loginUser } from 'apiServices/authentication';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { APP_VERSION } from 'config';
import { getUserStage } from 'apiServices/user';
// ================================|| LOGIN ||================================ //
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
// constant
const initialState: AuthProps = {
  isLoggedIn: false,
  isInitialized: false,
  user: null
};
interface UserDetails {
  email: string;
  firstName: string;
  photo: string;
  lastName: string;
}
interface ResponseStageData {
  registrationStage: number;
  message: string;
  status: string;
}
export default function Login() {
  const { isLoggedIn, login } = useAuth();
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log(result);
      const user = result.user;
      setUserId(user.uid);
      setUserEmail(user.email);
      if (result.user) {
        await setDoc(doc(db, 'Users', user.uid), {
          email: user.email,
          firstName: user.displayName,
          photo: user.photoURL,
          lastName: ''
        });
      }
    });
  }
  console.log('userDetailsLogin', userDetails);
  const loginUserAPI = async (userEmail: string, userId: string) => {
    console.log('inLoginUserAPI');
    const loginData = {
      user: userEmail,
      password: '12345'
    };
    const registerData = {
      phoneNumber: '',
      emailAddress: userEmail,
      googleToken: userId,
      appVersion: APP_VERSION
    };
    try {
      await login(registerData);
      //const responseData = response.data as ResponseData;
      // const { token, matrimonialId, username, userId, message } = responseData;
      // localStorage.setItem('userData', JSON.stringify(responseData));
      // localStorage.setItem('token', token);
      // localStorage.setItem('userId', userId);
      // localStorage.setItem('matrimonialId', matrimonialId);
      const storedData = localStorage.getItem('userData');
      const userData = storedData ? JSON.parse(storedData) : {};
      localStorage.setItem('userCreated', userData.created);
      console.log('userData', userData);
      openSnackbar({
        open: true,
        message: 'User logged in successfully',
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      // window.location.href = '/upload-biodata';
      if (userData.created == false) {
        getUserStageAPI();
      } else {
        window.location.href = '/upload-biodata';
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
            navigate('/upload-biodata');
            break;
          case 2:
            navigate('/personal-details');
            break;
          case 3:
            navigate('/preferences');
            break;
          case 4:
            navigate('/upload-photos');
            break;
          case 5:
            navigate('/widget/statistics');
            break;
          default:
            console.log('Unknown registration stage:', responseData.registrationStage);
            navigate('/upload-biodata');
            break;
        }
      } else {
        console.log("API call unsuccessful or status is not 'success'");
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
  useEffect(() => {
    if (userEmail && userId) {
      loginUserAPI(userEmail, userId);
    }
  }, [userEmail, userId]);
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center', pt: '0px !important' }}>
          <Logo />
        </Grid>
        <Grid item xs={12} sx={{ pt: '20px !important' }}>
          <AuthLogin forgot="/auth/forgot-password" />
        </Grid>
        <Grid
          item
          xs={12}
          sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', pt: '10px !important', pb: '10px !important' }}
        >
          <Typography variant="body1">OR</Typography>
        </Grid>
        <Grid item xs={12} sx={{ pt: '14px !important' }}>
          <Grid container spacing={1}>
            {/* <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgFacebook} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Facebook
              </AuthSocButton>
            </Grid> */}
            <Grid item xs={12}>
              <AuthSocButton onClick={googleLogin}>
                <img src={imgGoogle} alt="Google" style={{ margin: '0 10px' }} /> Sign In with Google
              </AuthSocButton>
            </Grid>
          </Grid>
        </Grid>
        {/* <Grid item xs={12} sx={{ pt: '14px !important' }}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={0.5} sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="body1" sx={{ textDecoration: 'none', color: '#40444C' }}>
              Don&apos;t have an account?
            </Typography>
            <Typography
              component={Link}
              to={isLoggedIn ? '/auth/register' : '/register'}
              variant="body1"
              sx={{ textDecoration: 'none', color: '#F00757' }}
            >
              Sign Up
            </Typography>
            <Typography variant="body1" sx={{ textDecoration: 'none', color: '#40444C' }}>
              here
            </Typography>
          </Stack>
        </Grid> */}
      </Grid>
    </AuthWrapper>
  );
}
