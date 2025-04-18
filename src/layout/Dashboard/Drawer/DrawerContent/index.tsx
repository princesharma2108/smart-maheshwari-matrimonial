// material-ui
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

// project-imports
import NavUser from './NavUser';
import Navigation from './Navigation';
import SimpleBar from 'components/third-party/SimpleBar';
import { useGetMenuMaster } from 'api/menu';
import { useEffect, useState } from 'react';
import { getUserDetails } from 'apiServices/data';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
interface ResponseData {
  status: string;
  message: string;
  count: number;
  data: any;
}
interface ErrorData {
  response: any;
}
// ==============================|| DRAWER CONTENT ||============================== //

export default function DrawerContent() {
  const theme = useTheme();
  const matchDownMD = useMediaQuery(theme.breakpoints.down('lg'));
  const [userName, setUserName] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const { menuMaster } = useGetMenuMaster();
  const drawerOpen = menuMaster.isDashboardDrawerOpened;
  const getUserDetailsAPI = async () => {
    //setIsLoading(true);
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserDetails(userId); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      setUserName(responseData.data.profile.firstName);
      setProfileUrl(responseData.data.profileUrl);
      localStorage.setItem('userName', responseData.data.profile.firstName);
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
    <>
      <SimpleBar sx={{ '& .simplebar-content': { display: 'flex', flexDirection: 'column' } }}>
        <Navigation />
        {/* {drawerOpen && !matchDownMD && <NavCard />} */}
      </SimpleBar>
      <NavUser userName={userName} profileUrl={profileUrl} />
    </>
  );
}
