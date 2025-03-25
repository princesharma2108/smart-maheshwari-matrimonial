import React, { useEffect, useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Stack,
  Button,
  CircularProgress
} from '@mui/material';
import loginBG from 'assets/images/login/loginBG.jpeg';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import { getAboutMe, getGeneralData } from 'apiServices/data';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { profileDetails } from 'apiServices/user';
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
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ padding: '16px' }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const AdditionalInformation: React.FC = () => {
  const [selectedAboutMe, setSelectedAboutMe] = useState('');
  const [aboutMeDescriptions, setAboutMeDescriptions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleAboutMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAboutMe(event.target.value);
  };

  const getAboutMeAPI = async () => {
    setIsLoading(true);
    const storedData = localStorage.getItem('matrimonialDetails');
    const matrimonialData = storedData ? JSON.parse(storedData) : {};
    const storedPreferenceData = localStorage.getItem('preferenceData');
    const preferenceData = storedPreferenceData ? JSON.parse(storedPreferenceData) : null;
    const profileDetailsData = {
      preference: preferenceData,
      matrimonial: matrimonialData
    };
    const data = { userProfileDetails: profileDetailsData };
    try {
      const response = await getAboutMe(data);
      const responseData = response.data as ResponseData;
      console.log('responseData', responseData);
      // Extract descriptions and update state
      const descriptions = responseData.response.map((item: any) => item.description);
      setAboutMeDescriptions(descriptions);
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
    getAboutMeAPI();
  }, []);
  const handleSaveProfileDetailsAPI = async () => {
    setIsLoading(true);
    //navigate('/upload-photos');
    const matrimonialId = localStorage.getItem('matrimonialId');
    const userId = localStorage.getItem('userId');
    const storedData = localStorage.getItem('matrimonialDetails');
    const matrimonialStoredData = storedData ? JSON.parse(storedData) : {};
    const storedPreferenceData = localStorage.getItem('preferenceData');
    const preferenceStoredData = storedPreferenceData ? JSON.parse(storedPreferenceData) : null;
    console.log('matrimonialDataJSON2', matrimonialStoredData);
    const matrimonialData = {
      matrimonialId: matrimonialId,
      firstName: matrimonialStoredData.firstName,
      lastName: 'lastName', // If you have lastName, replace this with the actual variable
      birthTime: matrimonialStoredData.birthTime || '', // Ensuring a fallback in case of null
      dateOfBirth: matrimonialStoredData.dateOfBirth || '', // Ensuring a fallback in case of null
      birthPlace: matrimonialStoredData.birthPlace,
      gender: matrimonialStoredData.gender,
      disabilityStatus: matrimonialStoredData.disabilityStatus,
      heightCM: matrimonialStoredData.heightCM,
      weightKG: matrimonialStoredData.weightKG,
      bloodGroup: matrimonialStoredData.bloodGroup,
      complexion: matrimonialStoredData.complexion,
      maritalStatus: matrimonialStoredData.maritalStatus,
      fatherName: matrimonialStoredData.fatherName,
      motherName: matrimonialStoredData.motherName,
      nativePlace: matrimonialStoredData.nativePlace,
      siblingCount: matrimonialStoredData.siblingCount,
      familyIncomeINR: matrimonialStoredData.familyIncomeINR,
      familyType: matrimonialStoredData.familyType,
      qualification: matrimonialStoredData.qualification,
      additionalQualification: matrimonialStoredData.additionalQualification,
      occupation: matrimonialStoredData.occupation,
      occupationCompany: matrimonialStoredData.occupationCompany,
      occupationLocation: matrimonialStoredData.occupationLocation, // Assuming occupation location is a state
      minAnnualIncome: matrimonialStoredData.minAnnualIncome, // If you have separate min/max income, modify accordingly
      maxAnnualIncome: matrimonialStoredData.maxAnnualIncome,
      gotra: matrimonialStoredData.gotra,
      hobbies: matrimonialStoredData.hobbies, // Converting hobbies string to an array
      address: matrimonialStoredData.address,
      phone: matrimonialStoredData.phone,
      email: matrimonialStoredData.email,
      alternateContact: matrimonialStoredData.alternateContact,
      languagesKnown: matrimonialStoredData.languagesKnown, // Converting string to array
      aboutMe: selectedAboutMe,
      countryCode: 'IN', // If this is dynamic, you may need a variable for it
      city: matrimonialStoredData.city,
      state: matrimonialStoredData.state,
      country: matrimonialStoredData.country,
      isGunnMatchingImportant: matrimonialStoredData.isGunnMatchingImportant,
      isManglik: matrimonialStoredData.isManglik, // Assuming manglik is a string and needs conversion
      dietary: matrimonialStoredData.dietary,
      drinking: matrimonialStoredData.drinking,
      smoking: matrimonialStoredData.smoking,
      locationType: matrimonialStoredData.locationType, // If different from birthPlace, change it accordingly
      manglik: matrimonialStoredData.manglik
    };
    const preferenceData = {
      userId: userId,
      maritalStatus: preferenceStoredData.maritalStatus,
      familyType: preferenceStoredData.familyType,
      familyBackground: preferenceStoredData.familyBackground,
      qualification: preferenceStoredData.qualification,
      preferredLocation: '',
      locationType: preferenceStoredData.location,
      minAnnualIncome: 0,
      maxAnnualIncome: 0,
      profession: preferenceStoredData.profession,
      hobbies: preferenceStoredData.hobbies,
      drinking: preferenceStoredData.drinking,
      smoking: preferenceStoredData.smoking,
      dietaryHabits: preferenceStoredData.dietaryHabits,
      minAge: preferenceStoredData.minAge,
      maxAge: preferenceStoredData.maxAge,
      nonNegotiables: preferenceStoredData.nonNegotiables,
      workingWith: preferenceStoredData.workingWith
    };
    // Save preferenceData in local storage
    localStorage.setItem('preferenceData', JSON.stringify(preferenceData));
    const profileDetailsData = {
      preference: preferenceData,
      matrimonial: matrimonialData
    };
    try {
      const response = await profileDetails(profileDetailsData);
      const responseData = response.data as ResponseData;
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      navigate('/upload-photos');
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
  return (
    <BackgroundWrapper>
      <>
        {isLoading && ( // Show Loader When API is in Progress
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              position: 'absolute',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 9999
            }}
          >
            <CircularProgress size={60} sx={{ color: '#f00757' }} />
          </Box>
        )}
        <Typography variant="h5" gutterBottom>
          Additional Information
        </Typography>

        {/* About Me Card */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup value={selectedAboutMe} onChange={handleAboutMeChange}>
                    {aboutMeDescriptions.map((text, index) => (
                      <FormControlLabel
                        key={index}
                        value={text}
                        control={
                          <Radio
                            sx={{
                              color: '#FF4081', // Default (unchecked) color
                              '&.Mui-checked': {
                                color: '#D81B60' // Outer ring color when checked
                              },
                              '&.Mui-checked .MuiSvgIcon-root': {
                                fill: '#D81B60' // Changes the inner ball color when checked
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: 28 // Optional: Adjust radio button size
                              }
                            }}
                          />
                        }
                        label={
                          <Typography variant="body2" sx={{ mt: 2 }}>
                            {text}
                          </Typography>
                        }
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  navigate('/preferences');
                }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  handleSaveProfileDetailsAPI();
                }}
                className="buttonStyle"
              >
                Continue
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </>
    </BackgroundWrapper>
  );
};

export default AdditionalInformation;
