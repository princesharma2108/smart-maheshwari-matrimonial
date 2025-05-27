import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { LocalizationProvider, TimePicker, DatePicker, renderTimeViewClock } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

import { ThemeMode, facebookColor, linkedInColor } from 'config';
import defaultImages from 'assets/images/users/default.png';

// assets
import { Apple, Camera, Facebook, Google } from 'iconsax-react';
import Autocomplete from '@mui/material/Autocomplete';
import 'assets/styles/styles.scss';
import { useNavigate } from 'react-router-dom';
import { boolean } from 'yup';
import Address from 'pages/apps/address/address';
// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

interface TabStep1Props {
  fullName: string;
  setFullName: (value: string) => void;
  timeOfBirth: Dayjs | null;
  setTimeOfBirth: (value: Dayjs | null) => void;
  dateOfBirth: Dayjs | null;
  setDateOfBirth: (value: Dayjs | null) => void;
  placeOfBirth: string;
  setPlaceOfBirth: (value: string) => void;
  //isStepValid: boolean;
  setIsStepValid: (value: boolean) => void;
  //handleStepValidation: (index: number, value: boolean) => void;
}

export default function TabStep1({
  fullName,
  setFullName,
  timeOfBirth,
  setTimeOfBirth,
  dateOfBirth,
  setDateOfBirth,
  placeOfBirth,
  setPlaceOfBirth,
  // isStepValid,
  setIsStepValid
  // handleStepValidation
}: TabStep1Props) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  const [homeAddress, setSelectedHomeAddress] = useState('');
  const [city, setSelectedCity] = useState('');
  const [state, setSelectedState] = useState('');
  const [country, setSelectedCountry] = useState('');
  const [zipCode, setSelectedZipCode] = useState('');
  const [errors, setErrors] = useState({
    fullName: '',
    timeOfBirth: '',
    dateOfBirth: '',
    placeOfBirth: ''
  });
  // Fetch place suggestions
  const fetchPlaces = async (query: string) => {
    if (!query) return;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await response.json();

    setPlaceOptions(data.map((place: any) => place.display_name));
  };
  const validateStep = () => {
    let newErrors = { fullName: '', timeOfBirth: '', dateOfBirth: '', placeOfBirth: '' };

    if (!fullName.trim()) newErrors.fullName = 'This field is required.';
    if (!timeOfBirth) newErrors.timeOfBirth = 'This field is required.';
    if (!dateOfBirth) newErrors.dateOfBirth = 'This field is required.';
    if (!placeOfBirth.trim()) newErrors.placeOfBirth = 'This field is required.';

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid); // Update parent state
    // handleStepValidation(1, isValid);
    return isValid;
  };
  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [fullName, timeOfBirth, dateOfBirth, placeOfBirth]);
  console.log('Address1=>', placeOfBirth);
  console.log('Address2=>', city);
  console.log('Address3=>', state);
  console.log('Address4=>', country);
  console.log('Address5=>', zipCode);
  const handleHomeAddressChange = (homeAddress: any) => {
    setPlaceOfBirth(homeAddress);
  };
  const handleCityAddressChange = (city: any) => {
    setSelectedCity(city);
  };
  const handleStateAddressChange = (state: any) => {
    setSelectedState(state);
  };
  const handleCountryAddressChange = (country: any) => {
    setSelectedCountry(country);
  };
  const handleZipAddressChange = (zip: any) => {
    setSelectedZipCode(zip);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Let's know you better">
          <Grid container spacing={3}>
            {/* First Name */}
            <Grid item xs={12} sm={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-full-name">
                  Full Name <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <TextField
                  fullWidth
                  id="personal-full-name"
                  placeholder="Full Name"
                  className="inputField"
                  value={fullName}
                  onChange={(e) => {
                    let value = e.target.value;

                    // Allow only letters, hyphens, and spaces
                    value = value.replace(/[^A-Za-z\- ]/g, '');
                    setFullName(value);
                  }}
                  onBlur={() => {
                    const wordCount = fullName.trim().split(/\s+/).length;

                    // Only validate if there are exactly 3 words
                    if (wordCount === 3) {
                      const regex = /^[A-Za-z\-]+ [A-Za-z\-]+ [A-Za-z\-]+$/;

                      if (!regex.test(fullName.trim())) {
                        setErrors((prev) => ({
                          ...prev,
                          fullName: 'Exactly three words (each can have hyphens), separated by a single space.'
                        }));
                        return;
                      }
                    }

                    // Clear error for < 3 words or valid 3-word input
                    setErrors((prev) => ({ ...prev, fullName: '' }));
                  }}
                  error={!!errors.fullName}
                  helperText={errors.fullName}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-time-of-birth">
                  Time of Birth <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={timeOfBirth}
                    onChange={(newValue) => setTimeOfBirth(newValue)}
                    viewRenderers={{
                      hours: renderTimeViewClock,
                      minutes: renderTimeViewClock,
                      seconds: renderTimeViewClock
                    }}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.timeOfBirth, // ✅ Show error
                        helperText: errors.timeOfBirth, // ✅ Display error message
                        onBlur: validateStep, // ✅ Moved inside slotProps.textField
                        inputProps: { readOnly: true }
                      }
                    }}
                    className="inputField" // ✅ Correct way to pass props
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-date-of-birth">
                  Date of Birth <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dateOfBirth ? dayjs(dateOfBirth) : null}
                    onChange={(newValue) => setDateOfBirth(newValue)}
                    format="DD-MM-YYYY"
                    maxDate={dayjs().subtract(18, 'year')}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        error: !!errors.dateOfBirth, // ✅ Show error if validation fails
                        helperText: errors.dateOfBirth,
                        onBlur: validateStep, // ✅ Display error message
                        inputProps: { readOnly: true }
                      }
                    }}
                    className="inputField" // ✅ Correct prop usage
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            <>
              {/* Place of Birth Autocomplete */}
              {/* <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-place-of-birth">
                  Place of Birth <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Autocomplete
                  freeSolo
                  options={placeOptions}
                  value={placeOfBirth}
                  onInputChange={(event, newInputValue) => {
                    setPlaceOfBirth(newInputValue);
                    fetchPlaces(newInputValue);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Enter place of birth"
                      fullWidth
                      onBlur={validateStep}
                      error={!!errors.placeOfBirth}
                      helperText={errors.placeOfBirth}
                    />
                  )}
                  className="inputField"
                />
              </Stack>
            </Grid> */}
            </>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-place-of-birth">
                  Place of Birth <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Address
                  fieldName={'Place of Birth'}
                  //addressCountryFilters={['us']}
                  initialAddress={placeOfBirth}
                  placeholder="Place of Birth"
                  handleAddressChange={handleHomeAddressChange}
                  handleCityChange={handleCityAddressChange}
                  handleStateChange={handleStateAddressChange}
                  handleCountryChange={handleCountryAddressChange}
                  handleZipChange={handleZipAddressChange}
                  handleLatitudeChange={function (latitude: number): void {
                    throw new Error('Function not implemented.');
                  }}
                  handleLongitudeChange={function (longitude: number): void {
                    throw new Error('Function not implemented.');
                  }}
                  onBlur={validateStep}
                  error={!!errors.placeOfBirth}
                  helperText={errors.placeOfBirth}
                />
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
