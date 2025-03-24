import React, { useEffect, useState } from 'react';
import { Tabs, Tab, Box, Typography, Paper, Grid, Stack, Button } from '@mui/material';
import TabStep1 from 'sections/apps/personalDetails/TabStep1';
import TabStep2 from 'sections/apps/personalDetails/TabStep2';
import TabStep3 from 'sections/apps/personalDetails/TabStep3';
import TabStep4 from 'sections/apps/personalDetails/TabStep4';
import TabStep5 from 'sections/apps/personalDetails/TabStep5';
import TabStep6 from 'sections/apps/personalDetails/TabStep6';
import TabStep7 from 'sections/apps/personalDetails/TabStep7';
import loginBG from 'assets/images/login/loginBG.jpeg';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import 'assets/styles/styles.scss';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { fi } from 'date-fns/locale';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { postUserStage, profileDetails } from 'apiServices/user';
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

const PersonalDetails: React.FC = () => {
  const navigate = useNavigate();
  const [tabIndex, setTabIndex] = useState(0);
  //Tab 1
  const [fullName, setFullName] = useState('');
  const [timeOfBirth, setTimeOfBirth] = useState<string | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<string | null>(null);
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
  const [heightData, setHeightData] = useState([]);
  const [incomeOptionsData, setIncomeOptionsData] = useState([]);
  const [languageData, setLanguageData] = useState([]);
  const [manglikOptionsData, setManglikOptionsData] = useState([]);
  const [maritalOptionsData, setMaritalOptionsData] = useState([]);
  const [qualificationData, setQualificationData] = useState([]);
  const [siblingOptionsData, setSiblingOptionsData] = useState([]);
  const [smokingOptionsData, setSmokingOptionsData] = useState([]);
  const [workingWithOptionsData, setWorkingWithOptionsData] = useState([]);
  const handleChange = (_event: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
  };
  const handleSaveProfileDetailsAPI = async () => {
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
    navigate('/preferences');
  };
  const handleNext = () => {
    // navigate('/preferences');
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
      navigate('/upload-biodata');
    }
  };
  const getGeneralDataAPI = async () => {
    try {
      const response = await getGeneralData();
      const responseData = response.data as ResponseGeneralData;
      console.log('responseData', responseData.generalData);
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
  useEffect(() => {
    getGeneralDataAPI();
  }, []);
  useEffect(() => {
    const storedData = localStorage.getItem('matrimonialDetails');
    if (storedData) {
      const matrimonialData = JSON.parse(storedData);
      console.log('matrimonialDataJSON1', matrimonialData);
      if (matrimonialData) {
        setFullName(matrimonialData.firstName || '');
        setTimeOfBirth(matrimonialData.birthTime || '');
        setDateOfBirth(matrimonialData.dateOfBirth || '');
        setPlaceOfBirth(matrimonialData.birthPlace || '');
        setGender(matrimonialData.gender || '');
        setDisability(matrimonialData.disabilityStatus || '');
        setHeight(matrimonialData.heightCM || '');
        setWeight(matrimonialData.weightKG || '');
        setBloodGroup(matrimonialData.bloodGroup || '');
        setComplexion(matrimonialData.complexion || '');
        setMaritalStatus(matrimonialData.maritalStatus || '');
        setFatherName(matrimonialData.fatherName || '');
        setMotherName(matrimonialData.motherName || '');
        setHometown(matrimonialData.nativePlace || '');
        setSiblings(matrimonialData.siblingCount || '');
        setFamilyIncome(matrimonialData.familyIncomeINR || '');
        setFamilyType(matrimonialData.familyType || '');
        setHighestQualification(matrimonialData.qualification || '');
        setAdditionalQualification(matrimonialData.additionalQualification || '');
        setOccupation(matrimonialData.occupation || '');
        setCompanyName(matrimonialData.occupationCompany || '');
        setState(matrimonialData.occupationLocation || '');
        setMinAnnualIncome(matrimonialData.minAnnualIncome || '');
        setMaxAnnualIncome(matrimonialData.maxAnnualIncome || '');
        setGotra(matrimonialData.gotra || '');
        setHobbies(matrimonialData.hobbies || []);
        setResidentialAddress(matrimonialData.address || '');
        setPhoneNumber(matrimonialData.phone || '');
        setEmailAddress(matrimonialData.email || '');
        setAlternateContact(matrimonialData.alternateContact || '');
        setLanguagesKnown(matrimonialData.languagesKnown || []);
        setCity(matrimonialData.city || '');
        setCountry(matrimonialData.country || '');
        setGunnMatchingImportant(matrimonialData.isGunnMatchingImportant || false);
        setManglik(matrimonialData.manglik || '');
        setDietaryHabits(matrimonialData.dietary || '');
        setDrinking(matrimonialData.drinking || '');
        setSmoking(matrimonialData.smoking || '');
      }
    }
  }, []);
  const postUserStageAPI = async () => {
    //navigate('/upload-photos');
    const userId = localStorage.getItem('userId');
    const stageData = {
      userId: userId,
      registrationStage: 2
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
    postUserStageAPI();
  }, []);
  return (
    <BackgroundWrapper>
      <>
        <Typography variant="h5" gutterBottom>
          Personal Details
        </Typography>
        <Tabs value={tabIndex} onChange={handleChange} variant="scrollable" scrollButtons="auto" className="activeTabStyle">
          {['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5', 'Step 6', 'Step 7'].map((label, index) => (
            <Tab key={index} label={label} className="tabStyle" />
          ))}
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <TabStep1
            //onDataChange={handleTab1DataChange}
            fullName={fullName}
            setFullName={setFullName}
            timeOfBirth={timeOfBirth ? dayjs(timeOfBirth, 'HH:mm') : null}
            setTimeOfBirth={(value) => setTimeOfBirth(value ? value.format('HH:mm') : null)}
            dateOfBirth={dateOfBirth ? dayjs(dateOfBirth) : null}
            setDateOfBirth={(value) => setDateOfBirth(value ? value.format('YYYY-MM-DD') : null)}
            placeOfBirth={placeOfBirth}
            setPlaceOfBirth={setPlaceOfBirth}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <TabStep2
            //onDataChange={handleTab2DataChange}
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
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <TabStep3
            //onDataChange={handleTab3DataChange}
            drinking={drinking}
            setDrinking={setDrinking}
            smoking={smoking}
            setSmoking={setSmoking}
            dietaryHabits={dietaryHabits}
            setDietaryHabits={setDietaryHabits}
            drinkingOptions={drinkingOptionsData || []}
            smokingOptions={smokingOptionsData || []}
            dietaryOptions={dietaryOptionsData || []}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <TabStep4
            // onDataChange={handleTab4DataChange}
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
            familyTypeOptions={familyTypeData || []}
            siblingOptions={siblingOptionsData || []}
            incomeOptions={incomeOptionsData || []}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={4}>
          <TabStep5
            // onDataChange={handleTab5DataChange}
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
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={5}>
          <TabStep6
            //onDataChange={handleTab6DataChange}
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
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={6}>
          <TabStep7
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
            //onDataChange={handleTab7DataChange}
          />
        </TabPanel>
        {/* Buttons */}
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
            <Button variant="outlined" color="secondary" onClick={handlePrevious}>
              Previous
            </Button>
            <Button variant="contained" className="buttonStyle" onClick={handleNext}>
              Continue
            </Button>
          </Stack>
        </Grid>
      </>
    </BackgroundWrapper>
  );
};

export default PersonalDetails;
