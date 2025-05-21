import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// assets
import { CardCoin, Lock, Profile, Setting3 } from 'iconsax-react';
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

function getPathIndex(pathname: string) {
  let selectedTab = 0;
  switch (pathname) {
    case '/editProfile/preferencesEdit':
      selectedTab = 1;
      break;
    case '/editProfile/editPhotos':
      selectedTab = 2;
      break;
    case '/editProfile/personalDetailsEdit':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - BASIC ||============================== //

interface ProfileTabProps {
  profileDetails: any; // Replace 'any' with the actual type if known
  preferenceDetails: any; // Replace 'any' with the actual type if known
  photosUrl: any; // Replace 'any' with the actual type if known
}

export default function ProfileTab({ profileDetails, preferenceDetails, photosUrl }: ProfileTabProps) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  console.log('profileDetails', profileDetails);
  const handleListItemClick = (index: number, route: string, data: any) => {
    setSelectedIndex(index);
    navigate(route, { replace: true, state: data });
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List
      component="nav"
      sx={{
        p: 0,
        '& .MuiListItemIcon-root': {
          minWidth: 32,
          color: 'secondary.main' // Default icon color
        },
        '& .MuiListItemButton-root': {
          //color: 'primary.main', // Default text color
          '&.Mui-selected': {
            backgroundColor: '#FFE1E7', // Background color when selected
            color: '#f00757', // Text color when selected
            '& .MuiListItemIcon-root': {
              color: '#f00757' // Change icon color when selected
            },
            '& .MuiListItemText-primary': {
              color: '#f00757' // Change text color when selected
            },
            '&:hover': {
              backgroundColor: '#FFE1E7'
            }
          }
        }
      }}
    >
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => {
          sessionStorage.setItem('allowedRoute', '/editProfile/personalDetailsEdit');
          handleListItemClick(0, '/editProfile/personalDetailsEdit', profileDetails);
        }}
      >
        <ListItemIcon>
          <Profile size={18} />
        </ListItemIcon>
        <ListItemText primary="Personal Details" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 1}
        onClick={() => {
          sessionStorage.setItem('allowedRoute', '/editProfile/preferencesEdit');
          handleListItemClick(1, '/editProfile/preferencesEdit', preferenceDetails);
        }}
      >
        <ListItemIcon>
          <CardCoin size={18} />
        </ListItemIcon>
        <ListItemText primary="Adjust Preference" />
      </ListItemButton>

      <ListItemButton
        selected={selectedIndex === 2}
        onClick={() => {
          sessionStorage.setItem('allowedRoute', '/editProfile/editPhotos');
          handleListItemClick(2, '/editProfile/editPhotos', photosUrl);
        }}
      >
        <ListItemIcon>
          <Lock size={18} />
        </ListItemIcon>
        <ListItemText primary="Edit Photos" />
      </ListItemButton>
    </List>
  );
}
