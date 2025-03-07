import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT PROFILE - PERSONAL PREFERENCES ||============================== //

export default function PersonalPreferences() {
  const theme = useTheme();

  // State Variables
  const [age, setAge] = useState('');
  const [familyType, setFamilyType] = useState('');
  const [familyBackground, setFamilyBackground] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  // Handlers
  const handleAgeChange = (event: SelectChangeEvent) => setAge(event.target.value);
  const handleFamilyTypeChange = (event: SelectChangeEvent) => setFamilyType(event.target.value);
  const handleFamilyBackgroundChange = (event: SelectChangeEvent) => setFamilyBackground(event.target.value);
  const handleMaritalStatusChange = (event: SelectChangeEvent) => setMaritalStatus(event.target.value);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Personal Preferences">
          <Grid container spacing={3}>
            {/* Age */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="age">Age</InputLabel>
                <Select fullWidth value={age} onChange={handleAgeChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['No Preference', '<18', '18-25', '26-35', '36-45', '46-60', '60+'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Family Type */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="family-type">Family Type</InputLabel>
                <Select fullWidth value={familyType} onChange={handleFamilyTypeChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['No Preference', 'Nuclear', 'Joint', 'Extended'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Family Background */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="family-background">Family Background</InputLabel>
                <Select fullWidth value={familyBackground} onChange={handleFamilyBackgroundChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['No Preference', 'Traditional', 'Moderate', 'Liberal'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Marital Status */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="marital-status">Marital Status</InputLabel>
                <Select fullWidth value={maritalStatus} onChange={handleMaritalStatusChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['No Preference', 'Single', 'Married', 'Divorced', 'Widowed'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Navigation Buttons */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Previous
          </Button>
          <Button variant="contained" className="buttonStyle">
            Continue
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
