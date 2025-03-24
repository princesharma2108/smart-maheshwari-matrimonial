import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Stack, Button, MenuItem, InputLabel, Select, SelectChangeEvent, Checkbox, FormControlLabel, Slider } from '@mui/material';
import MainCard from 'components/MainCard';
import 'assets/styles/styles.scss';
import Typography from '@mui/material/Typography';

interface PersonalPreferencesEditProps {
  age: [number, number];
  setAge: (value: [number, number]) => void;
  minAge: number;
  setMinAge: (value: number) => void;
  maxAge: number;
  setMaxAge: (value: number) => void;
  familyType: string;
  setFamilyType: (value: string) => void;
  familyBackground: string;
  setFamilyBackground: (value: string) => void;
  maritalStatus: string;
  setMaritalStatus: (value: string) => void;
  nonNegotiableAge: string;
  setNonNegotiableAge: (value: string) => void;
  nonNegotiableFamilyType: string;
  setNonNegotiableFamilyType: (value: string) => void;
  nonNegotiableFamilyBackground: string;
  setNonNegotiableFamilyBackground: (value: string) => void;
  nonNegotiableMaritalStatus: string;
  setNonNegotiableMaritalStatus: (value: string) => void;
  qualificationData: string[];
  familyTypeData: string[];
  familyBackgroundData: string[];
  maritalOptionsData: string[];
}

export default function PersonalPreferencesEdit({
  age,
  setAge,
  minAge,
  setMinAge,
  maxAge,
  setMaxAge,
  familyType,
  setFamilyType,
  familyBackground,
  setFamilyBackground,
  maritalStatus,
  setMaritalStatus,
  nonNegotiableAge,
  setNonNegotiableAge,
  nonNegotiableFamilyType,
  setNonNegotiableFamilyType,
  nonNegotiableFamilyBackground,
  setNonNegotiableFamilyBackground,
  nonNegotiableMaritalStatus,
  setNonNegotiableMaritalStatus,
  qualificationData = [],
  familyTypeData = [],
  familyBackgroundData = [],
  maritalOptionsData = []
}: PersonalPreferencesEditProps) {
  useEffect(() => {
    if (minAge && maxAge) {
      setAge([minAge, maxAge]);
    }
  }, [minAge, maxAge]);

  const handleSelectChange = (setter: (value: string) => void) => (event: SelectChangeEvent) => setter(event.target.value);

  const handleCheckboxToggle = (setter: (value: string) => void, value: string, currentValue: string) => {
    setter(currentValue ? '' : value.replace(/\s/g, '')); // Toggles between '' and value
  };
  const handleRangeChange = (_: Event, newValue: number | number[]) => {
    if (Array.isArray(newValue)) {
      setAge(newValue as [number, number]);
      setMinAge(newValue[0]);
      setMaxAge(newValue[1]);
    }
  };
  const getOptions = (options: string[]) => [...options.sort(), 'No Preference'];
  console.log('nonNegotiableFamilyType', nonNegotiableFamilyType);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Personal Preferences">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <InputLabel>Age Range</InputLabel>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={!!nonNegotiableAge}
                        onChange={() => handleCheckboxToggle(setNonNegotiableAge, 'Age', nonNegotiableAge)}
                        className="inputFieldCheckbox"
                      />
                    }
                    label="Non-negotiable"
                  />
                </Stack>
                <Typography variant="body1" sx={{ mt: 0, display: 'flex', justifyContent: 'flex-start', alignSelf: 'flex-start' }}>
                  {`Selected Age Range: ${age[0]} - ${age[1]}`}
                </Typography>
                <Slider
                  value={age}
                  onChange={handleRangeChange}
                  valueLabelDisplay="auto"
                  min={18}
                  max={60}
                  marks={[
                    { value: 18, label: '18' },
                    { value: 30, label: '30' },
                    { value: 40, label: '40' },
                    { value: 50, label: '50' },
                    { value: 60, label: '60' }
                  ]}
                  className="customSlider"
                />
              </Stack>
            </Grid>
            {[
              // {
              //   label: 'Age',
              //   value: age,
              //   setter: setAge,
              //   nonNegotiable: nonNegotiableAge,
              //   setNonNegotiable: setNonNegotiableAge,
              //   options: qualificationData
              // },
              {
                label: 'Family Type',
                value: familyType,
                setter: setFamilyType,
                nonNegotiable: nonNegotiableFamilyType,
                setNonNegotiable: setNonNegotiableFamilyType,
                options: familyTypeData
              },
              {
                label: 'Family Background',
                value: familyBackground,
                setter: setFamilyBackground,
                nonNegotiable: nonNegotiableFamilyBackground,
                setNonNegotiable: setNonNegotiableFamilyBackground,
                options: familyBackgroundData
              },
              {
                label: 'Marital Status',
                value: maritalStatus,
                setter: setMaritalStatus,
                nonNegotiable: nonNegotiableMaritalStatus,
                setNonNegotiable: setNonNegotiableMaritalStatus,
                options: maritalOptionsData
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
