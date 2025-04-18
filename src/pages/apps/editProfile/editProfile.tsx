import { useEffect, useRef, useState } from 'react';
import { Outlet } from 'react-router';
import Grid from '@mui/material/Grid';
import ProfileDetails from 'sections/apps/editProfile/profileDetails/ProfileDetails';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from 'config';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { getUserDetails } from 'apiServices/data';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import { Box, Stack, Typography } from '@mui/material';
interface ResponseData {
  status: string;
  message: string;
  data: any;
}
interface ErrorData {
  response: any;
}
// ==============================|| PROFILE - USER ||============================== //

export default function EditProfile() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [photosUrl, setPhotosUrl] = useState([]);
  const [prefernceDetails, setPrefernceDetails] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader State
  const focusInput = () => {
    inputRef.current?.focus();
  };
  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Edit Profile', to: '/apps/profiles/account/step1' },
    { title: 'Edit Profile' }
  ];
  const getUserDetailsAPI = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserDetails(userId); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      setPhotosUrl(responseData.data.photos);
      localStorage.setItem('photosUrl', JSON.stringify(responseData.data.photos));
      setProfileDetails(responseData.data.profile);
      localStorage.setItem('profileDetails', JSON.stringify(responseData.data.profile));
      setPrefernceDetails(responseData.data.preferences);
      localStorage.setItem('preferenceDetails', JSON.stringify(responseData.data.preferences));
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
    } finally {
      setIsLoading(false); // Stop Loader
    }
  };
  useEffect(() => {
    // getUserDetailsAPI();
  }, []);
  return (
    <>
      <Breadcrumbs custom heading={'Edit Profile'} links={breadcrumbLinks} />
      {isLoading && ( // Show Loader When API is in Progress
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            height: '100vh',
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999
          }}
        >
          {/* <CircularProgress size={60} sx={{ color: '#f00757' }} /> */}
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#f00757"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <Stack spacing={2} flexDirection={'row'} alignItems={'center'}>
            <Typography variant="h3" color={'#f00757'}>
              Fetching User Details
            </Typography>
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#f00757"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ marginBottom: '5px' }}
              wrapperClass=""
            />
          </Stack>
        </Box>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <ProfileDetails focusInput={focusInput} />
        </Grid>
        <Grid item xs={12} md={9}>
          <Outlet context={inputRef} />
        </Grid>
      </Grid>
    </>
  );
}
