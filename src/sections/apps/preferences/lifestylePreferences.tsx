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

// ==============================|| ACCOUNT PROFILE - LIFESTYLE PREFERENCES ||============================== //

export default function LifestylePreferences() {
  const theme = useTheme();

  // State Variables
  const [drinking, setDrinking] = useState('');
  const [smoking, setSmoking] = useState('');
  const [dietaryHabits, setDietaryHabits] = useState('');

  // Handlers
  const handleDrinkingChange = (event: SelectChangeEvent) => setDrinking(event.target.value);
  const handleSmokingChange = (event: SelectChangeEvent) => setSmoking(event.target.value);
  const handleDietaryHabitsChange = (event: SelectChangeEvent) => setDietaryHabits(event.target.value);

  // Common options
  const options = ['Yes', 'No', 'Occasionally', 'No Preference'];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Lifestyle Preferences">
          <Grid container spacing={3}>
            {/* Drinking */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="drinking">Drinking</InputLabel>
                <Select fullWidth value={drinking} onChange={handleDrinkingChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Smoking */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="smoking">Smoking</InputLabel>
                <Select fullWidth value={smoking} onChange={handleSmokingChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {options.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Dietary Habits */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="dietary-habits">Dietary Habits</InputLabel>
                <Select fullWidth value={dietaryHabits} onChange={handleDietaryHabitsChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {options.map((option) => (
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
