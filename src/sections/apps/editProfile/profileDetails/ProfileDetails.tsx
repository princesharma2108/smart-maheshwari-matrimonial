import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { Link } from 'react-router-dom';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

// project-imports
import ProfileTab from './ProfileTab';
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import MoreIcon from 'components/@extended/MoreIcon';
import IconButton from 'components/@extended/IconButton';

import { ThemeMode, facebookColor, linkedInColor } from 'config';
import defaultImages from 'assets/images/users/default.png';

// assets
import { Apple, Camera, Facebook, Google } from 'iconsax-react';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { getUserDetails } from 'apiServices/data';
interface ResponseData {
  status: string;
  message: string;
  data: any;
}
interface ErrorData {
  response: any;
}
interface Props {
  focusInput: () => void;
}

// ==============================|| USER PROFILE - TABS ||============================== //

export default function ProfileDetails({ focusInput }: Props) {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [avatar, setAvatar] = useState<string | undefined>(defaultImages);
  const [userName, setUsername] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [photosUrl, setPhotosUrl] = useState([]);
  const [prefernceDetails, setPrefernceDetails] = useState({});
  const [profileDetails, setProfileDetails] = useState({});
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  const getUserDetailsAPI = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserDetails(userId); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      console.log('responseData', responseData);
      setUsername(responseData.data.username);
      setPhotosUrl(responseData.data.photos);
      localStorage.setItem('photosUrl', JSON.stringify(responseData.data.photos));
      setProfileUrl(responseData.data.profileUrl);
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
    }
  };
  useEffect(() => {
    getUserDetailsAPI();
  }, []);
  return (
    <MainCard>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Stack spacing={2.5} alignItems="center">
            <FormLabel
              htmlFor="change-avtar"
              sx={{
                position: 'relative',
                borderRadius: '50%',
                overflow: 'hidden',
                '&:hover .MuiBox-root': { opacity: 1 },
                cursor: 'pointer'
              }}
            >
              <Avatar alt="Avatar 1" src={profileUrl} sx={{ width: 124, height: 124, border: '1px dashed #f00757' }} />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                  width: '100%',
                  height: '100%',
                  opacity: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Stack spacing={0.5} alignItems="center">
                  <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '2rem' }} />
                  <Typography sx={{ color: 'secondary.lighter' }}>Upload</Typography>
                </Stack>
              </Box>
            </FormLabel>
            <TextField
              type="file"
              id="change-avtar"
              placeholder="Outlined"
              variant="outlined"
              sx={{ display: 'none' }}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
            />
            <Stack spacing={0.5} alignItems="center">
              <Typography variant="h5">{userName}</Typography>
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <ProfileTab />
        </Grid>
      </Grid>
    </MainCard>
  );
}
