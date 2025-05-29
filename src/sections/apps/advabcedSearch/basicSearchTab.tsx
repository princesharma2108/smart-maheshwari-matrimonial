import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// project-imports
import MainCard from 'components/MainCard';

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
  const theme = useTheme();

  const commonSelectProps = {
    fullWidth: true,
    displayEmpty: true,
    className: 'inputFieldLogin',
    sx: { minWidth: 250 }
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="">
          <Grid container spacing={3}>
            {/* Marital Status */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="marital-status">Marital Status</InputLabel>
                <Select value={maritalStatus} onChange={(e) => setMaritalStatus(e.target.value)} {...commonSelectProps}>
                  <MenuItem value="" disabled sx={{ whiteSpace: 'nowrap' }}>
                    Select Marital Status
                  </MenuItem>
                  {maritalOptionsData.map((status, index) => (
                    <MenuItem key={index} value={status} sx={{ whiteSpace: 'nowrap' }}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Age */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="min-age">Min Age</InputLabel>
                    <Select value={minAge} onChange={(e) => setMinAge(e.target.value)} {...commonSelectProps}>
                      <MenuItem value="" disabled sx={{ whiteSpace: 'nowrap' }}>
                        Select Min Age
                      </MenuItem>
                      {ageOptions.map((age) => (
                        <MenuItem key={age} value={age.toString()} sx={{ whiteSpace: 'nowrap' }}>
                          {age}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="max-age">Max Age</InputLabel>
                    <Select value={maxAge} onChange={(e) => setMaxAge(e.target.value)} {...commonSelectProps}>
                      <MenuItem value="" disabled sx={{ whiteSpace: 'nowrap' }}>
                        Select Max Age
                      </MenuItem>
                      {ageOptions
                        .filter((age) => minAge === '' || Number(age) >= Number(minAge))
                        .map((age) => (
                          <MenuItem key={age} value={age.toString()} sx={{ whiteSpace: 'nowrap' }}>
                            {age}
                          </MenuItem>
                        ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Height */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="min-height">Min Height (cm)</InputLabel>
                    <Select value={minHeight} onChange={(e) => setMinHeight(e.target.value)} {...commonSelectProps}>
                      <MenuItem value="" disabled sx={{ whiteSpace: 'nowrap' }}>
                        Select Min Height
                      </MenuItem>
                      {heightData.map((height, index) => (
                        <MenuItem key={index} value={height} sx={{ whiteSpace: 'nowrap' }}>
                          {height} cm
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="max-height">Max Height (cm)</InputLabel>
                    <Select value={maxHeight} onChange={(e) => setMaxHeight(e.target.value)} {...commonSelectProps}>
                      <MenuItem value="" disabled sx={{ whiteSpace: 'nowrap' }}>
                        Select Max Height
                      </MenuItem>
                      {heightData
                        .filter((height) => minHeight === '' || height >= minHeight)
                        .map((height, index) => (
                          <MenuItem key={index} value={height} sx={{ whiteSpace: 'nowrap' }}>
                            {height} cm
                          </MenuItem>
                        ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Select value={location} onChange={(e) => setLocation(e.target.value)} {...commonSelectProps}>
                  <MenuItem value="" disabled sx={{ whiteSpace: 'nowrap' }}>
                    Select Location
                  </MenuItem>
                  {locationData.map((loc, index) => (
                    <MenuItem key={index} value={loc} sx={{ whiteSpace: 'nowrap' }}>
                      {loc}
                    </MenuItem>
                  ))}
                  <MenuItem value="No Preference" sx={{ whiteSpace: 'nowrap' }}>
                    No Preference
                  </MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
