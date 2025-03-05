import React, { useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import TabStep1 from 'sections/apps/personalDetails/TabStep1';
import TabStep2 from 'sections/apps/personalDetails/TabStep2';
import TabStep3 from 'sections/apps/personalDetails/TabStep3';
import TabStep4 from 'sections/apps/personalDetails/TabStep4';
import TabStep5 from 'sections/apps/personalDetails/TabStep5';
import TabStep6 from 'sections/apps/personalDetails/TabStep6';
import TabStep7 from 'sections/apps/personalDetails/TabStep7';
import loginBG from 'assets/images/login/loginBG.jpeg';
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

const PersonalDetails: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start',
        backgroundImage: `url(${loginBG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        p: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2
        }}
      >
        <Typography variant="h5" gutterBottom>
          Personal Details
        </Typography>

        <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto">
          <Tab label="Step 1" />
          <Tab label="Step 2" />
          <Tab label="Step 3" />
          <Tab label="Step 4" />
          <Tab label="Step 5" />
          <Tab label="Step 6" />
          <Tab label="Step 7" />
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <TabStep1 />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <TabStep2 />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <TabStep3 />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <TabStep4 />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <TabStep5 />
        </TabPanel>
        <TabPanel value={tabIndex} index={5}>
          <TabStep6 />
        </TabPanel>
        <TabPanel value={tabIndex} index={6}>
          <TabStep7 />
        </TabPanel>
      </Paper>
    </Box>
  );
};

export default PersonalDetails;
