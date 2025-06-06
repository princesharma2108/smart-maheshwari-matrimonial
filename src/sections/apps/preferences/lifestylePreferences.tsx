import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Button, MenuItem, InputLabel, Select, SelectChangeEvent, Checkbox, FormControlLabel } from '@mui/material';
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import 'assets/styles/styles.scss';
import { ka } from 'date-fns/locale';

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
  setIsStepValid: (value: boolean) => void;
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
  dietaryOptions = [],
  setIsStepValid
}: LifestylePreferencesProps) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    drinking: '',
    smoking: '',
    dietaryHabits: ''
  });

  const handleSelectChange = (setter: (value: string) => void) => (event: SelectChangeEvent) => setter(event.target.value);

  const handleCheckboxToggle = (setter: (value: string) => void, value: string, currentValue: string) => {
    setter(currentValue ? '' : value.replace(/\s/g, '')); // Toggles between '' and value
  };

  const getOptions = (options: string[]) => [...options.sort(), 'No Preference'];
  const validateStep = () => {
    let newErrors = {
      drinking: '',
      smoking: '',
      dietaryHabits: ''
    };
    if (!drinking) newErrors.drinking = 'This field is required.';
    if (!smoking) newErrors.smoking = 'This field is required.';
    if (!dietaryHabits) newErrors.dietaryHabits = 'This field is required.';

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid); // Update parent state
    return isValid;
  };

  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [drinking, smoking, dietaryHabits]);
  useEffect(() => {
    if (drinking === 'No Preference') setNonNegotiableDrinking('');
    if (smoking === 'No Preference') setNonNegotiableSmoking('');
    if (dietaryHabits === 'No Preference') setNonNegotiableDietary('');
  }, [drinking, smoking, dietaryHabits]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Help us understand what you're looking for in a partner so we can show you the best matches.">
          <Grid container spacing={3}>
            {[
              {
                label: 'Drinking',
                key: 'drinking',
                value: drinking,
                setter: setDrinking,
                nonNegotiable: nonNegotiableDrinking,
                setNonNegotiable: setNonNegotiableDrinking,
                options: drinkingOptions
              },
              {
                label: 'Smoking',
                key: 'smoking',
                value: smoking,
                setter: setSmoking,
                nonNegotiable: nonNegotiableSmoking,
                setNonNegotiable: setNonNegotiableSmoking,
                options: smokingOptions
              },
              {
                label: 'Dietary Habits',
                key: 'dietaryHabits',
                value: dietaryHabits,
                setter: setDietaryHabits,
                nonNegotiable: nonNegotiableDietary,
                setNonNegotiable: setNonNegotiableDietary,
                options: dietaryOptions
              }
            ].map(({ label, key, value, setter, nonNegotiable, setNonNegotiable, options }) => (
              <Grid item xs={12} key={label}>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <InputLabel>
                      {label}
                      <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!nonNegotiable}
                          onChange={() => handleCheckboxToggle(setNonNegotiable, key, nonNegotiable)}
                          className="inputFieldCheckbox"
                          disabled={!value || value === 'No Preference'}
                        />
                      }
                      label="Non-negotiable"
                    />
                  </Stack>
                  <Select
                    fullWidth
                    value={value}
                    onChange={handleSelectChange(setter)}
                    displayEmpty
                    className="inputFieldLogin"
                    onBlur={validateStep}
                    error={!!value}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {[...options.sort(), 'No Preference'].map((option) => (
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
