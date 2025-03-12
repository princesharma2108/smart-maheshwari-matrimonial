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
import LifestylePreferences from 'sections/apps/preferences/lifestylePreferences';
import PersonalPreferences from 'sections/apps/preferences/personalPreferences';
import AdditionalPreferences from 'sections/apps/preferences/additionalPreferences';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import 'assets/styles/styles.scss';
import LifestylePreferencesEdit from 'sections/apps/preferencesEdit/lifestylePreferencesEdit';
import PersonalPreferencesEdit from 'sections/apps/preferencesEdit/personalPreferencesEdit';
import AdditionalPreferencesEdit from 'sections/apps/preferencesEdit/additionalPreferencesEdit';
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

const PreferencesEdit: React.FC = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };

  return (
    // <BackgroundWrapper>
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
        Preferences
      </Typography>

      <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="activeTabStyle">
        {['Lifestyle Preferences', 'Personal Preferences', 'Additional Preferences'].map((label, index) => (
          <Tab key={index} label={label} className="tabStyle" />
        ))}
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <LifestylePreferencesEdit />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <PersonalPreferencesEdit />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <AdditionalPreferencesEdit />
      </TabPanel>
    </Paper>
    // </BackgroundWrapper>
  );
};

export default PreferencesEdit;
