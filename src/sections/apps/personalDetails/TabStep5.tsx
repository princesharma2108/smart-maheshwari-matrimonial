import { useState, ChangeEvent, useEffect } from 'react';

// Material-UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import 'assets/styles/styles.scss';
// Project Imports
import MainCard from 'components/MainCard';
import { Checkbox } from '@mui/material';
interface TabStep5Props {
  highestQualification: string;
  setHighestQualification: (value: string) => void;
  additionalQualification: string;
  setAdditionalQualification: (value: string) => void;
  occupation: string;
  setOccupation: (value: string) => void;
  companyName: string;
  setCompanyName: (value: string) => void;
  workingWith: string;
  setWorkingWith: (value: string) => void;
  minAnnualIncome: string;
  setMinAnnualIncome: (value: string) => void;
  maxAnnualIncome: string;
  setMaxAnnualIncome: (value: string) => void;
  languagesKnown: string[];
  setLanguagesKnown: (value: string[]) => void;
  qualificationOptions: any;
  occupationOptions: any;
  workingWithOptions: any;
  incomeOptions: any;
  languageOptions: any;
  setIsStepValid: (value: boolean) => void;
}
export default function TabStep5({
  highestQualification,
  setHighestQualification,
  additionalQualification,
  setAdditionalQualification,
  occupation,
  setOccupation,
  companyName,
  setCompanyName,
  workingWith,
  setWorkingWith,
  minAnnualIncome,
  setMinAnnualIncome,
  maxAnnualIncome,
  setMaxAnnualIncome,
  languagesKnown,
  setLanguagesKnown,
  qualificationOptions = [],
  occupationOptions = [],
  workingWithOptions = [],
  //incomeOptions = [],
  languageOptions = [],
  setIsStepValid
}: TabStep5Props) {
  const theme = useTheme();
  console.log('maxAnnualIncome', maxAnnualIncome);
  const [errors, setErrors] = useState({
    highestQualification: '',
    occupation: '',
    familyType: '',
    annualIncome: '',
    languagesKnown: ''
  });
  const [annualIncome, setAnnualIncome] = useState('');
  // Handlers
  const handleHighestQualificationChange = (event: SelectChangeEvent) => setHighestQualification(event.target.value);
  const handleAdditionalQualificationChange = (event: SelectChangeEvent) => setAdditionalQualification(event.target.value);
  const handleOccupationChange = (event: SelectChangeEvent) => setOccupation(event.target.value);
  const handleWorkingWithChange = (event: SelectChangeEvent) => setWorkingWith(event.target.value);
  const handleAnnualIncomeChange = (event: SelectChangeEvent) => {
    const selectedRange = event.target.value;
    setAnnualIncome(selectedRange);
    // Extract min and max values
    const [min, max] = selectedRange.split(' - ').map((val) => parseInt(val) * 100000); // Convert Lakhs to Rupees
    setMinAnnualIncome(min.toString());
    setMaxAnnualIncome(max.toString());
  };
  const handleLanguagesKnownChange = (event: SelectChangeEvent<string[]>) => {
    setLanguagesKnown(event.target.value as string[]);
  };
  const incomeOptions = Array.from({ length: 20 }, (_, i) => {
    const start = String(i * 5).padStart(2, '0');
    const end = String((i + 1) * 5).padStart(2, '0');
    return `${start} - ${end} Lakhs`;
  });
  useEffect(() => {
    const min = parseInt(minAnnualIncome || '0');
    const max = parseInt(maxAnnualIncome || '0');

    if (!min && !max) return;

    const value = min || max;
    for (let i = 0; i < 20; i++) {
      const rangeMin = i * 5 * 100000;
      const rangeMax = (i + 1) * 5 * 100000;
      if (value >= rangeMin && value <= rangeMax) {
        const newAnnual = `${String(i * 5).padStart(2, '0')} - ${String((i + 1) * 5).padStart(2, '0')} Lakhs`;
        if (annualIncome !== newAnnual) {
          setAnnualIncome(newAnnual);
        }
        break;
      }
    }
  }, [minAnnualIncome, maxAnnualIncome]);
  const validateStep = () => {
    let newErrors = {
      highestQualification: '',
      occupation: '',
      familyType: '', // Add the missing familyType property
      annualIncome: '',
      languagesKnown: ''
    };

    if (!highestQualification) newErrors.highestQualification = 'This field is required.';
    if (!occupation) newErrors.occupation = 'This field is required.';
    if (!annualIncome) newErrors.annualIncome = 'This field is required.';
    if (!languagesKnown) newErrors.languagesKnown = 'This field is required.';
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid); // Update parent state
    return isValid;
  };

  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [highestQualification, occupation, annualIncome, languagesKnown]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Education and Occupation" spacing={3}>
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="highest-qualification">
                      Highest Qualification<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    {/* <TextField
                      fullWidth
                      id="highest-qualification"
                      placeholder="Enter Highest Qualification"
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      autoFocus
                      className="inputField"
                      onBlur={validateStep}
                      error={!!errors.highestQualification}
                      helperText={errors.highestQualification}
                    /> */}
                    <Select
                      fullWidth
                      id="highest-qualification"
                      value={highestQualification}
                      onChange={handleHighestQualificationChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.highestQualification}
                    >
                      <MenuItem value="" disabled>
                        Select Highest Qualification
                      </MenuItem>
                      {!qualificationOptions.includes(highestQualification) && highestQualification && (
                        <MenuItem value={highestQualification}>{highestQualification}</MenuItem>
                      )}
                      {qualificationOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="additional-qualification">Additional Qualification</InputLabel>
                    <TextField
                      fullWidth
                      id="additional-qualification"
                      placeholder="Enter Additional Qualification"
                      value={additionalQualification}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[0-9]/g, '');
                        setAdditionalQualification(value);
                      }}
                      className="inputField"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="occupation">
                      Occupation<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      fullWidth
                      id="occupation"
                      value={occupation}
                      onChange={handleOccupationChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.occupation}
                    >
                      <MenuItem value="" disabled>
                        Select Occupation
                      </MenuItem>
                      {!occupationOptions.includes(occupation) && occupation && <MenuItem value={occupation}>{occupation}</MenuItem>}
                      {occupationOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="company-name">Company/Business Name</InputLabel>
                    <TextField
                      fullWidth
                      id="company-name"
                      placeholder="Enter Company/Business Name"
                      value={companyName}
                      onChange={(e) => {
                        const sanitizedValue = e.target.value.replace(/[^a-zA-Z0-9\-&,./\s]/g, '');
                        setCompanyName(sanitizedValue);
                      }}
                      className="inputField"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Right Column */}
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="working-with">Working With</InputLabel>
                    <Select
                      fullWidth
                      id="working-with"
                      value={workingWith}
                      onChange={handleWorkingWithChange}
                      displayEmpty
                      className="inputFieldLogin"
                    >
                      <MenuItem value="" disabled>
                        Select Work Type
                      </MenuItem>
                      {workingWithOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="annual-income">
                      Annual Income<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      fullWidth
                      id="annual-income"
                      value={annualIncome}
                      onChange={handleAnnualIncomeChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.annualIncome}
                    >
                      <MenuItem value="" disabled>
                        Select Annual Income
                      </MenuItem>
                      {incomeOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="languages-known">
                      Languages Known<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      multiple // Enable multiple selections
                      fullWidth
                      id="languages-known"
                      value={Array.isArray(languagesKnown) ? languagesKnown : []} // Ensure value is always an array
                      onChange={handleLanguagesKnownChange}
                      displayEmpty
                      className="inputFieldLogin"
                      renderValue={(selected) =>
                        Array.isArray(selected) && selected.length > 0 ? selected.join(', ') : 'Select Languages Known'
                      }
                      onBlur={validateStep}
                      error={!!errors.languagesKnown}
                    >
                      <MenuItem value="" disabled>
                        Select Languages Known
                      </MenuItem>
                      {languageOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox checked={languagesKnown.includes(option)} className="inputFieldCheckbox" />
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
