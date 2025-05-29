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

// project-imports
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

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
interface BasicSearchTabProps {
  maritalStatus: string;
  setMaritalStatus: (value: string) => void;
  minAge: string;
  setMinAge: (value: string) => void;
  maxAge: string;
  setMaxAge: (value: string) => void;
  minHeight: string;
  setMinHeight: (value: string) => void;
  maxHeight: string;
  setMaxHeight: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  ageOptions: string[];
  heightData: string[];
  locationData: string[];
  maritalOptionsData: string[];
}
export default function BasicSearchTab({
  maritalStatus,
  setMaritalStatus,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  minHeight,
  setMinHeight,
  maxHeight,
  setMaxHeight,
  location,
  setLocation,
  ageOptions,
  heightData,
  locationData,
  maritalOptionsData
}: BasicSearchTabProps) {
  const navigate = useNavigate();
  const theme = useTheme();

  // Handlers for select inputs
  const handleMaritalStatusChange = (event: SelectChangeEvent) => setMaritalStatus(event.target.value);
  const handleMinAgeChange = (event: SelectChangeEvent) => setMinAge(event.target.value);
  const handleMaxAgeChange = (event: SelectChangeEvent) => setMaxAge(event.target.value);
  const handleMinHeightChange = (event: SelectChangeEvent) => setMinHeight(event.target.value);
  const handleMaxHeightChange = (event: SelectChangeEvent) => setMaxHeight(event.target.value);
  const handleLocationChange = (event: SelectChangeEvent) => setLocation(event.target.value);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="">
          <Grid container spacing={3}>
            {/* Marital Status Selection */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="marital-status">Marital Status</InputLabel>
                <Select fullWidth value={maritalStatus} onChange={handleMaritalStatusChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Marital Status
                  </MenuItem>
                  {maritalOptionsData.map((status, index) => (
                    <MenuItem key={index} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Age Selection */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {/* Min Age Dropdown */}
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="min-age">Min Age</InputLabel>
                    <Select fullWidth value={minAge} onChange={handleMinAgeChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Min Age
                      </MenuItem>
                      {ageOptions.map((age) => (
                        <MenuItem key={age} value={age.toString()}>
                          {age}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>

                {/* Max Age Dropdown */}
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="max-age">Max Age</InputLabel>
                    <Select fullWidth value={maxAge} onChange={handleMaxAgeChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Max Age
                      </MenuItem>
                      {ageOptions
                        .filter((age) => minAge === '' || Number(age) >= Number(minAge)) // Filter max age options
                        .map((age) => (
                          <MenuItem key={age} value={age.toString()}>
                            {age}
                          </MenuItem>
                        ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Height Selection */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                {/* Min Height Dropdown */}
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="min-height">Min Height (cm)</InputLabel>
                    <Select fullWidth value={minHeight} onChange={handleMinHeightChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Min Height
                      </MenuItem>
                      {heightData.map((height, index) => (
                        <MenuItem key={index} value={height}>
                          {height} cm
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>

                {/* Max Height Dropdown */}
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="max-height">Max Height (cm)</InputLabel>
                    <Select fullWidth value={maxHeight} onChange={handleMaxHeightChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Max Height
                      </MenuItem>
                      {heightData
                        .filter((height) => minHeight === '' || height >= minHeight) // Filter max height options
                        .map((height, index) => (
                          <MenuItem key={index} value={height}>
                            {height} cm
                          </MenuItem>
                        ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Location Selection */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Select fullWidth value={location} onChange={handleLocationChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Location
                  </MenuItem>
                  {locationData.map((loc, index) => (
                    <MenuItem key={index} value={loc}>
                      {loc}
                    </MenuItem>
                  ))}
                  <MenuItem value="No Preference">No Preference</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
