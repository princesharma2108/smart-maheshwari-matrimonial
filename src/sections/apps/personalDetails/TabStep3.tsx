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
  setIsStepValid: (value: boolean) => void;
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
  drinkingOptions = [],
  setIsStepValid
}: TabStep3Props) {
  const theme = useTheme();
  const [errors, setErrors] = useState({
    drinking: '',
    smoking: '',
    dietaryHabits: ''
  });
  // Handlers
  const handleDrinkingChange = (event: SelectChangeEvent) => setDrinking(event.target.value);
  const handleSmokingChange = (event: SelectChangeEvent) => setSmoking(event.target.value);
  const handleDietaryHabitsChange = (event: SelectChangeEvent) => setDietaryHabits(event.target.value);
  const validateStep = () => {
    let newErrors = { drinking: '', smoking: '', dietaryHabits: '' };

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
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Lifestyle">
          <Grid container spacing={3}>
            {/* Drinking Habits */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="drinking-habits">
                  Drinking Habits<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  value={drinking}
                  onChange={handleDrinkingChange}
                  displayEmpty
                  className="inputFieldLogin"
                  onBlur={validateStep}
                  error={!!errors.drinking}
                >
                  <MenuItem value="" disabled>
                    Select Drinking Habits
                  </MenuItem>
                  {drinkingOptions?.map((option: string) => (
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
                <InputLabel htmlFor="smoking-habits">
                  Smoking Habits <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  value={smoking}
                  onChange={handleSmokingChange}
                  displayEmpty
                  className="inputFieldLogin"
                  onBlur={validateStep}
                  error={!!errors.drinking}
                >
                  <MenuItem value="" disabled>
                    Select Smoking Habits
                  </MenuItem>
                  {smokingOptions?.map((option: string) => (
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
                <InputLabel htmlFor="dietary-habits">
                  Dietary Habits <span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  value={dietaryHabits}
                  onChange={handleDietaryHabitsChange}
                  displayEmpty
                  className="inputFieldLogin"
                  onBlur={validateStep}
                  error={!!errors.drinking}
                >
                  <MenuItem value="" disabled>
                    Select Dietary Habits
                  </MenuItem>
                  {dietaryOptions?.map((option) => (
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
