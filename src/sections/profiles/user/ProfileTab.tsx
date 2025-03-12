import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// material-ui
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

// assets
import { CardCoin, Lock, Profile, Setting3 } from 'iconsax-react';

function getPathIndex(pathname: string) {
  let selectedTab = 0;
  switch (pathname) {
    case 'sections/apps/profiles/account/TabAccount':
      selectedTab = 1;
      break;
    case '/apps/profiles/user/password':
      selectedTab = 2;
      break;
    case '/apps/profiles/user/personal':
    default:
      selectedTab = 0;
  }
  return selectedTab;
}

// ==============================|| USER PROFILE - BASIC ||============================== //

export default function ProfileTab() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(getPathIndex(pathname));
  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    //navigate(route);
  };

  useEffect(() => {
    setSelectedIndex(getPathIndex(pathname));
  }, [pathname]);

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32, color: 'secondary.main' } }}>
      <ListItemButton
        selected={selectedIndex === 0}
        onClick={() => {
          navigate('sections/apps/profiles/account/TabAccount');
          handleListItemClick(0);
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
          navigate('sections/apps/profiles/account/TabAccount');
          handleListItemClick(1);
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
          navigate('sections/apps/profiles/account/TabAccount');
          handleListItemClick(2);
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
