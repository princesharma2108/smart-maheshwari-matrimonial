import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Grid, Stack, Button } from '@mui/material';
import LifestylePreferences from 'sections/apps/preferences/lifestylePreferences';
import PersonalPreferences from 'sections/apps/preferences/personalPreferences';
import AdditionalPreferences from 'sections/apps/preferences/additionalPreferences';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import 'assets/styles/styles.scss';
import { getGeneralData } from 'apiServices/data';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { useNavigate } from 'react-router-dom';
import { getUserStage, postUserStage, profileDetails } from 'apiServices/user';
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
interface ResponseGeneralData {
  status: string;
  message: string;
  generalData: any;
}
interface ResponseStageData {
  registrationStage: number;
  message: string;
  status: string;
}
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ padding: '16px' }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const Preferences: React.FC = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  //LifeStyle Preferences
  const [drinking, setDrinking] = useState('');
  const [smoking, setSmoking] = useState('');
  const [dietaryHabits, setDietaryHabits] = useState('');
  const [nonNegotiableDrinking, setNonNegotiableDrinking] = useState<string | null>(null);
  const [nonNegotiableSmoking, setNonNegotiableSmoking] = useState<string | null>(null);
  const [nonNegotiableDietary, setNonNegotiableDietary] = useState<string | null>(null);
  //Personal Preferences
  const [age, setAge] = useState<[number, number]>([0, 0]);
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(0);
  const [familyType, setFamilyType] = useState('');
  const [familyBackground, setFamilyBackground] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  const [nonNegotiableAge, setNonNegotiableAge] = useState<string | null>(null);
  const [nonNegotiableFamilyType, setNonNegotiableFamilyType] = useState<string | null>(null);
  const [nonNegotiableFamilyBackground, setNonNegotiableFamilyBackground] = useState<string | null>(null);
  const [nonNegotiableMaritalStatus, setNonNegotiableMaritalStatus] = useState<string | null>(null);
  //Additional Preferences
  const [qualification, setQualification] = useState('');
  const [profession, setProfession] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [location, setLocation] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [nonNegotiableQualification, setNonNegotiableQualification] = useState<string | null>(null);
  const [nonNegotiableProfession, setNonNegotiableProfession] = useState<string | null>(null);
  const [nonNegotiableWorkingWith, setNonNegotiableWorkingWith] = useState<string | null>(null);
  const [nonNegotiableLocation, setNonNegotiableLocation] = useState<string | null>(null);
  const [nonNegotiableHobbies, setNonNegotiableHobbies] = useState<string | null>(null);
  //General Data
  const [professionData, setProfessionData] = useState([]);
  const [hobbiesData, setHobbiesData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [dietaryOptionsData, setDietaryOptionsData] = useState([]);
  const [drinkingOptionsData, setDrinkingOptionsData] = useState([]);
  const [familyTypeData, setFamilyTypeData] = useState([]);
  const [familyBackgroundData, setFamilyBackgroundData] = useState([]);
  const [maritalOptionsData, setMaritalOptionsData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [smokingOptionsData, setSmokingOptionsData] = useState([]);
  const [workingWithOptionsData, setWorkingWithOptionsData] = useState([]);
  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };
  const handleNext = () => {
    // navigate('/preferences');
    if (tabIndex >= 0 && tabIndex < 2) {
      setTabIndex((prevIndex) => prevIndex + 1);
    } else if (tabIndex === 2) {
      handleSaveProfileDetailsAPI();
    }
  };
  const handlePrevious = () => {
    if (tabIndex > 0 && tabIndex <= 2) {
      setTabIndex((prevIndex) => prevIndex - 1);
    } else if (tabIndex === 0) {
      navigate('/personal-details');
    }
  };
  const getGeneralDataAPI = async () => {
    try {
      const response = await getGeneralData();
      const responseData = response.data as ResponseGeneralData;
      console.log('responseData', responseData.generalData);
      setProfessionData(responseData.generalData.profession);
      setHobbiesData(responseData.generalData.hobbies);
      setDietaryOptionsData(responseData.generalData.dietaryOptions);
      setDrinkingOptionsData(responseData.generalData.drikingOptions);
      setFamilyTypeData(responseData.generalData.familyTypeOptions);
      setFamilyBackgroundData(responseData.generalData.familyBackgroundOptions);
      setLocationData(responseData.generalData.locationOptions);
      setMaritalOptionsData(responseData.generalData.maritalOptions);
      setQualificationData(responseData.generalData.qualification);
      setSmokingOptionsData(responseData.generalData.smokingOptions);
      setWorkingWithOptionsData(responseData.generalData.workingWithOptions);
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
  const handleSaveProfileDetailsAPI = async () => {
    const matrimonialId = localStorage.getItem('matrimonialId');
    const userId = localStorage.getItem('userId');
    const storedData = localStorage.getItem('matrimonialDetails');
    const matrimonialStoredData = storedData ? JSON.parse(storedData) : {};
    console.log('matrimonialDataJSON2', matrimonialStoredData);
    // Collect only non-null and non-empty nonNegotiable values
    const nonNegotiables: string[] = [];
    const nonNegotiableValues = [
      nonNegotiableDrinking,
      nonNegotiableSmoking,
      nonNegotiableDietary,
      nonNegotiableAge,
      nonNegotiableFamilyType,
      nonNegotiableFamilyBackground,
      nonNegotiableMaritalStatus,
      nonNegotiableQualification,
      nonNegotiableProfession,
      nonNegotiableWorkingWith,
      nonNegotiableLocation,
      nonNegotiableHobbies
    ];
    nonNegotiableValues.forEach((value) => {
      if (value !== null && value !== '') {
        nonNegotiables.push(value);
      }
    });
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
      aboutMe:
        'I am Kirti Mintri, a Senior Data Engineer working at Visa. With a B.Tech. degree in IT, I have honed my skills in data analysis and management. My goal is to utilize my expertise in data engineering to drive innovation and efficiency in the industry. Besides my professional commitments, I am passionate about reading, writing, dancing, and singing, which help me express my creativity and unwind after a long day.',
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
      maritalStatus: maritalStatus,
      familyType: familyType,
      familyBackground: familyBackground,
      qualification: qualification,
      preferredLocation: '',
      locationType: location,
      minAnnualIncome: 0,
      maxAnnualIncome: 0,
      profession: profession,
      hobbies: hobbies,
      drinking: drinking,
      smoking: smoking,
      dietaryHabits: dietaryHabits,
      minAge: minAge,
      maxAge: maxAge,
      nonNegotiables: nonNegotiables,
      workingWith: workingWith
    };
    // Save preferenceData in local storage
    localStorage.setItem('preferenceData', JSON.stringify(preferenceData));
    const profileDetailsData = {
      preference: preferenceData,
      matrimonial: matrimonialData
    };
    navigate('/additional-information');
  };
  useEffect(() => {
    const storedPreferenceData = localStorage.getItem('preferenceData');
    if (storedPreferenceData) {
      const preferenceData = JSON.parse(storedPreferenceData);
      setMinAge(preferenceData.minAge || '');
      setMaxAge(preferenceData.maxAge || '');
      setMaritalStatus(preferenceData.maritalStatus || '');
      setFamilyType(preferenceData.familyType || '');
      setFamilyBackground(preferenceData.familyBackground || '');
      setQualification(preferenceData.qualification || '');
      setLocation(preferenceData.locationType || '');
      setProfession(preferenceData.profession || '');
      setHobbies(preferenceData.hobbies || []);
      setDrinking(preferenceData.drinking || '');
      setSmoking(preferenceData.smoking || '');
      setDietaryHabits(preferenceData.dietaryHabits || '');
      setWorkingWith(preferenceData.workingWith || '');
      console.log('nonNegotiables:', preferenceData.nonNegotiables);
      // Update non-negotiable state variables based on stored nonNegotiables
      if (preferenceData.nonNegotiables.includes('Drinking')) {
        setNonNegotiableDrinking('Drinking');
      }
      if (preferenceData.nonNegotiables.includes('Smoking')) {
        setNonNegotiableSmoking('Smoking');
      }
      if (preferenceData.nonNegotiables.includes('DietaryHabits')) {
        setNonNegotiableDietary('DietaryHabits');
      }
      if (preferenceData.nonNegotiables.includes('Age')) {
        setNonNegotiableAge('Age');
      }
      if (preferenceData.nonNegotiables.includes('FamilyType')) {
        setNonNegotiableFamilyType('FamilyType');
      }
      if (preferenceData.nonNegotiables.includes('FamilyBackground')) {
        setNonNegotiableFamilyBackground('FamilyBackground');
      }
      if (preferenceData.nonNegotiables.includes('MaritalStatus')) {
        setNonNegotiableMaritalStatus('MaritalStatus');
      }
      if (preferenceData.nonNegotiables.includes('Qualification')) {
        setNonNegotiableQualification('Qualification');
      }
      if (preferenceData.nonNegotiables.includes('Profession')) {
        setNonNegotiableProfession('Profession');
      }
      if (preferenceData.nonNegotiables.includes('WorkingWith')) {
        setNonNegotiableWorkingWith('WorkingWith');
      }
      if (preferenceData.nonNegotiables.includes('Location')) {
        setNonNegotiableLocation('Location');
      }
      if (preferenceData.nonNegotiables.includes('Hobbies')) {
        setNonNegotiableHobbies('Hobbies');
      }
    }
  }, []);
  const postUserStageAPI = async () => {
    //navigate('/upload-photos');
    const userId = localStorage.getItem('userId');
    const stageData = {
      userId: userId,
      registrationStage: 3
    };
    try {
      const response = await postUserStage(stageData);
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
  useEffect(() => {
    //postUserStageAPI();
    getGeneralDataAPI();
    getUserStageAPI();
  }, []);
  const getUserStageAPI = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserStage(userId);
      const responseData = response.data as ResponseStageData;
      if (responseData.status === 'success') {
        // switch (responseData.registrationStage) {
        //   case 1:
        //     navigate('/upload-biodata');
        //     break;
        //   case 2:
        //     navigate('/personal-details');
        //     break;
        //   case 3:
        //     navigate('/preferences');
        //     break;
        //   case 4:
        //     navigate('/upload-photos');
        //     break;
        //   case 5:
        //     navigate('/widget/statistics');
        //     break;
        //   default:
        //     console.log('Unknown registration stage:', responseData.registrationStage);
        //     navigate('/upload-biodata');
        //     break;
        // }
      } else {
        console.log("API call unsuccessful or status is not 'success'");
        navigate('/upload-biodata');
      }
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
  return (
    <BackgroundWrapper>
      <>
        <Typography variant="h5" gutterBottom>
          Preferences
        </Typography>

        <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="activeTabStyle">
          {['Lifestyle Preferences', 'Personal Preferences', 'Additional Preferences'].map((label, index) => (
            <Tab key={index} label={label} className="tabStyle" />
          ))}
        </Tabs>

        <TabPanel value={tabIndex} index={0}>
          <LifestylePreferences
            drinking={drinking}
            setDrinking={setDrinking}
            smoking={smoking}
            setSmoking={setSmoking}
            dietaryHabits={dietaryHabits}
            setDietaryHabits={setDietaryHabits}
            nonNegotiableDrinking={nonNegotiableDrinking || ''}
            setNonNegotiableDrinking={setNonNegotiableDrinking}
            nonNegotiableSmoking={nonNegotiableSmoking || ''}
            setNonNegotiableSmoking={setNonNegotiableSmoking}
            nonNegotiableDietary={nonNegotiableDietary || ''}
            setNonNegotiableDietary={setNonNegotiableDietary}
            drinkingOptions={drinkingOptionsData || []}
            smokingOptions={smokingOptionsData || []}
            dietaryOptions={dietaryOptionsData || []}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <PersonalPreferences
            age={age as [number, number]}
            setAge={setAge}
            minAge={minAge}
            setMinAge={setMinAge}
            maxAge={maxAge}
            setMaxAge={setMaxAge}
            familyType={familyType}
            setFamilyType={setFamilyType}
            familyBackground={familyBackground}
            setFamilyBackground={setFamilyBackground}
            maritalStatus={maritalStatus}
            setMaritalStatus={setMaritalStatus}
            nonNegotiableAge={nonNegotiableAge || ''}
            setNonNegotiableAge={setNonNegotiableAge}
            nonNegotiableFamilyType={nonNegotiableFamilyType || ''}
            setNonNegotiableFamilyType={setNonNegotiableFamilyType}
            nonNegotiableFamilyBackground={nonNegotiableFamilyBackground || ''}
            setNonNegotiableFamilyBackground={setNonNegotiableFamilyBackground}
            nonNegotiableMaritalStatus={nonNegotiableMaritalStatus || ''}
            setNonNegotiableMaritalStatus={setNonNegotiableMaritalStatus}
            qualificationData={qualificationData || []}
            familyTypeData={familyTypeData || []}
            familyBackgroundData={familyBackgroundData || []}
            maritalOptionsData={maritalOptionsData || []}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <AdditionalPreferences
            qualification={qualification}
            setQualification={setQualification}
            profession={profession}
            setProfession={setProfession}
            workingWith={workingWith}
            setWorkingWith={setWorkingWith}
            location={location}
            setLocation={setLocation}
            hobbies={hobbies}
            setHobbies={setHobbies}
            nonNegotiableQualification={nonNegotiableQualification || ''}
            setNonNegotiableQualification={setNonNegotiableQualification}
            nonNegotiableProfession={nonNegotiableProfession || ''}
            setNonNegotiableProfession={setNonNegotiableProfession}
            nonNegotiableWorkingWith={nonNegotiableWorkingWith || ''}
            setNonNegotiableWorkingWith={setNonNegotiableWorkingWith}
            nonNegotiableLocation={nonNegotiableLocation || ''}
            setNonNegotiableLocation={setNonNegotiableLocation}
            nonNegotiableHobbies={nonNegotiableHobbies || ''}
            setNonNegotiableHobbies={setNonNegotiableHobbies}
            professionData={professionData || []}
            qualificationData={qualificationData || []}
            hobbiesData={hobbiesData || []}
            locationData={locationData || []}
            workingWithOptionsData={workingWithOptionsData || []}
          />
        </TabPanel>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button variant="outlined" color="secondary" onClick={() => handlePrevious()}>
              Previous
            </Button>
            <Button variant="contained" onClick={() => handleNext()} className="buttonStyle">
              Continue
            </Button>
          </Stack>
        </Grid>
      </>
    </BackgroundWrapper>
  );
};

export default Preferences;
