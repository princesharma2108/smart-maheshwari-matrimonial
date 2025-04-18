// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import { useTimer } from 'react-timer-hook';

// project-imports
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';

// assets
import { Facebook, Google, Notification } from 'iconsax-react';
import coming from 'assets/images/maintenance/img-soon-2.svg';
import SMMLogo from 'assets/images/logo/SMMLogo.svg';
import splashBottomImage from 'assets/images/login/splashBottomImage.png';
import SMMLogoWeb from 'assets/images/login/SMMLogoWeb.png';
import SMMLogoWebIMG from 'assets/images/login/SMMLogoWebIMG.png';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { useEffect, useState } from 'react';
import { postUserStage } from 'apiServices/user';
import { subscribeForSite } from 'apiServices/data';
import Divider from '@mui/material/Divider';
// ==============================|| COMING SOON ||============================== //
interface ResponseData {
  status: string;
  message: string;
  count: number;
  data: any;
}
interface ResponseDataSubscribe {
  status: string;
  message: string;
}
interface ErrorData {
  response: any;
}
function TimerBox({ count, type }: { count: number; type: string }) {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <MainCard content={false} sx={{ width: { xs: 80, sm: 100 }, background: 'transparent' }}>
      <Stack direction={'column'} justifyContent="center" alignItems="center">
        <Box sx={{ py: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant={matchDownSM ? 'h4' : 'h2'}>{count}</Typography>
          <Divider sx={{ width: '100%', my: 1 }} />
          <Typography variant={'h4'}>{type}</Typography>
        </Box>
      </Stack>
    </MainCard>
  );
}

export default function ComingSoon() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 3600 * 24 * 10 - 3600 * 7.5);
  const { seconds, minutes, hours, days } = useTimer({ expiryTimestamp: time });
  const [notifyEmail, setNotifyEmail] = useState<string>('');
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState('');
  const validateEmail = (value: string) => {
    // Basic email regex pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(value);
  };
  const postUserStageAPI = async () => {
    //navigate('/upload-photos');
    const userId = localStorage.getItem('userId');
    const stageData = {
      userId: userId,
      registrationStage: 5
    };
    try {
      const response = await postUserStage(stageData);
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
  const subscribeForSiteAPI = async (notifyEmail: string) => {
    const data = { email: notifyEmail };
    try {
      const response = await subscribeForSite(data);
      const responseData = response.data as ResponseDataSubscribe;
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
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
  const handleNotifyEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNotifyEmail(value);
    // const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in|gov|edu|co|org)(\.[a-z]{2})?$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Validate only when there's something to check
    if (value && !emailRegex.test(value)) {
      setError(true);
      setHelperText('Please enter a valid email address');
    } else {
      setError(false);
      setHelperText('');
    }
  };
  // ✅ Call once on mount
  useEffect(() => {
    postUserStageAPI();
  }, []);
  useEffect(() => {
    if (notifyEmail.length != 0) {
      if (!validateEmail(notifyEmail)) {
        setError(true);
        setHelperText('Please enter a valid email address');
      } else {
        setError(false);
        setHelperText('');
      }
    }
  }, [notifyEmail]);
  return (
    <>
      <Container fixed>
        <Grid container spacing={4} alignItems="center" justifyContent="center" sx={{ minHeight: '100vh', py: 2 }}>
          <Grid item md={6}>
            <Box sx={{ height: { xs: 310, sm: 420 }, width: { xs: 360, sm: 'auto' } }}>
              <img src={SMMLogo} alt="coming soon 1" style={{ height: '100%', width: '100%' }} />
            </Box>
          </Grid>
          <Grid item md={6}>
            <Grid container spacing={3} direction="column" alignItems="center">
              <Grid item xs={12}>
                <Stack direction="row" alignItems="center" justifyContent="center" spacing={{ xs: 1, sm: 2 }}>
                  <TimerBox count={days} type={'Days'} />
                  <TimerBox count={hours} type={'Hours'} />
                  <TimerBox count={minutes} type={'Minutes'} />
                  <TimerBox count={seconds} type={'Seconds'} />
                </Stack>
              </Grid>
              <Grid item xs={12}>
                <Stack spacing={1} justifyContent="center" alignItems="center">
                  <Typography
                    align="center"
                    sx={{
                      fontSize: '64px',
                      fontWeight: 500
                    }}
                  >
                    Coming Soon
                  </Typography>
                  <Stack>
                    <Typography align="center" color="text.secondary">
                      This site is currently under development, we will let you know
                    </Typography>
                    <Typography align="center" color="text.secondary">
                      when we go live. Subscribe to get info{' '}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>
              <Grid item xs={12} sx={{ width: { xs: 380, md: 380, lg: 380 } }}>
                <Stack spacing={3} sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      placeholder="Email Address"
                      value={notifyEmail}
                      onChange={handleNotifyEmailChange}
                      //onBlur={handleBlur}
                      error={error}
                      helperText={helperText}
                      className="inputField"
                      // sx={{ border: '1px solid#8E95A2', borderRadius: '8px' }}
                    />
                    <Button
                      variant="contained"
                      sx={{ width: '50%', whiteSpace: 'nowrap' }}
                      startIcon={<Notification variant="Bold" />}
                      className="buttonStyle"
                      onClick={() => subscribeForSiteAPI(notifyEmail)}
                    >
                      Notify Me
                    </Button>
                  </Stack>
                  {/* <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
                    <IconButton shape="rounded" color="secondary">
                      <Facebook variant="Bulk" size={20} />
                    </IconButton>
                    <IconButton shape="rounded" color="secondary">
                      <Google variant="Bulk" size={20} />
                    </IconButton>
                  </Stack> */}
                </Stack>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
