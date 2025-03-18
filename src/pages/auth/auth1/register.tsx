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

// ================================|| REGISTER ||================================ //

export default function Register() {
  const { isLoggedIn } = useAuth();

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
          <Grid container spacing={1}>
            {/* <Grid item xs={12}>
              <AuthSocButton>
                <img src={imgFacebook} alt="Facebook" style={{ margin: '0 10px' }} /> Sign In with Facebook
              </AuthSocButton>
            </Grid> */}
            <Grid item xs={12}>
              <AuthSocButton>
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
