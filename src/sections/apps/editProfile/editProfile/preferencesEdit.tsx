import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper } from '@mui/material';
import 'assets/styles/styles.scss';
import LifestylePreferencesEdit from 'sections/apps/preferencesEdit/lifestylePreferencesEdit';
import PersonalPreferencesEdit from 'sections/apps/preferencesEdit/personalPreferencesEdit';
import AdditionalPreferencesEdit from 'sections/apps/preferencesEdit/additionalPreferencesEdit';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { profileDetails } from 'apiServices/user';
import { getGeneralData } from 'apiServices/data';
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface ErrorData {
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
          <Tab key={index} label={label} className="tabStyle" />
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
        />
      </TabPanel>
    </Paper>
    // </BackgroundWrapper>
  );
};

export default PreferencesEdit;
