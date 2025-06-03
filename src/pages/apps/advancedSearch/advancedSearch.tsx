// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import { Tabs, Tab, Box, Typography, Paper, Stack, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import BasicSearchTab from 'sections/apps/advancedSearch/basicSearchTab';
import AdvancedSearchTab from 'sections/apps/advancedSearch/advancedSearchTab';
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
  const [manglik, setManglik] = useState('');
  //Advance Search
  const [tagCategories, setTagCategories] = useState<{ name: string; tags: string[] }[]>([]);

  //General Data
  const [ageOptions, setAgeOptions] = useState([]);
  const [heightData, setHeightData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [maritalOptionsData, setMaritalOptionsData] = useState([]);
  const [manglikOptionsData, setManglikOptionsData] = useState([]);
  const [tagsData, setTagsData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const handleMinAgeChange = (value: string) => {
    setMinAge(value);

    // If maxAge is empty OR minAge > maxAge, sync maxAge to minAge
    if (!maxAge || parseInt(value) > parseInt(maxAge)) {
      setMaxAge(value);
    }
  };

  const handleMaxAgeChange = (value: string) => {
    setMaxAge(value);

    // Auto-fill minAge only if it's empty
    if (!minAge) {
      setMinAge(value);
    }
  };

  const handleMinHeightChange = (value: string) => {
    setMinHeight(value);

    const min = extractCm(value);
    const max = extractCm(maxHeight);

    if (!maxHeight || min > max) {
      setMaxHeight(value);
    }
  };

  const handleMaxHeightChange = (value: string) => {
    setMaxHeight(value);

    const max = extractCm(value);
    const min = extractCm(minHeight);

    if (!minHeight || max < min) {
      setMinHeight(value);
    }
  };
  const extractCm = (value: string): number => {
    const match = value.match(/(\d+)cm$/);
    return match ? parseInt(match[1]) : 0;
  };

  const isBasicFormValid =
    maritalStatus.trim() !== '' ||
    minAge.trim() !== '' ||
    maxAge.trim() !== '' ||
    minHeight.trim() !== '' ||
    maxHeight.trim() !== '' ||
    location.trim() !== '' ||
    manglik.trim() !== '';

  const isAdvancedFormValid =
    tabIndex === 1 && selectedOptions && Object.values(selectedOptions).some((group) => group && Object.keys(group).length > 0);

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
      setManglikOptionsData(responseData.data.manglik);
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
        locationOptions: [location],
        manglik: [manglik]
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
    setManglik('');
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
      <Grid container spacing={3} xs={12}>
        <MainCard>
          <Grid xs={12}>
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
                setMaxAge={handleMaxAgeChange}
                minHeight={minHeight}
                setMinHeight={handleMinHeightChange}
                maxHeight={maxHeight}
                setMaxHeight={handleMaxHeightChange}
                location={location}
                setLocation={setLocation}
                manglik={manglik}
                setManglik={setManglik}
                ageOptions={ageOptions}
                heightData={heightData}
                locationData={locationData}
                maritalOptionsData={maritalOptionsData}
                manglikOptionsData={manglikOptionsData}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <AdvancedSearchTab
                tagsData={tagsData || []}
                tagCategories={tagCategories}
                setTagCategories={setTagCategories}
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
            </TabPanel>
          </Grid>
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
                disabled={(tabIndex === 0 && !isBasicFormValid) || (tabIndex === 1 && !isAdvancedFormValid)} // ✅ disable when form is incomplete
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
