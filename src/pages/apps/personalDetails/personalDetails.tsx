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
import { useNavigate, useLocation } from 'react-router-dom';
import { fi } from 'date-fns/locale';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { postUserStage, profileDetails } from 'apiServices/user';
import { extractPDFData, getGeneralData } from 'apiServices/data';
import { APP_VERSION } from 'config';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import LoadingOverlay from 'components/LoaderOverlay';
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
interface ResponsePDFData {
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

const PersonalDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const skippedBiodata = location.state?.skippedBiodata;
  const backPreferences = location.state?.fromPreferences;
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
  const [familyBackground, setFamilyBackground] = useState('');
  const [selectedIncomeRange, setSelectedIncomRange] = useState('');
  //Tab 5
  const [highestQualification, setHighestQualification] = useState('');
  const [additionalQualification, setAdditionalQualification] = useState('');
  const [occupation, setOccupation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
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
  //Error State
  const [isStepValid, setIsStepValid] = useState(true); // Track validation status
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader State

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
    const matrimonialId = localStorage.getItem('matrimonialId');
    const matrimonialData = {
      matrimonialId: matrimonialId,
      //Tab 1
      firstName: fullName,
      lastName: 'lastName', // If you have lastName, replace this with the actual variable
      birthTime: timeOfBirth || '', // Ensuring a fallback in case of null
      dateOfBirth: dateOfBirth || '', // Ensuring a fallback in case of null
      birthPlace: placeOfBirth,
      locationType: placeOfBirth, // If different from birthPlace, change it accordingly
      //Tab 2
      gender: gender,
      disabilityStatus: disability,
      heightCM: height,
      weightKG: weight,
      bloodGroup: bloodGroup,
      complexion: complexion,
      maritalStatus: maritalStatus,
      hobbies: hobbies, // Converting hobbies string to an array
      //Tab 3
      dietary: dietaryHabits,
      drinking: drinking,
      smoking: smoking,
      //Tab 4
      fatherName: fatherName,
      motherName: motherName,
      nativePlace: hometown,
      siblingCount: siblings,
      familyIncomeINR: familyIncome,
      familyType: familyType,
      familyBackground: familyBackground,
      //Tab 5
      qualification: highestQualification,
      additionalQualification: additionalQualification,
      occupation: occupation,
      occupationCompany: companyName,
      occupationLocation: state, // Assuming occupation location is a state
      minAnnualIncome: minAnnualIncome, // If you have separate min/max income, modify accordingly
      maxAnnualIncome: maxAnnualIncome,
      workingWith: workingWith,
      //Tab 6
      gotra: gotra,
      isGunnMatchingImportant: gunnMatchingImportant,
      manglik: manglik,
      isManglik: includeUnknownManglik,
      //Tab 7
      address: residentialAddress,
      phone: phoneNumber,
      email: emailAddress,
      alternateContact: alternateContact,
      languagesKnown: languagesKnown, // Converting string to array
      aboutMe: '',
      countryCode: 'IN', // If this is dynamic, you may need a variable for it
      city: city,
      state: state,
      country: country
    };
    // **Store matrimonial data in localStorage**
    localStorage.setItem('matrimonialDetails', JSON.stringify(matrimonialData));
    const profileDetailsData = {
      preference: null,
      matrimonial: matrimonialData
    };
    sessionStorage.setItem('allowedRoute', '/preferences');
    navigate('/preferences', { replace: true });
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
      navigate('/upload-biodata');
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
  const extractPDFDataAPI = async () => {
    setIsLoading(true);
    const matrimonialId = localStorage.getItem('matrimonialId');
    const pdfLink = localStorage.getItem('pdfLink');
    const formdata = new FormData();
    if (matrimonialId) {
      formdata.append('matrimonialId', matrimonialId);
    }
    if (pdfLink) {
      formdata.append('pdfLink', pdfLink);
    }
    formdata.append('appVersion', APP_VERSION);
    try {
      const response = await extractPDFData(formdata);
      const responseData = response.data as ResponsePDFData;
      const pdfData = responseData.data;
      setFullName(pdfData.name || '');
      setTimeOfBirth(pdfData.timeOfBirth || '');
      setDateOfBirth(pdfData.dateOfBirth ? dayjs(pdfData.dateOfBirth, 'DD/MM/YYYY').format('YYYY-MM-DD') : null);
      setPlaceOfBirth(pdfData.placeOfBirth || '');
      setGender(pdfData.gender || '');
      setDisability(pdfData.disability || '');
      setHeight(pdfData.heightCM || '');
      setWeight(pdfData.weightKG.replace(/kg/i, '').trim() || '');
      setBloodGroup(pdfData.bloodGroup || '');
      setComplexion(pdfData.complexion || '');
      setMaritalStatus(pdfData.maritalStatus || '');
      setFatherName(pdfData.fatherName || '');
      setMotherName(pdfData.motherName || '');
      setHometown(pdfData.nativePlace || '');
      setSiblings(pdfData.siblingCount || '');
      setFamilyIncome(pdfData.maxAnnualIncomeFamily || '');
      setFamilyType(pdfData.familyType || '');
      setHighestQualification(pdfData.highestDegree || '');
      setAdditionalQualification(pdfData.additionalQualification || '');
      setOccupation(pdfData.occupation || '');
      setCompanyName(pdfData.occupationCompany || '');
      setWorkingWith(pdfData.workingWith || '');
      setMinAnnualIncome(pdfData.minAnnualIncomeIndividual || '');
      setMaxAnnualIncome(pdfData.maxAnnualIncomeIndividual || '');
      setGotra(pdfData.gotra || '');
      setHobbies(pdfData.hobbies || []);
      setResidentialAddress(pdfData.address || '');
      setPhoneNumber(pdfData.phoneNumber || '');
      setEmailAddress(pdfData.email || '');
      setAlternateContact(pdfData.alternateMobileNumber || '');
      setLanguagesKnown(pdfData.languagesKnown || []);
      setCity(pdfData.city || '');
      setState(pdfData.state || '');
      setCountry(pdfData.country || '');
      setGunnMatchingImportant(pdfData.isGunnMatching || false);
      setManglik(pdfData.manglik || '');
      setDietaryHabits(pdfData.dietary || '');
      setDrinking(pdfData.drinking || '');
      setSmoking(pdfData.smoking || '');
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
    if (!skippedBiodata && !backPreferences) {
      extractPDFDataAPI();
    }
    postUserStageAPI();
    getGeneralDataAPI();
  }, [skippedBiodata, backPreferences]);
  useEffect(() => {
    const storedData = localStorage.getItem('matrimonialDetails');
    if (storedData) {
      const matrimonialData = JSON.parse(storedData);
      if ((backPreferences || !skippedBiodata) && matrimonialData) {
        //Tab 1
        setFullName(matrimonialData.firstName || '');
        setTimeOfBirth(matrimonialData.birthTime || '');
        setDateOfBirth(matrimonialData.dateOfBirth || '');
        setPlaceOfBirth(matrimonialData.birthPlace || '');
        //Tab 2
        setGender(matrimonialData.gender || '');
        setDisability(matrimonialData.disabilityStatus || '');
        setHeight(matrimonialData.heightCM || '');
        setWeight(matrimonialData.weightKG || '');
        setHobbies(matrimonialData.hobbies || []);
        setBloodGroup(matrimonialData.bloodGroup || '');
        setComplexion(matrimonialData.complexion || '');
        setMaritalStatus(matrimonialData.maritalStatus || '');
        //Tab 3
        setDietaryHabits(matrimonialData.dietary || '');
        setDrinking(matrimonialData.drinking || '');
        setSmoking(matrimonialData.smoking || '');
        //Tab 4
        setFatherName(matrimonialData.fatherName || '');
        setMotherName(matrimonialData.motherName || '');
        setHometown(matrimonialData.nativePlace || '');
        setSiblings(matrimonialData.siblingCount || '');
        setFamilyIncome(matrimonialData.familyIncomeINR || '');
        setFamilyType(matrimonialData.familyType || '');
        setFamilyBackground(matrimonialData.familyBackground || '');
        //Tab 5
        setHighestQualification(matrimonialData.qualification || '');
        setAdditionalQualification(matrimonialData.additionalQualification || '');
        setOccupation(matrimonialData.occupation || '');
        setCompanyName(matrimonialData.occupationCompany || '');
        setWorkingWith(matrimonialData.workingWith || '');
        setMinAnnualIncome(matrimonialData.minAnnualIncome || '');
        setMaxAnnualIncome(matrimonialData.maxAnnualIncome || '');
        setLanguagesKnown(matrimonialData.languagesKnown || []);
        //Tab 6
        setGotra(matrimonialData.gotra || '');
        setManglik(matrimonialData.manglik || '');
        setGunnMatchingImportant(matrimonialData.isGunnMatchingImportant);
        setIncludeUnknownManglik(matrimonialData.isManglik);
        //Tab 7
        setResidentialAddress(matrimonialData.address || '');
        setPhoneNumber(matrimonialData.phone || '');
        setEmailAddress(matrimonialData.email || '');
        setAlternateContact(matrimonialData.alternateContact || '');
        setCountry(matrimonialData.country || '');
        setState(matrimonialData.occupationLocation || '');
        setCity(matrimonialData.city || '');
      }
    }
  }, [backPreferences, skippedBiodata]);
  return (
    <>
      <BackgroundWrapper>
        <>
          <LoadingOverlay
            loading={isLoading}
            message={'Extracting PDF Data'}
            IconComponent={
              <BallTriangle height={100} width={100} radius={5} color="#f00757" ariaLabel="ball-triangle-loading" visible={true} />
            }
            showSubLoader={true}
          />
          <>
            {/* Back Button */}
            <Grid item xs={12} sx={{ textAlign: 'left', mb: 2 }}>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  sessionStorage.setItem('allowedRoute', '/upload-biodata');
                  navigate('/upload-biodata', { replace: true });
                }}
                className="buttonStyleOutlined"
              >
                &lt; Back
              </Button>
            </Grid>
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
              <TabStep1
                fullName={fullName}
                setFullName={setFullName}
                timeOfBirth={timeOfBirth ? dayjs(timeOfBirth, 'HH:mm') : null}
                setTimeOfBirth={(value) => setTimeOfBirth(value ? value.format('HH:mm') : null)}
                dateOfBirth={dateOfBirth ? dayjs(dateOfBirth) : null}
                setDateOfBirth={(value) => setDateOfBirth(value ? value.format('YYYY-MM-DD') : null)}
                placeOfBirth={placeOfBirth}
                setPlaceOfBirth={setPlaceOfBirth}
                setIsStepValid={setIsStepValid}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={1}>
              <TabStep2
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
                isStepValid={isStepValid}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={2}>
              <TabStep3
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
              <TabStep4
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
                selectedIncomeRange={selectedIncomeRange}
                setSelectedIncomRange={setSelectedIncomRange}
                familyTypeOptions={familyTypeData || []}
                familyBackgroundData={familyBackgroundData || []}
                siblingOptions={siblingOptionsData || []}
                incomeOptions={incomeOptionsData || []}
                setIsStepValid={setIsStepValid}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={4}>
              <TabStep5
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
                setAnnualIncome={setAnnualIncome}
                annualIncome={annualIncome}
              />
            </TabPanel>
            <TabPanel value={tabIndex} index={5}>
              <TabStep6
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
                setIsStepValid={setIsStepValid}
                setCompletedSteps={setCompletedSteps}
              />
            </TabPanel>
            {/* Buttons */}
            <Grid item xs={12}>
              <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handlePrevious}
                  disabled={tabIndex === 0}
                  className="buttonStyleOutlined"
                >
                  Previous
                </Button>

                <Button variant="contained" className="buttonStyle" onClick={handleNext} disabled={isLoading || !isStepValid}>
                  Continue
                </Button>
              </Stack>
            </Grid>
          </>
        </>
      </BackgroundWrapper>
    </>
  );
};
export default PersonalDetails;
