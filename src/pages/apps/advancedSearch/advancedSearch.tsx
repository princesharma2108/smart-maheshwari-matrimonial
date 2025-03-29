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
const searchData = {
  matrimonialId: 'M123456',
  basicSearch: {
    maritalStatusOptions: ['Single', 'Divorced', 'Widowed'],
    ageOptions: [
      '18',
      '20',
      '22',
      '24',
      '26',
      '28',
      '30',
      '32',
      '34',
      '36',
      '38',
      '40',
      '42',
      '44',
      '46',
      '48',
      '50',
      '52',
      '54',
      '56',
      '58',
      '60'
    ],
    heightOptions: [
      '4ft 6in - 137cm',
      '4ft 7in - 140cm',
      '4ft 8in - 142cm',
      '4ft 9in - 145cm',
      '4ft 10in - 147cm',
      '4ft 11in - 150cm',
      '5ft 0in - 152cm',
      '5ft 1in - 155cm',
      '5ft 2in - 157cm',
      '5ft 3in - 160cm',
      '5ft 4in - 163cm',
      '5ft 5in - 165cm',
      '5ft 6in - 168cm',
      '5ft 7in - 170cm',
      '5ft 8in - 173cm',
      '5ft 9in - 175cm',
      '5ft 10in - 178cm',
      '5ft 11in - 180cm',
      '6ft 0in - 183cm',
      '6ft 1in - 185cm',
      '6ft 2in - 188cm',
      '6ft 3in - 191cm',
      '6ft 4in - 193cm',
      '6ft 5in - 196cm'
    ],
    locationOptions: [
      'New York',
      'Los Angeles',
      'Ahmedabad',
      'Jaipur',
      'Phoenix',
      'Philadelphia',
      'San Antonio',
      'San Diego',
      'Dallas',
      'San Jose'
    ]
  },
  advancedSearch: {
    tagCategories: [
      {
        name: 'Education and Profession',
        tags: ["Bachelor's Degree", "Master's Degree", 'PhD', 'Engineer', 'Doctor', 'Teacher', 'Lawyer', 'Artist']
      },
      {
        name: 'Lifestyle',
        tags: ['Vegetarian', 'Non-Vegetarian', 'Vegan', 'Fitness Enthusiast', 'Yoga Practitioner', 'Travel Lover', 'Book Reader']
      },
      {
        name: 'Family Background',
        tags: ['Joint Family', 'Nuclear Family', 'Business Family', 'Service Family', 'Agricultural Family']
      }
    ]
  }
};
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
  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };
  const advancedSearchDataAPI = async () => {
    try {
      const response = await getAdvancedSearchData();
      const responseData = response.data as ResponseSearchData;
      console.log('responseData', responseData.data);
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
    const searchData = {
      matrimonialId: matrimonialId,
      basicSearch: {
        maritalStatusOptions: [maritalStatus],
        ageOptions: [minAge, maxAge],
        heightOptions: [minHeight, maxHeight],
        locationOptions: [location]
      },
      advancedSearch: {
        tagCategories: tagCategories
      }
    };
    try {
      const response = await postAdvancedSearchData(searchData);
      const responseData = response.data as ResponseSearchData;
      console.log('responseData', responseData.data);
      setSearchResults(responseData.data);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      navigate('/widget/statistics', { state: { searchResults: responseData.data } });
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
  return (
    <>
      {isLoading && ( // Show Loader When API is in Progress
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'center',
            height: '100vh',
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999
          }}
        >
          {/* <CircularProgress size={60} sx={{ color: '#f00757' }} /> */}
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#f00757"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <Stack spacing={2} flexDirection={'row'} alignItems={'center'}>
            <Typography variant="h3" color={'#f00757'}>
              Searching Data
            </Typography>
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#f00757"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ marginBottom: '5px' }}
              wrapperClass=""
            />
          </Stack>
        </Box>
      )}
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
              setMinAge={setMinAge}
              maxAge={maxAge}
              setMaxAge={setMaxAge}
              minHeight={minHeight}
              setMinHeight={setMinHeight}
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
            <AdvancedSearchTab tagsData={tagsData || []} tagCategories={tagCategories} setTagCategories={setTagCategories} />
          </TabPanel>
          {/* Buttons */}
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button variant="outlined" color="secondary" onClick={() => {}}>
                Reset
              </Button>
              <Button variant="contained" className="buttonStyle" onClick={sendAdvancedSearchDataAPI}>
                Apply Filters
              </Button>
            </Stack>
          </Grid>
        </MainCard>
      </Grid>
    </>
  );
}
