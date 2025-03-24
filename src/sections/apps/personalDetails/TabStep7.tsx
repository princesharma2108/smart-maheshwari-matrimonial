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
interface TabStep7Props {
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
}
export default function TabStep7({
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
  setCity
}: TabStep7Props) {
  const theme = useTheme();
  const navigate = useNavigate();

  // Handlers
  const handleResidentialAddressChange = (event: ChangeEvent<HTMLInputElement>) => setResidentialAddress(event.target.value);
  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => setPhoneNumber(event.target.value);
  const handleEmailAddressChange = (event: ChangeEvent<HTMLInputElement>) => setEmailAddress(event.target.value);
  const handleAlternateContactChange = (event: ChangeEvent<HTMLInputElement>) => setAlternateContact(event.target.value);
  const handleCountryChange = (event: SelectChangeEvent) => setCountry(event.target.value);
  const handleStateChange = (event: SelectChangeEvent) => setState(event.target.value);
  const handleCityChange = (event: SelectChangeEvent) => setCity(event.target.value);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Contact Information">
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="residential-address">Residential Address</InputLabel>
                    <TextField
                      fullWidth
                      id="residential-address"
                      placeholder="Enter Residential Address"
                      value={residentialAddress}
                      onChange={handleResidentialAddressChange}
                      autoFocus
                      className="inputField"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="phone-number">Phone Number</InputLabel>
                    <TextField
                      fullWidth
                      id="phone-number"
                      placeholder="Enter Phone Number"
                      value={phoneNumber}
                      onChange={handlePhoneNumberChange}
                      className="inputField"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="email-address">Email Address</InputLabel>
                    <TextField
                      fullWidth
                      id="email-address"
                      placeholder="Enter Email Address"
                      value={emailAddress}
                      onChange={handleEmailAddressChange}
                      className="inputField"
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
                      onChange={handleAlternateContactChange}
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
                    <InputLabel htmlFor="country">Country</InputLabel>
                    <Select fullWidth id="country" value={country} onChange={handleCountryChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Country
                      </MenuItem>
                      <MenuItem value="USA">USA</MenuItem>
                      <MenuItem value="Canada">Canada</MenuItem>
                      <MenuItem value="India">India</MenuItem>
                      <MenuItem value="UK">UK</MenuItem>
                      <MenuItem value="Australia">Australia</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="state">State</InputLabel>
                    <Select fullWidth id="state" value={state} onChange={handleStateChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select State
                      </MenuItem>
                      <MenuItem value="California">California</MenuItem>
                      <MenuItem value="Texas">Texas</MenuItem>
                      <MenuItem value="New York">New York</MenuItem>
                      <MenuItem value="Florida">Florida</MenuItem>
                      <MenuItem value="Illinois">Illinois</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="city">City</InputLabel>
                    <Select fullWidth id="city" value={city} onChange={handleCityChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select City
                      </MenuItem>
                      <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                      <MenuItem value="Houston">Houston</MenuItem>
                      <MenuItem value="Chicago">Chicago</MenuItem>
                      <MenuItem value="Miami">Miami</MenuItem>
                      <MenuItem value="San Francisco">San Francisco</MenuItem>
                    </Select>
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
