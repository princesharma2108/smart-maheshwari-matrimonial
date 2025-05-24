// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Tabs, Tab, Box, Typography, Paper, Stack, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import BasicSearchTab from 'sections/apps/advabcedSearch/basicSearchTab';
import AdvancedSearchTab from 'sections/apps/advabcedSearch/advancedSearchTab';
import MainCard from 'components/MainCard';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { getAdvancedSearchData, getGeneralData, postAdvancedSearchData } from 'apiServices/data';
import { useNavigate } from 'react-router';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import LoadingOverlay from 'components/LoaderOverlay';
// ===========================|| WIDGET - STATISTICS ||=========================== //
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface ErrorData {
  response: any;
}
interface ResponseData {
  status: string;
  message: string;
  response: any;
}
interface ResponseSearchData {
  status: string;
  message: string;
  data: any;
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
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Record<string, string> | undefined>>({});
  //Basic Search
  const [maritalStatus, setMaritalStatus] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
    const [location, setLocation] = useState('');
      //Advance Search
  const [tagCategories, setTagCategories] = useState<{ name: string; tags: string[] }[]>([]);

  //General Data
  const [ageOptions, setAgeOptions] = useState([]);
  const [heightData, setHeightData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [maritalOptionsData, setMaritalOptionsData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
const handleMinAgeChange = (value: string) => {
  setMinAge(value);

  // Auto-fill maxAge only if it's empty
  if (!maxAge) {
    setMaxAge(value);
  }
};

  const handleMinHeightChange = (value: string) => {
  setMinHeight(value);

  // Auto-fill maxHeight only if it's empty
  if (!maxHeight) {
    setMaxHeight(value);
  }
};



  const isBasicFormValid =
  maritalStatus.trim() &&
  minAge.trim() &&
  maxAge.trim() &&
  minHeight.trim() &&
  maxHeight.trim() &&
  location.trim();
  const isAdvancedFormValid = tabIndex === 1 &&
  selectedOptions &&
  Object.values(selectedOptions).some((group) => group && Object.keys(group).length > 0);


  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };
  const advancedSearchDataAPI = async () => {
    try {
      const response = await getAdvancedSearchData();
      const responseData = response.data as ResponseSearchData;
      setHeightData(responseData.data.heightOptions);
      setLocationData(responseData.data.locationOptions);
      setMaritalOptionsData(responseData.data.maritalOptions);
      setAgeOptions(responseData.data.ageOptions);
      setTagsData(responseData.data.tags);
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
  const sendAdvancedSearchDataAPI = async () => {
    setIsLoading(true);
    const matrimonialId = localStorage.getItem('matrimonialId');
    const isTagCategoriesEmpty = !tagCategories || tagCategories.length === 0;
    const searchData = {
      matrimonialId: matrimonialId,
      basicSearch: {
        maritalStatusOptions: [maritalStatus],
        ageOptions: [minAge, maxAge],
        heightOptions: [minHeight, maxHeight],
        locationOptions: [location]
      },
      advancedSearch: isTagCategoriesEmpty ? null : { tagCategories: tagCategories }
    };
    try {
      const response = await postAdvancedSearchData(searchData);
      const responseData = response.data as ResponseSearchData;
      setSearchResults(responseData.data);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      sessionStorage.setItem('allowedRoute', '/dashboard');
      navigate('/dashboard', { state: { searchResults: responseData.data }, replace: true });
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
    } finally {
      setIsLoading(false); // Stop Loader
    }
  };
  useEffect(() => {
    advancedSearchDataAPI();
  }, []);
  const handleReset = () => {
    setMaritalStatus('');
    setMinAge('');
    setMaxAge('');
    setMinHeight('');
    setMaxHeight('');
    setLocation('');
    setSelectedOptions({});
    // setTagCategories([]);
    // Optionally reset tab to default
    // setTabIndex(0);
  };
  return (
    <>
      <LoadingOverlay
        loading={isLoading}
        message={'Searching Data'}
        IconComponent={
          <BallTriangle height={100} width={100} radius={5} color="#f00757" ariaLabel="ball-triangle-loading" visible={true} />
        }
        showSubLoader={true}
      />
      <Grid container spacing={3}>
        <MainCard>
          <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="activeTabStyle">
            {['Basic Search', 'Advanced Search'].map((label, index) => (
              <Tab key={index} label={label} className="tabStyle" />
            ))}
          </Tabs>
          <TabPanel value={tabIndex} index={0}>
            <BasicSearchTab
              maritalStatus={maritalStatus}
              setMaritalStatus={setMaritalStatus}
              minAge={minAge}
              setMinAge={handleMinAgeChange}
              maxAge={maxAge}
              setMaxAge={setMaxAge}
              minHeight={minHeight}
              setMinHeight={handleMinHeightChange}
              maxHeight={maxHeight}
              setMaxHeight={setMaxHeight}
              location={location}
              setLocation={setLocation}
              ageOptions={ageOptions}
              heightData={heightData}
              locationData={locationData}
              maritalOptionsData={maritalOptionsData}
            />
          </TabPanel>
          <TabPanel value={tabIndex} index={1}>
            <AdvancedSearchTab tagsData={tagsData || []} tagCategories={tagCategories} setTagCategories={setTagCategories} 
            selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
          </TabPanel>
          {/* Buttons */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={handleReset}>
                Reset
              </Button>
              <Button
  variant="contained"
  className="buttonStyle"
  onClick={sendAdvancedSearchDataAPI}
  disabled={
  (tabIndex === 0 && !isBasicFormValid) ||
  (tabIndex === 1 && !isAdvancedFormValid)
}// ✅ disable when form is incomplete
>
  Apply Filters
</Button>

            </Stack>
          </Grid>
        </MainCard>
      </Grid>
    </>
  );
}
