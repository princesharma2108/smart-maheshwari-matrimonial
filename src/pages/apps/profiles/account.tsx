import { useEffect, useState, SyntheticEvent } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project-imports
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import { APP_DEFAULT_PATH } from 'config';

// assets
import { DocumentText, Lock, Profile, Profile2User, Setting3, TableDocument } from 'iconsax-react';

// ==============================|| PROFILE - ACCOUNT ||============================== //

export default function AccountProfile() {
  const { pathname } = useLocation();

  let selectedTab = 0;
  let breadcrumbTitle = '';
  let breadcrumbHeading = '';
  switch (pathname) {
    case '/apps/profiles/account/step2':
      breadcrumbTitle = "Let's know you better";
      breadcrumbHeading = "Let's know you better";
      selectedTab = 1;
      break;
    case '/apps/profiles/account/step3':
      breadcrumbTitle = 'Lifestyle';
      breadcrumbHeading = 'Lifestyle';
      selectedTab = 2;
      break;
    case '/apps/profiles/account/step4':
      breadcrumbTitle = 'Family Background';
      breadcrumbHeading = 'Family Background';
      selectedTab = 3;
      break;
    case '/apps/profiles/account/step5':
      breadcrumbTitle = 'Education and Occupation';
      breadcrumbHeading = 'Education and Occupation';
      selectedTab = 4;
      break;
    case '/apps/profiles/account/step6':
      breadcrumbTitle = 'Spiritual Attributes';
      breadcrumbHeading = 'Spiritual Attributes';
      selectedTab = 5;
      break;
    case '/apps/profiles/account/step7':
      breadcrumbTitle = 'Contact Information';
      breadcrumbHeading = 'Contact Information';
      selectedTab = 5;
      break;
    case '/apps/profiles/account/step1':
    default:
      breadcrumbTitle = "Let's know you better";
      breadcrumbHeading = "Let's know you better";
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Profile Details', to: '/apps/profiles/account/step1' },
    { title: breadcrumbTitle }
  ];
  if (selectedTab === 0) {
    breadcrumbLinks = [
      { title: 'Home', to: APP_DEFAULT_PATH },
      { title: 'Profile Details', to: '/apps/profiles/account/step1' },
      { title: "Let's know you better" }
    ];
  }

  useEffect(() => {
    if (pathname === '/apps/profiles/account/step1') {
      setValue(0);
    }
  }, [pathname]);

  return (
    <>
      <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} />
      <MainCard border={false}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Step 1" component={Link} to="/apps/profiles/account/step1" icon={<DocumentText />} iconPosition="start" />
            <Tab label="Step 2" component={Link} to="/apps/profiles/account/step2" icon={<DocumentText />} iconPosition="start" />
            <Tab label="Step 3" component={Link} to="/apps/profiles/account/step3" icon={<DocumentText />} iconPosition="start" />
            <Tab label="Step 4" component={Link} to="/apps/profiles/account/step4" icon={<DocumentText />} iconPosition="start" />
            <Tab label="Step 5" component={Link} to="/apps/profiles/account/step5" icon={<DocumentText />} iconPosition="start" />
            <Tab label="Step 6" component={Link} to="/apps/profiles/account/step6" icon={<DocumentText />} iconPosition="start" />
            <Tab label="Step 7" component={Link} to="/apps/profiles/account/step7" icon={<DocumentText />} iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
}
