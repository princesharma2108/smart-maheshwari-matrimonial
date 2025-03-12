// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import BasicSearchTab from 'sections/apps/advabcedSearch/basicSearchTab';
import AdvancedSearchTab from 'sections/apps/advabcedSearch/advancedSearchTab';
import MainCard from 'components/MainCard';

// ===========================|| WIDGET - STATISTICS ||=========================== //
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

export default function AdvancedSearch() {
  const theme = useTheme();
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };
  return (
    <>
      <Grid container spacing={3}>
        <MainCard>
          <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="activeTabStyle">
            {['Basic Search', 'Advanced Search'].map((label, index) => (
              <Tab key={index} label={label} className="tabStyle" />
            ))}
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <BasicSearchTab />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <AdvancedSearchTab />
          </TabPanel>
        </MainCard>
      </Grid>
    </>
  );
}
