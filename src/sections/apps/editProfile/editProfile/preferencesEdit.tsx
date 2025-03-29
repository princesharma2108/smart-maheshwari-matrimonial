import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Grid, Stack, Button } from '@mui/material';
import 'assets/styles/styles.scss';
import LifestylePreferencesEdit from 'sections/apps/preferencesEdit/lifestylePreferencesEdit';
import PersonalPreferencesEdit from 'sections/apps/preferencesEdit/personalPreferencesEdit';
import AdditionalPreferencesEdit from 'sections/apps/preferencesEdit/additionalPreferencesEdit';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { editProfileDetails, profileDetails } from 'apiServices/user';
import { getGeneralData } from 'apiServices/data';
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
const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ padding: '16px' }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const PreferencesEdit: React.FC = () => {
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
  const [isStepValid, setIsStepValid] = useState(true); // Track validation status
  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    // Allow moving back anytime
    if (newIndex < tabIndex) {
      setTabIndex(newIndex);
      return;
    }

    // Allow moving forward only to the next step if isStepValid is true
    if (newIndex === tabIndex + 1 && isStepValid) {
      setTabIndex(newIndex);
    }
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
  useEffect(() => {
    getGeneralDataAPI();
  }, []);
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
      matrimonial: null
    };
    try {
      const response = await editProfileDetails(profileDetailsData);
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
    const storedPreferenceData = localStorage.getItem('preferenceDetails');
    if (storedPreferenceData) {
      const preferenceDetailsData = JSON.parse(storedPreferenceData);
      setMinAge(preferenceDetailsData.minAge || '');
      setMaxAge(preferenceDetailsData.maxAge || '');
      setMaritalStatus(preferenceDetailsData.maritalStatus || '');
      setFamilyType(preferenceDetailsData.familyType || '');
      setFamilyBackground(preferenceDetailsData.familyBackground || '');
      setQualification(preferenceDetailsData.qualification || '');
      setLocation(preferenceDetailsData.locationType || '');
      setProfession(preferenceDetailsData.profession || '');
      setHobbies(preferenceDetailsData.hobbies || []);
      setDrinking(preferenceDetailsData.drinking || '');
      setSmoking(preferenceDetailsData.smoking || '');
      setDietaryHabits(preferenceDetailsData.dietaryHabits || '');
      setWorkingWith(preferenceDetailsData.workingWith || '');
      console.log('nonNegotiables:', preferenceDetailsData.nonNegotiables);
      if (preferenceDetailsData.nonNegotiables) {
        // Update non-negotiable state variables based on stored nonNegotiables
        if (preferenceDetailsData.nonNegotiables.includes('Drinking')) {
          setNonNegotiableDrinking('Drinking');
        }
        if (preferenceDetailsData.nonNegotiables.includes('Smoking')) {
          setNonNegotiableSmoking('Smoking');
        }
        if (preferenceDetailsData.nonNegotiables.includes('DietaryHabits')) {
          setNonNegotiableDietary('DietaryHabits');
        }
        if (preferenceDetailsData.nonNegotiables.includes('Age')) {
          setNonNegotiableAge('Age');
        }
        if (preferenceDetailsData.nonNegotiables.includes('FamilyType')) {
          setNonNegotiableFamilyType('FamilyType');
        }
        if (preferenceDetailsData.nonNegotiables.includes('FamilyBackground')) {
          setNonNegotiableFamilyBackground('FamilyBackground');
        }
        if (preferenceDetailsData.nonNegotiables.includes('MaritalStatus')) {
          setNonNegotiableMaritalStatus('MaritalStatus');
        }
        if (preferenceDetailsData.nonNegotiables.includes('Qualification')) {
          setNonNegotiableQualification('Qualification');
        }
        if (preferenceDetailsData.nonNegotiables.includes('Profession')) {
          setNonNegotiableProfession('Profession');
        }
        if (preferenceDetailsData.nonNegotiables.includes('WorkingWith')) {
          setNonNegotiableWorkingWith('WorkingWith');
        }
        if (preferenceDetailsData.nonNegotiables.includes('Location')) {
          setNonNegotiableLocation('Location');
        }
        if (preferenceDetailsData.nonNegotiables.includes('Hobbies')) {
          setNonNegotiableHobbies('Hobbies');
        }
      }
    }
  }, []);
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
          <Tab key={index} label={label} className="tabStyle" disabled={index > tabIndex + 1 || (index === tabIndex + 1 && !isStepValid)} />
        ))}
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <LifestylePreferencesEdit
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
          setIsStepValid={setIsStepValid}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <PersonalPreferencesEdit
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
          setIsStepValid={setIsStepValid}
        />
      </TabPanel>
      <TabPanel value={tabIndex} index={2}>
        <AdditionalPreferencesEdit
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
          setIsStepValid={setIsStepValid}
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
    </Paper>
    // </BackgroundWrapper>
  );
};

export default PreferencesEdit;
