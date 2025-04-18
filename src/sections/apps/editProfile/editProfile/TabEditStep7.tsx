import { useState, ChangeEvent, useEffect } from 'react';

// Material-UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
// Project Imports
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import 'assets/styles/styles.scss';
import Address from 'pages/apps/address/address';
interface TabEditStep7Props {
  residentialAddress: string;
  setResidentialAddress: (value: string) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  emailAddress: string;
  setEmailAddress: (value: string) => void;
  alternateContact: string;
  setAlternateContact: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  state: string;
  setState: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  setIsStepValid: (value: boolean) => void;
}
export default function TabEditStep7({
  residentialAddress,
  setResidentialAddress,
  phoneNumber,
  setPhoneNumber,
  emailAddress,
  setEmailAddress,
  alternateContact,
  setAlternateContact,
  country,
  setCountry,
  state,
  setState,
  city,
  setCity,
  setIsStepValid
}: TabEditStep7Props) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    residentialAddress: '',
    phoneNumber: '',
    emailAddress: '',
    country: '',
    state: '',
    city: ''
  });
  const [homeAddress, setSelectedHomeAddress] = useState('');
  const [zipCode, setSelectedZipCode] = useState('');
  // Handlers
  const handleResidentialAddressChange = (event: ChangeEvent<HTMLInputElement>) => setResidentialAddress(event.target.value);
  const validateStep = () => {
    let newErrors = {
      residentialAddress: '',
      phoneNumber: '',
      emailAddress: '',
      country: '',
      state: '',
      city: ''
    };

    if (!residentialAddress) newErrors.residentialAddress = 'This field is required.';
    if (!country) newErrors.country = 'This field is required.';
    if (!state) newErrors.state = 'This field is required.';
    if (!city) newErrors.city = 'This field is required.';

    // Validate Email
    if (!emailAddress) {
      newErrors.emailAddress = 'This field is required.';
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailAddress)) {
      newErrors.emailAddress = 'Please enter a valid email address.';
    }

    // ✅ Validate Phone Number (Only 10 Digits Allowed)
    if (!phoneNumber) {
      newErrors.phoneNumber = 'This field is required.';
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      newErrors.phoneNumber = 'Phone number must be exactly 10 digits.';
    }

    setErrors(newErrors);

    // ✅ `validateStep` will return `false` if any error exists
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid);

    return isValid;
  };

  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [residentialAddress, phoneNumber, emailAddress, country, state, city]);
  const handleHomeAddressChange = (homeAddress: any) => {
    setSelectedHomeAddress(homeAddress);
  };
  const handleCityAddressChange = (city: any) => {
    setCity(city);
  };
  const handleStateAddressChange = (state: any) => {
    setState(state);
  };
  const handleCountryAddressChange = (country: any) => {
    setCountry(country);
  };
  const handleZipAddressChange = (zip: any) => {
    setSelectedZipCode(zip);
  };
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Contact Information">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="residential-address">
                      Residential Address<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="residential-address"
                      placeholder="Enter Residential Address"
                      value={residentialAddress}
                      onChange={(e) => {
                        const cleanedValue = e.target.value.replace(/[^a-zA-Z0-9\s]/g, '');
                        setResidentialAddress(cleanedValue);
                      }}
                      autoFocus
                      className="inputField"
                      onBlur={validateStep}
                      error={!!errors.residentialAddress}
                      helperText={errors.residentialAddress}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phone-number">
                      Phone Number<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="phone-number"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Allow only digits and limit to 10 characters
                        value = value.replace(/\D/g, '').slice(0, 10);

                        setPhoneNumber(value);
                      }}
                      onBlur={() => {
                        if (phoneNumber.length !== 10) {
                          setErrors((prev) => ({
                            ...prev,
                            phoneNumber: 'Phone number must be exactly 10 digits.'
                          }));
                        } else {
                          setErrors((prev) => ({ ...prev, phoneNumber: '' }));
                        }
                      }}
                      className="inputField"
                      error={!!errors.phoneNumber}
                      helperText={errors.phoneNumber}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-address">
                      Email Address<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      id="email-address"
                      placeholder="Enter Email Address"
                      value={emailAddress}
                      onChange={(e) => {
                        setEmailAddress(e.target.value);
                      }}
                      onBlur={validateStep} // ✅ Validate on blur
                      className="inputField"
                      error={!!errors.emailAddress}
                      helperText={errors.emailAddress}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="alternate-contact">Alternate Contact (If Any)</InputLabel>
                    <TextField
                      fullWidth
                      id="alternate-contact"
                      placeholder="Enter Alternate Contact Number"
                      value={alternateContact}
                      onChange={(e) => {
                        let value = e.target.value;

                        // Allow only digits and limit to 10 characters
                        value = value.replace(/\D/g, '').slice(0, 10);

                        setAlternateContact(value);
                      }}
                      onBlur={() => {
                        if (alternateContact && alternateContact.length !== 10) {
                          setErrors((prev) => ({
                            ...prev,
                            alternateContact: 'Alternate contact must be exactly 10 digits.'
                          }));
                        } else {
                          setErrors((prev) => ({ ...prev, alternateContact: '' }));
                        }
                      }}
                      className="inputField"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="country">
                      Country<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Address
                      fieldName={''}
                      //addressCountryFilters={['us']}
                      initialAddress={country}
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
                      error={!!errors.country}
                      helperText={errors.country}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="state">
                      State<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Address
                      fieldName={''}
                      //addressCountryFilters={['us']}
                      initialAddress={state}
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
                      error={!!errors.state}
                      helperText={errors.state}
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="city">
                      City<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Address
                      fieldName={''}
                      //addressCountryFilters={['us']}
                      initialAddress={city}
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
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
