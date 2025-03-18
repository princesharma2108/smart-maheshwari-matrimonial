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
import AuthLogin from 'sections/auth/auth-forms/AuthLogin';

// assets
import imgFacebook from 'assets/images/auth/facebook.svg';
import imgTwitter from 'assets/images/auth/twitter.svg';
import imgGoogle from 'assets/images/auth/google.svg';
import { Box } from '@mui/material';

// ================================|| LOGIN ||================================ //

export default function Login() {
  const { isLoggedIn } = useAuth();

  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} sx={{ textAlign: 'center', pt: '0px !important' }}>
          <Logo />
        </Grid>
        <Grid item xs={12} sx={{ pt: '20px !important' }}>
          <AuthLogin forgot="/auth/forgot-password" />
        </Grid>
        <Grid item xs={12} sx={{ pt: '14px !important' }}>
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
        <Grid item xs={12} sx={{ pt: '14px !important' }}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" spacing={0.5} sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            {/* <Typography variant="h3">Login</Typography> */}
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
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
