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
  annualIncome: string;
  setAnnualIncome: (value: string) => void;
  languagesKnown: string[];
  setLanguagesKnown: (value: string[]) => void;
  qualificationOptions: any;
  occupationOptions: any;
  workingWithOptions: any;
  incomeOptions: any;
  languageOptions: any;
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
  annualIncome,
  setAnnualIncome,
  languagesKnown,
  setLanguagesKnown,
  qualificationOptions = [],
  occupationOptions = [],
  workingWithOptions = [],
  incomeOptions = [],
  languageOptions = []
}: TabStep5Props) {
  const theme = useTheme();

  // Handlers
  const handleOccupationChange = (event: SelectChangeEvent) => setOccupation(event.target.value);
  const handleWorkingWithChange = (event: SelectChangeEvent) => setWorkingWith(event.target.value);
  const handleAnnualIncomeChange = (event: SelectChangeEvent) => setAnnualIncome(event.target.value);
  const handleLanguagesKnownChange = (event: SelectChangeEvent<string[]>) => {
    setLanguagesKnown(event.target.value as string[]);
  };

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
                    <InputLabel htmlFor="highest-qualification">Highest Qualification</InputLabel>
                    <TextField
                      fullWidth
                      id="highest-qualification"
                      placeholder="Enter Highest Qualification"
                      value={highestQualification}
                      onChange={(e) => setHighestQualification(e.target.value)}
                      autoFocus
                      className="inputField"
                    />
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
                      onChange={(e) => setAdditionalQualification(e.target.value)}
                      className="inputField"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="occupation">Occupation</InputLabel>
                    <Select
                      fullWidth
                      id="occupation"
                      value={occupation}
                      onChange={handleOccupationChange}
                      displayEmpty
                      className="inputFieldLogin"
                    >
                      <MenuItem value="" disabled>
                        Select Occupation
                      </MenuItem>
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
                      onChange={(e) => setCompanyName(e.target.value)}
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
                    <InputLabel htmlFor="annual-income">Annual Income</InputLabel>
                    <Select
                      fullWidth
                      id="annual-income"
                      value={annualIncome}
                      onChange={handleAnnualIncomeChange}
                      displayEmpty
                      className="inputFieldLogin"
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
                    <InputLabel htmlFor="languages-known">Languages Known</InputLabel>
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
                    >
                      <MenuItem value="" disabled>
                        Select Languages Known
                      </MenuItem>
                      {languageOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          <Checkbox checked={languagesKnown.includes(option)} />
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
