import { useRef } from 'react';
import { Outlet } from 'react-router';

// material-ui
import Grid from '@mui/material/Grid';

// project-imports
import ProfileCard from 'sections/apps/profiles/user/ProfileCard';
import ProfileTabs from 'sections/apps/profiles/user/ProfileTabs';
import ProfileDetails from 'sections/apps/editProfile/profileDetails/ProfileDetails';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from 'config';

// ==============================|| PROFILE - USER ||============================== //

export default function EditProfile() {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };
  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Profile Details', to: '/apps/profiles/account/step1' },
    { title: 'Edit Profile' }
  ];
  return (
    <>
      <Breadcrumbs custom heading={'Edit Profile'} links={breadcrumbLinks} />
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
