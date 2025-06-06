import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

// project-imports
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';
import 'assets/styles/styles.scss';

interface AdditionalPreferencesProps {
  qualification: string;
  setQualification: (value: string) => void;
  profession: string;
  setProfession: (value: string) => void;
  workingWith: string;
  setWorkingWith: (value: string) => void;
  location: string;
  setLocation: (value: string) => void;
  hobbies: string[];
  setHobbies: (value: string[]) => void;
  nonNegotiableQualification: string;
  setNonNegotiableQualification: (value: string) => void;
  nonNegotiableProfession: string;
  setNonNegotiableProfession: (value: string) => void;
  nonNegotiableWorkingWith: string;
  setNonNegotiableWorkingWith: (value: string) => void;
  nonNegotiableLocation: string;
  setNonNegotiableLocation: (value: string) => void;
  nonNegotiableHobbies: string;
  setNonNegotiableHobbies: (value: string) => void;
  professionData: string[];
  qualificationData: string[];
  hobbiesData: string[];
  locationData: string[];
  workingWithOptionsData: string[];
  setIsStepValid: (value: boolean) => void;
}

export default function AdditionalPreferences({
  qualification,
  setQualification,
  profession,
  setProfession,
  workingWith,
  setWorkingWith,
  location,
  setLocation,
  hobbies,
  setHobbies,
  nonNegotiableQualification,
  setNonNegotiableQualification,
  nonNegotiableProfession,
  setNonNegotiableProfession,
  nonNegotiableWorkingWith,
  setNonNegotiableWorkingWith,
  nonNegotiableLocation,
  setNonNegotiableLocation,
  nonNegotiableHobbies,
  setNonNegotiableHobbies,
  professionData = [],
  qualificationData = [],
  hobbiesData = [],
  locationData = [],
  workingWithOptionsData = [],
  setIsStepValid
}: AdditionalPreferencesProps) {
  const theme = useTheme();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({
    qualification: '',
    profession: '',
    workingWith: '',
    location: '',
    hobbies: ''
  });
  const handleChange = (setter: (value: string) => void) => (event: SelectChangeEvent) => {
    setter(event.target.value);
  };

  const handleCheckboxChange = (setChecked: (value: string) => void, label: string, checked: boolean) => {
    setChecked(checked ? label.replace(/\s/g, '') : '');
  };

  const getOptionsWithNoPreference = (data: string[]) => [...data.sort(), 'No Preference'];
  const validateStep = () => {
    let newErrors = {
      qualification: '',
      profession: '',
      workingWith: '',
      location: '',
      hobbies: ''
    };
    if (!qualification) newErrors.qualification = 'This field is required.';
    if (!profession) newErrors.profession = 'This field is required.';
    if (!workingWith) newErrors.workingWith = 'This field is required.';
    if (!location) newErrors.location = 'This field is required.';
    if (hobbies.length == 0) newErrors.hobbies = 'This field is required.';

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid); // Update parent state
    return isValid;
  };

  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [qualification, profession, workingWith, location, hobbies]);
  useEffect(() => {
    if (qualification === 'No Preference') setNonNegotiableQualification('');
    if (profession === 'No Preference') setNonNegotiableProfession('');
    if (workingWith === 'No Preference') setNonNegotiableWorkingWith('');
    if (location === 'No Preference') setNonNegotiableLocation('');
    // if (hobbies === 'No Preference') setNonNegotiableHobbies('');
  }, [qualification, profession, workingWith, location, hobbies]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Help us understand what you're looking for in a partner so we can show you the best matches.">
          <Grid container spacing={3}>
            {[
              {
                label: 'Qualification',
                key: 'qualification',
                value: qualification,
                setValue: setQualification,
                nonNegotiable: nonNegotiableQualification,
                setNonNegotiable: setNonNegotiableQualification,
                data: qualificationData
              },
              {
                label: 'Location',
                key: 'location',
                value: location,
                setValue: setLocation,
                nonNegotiable: nonNegotiableLocation,
                setNonNegotiable: setNonNegotiableLocation,
                data: locationData
              },
              {
                label: 'Profession',
                key: 'profession',
                value: profession,
                setValue: setProfession,
                nonNegotiable: nonNegotiableProfession,
                setNonNegotiable: setNonNegotiableProfession,
                data: professionData
              },
              {
                label: 'Working With',
                key: 'workingWith',
                value: workingWith,
                setValue: setWorkingWith,
                nonNegotiable: nonNegotiableWorkingWith,
                setNonNegotiable: setNonNegotiableWorkingWith,
                data: workingWithOptionsData
              }
              // {
              //   label: 'Hobbies',
              //   value: hobbies,
              //   setValue: setHobbies,
              //   nonNegotiable: nonNegotiableHobbies,
              //   setNonNegotiable: setNonNegotiableHobbies,
              //   data: hobbiesData
              // }
            ].map(({ label, key, value, setValue, data, nonNegotiable, setNonNegotiable }) => (
              <Grid item xs={12} key={label}>
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <InputLabel htmlFor={label.toLowerCase()}>
                      {label} <span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={!!nonNegotiable}
                          onChange={(e) => handleCheckboxChange(setNonNegotiable, key, e.target.checked)}
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
                    onChange={handleChange(setValue)}
                    displayEmpty
                    className="inputFieldLogin"
                    onBlur={validateStep}
                    error={!!value}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    {[...data.sort(), 'No Preference'].map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </Stack>
              </Grid>
            ))}
            {/* Hobbies */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <InputLabel htmlFor="hobbies">
                    Hobbies <span style={{ color: 'red' }}>*</span>
                  </InputLabel>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!nonNegotiableHobbies}
                        onChange={(e) => setNonNegotiableHobbies(e.target.checked ? 'hobbies' : '')}
                        className="inputFieldCheckbox"
                        disabled={!Array.isArray(hobbies) || hobbies.length === 0}
                      />
                    }
                    label="Non-negotiable"
                  />
                </Stack>
                <Select
                  multiple
                  fullWidth
                  value={Array.isArray(hobbies) ? hobbies : []}
                  onChange={(event) => {
                    setHobbies(event.target.value as string[]);
                  }}
                  displayEmpty
                  className="inputFieldLogin"
                  renderValue={(selected) => (Array.isArray(selected) && selected.length > 0 ? selected.join(', ') : 'Select Hobby')}
                  onBlur={validateStep}
                  error={!!hobbies}
                >
                  <MenuItem value="" disabled>
                    Select Hobby
                  </MenuItem>
                  {hobbiesData?.sort().map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={hobbies.includes(option)} className="inputFieldCheckbox" />
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
