import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Button, MenuItem, InputLabel, Select, SelectChangeEvent, Checkbox, FormControlLabel } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import 'assets/styles/styles.scss';

interface LifestylePreferencesProps {
  drinking: string;
  setDrinking: (value: string) => void;
  smoking: string;
  setSmoking: (value: string) => void;
  dietaryHabits: string;
  setDietaryHabits: (value: string) => void;
  nonNegotiableDrinking: string;
  setNonNegotiableDrinking: (value: string) => void;
  nonNegotiableSmoking: string;
  setNonNegotiableSmoking: (value: string) => void;
  nonNegotiableDietary: string;
  setNonNegotiableDietary: (value: string) => void;
  drinkingOptions: string[];
  smokingOptions: string[];
  dietaryOptions: string[];
}

export default function LifestylePreferences({
  drinking,
  setDrinking,
  smoking,
  setSmoking,
  dietaryHabits,
  setDietaryHabits,
  nonNegotiableDrinking,
  setNonNegotiableDrinking,
  nonNegotiableSmoking,
  setNonNegotiableSmoking,
  nonNegotiableDietary,
  setNonNegotiableDietary,
  drinkingOptions = [],
  smokingOptions = [],
  dietaryOptions = []
}: LifestylePreferencesProps) {
  const navigate = useNavigate();

  const handleSelectChange = (setter: (value: string) => void) => (event: SelectChangeEvent) => setter(event.target.value);

  const handleCheckboxToggle = (setter: (value: string) => void, value: string, currentValue: string) => {
    setter(currentValue ? '' : value.replace(/\s/g, '')); // Toggles between '' and value
  };

  const getOptions = (options: string[]) => [...options.sort(), 'No Preference'];
  console.log('nonNegotiableDietary', nonNegotiableDietary);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Lifestyle Preferences">
          <Grid container spacing={3}>
            {[
              {
                label: 'Drinking',
                value: drinking,
                setter: setDrinking,
                nonNegotiable: nonNegotiableDrinking,
                setNonNegotiable: setNonNegotiableDrinking,
                options: drinkingOptions
              },
              {
                label: 'Smoking',
                value: smoking,
                setter: setSmoking,
                nonNegotiable: nonNegotiableSmoking,
                setNonNegotiable: setNonNegotiableSmoking,
                options: smokingOptions
              },
              {
                label: 'Dietary Habits',
                value: dietaryHabits,
                setter: setDietaryHabits,
                nonNegotiable: nonNegotiableDietary,
                setNonNegotiable: setNonNegotiableDietary,
                options: dietaryOptions
              }
            ].map(({ label, value, setter, nonNegotiable, setNonNegotiable, options }) => (
              <Grid item xs={12} key={label}>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <InputLabel>{label}</InputLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!nonNegotiable}
                          onChange={() => handleCheckboxToggle(setNonNegotiable, label, nonNegotiable)}
                          className="inputFieldCheckbox"
                        />
                      }
                      label="Non-negotiable"
                    />
                  </Stack>
                  <Select fullWidth value={value} onChange={handleSelectChange(setter)} displayEmpty className="inputFieldLogin">
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {getOptions(options).map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
            ))}
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
