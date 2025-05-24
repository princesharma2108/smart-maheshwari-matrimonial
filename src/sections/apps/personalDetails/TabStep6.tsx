import { useState, ChangeEvent, useEffect } from 'react';

// Material-UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import 'assets/styles/styles.scss';
// Project Imports
import MainCard from 'components/MainCard';
interface TabStep6Props {
  gotra: string;
  setGotra: (value: string) => void;
  manglik: string;
  setManglik: (value: string) => void;
  gunnMatchingImportant: boolean;
  setGunnMatchingImportant: (value: boolean) => void;
  includeUnknownManglik: boolean;
  setIncludeUnknownManglik: (value: boolean) => void;
  gotraOptions: any;
  manglikOptions: any;
  setIsStepValid: (value: boolean) => void;
}
export default function TabStep6({
  gotra,
  setGotra,
  manglik,
  setManglik,
  gunnMatchingImportant,
  setGunnMatchingImportant,
  includeUnknownManglik,
  setIncludeUnknownManglik,
  gotraOptions = [],
  manglikOptions = [],
  setIsStepValid
}: TabStep6Props) {
  const theme = useTheme();
  const [errors, setErrors] = useState({
    gotra: '',
    manglik: ''
  });
  // Handlers
  const handleGotraChange = (event: SelectChangeEvent) => setGotra(event.target.value);
  const handleManglikChange = (event: SelectChangeEvent) => setManglik(event.target.value);
  const handleGunnMatchingChange = (event: ChangeEvent<HTMLInputElement>) => setGunnMatchingImportant(event.target.checked);
  const handleIncludeUnknownManglikChange = (event: ChangeEvent<HTMLInputElement>) => setIncludeUnknownManglik(event.target.checked);
  const validateStep = () => {
    let newErrors = {
      gotra: '',
      manglik: ''
    };

    if (!gotra) newErrors.gotra = 'This field is required.';
    if (!manglik) newErrors.manglik = 'This field is required.';
    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid); // Update parent state
    return isValid;
  };

  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [gotra, manglik]);
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="Spiritual Attributes" spacing={3}>
          <Grid container spacing={3}>
            {/* Left Column */}
            <Grid item xs={12} sm={6}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="gotra">
                      Gotra<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      fullWidth
                      id="gotra"
                      value={gotra}
                      onChange={handleGotraChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.gotra}
                    >
                      <MenuItem value="" disabled>
                        Select Gotra
                      </MenuItem>

                      {!gotraOptions.includes(gotra) && gotra && <MenuItem value={gotra}>{gotra}</MenuItem>}
                      {gotraOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} sx={{width:"fit-content"}}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={gunnMatchingImportant} onChange={handleGunnMatchingChange} className="inputFieldCheckbox" />
                      }
                      label="Is Gunn Matching Important for You"
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
                    <InputLabel htmlFor="manglik">
                      Manglik<span style={{ color: 'red' }}>*</span>
                    </InputLabel>
                    <Select
                      fullWidth
                      id="manglik"
                      value={manglik}
                      onChange={handleManglikChange}
                      displayEmpty
                      className="inputFieldLogin"
                      onBlur={validateStep}
                      error={!!errors.manglik}
                    >
                      <MenuItem value="" disabled>
                        Select Manglik Status
                      </MenuItem>
                      {manglikOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1} sx={{width:"fit-content"}}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={includeUnknownManglik}
                          onChange={handleIncludeUnknownManglikChange}
                          className="inputFieldCheckbox"
                        />
                      }
                      label="Include Profiles who don't know if they are Manglik or not"
                    />
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
