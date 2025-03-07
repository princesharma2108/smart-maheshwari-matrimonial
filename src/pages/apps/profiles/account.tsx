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
import 'assets/styles/styles.scss';
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
          <Tabs
            value={value}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="account profile tab"
            className="activeTabStyle"
          >
            {[
              { label: 'Step 1', path: '/apps/profiles/account/step1' },
              { label: 'Step 2', path: '/apps/profiles/account/step2' },
              { label: 'Step 3', path: '/apps/profiles/account/step3' },
              { label: 'Step 4', path: '/apps/profiles/account/step4' },
              { label: 'Step 5', path: '/apps/profiles/account/step5' },
              { label: 'Step 6', path: '/apps/profiles/account/step6' },
              { label: 'Step 7', path: '/apps/profiles/account/step7' }
            ].map((tab, index) => (
              <Tab
                key={index}
                label={tab.label}
                component={Link}
                to={tab.path}
                icon={<DocumentText />}
                iconPosition="start"
                className="tabStyle"
              />
            ))}
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
}
