import { useEffect, useState, SyntheticEvent } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';
// material-ui
import { Tabs, Tab, Box, Typography, Paper, Grid, Stack, Button } from '@mui/material';
import 'assets/styles/styles.scss';
import TabEditStep1 from './TabEditStep1';
import TabEditStep2 from './TabEditStep2';
import TabEditStep3 from './TabEditStep3';
import TabEditStep4 from './TabEditStep4';
import TabEditStep5 from './TabEditStep5';
import TabEditStep6 from './TabEditStep6';
import TabEditStep7 from './TabEditStep7';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { editProfileDetails, profileDetails } from 'apiServices/user';
import { getGeneralData, getUserDetails } from 'apiServices/data';
import dayjs, { Dayjs } from 'dayjs';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
// ==============================|| PROFILE - ACCOUNT ||============================== //

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
interface ErrorData {
  response: any;
}
interface ResponseEditData {
  status: string;
  message: string;
  response: any;
}
interface ResponseUserData {
  status: string;
  message: string;
  data: any;
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
export default function PersonalDetailsEdit() {
  const location = useLocation();
  const { pathname } = useLocation();
  const data = location.state;
  const [isLoadingGetDetails, setIsLoadingGetDetails] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader State
  const [tabIndex, setTabIndex] = useState(0);
  //Tab 1
  const [fullName, setFullName] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState<Dayjs | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  //Tab 2
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('');
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [disability, setDisability] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [complexion, setComplexion] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');
  //Tab 3
  const [drinking, setDrinking] = useState('');
  const [smoking, setSmoking] = useState('');
  const [dietaryHabits, setDietaryHabits] = useState('');
  //Tab 4
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [hometown, setHometown] = useState('');
  const [siblings, setSiblings] = useState('');
  const [familyIncome, setFamilyIncome] = useState('');
  const [familyType, setFamilyType] = useState('');
  const [familyBackground, setFamilyBackground] = useState('');
  //Tab 5
  const [highestQualification, setHighestQualification] = useState('');
  const [additionalQualification, setAdditionalQualification] = useState('');
  const [occupation, setOccupation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [minAnnualIncome, setMinAnnualIncome] = useState('');
  const [maxAnnualIncome, setMaxAnnualIncome] = useState('');
  const [languagesKnown, setLanguagesKnown] = useState<string[]>([]);
  //Tab 6
  const [gotra, setGotra] = useState('');
  const [manglik, setManglik] = useState('');
  const [gunnMatchingImportant, setGunnMatchingImportant] = useState(false);
  const [includeUnknownManglik, setIncludeUnknownManglik] = useState(false);
  //Tab 7
  const [residentialAddress, setResidentialAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [alternateContact, setAlternateContact] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');

  //General Data
  const [subCasteData, setSubCasteData] = useState([]);
  const [gotraData, setGotraData] = useState([]);
  const [professionData, setProfessionData] = useState([]);
  const [occupationData, setOccupationData] = useState([]);
  const [hobbiesData, setHobbiesData] = useState([]);
  const [bloodGroupsData, setBloodGroupsData] = useState([]);
  const [complexionData, setComplexionData] = useState([]);
  const [dietaryOptionsData, setDietaryOptionsData] = useState([]);
  const [disabilitiesData, setDisabilitiesData] = useState([]);
  const [drinkingOptionsData, setDrinkingOptionsData] = useState([]);
  const [familyTypeData, setFamilyTypeData] = useState([]);
  const [familyBackgroundData, setFamilyBackgroundData] = useState([]);
  const [heightData, setHeightData] = useState([]);
  const [incomeOptionsData, setIncomeOptionsData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [manglikOptionsData, setManglikOptionsData] = useState([]);
  const [maritalOptionsData, setMaritalOptionsData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [siblingOptionsData, setSiblingOptionsData] = useState([]);
  const [smokingOptionsData, setSmokingOptionsData] = useState([]);
  const [workingWithOptionsData, setWorkingWithOptionsData] = useState([]);
  const [isStepValid, setIsStepValid] = useState(true); // Track validation status
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    if (newIndex < tabIndex || completedSteps.includes(newIndex)) {
      setTabIndex(newIndex);
      return;
    }

    if (newIndex === tabIndex + 1 && isStepValid) {
      setCompletedSteps((prev) => Array.from(new Set([...prev, tabIndex])));
      setTabIndex(newIndex);
    }
  };
  const handleSaveProfileDetailsAPI = async () => {
    setIsLoading(true);
    const matrimonialId = localStorage.getItem('matrimonialId');
    const matrimonialData = {
      matrimonialId: matrimonialId,
      firstName: fullName,
      lastName: 'lastName', // If you have lastName, replace this with the actual variable
      birthTime: timeOfBirth || '', // Ensuring a fallback in case of null
      dateOfBirth: dateOfBirth || '', // Ensuring a fallback in case of null
      birthPlace: placeOfBirth,
      gender: gender,
      disabilityStatus: disability,
      heightCM: height,
      weightKG: weight,
      bloodGroup: bloodGroup,
      complexion: complexion,
      maritalStatus: maritalStatus,
      fatherName: fatherName,
      motherName: motherName,
      nativePlace: hometown,
      siblingCount: siblings,
      familyIncomeINR: familyIncome,
      familyType: familyType,
      familyBackground: familyBackground,
      qualification: highestQualification,
      additionalQualification: additionalQualification,
      occupation: occupation,
      occupationCompany: companyName,
      occupationLocation: state, // Assuming occupation location is a state
      minAnnualIncome: minAnnualIncome, // If you have separate min/max income, modify accordingly
      maxAnnualIncome: maxAnnualIncome,
      gotra: gotra,
      hobbies: hobbies, // Converting hobbies string to an array
      address: residentialAddress,
      phone: phoneNumber,
      email: emailAddress,
      alternateContact: alternateContact,
      languagesKnown: languagesKnown, // Converting string to array
      aboutMe: '',
      countryCode: 'IN', // If this is dynamic, you may need a variable for it
      city: city,
      state: state,
      country: country,
      isGunnMatchingImportant: gunnMatchingImportant,
      isManglik: includeUnknownManglik, // Assuming manglik is a string and needs conversion
      dietary: dietaryHabits,
      drinking: drinking,
      smoking: smoking,
      locationType: placeOfBirth, // If different from birthPlace, change it accordingly
      manglik: manglik
    };
    // **Store matrimonial data in localStorage**
    localStorage.setItem('matrimonialDetails', JSON.stringify(matrimonialData));
    const profileDetailsData = {
      preference: null,
      matrimonial: matrimonialData
    };
    try {
      const response = await editProfileDetails(profileDetailsData);
      const responseData = response.data as ResponseEditData;
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
    } finally {
      setIsLoading(false); // Stop Loader
    }
  };
  const handleNext = () => {
    // navigate('/preferences');
    if (!isStepValid) return;
    setCompletedSteps((prev) => Array.from(new Set([...prev, tabIndex]))); // mark current step completed
    if (tabIndex >= 0 && tabIndex < 6) {
      setTabIndex((prevIndex) => prevIndex + 1);
    } else if (tabIndex === 6) {
      handleSaveProfileDetailsAPI();
    }
  };
  const handlePrevious = () => {
    if (tabIndex > 0 && tabIndex <= 6) {
      setTabIndex((prevIndex) => prevIndex - 1);
    } else if (tabIndex === 0) {
    }
  };
  const getGeneralDataAPI = async () => {
    try {
      const response = await getGeneralData();
      const responseData = response.data as ResponseGeneralData;
      setSubCasteData(responseData.generalData.subCaste);
      setGotraData(responseData.generalData.gotra);
      setProfessionData(responseData.generalData.profession);
      setOccupationData(responseData.generalData.occupation);
      setHobbiesData(responseData.generalData.hobbies);
      setBloodGroupsData(responseData.generalData.bloodGroups);
      setComplexionData(responseData.generalData.complexionOptions);
      setDietaryOptionsData(responseData.generalData.dietaryOptions);
      setDisabilitiesData(responseData.generalData.disabilities);
      setDrinkingOptionsData(responseData.generalData.drikingOptions);
      setFamilyTypeData(responseData.generalData.familyTypeOptions);
      setFamilyBackgroundData(responseData.generalData.familyBackgroundOptions);
      setHeightData(responseData.generalData.heightOptions);
      setIncomeOptionsData(responseData.generalData.incomeOptions);
      setLanguageData(responseData.generalData.language);
      setManglikOptionsData(responseData.generalData.manglikOptions);
      setMaritalOptionsData(responseData.generalData.maritalOptions);
      setQualificationData(responseData.generalData.qualification);
      setSiblingOptionsData(responseData.generalData.siblingOptions);
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
  const getUserDetailsAPI = async () => {
    setIsLoadingGetDetails(true);
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserDetails(userId); // Pass the required userId argument
      const responseData = response.data as ResponseUserData;
      const profileDetailsData = responseData.data.profile;
      setFullName(profileDetailsData.firstName || '');
      setTimeOfBirth(profileDetailsData.birthTime || '');
      //setDateOfBirth(profileDetailsData.dateOfBirth || '');
      setDateOfBirth(dayjs(profileDetailsData.dateOfBirth, 'DD-MM-YYYY'));
      setPlaceOfBirth(profileDetailsData.birthPlace || '');
      setGender(profileDetailsData.gender || '');
      setDisability(profileDetailsData.disability || '');
      setHeight(profileDetailsData.heightCm || '');
      setWeight(profileDetailsData.weightKg.replace(/kg/i, '').trim() || '');
      setBloodGroup(profileDetailsData.bloodGroup || '');
      setComplexion(profileDetailsData.complexion || '');
      setMaritalStatus(profileDetailsData.maritalStatus || '');
      setFatherName(profileDetailsData.fatherName || '');
      setMotherName(profileDetailsData.motherName || '');
      setHometown(profileDetailsData.nativePlace || '');
      setSiblings(profileDetailsData.siblingCount || '');
      const convertedIncome = profileDetailsData.income.replace('Lac/Year', ' Lakhs').replace(/\.0/g, '').replace('-', ' - ');
      setFamilyIncome(convertedIncome || '');
      setFamilyBackground(profileDetailsData.familyBackground || '');
      setFamilyType(profileDetailsData.familyType || '');
      setHighestQualification(profileDetailsData.qualification || '');
      setAdditionalQualification(profileDetailsData.additionalQualification || '');
      setOccupation(profileDetailsData.occupation || '');
      setCompanyName(profileDetailsData.occupationCompany || '');
      setState(profileDetailsData.occupationLocation || '');
      setMinAnnualIncome(profileDetailsData.minAnnualIncome || '');
      setMaxAnnualIncome(profileDetailsData.maxAnnualIncome || '');
      setGotra(profileDetailsData.gotra || '');
      setHobbies(profileDetailsData.hobbies || []);
      setResidentialAddress(profileDetailsData.address || '');
      setPhoneNumber(profileDetailsData.phone || '');
      setEmailAddress(profileDetailsData.email || '');
      setAlternateContact(profileDetailsData.alternatePhone || '');
      setLanguagesKnown(profileDetailsData.languagesKnown || []);
      setCity(profileDetailsData.city || '');
      setState(profileDetailsData.state || '');
      setCountry(profileDetailsData.country || '');
      setGunnMatchingImportant(profileDetailsData.isGunnMatchingImportant || false);
      setIncludeUnknownManglik(profileDetailsData.isManglik || false);
      setManglik(profileDetailsData.manglik || '');
      setDietaryHabits(profileDetailsData.dietary || '');
      setDrinking(profileDetailsData.drinking || '');
      setSmoking(profileDetailsData.smoking || '');
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
      setIsLoadingGetDetails(false); // Stop Loader
    }
  };
  useEffect(() => {
    getGeneralDataAPI();
    getUserDetailsAPI();
  }, []);
  return (
    <>
      {(isLoadingGetDetails || isLoading) && ( // Show Loader When API is in Progress
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'left',
            gap: '4px',
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
              {isLoading ? 'Updating Profile Details' : ' Fetching User Details'}
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
      <>
        <Typography variant="h5" gutterBottom>
          Personal Details
        </Typography>
        <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="activeTabStyle">
          {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'].map((label, index) => (
            <Tab
              key={index}
              label={label}
              className="tabStyle"
              disabled={
                !(
                  (
                    index === tabIndex || // current tab
                    index < tabIndex || // previous tabs
                    completedSteps.includes(index) || // already completed tabs
                    (index === tabIndex + 1 && isStepValid)
                  ) // immediate next step if current is valid
                )
              }
            />
          ))}
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <TabEditStep1
            fullName={fullName}
            setFullName={setFullName}
            timeOfBirth={timeOfBirth ? dayjs(timeOfBirth, 'HH:mm') : null}
            setTimeOfBirth={(value: Dayjs | null) => setTimeOfBirth(value)}
            dateOfBirth={dateOfBirth ? dayjs(dateOfBirth) : null}
            setDateOfBirth={(value) => setDateOfBirth(value ? dayjs(value.format('DD-MM-YYYY')) : null)}
            placeOfBirth={placeOfBirth}
            setPlaceOfBirth={setPlaceOfBirth}
            setIsStepValid={setIsStepValid}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <TabEditStep2
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
            gender={gender}
            setGender={setGender}
            hobbies={hobbies}
            setHobbies={setHobbies}
            disability={disability}
            setDisability={setDisability}
            bloodGroup={bloodGroup}
            setBloodGroup={setBloodGroup}
            complexion={complexion}
            setComplexion={setComplexion}
            maritalStatus={maritalStatus}
            setMaritalStatus={setMaritalStatus}
            heightOptions={heightData || []}
            hobbiesOptions={hobbiesData || []}
            disabilities={disabilitiesData || []}
            bloodGroupOptions={bloodGroupsData || []}
            complexionOptions={complexionData || []}
            maritalOptions={maritalOptionsData || []}
            setIsStepValid={setIsStepValid}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <TabEditStep3
            drinking={drinking}
            setDrinking={setDrinking}
            smoking={smoking}
            setSmoking={setSmoking}
            dietaryHabits={dietaryHabits}
            setDietaryHabits={setDietaryHabits}
            drinkingOptions={drinkingOptionsData || []}
            smokingOptions={smokingOptionsData || []}
            dietaryOptions={dietaryOptionsData || []}
            setIsStepValid={setIsStepValid}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <TabEditStep4
            fatherName={fatherName}
            setFatherName={setFatherName}
            motherName={motherName}
            setMotherName={setMotherName}
            hometown={hometown}
            setHometown={setHometown}
            siblings={siblings}
            setSiblings={setSiblings}
            familyIncome={familyIncome}
            setFamilyIncome={setFamilyIncome}
            familyType={familyType}
            setFamilyType={setFamilyType}
            familyBackground={familyBackground}
            setFamilyBackground={setFamilyBackground}
            familyTypeOptions={familyTypeData || []}
            siblingOptions={siblingOptionsData || []}
            familyBackgroundData={familyBackgroundData || []}
            incomeOptions={incomeOptionsData || []}
            setIsStepValid={setIsStepValid}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <TabEditStep5
            highestQualification={highestQualification}
            setHighestQualification={setHighestQualification}
            additionalQualification={additionalQualification}
            setAdditionalQualification={setAdditionalQualification}
            occupation={occupation}
            setOccupation={setOccupation}
            companyName={companyName}
            setCompanyName={setCompanyName}
            workingWith={workingWith}
            setWorkingWith={setWorkingWith}
            minAnnualIncome={minAnnualIncome}
            setMinAnnualIncome={setMinAnnualIncome}
            maxAnnualIncome={maxAnnualIncome}
            setMaxAnnualIncome={setMaxAnnualIncome}
            languagesKnown={languagesKnown}
            setLanguagesKnown={setLanguagesKnown}
            qualificationOptions={qualificationData || []}
            occupationOptions={occupationData || []}
            workingWithOptions={workingWithOptionsData || []}
            incomeOptions={incomeOptionsData || []}
            languageOptions={languageData || []}
            setIsStepValid={setIsStepValid}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={5}>
          <TabEditStep6
            gotra={gotra}
            setGotra={setGotra}
            manglik={manglik}
            setManglik={setManglik}
            gunnMatchingImportant={gunnMatchingImportant}
            setGunnMatchingImportant={setGunnMatchingImportant}
            includeUnknownManglik={includeUnknownManglik}
            setIncludeUnknownManglik={setIncludeUnknownManglik}
            gotraOptions={gotraData || []}
            manglikOptions={manglikOptionsData || []}
            setIsStepValid={setIsStepValid}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={6}>
          <TabEditStep7
            residentialAddress={residentialAddress}
            setResidentialAddress={setResidentialAddress}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            emailAddress={emailAddress}
            setEmailAddress={setEmailAddress}
            alternateContact={alternateContact}
            setAlternateContact={setAlternateContact}
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            city={city}
            setCity={setCity}
            setIsStepValid={setIsStepValid}
            setCompletedSteps={setCompletedSteps}
          />
        </TabPanel>
        {/* Buttons */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            {tabIndex > 0 && (
              <Button variant="outlined" color="secondary" onClick={handlePrevious}>
                Previous
              </Button>
            )}
            <Button variant="contained" className="buttonStyle" onClick={handleNext} disabled={!isStepValid}>
              Continue
            </Button>
          </Stack>
        </Grid>
      </>
    </>
  );
}
