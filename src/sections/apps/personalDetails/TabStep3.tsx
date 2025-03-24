import { useState, ChangeEvent, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import 'assets/styles/styles.scss';
// project-imports
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //
interface TabStep3Props {
  drinking: string;
  setDrinking: (value: string) => void;
  smoking: string;
  setSmoking: (value: string) => void;
  dietaryHabits: string;
  setDietaryHabits: (value: string) => void;
  drinkingOptions: any;
  smokingOptions: string[];
  dietaryOptions: string[];
}
export default function TabStep3({
  drinking,
  setDrinking,
  smoking,
  setSmoking,
  dietaryHabits,
  setDietaryHabits,
  dietaryOptions = [],
  smokingOptions = [],
  drinkingOptions = []
}: TabStep3Props) {
  const theme = useTheme();

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
                  {drinkingOptions?.sort().map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
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
                  {smokingOptions?.sort().map((option: string) => (
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
                    Select Dietary Habits
                  </MenuItem>
                  {dietaryOptions?.sort().map((option) => (
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
    </Grid>
  );
}
