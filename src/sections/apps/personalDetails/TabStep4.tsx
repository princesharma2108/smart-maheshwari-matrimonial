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
interface TabStep4Props {
  fatherName: string;
  setFatherName: (value: string) => void;
  motherName: string;
  setMotherName: (value: string) => void;
  hometown: string;
  setHometown: (value: string) => void;
  siblings: string;
  setSiblings: (value: string) => void;
  familyIncome: string;
  setFamilyIncome: (value: string) => void;
  familyType: string;
  setFamilyType: (value: string) => void;
  familyBackground: string;
  setFamilyBackground: (value: string) => void;
  selectedIncomeRange: string;
  setSelectedIncomRange: (value: string) => void;
  familyTypeOptions: any;
  siblingOptions: any;
  incomeOptions: any;
  familyBackgroundData?: string[];
  setIsStepValid: (value: boolean) => void;
}
export default function TabStep4({
  fatherName,
  setFatherName,
  motherName,
  setMotherName,
  hometown,
  setHometown,
  siblings,
  setSiblings,
  familyIncome,
  setFamilyIncome,
  familyType,
  setFamilyType,
  familyBackground,
  setFamilyBackground,
  selectedIncomeRange,
  setSelectedIncomRange,
  familyTypeOptions = [],
  siblingOptions = [],
  familyBackgroundData = [],
  //incomeOptions = []
  setIsStepValid
}: TabStep4Props) {
  const theme = useTheme();
  const [errors, setErrors] = useState({
    hometown: '',
    familyIncome: '',
    familyType: '',
    familyBackground: ''
  });
  // const [selectedIncomeRange, setSelectedIncomRange] = useState('');
  // Handlers
  const handleSiblingsChange = (event: SelectChangeEvent) => setSiblings(event.target.value);
  const handleFamilyIncomeChange = (event: SelectChangeEvent) => {
    const selectedRange = event.target.value;
    setSelectedIncomRange(selectedRange);
    const [, maxIncome] = selectedRange.split(' - '); // Extract the second number (upper bound)
    const numericIncome = Number(parseInt(maxIncome, 10)) * 100000; // Convert to INR
    console.log('Income4', numericIncome);
    setFamilyIncome(numericIncome.toString()); // Store as a string
  };
  const handleTextChange = (setter: (value: string) => void) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const lettersOnly = value.replace(/[^a-zA-Z\s]/g, ''); // only letters and spaces
    setter(lettersOnly);
  };
  const handleFamilyTypeChange = (event: SelectChangeEvent) => setFamilyType(event.target.value);
  const handleFamilyBackgroundChange = (event: SelectChangeEvent) => setFamilyBackground(event.target.value);
  const incomeOptions = Array.from({ length: 20 }, (_, i) => {
    const start = String(i * 5).padStart(2, '0');
    const end = String((i + 1) * 5).padStart(2, '0');
    return `${start} - ${end} Lakhs`;
  });
  const validateStep = () => {
    let newErrors = {
      hometown: '',
      familyIncome: '',
      familyType: '',
      familyBackground: ''
    };

    if (!hometown) newErrors.hometown = 'This field is required.';
    if (!familyIncome) newErrors.familyIncome = 'This field is required.';
    if (!familyType) newErrors.familyType = 'This field is required.';
    if (!familyBackground) newErrors.familyBackground = 'This field is required.';

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid); // Update parent state
    return isValid;
  };

  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [hometown, familyIncome, familyType, familyBackground]);
  useEffect(() => {
    if (familyIncome && incomeOptions?.length) {
      const incomeInLakhs = Number(familyIncome) / 100000;

      const matchedRange = incomeOptions.find((range: string) => {
        const [minStr, maxStr] = range.replace(' Lakhs', '').split(' - ');
        const min = parseFloat(minStr);
        const max = parseFloat(maxStr);
        return incomeInLakhs >= min && incomeInLakhs <= max;
      });

      if (matchedRange) {
        setSelectedIncomRange(matchedRange);
      }
    }
  }, [familyIncome, incomeOptions]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Family Background" spacing={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="father-name">Father Name</InputLabel>
                    <TextField
                      fullWidth
                      type="text"
                      id="father-name"
                      placeholder="Enter Father's Name"
                      value={fatherName}
                      onChange={handleTextChange(setFatherName)}
                      autoFocus
                      className="inputField"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="mother-name">Mother Name</InputLabel>
                    <TextField
                      fullWidth
                      type="text"
                      id="mother-name"
                      placeholder="Enter Mother's Name"
                      value={motherName}
                      onChange={handleTextChange(setMotherName)}
                      className="inputField"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="hometown">
                      Hometown<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <TextField
                      fullWidth
                      type="text"
                      id="hometown"
                      placeholder="Enter Hometown"
                      value={hometown}
                      onChange={handleTextChange(setHometown)}
                      className="inputField"
                      onBlur={validateStep}
                      error={!!errors.hometown}
                      helperText={errors.hometown}
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="siblings">Siblings</InputLabel>
                    <Select fullWidth value={siblings} onChange={handleSiblingsChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Number of Siblings
                      </MenuItem>
                      {siblingOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="family-income">
                      Family Income<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      fullWidth
                      value={selectedIncomeRange}
                      onChange={handleFamilyIncomeChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.familyIncome}
                    >
                      <MenuItem value="" disabled>
                        Select Family Income Range
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
                    <InputLabel htmlFor="family-type">
                      Family Type<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      fullWidth
                      value={familyType}
                      onChange={handleFamilyTypeChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.familyType}
                    >
                      <MenuItem value="" disabled>
                        Select Family Type
                      </MenuItem>
                      {familyTypeOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="family-type">
                      Family Background<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      fullWidth
                      value={familyBackground}
                      onChange={handleFamilyBackgroundChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.familyType}
                    >
                      <MenuItem value="" disabled>
                        Select Family Background
                      </MenuItem>
                      {familyBackgroundData?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
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
