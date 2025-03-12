import { useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

export default function TabEditStep3() {
  const theme = useTheme();

  // State Variables
  const [drinking, setDrinking] = useState('');
  const [smoking, setSmoking] = useState('');
  const [dietaryHabits, setDietaryHabits] = useState('');

  // Handlers
  const handleDrinkingChange = (event: SelectChangeEvent) => setDrinking(event.target.value);
  const handleSmokingChange = (event: SelectChangeEvent) => setSmoking(event.target.value);
  const handleDietaryHabitsChange = (event: SelectChangeEvent) => setDietaryHabits(event.target.value);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Lifestyle">
          <Grid container spacing={3}>
            {/* Drinking Habits */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="drinking-habits">Drinking Habits</InputLabel>
                <Select fullWidth value={drinking} onChange={handleDrinkingChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Drinking Habits
                  </MenuItem>
                  <MenuItem value="Never">Never</MenuItem>
                  <MenuItem value="Occasionally">Occasionally</MenuItem>
                  <MenuItem value="Frequently">Frequently</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* Smoking Habits */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="smoking-habits">Smoking Habits</InputLabel>
                <Select fullWidth value={smoking} onChange={handleSmokingChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Smoking Habits
                  </MenuItem>
                  <MenuItem value="Non-Smoker">Non-Smoker</MenuItem>
                  <MenuItem value="Occasionally">Occasionally</MenuItem>
                  <MenuItem value="Regularly">Regularly</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* Dietary Habits */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="dietary-habits">Dietary Habits</InputLabel>
                <Select fullWidth value={dietaryHabits} onChange={handleDietaryHabitsChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Dietary Habits
                  </MenuItem>
                  <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                  <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                  <MenuItem value="Vegan">Vegan</MenuItem>
                  <MenuItem value="Eggetarian">Eggetarian</MenuItem>
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
