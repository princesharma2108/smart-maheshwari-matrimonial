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
import TabEditStep1 from './TabEditStep1';
import TabEditStep2 from './TabEditStep2';
import TabEditStep3 from './TabEditStep3';
import TabEditStep4 from './TabEditStep4';
import TabEditStep5 from './TabEditStep5';
import TabEditStep6 from './TabEditStep6';
import TabEditStep7 from './TabEditStep7';
// ==============================|| PROFILE - ACCOUNT ||============================== //

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ padding: '16px' }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};
export default function PersonalDetailsEdit() {
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
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
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
      {/* <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} /> */}
      <MainCard border={false}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="account profile tab"
            className="activeTabStyle"
          >
            {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'].map((label, index) => (
              <Tab key={index} label={label} className="tabStyle" />
            ))}
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <TabEditStep1 />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <TabEditStep2 />
          </TabPanel>
          <TabPanel value={tabIndex} index={2}>
            <TabEditStep3 />
          </TabPanel>
          <TabPanel value={tabIndex} index={3}>
            <TabEditStep4 />
          </TabPanel>
          <TabPanel value={tabIndex} index={4}>
            <TabEditStep5 />
          </TabPanel>
          <TabPanel value={tabIndex} index={5}>
            <TabEditStep6 />
          </TabPanel>
          <TabPanel value={tabIndex} index={6}>
            <TabEditStep7 />
          </TabPanel>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
}
