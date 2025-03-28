import { Link } from 'react-router-dom';

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
import FirebaseRegister from 'sections/auth/auth-forms/AuthRegister';

// assets
import imgFacebook from 'assets/images/auth/facebook.svg';
import imgTwitter from 'assets/images/auth/twitter.svg';
import imgGoogle from 'assets/images/auth/google.svg';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { toast } from 'react-toastify';
import { setDoc, doc, getDoc } from 'firebase/firestore';
import { auth, db } from 'config/firebase';
import { useEffect, useState } from 'react';
import { registerUser } from 'apiServices/authentication';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { APP_VERSION } from 'config';
// ================================|| REGISTER ||================================ //

export default function Register() {
  const { isLoggedIn } = useAuth();
  interface UserDetails {
    email: string;
    firstName: string;
    photo: string;
    lastName: string;
  }
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

  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  function googleLogin() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(async (result) => {
      console.log('result', result);
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
  console.log('userDetailsId', userId);
  console.log('userDetailsEmail', userEmail);
  useEffect(() => {
    if (userEmail && userId) {
      registerUserAPI(userEmail, userId);
    }
  }, [userEmail, userId]);

  const registerUserAPI = async (userEmail: string, userId: string) => {
    console.log('inRegisterUserAPI');
    const registerData = {
      phoneNumber: null,
      emailAddress: userEmail,
      googleToken: userId,
      appVersion: APP_VERSION
    };
    try {
      const response = await registerUser(registerData);
      console.log('response', response);
      const responseData = response.data as ResponseData;
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      //window.location.href = '/';
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
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center', pt: '0px !important' }}>
          <Logo />
        </Grid>
        <Grid item xs={12} sx={{ pt: '20px !important' }}>
          <Stack sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography variant="h3">Sign up</Typography>
            <Typography variant="body1">
              Create an account to get started, already have an account?{' '}
              <Typography
                component={Link}
                to={isLoggedIn ? '/auth/login' : '/'}
                variant="body1"
                sx={{ textDecoration: 'none', color: '#f00757', display: 'inline' }}
              >
                Log in Here
              </Typography>
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ pt: '20px !important' }}>
          <FirebaseRegister />
        </Grid>
        <Grid item xs={12} sx={{ pt: '20px !important' }}>
          <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* <AuthDivider> */}
            <Typography variant="body1">OR</Typography>
            {/* </AuthDivider> */}
          </Grid>
          <Grid container spacing={1} sx={{ pt: '20px !important' }}>
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
        <Grid item xs={12}>
          <Typography variant="body2">By Signing Up, you agree to our Terms of Service and Privacy Policy</Typography>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
