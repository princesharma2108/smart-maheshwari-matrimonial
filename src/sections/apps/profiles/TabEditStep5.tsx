import { useState, ChangeEvent } from 'react';

// Material-UI
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// Project Imports
import MainCard from 'components/MainCard';

export default function TabEditStep5() {
  const theme = useTheme();

  // State Variables
  const [highestQualification, setHighestQualification] = useState('');
  const [additionalQualification, setAdditionalQualification] = useState('');
  const [occupation, setOccupation] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [languagesKnown, setLanguagesKnown] = useState('');

  // Handlers
  const handleOccupationChange = (event: SelectChangeEvent) => setOccupation(event.target.value);
  const handleWorkingWithChange = (event: SelectChangeEvent) => setWorkingWith(event.target.value);
  const handleAnnualIncomeChange = (event: SelectChangeEvent) => setAnnualIncome(event.target.value);
  const handleLanguagesKnownChange = (event: SelectChangeEvent) => setLanguagesKnown(event.target.value);

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
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="occupation">Occupation</InputLabel>
                    <Select fullWidth id="occupation" value={occupation} onChange={handleOccupationChange} displayEmpty>
                      <MenuItem value="" disabled>
                        Select Occupation
                      </MenuItem>
                      <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                      <MenuItem value="Doctor">Doctor</MenuItem>
                      <MenuItem value="Teacher">Teacher</MenuItem>
                      <MenuItem value="Entrepreneur">Entrepreneur</MenuItem>
                      <MenuItem value="Banker">Banker</MenuItem>
                      <MenuItem value="Government Employee">Government Employee</MenuItem>
                      <MenuItem value="Freelancer">Freelancer</MenuItem>
                      <MenuItem value="Others">Others</MenuItem>
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
                    <Select fullWidth id="working-with" value={workingWith} onChange={handleWorkingWithChange} displayEmpty>
                      <MenuItem value="" disabled>
                        Select Work Type
                      </MenuItem>
                      <MenuItem value="Private Sector">Private Sector</MenuItem>
                      <MenuItem value="Government Sector">Government Sector</MenuItem>
                      <MenuItem value="Business">Business</MenuItem>
                      <MenuItem value="Self-Employed">Self-Employed</MenuItem>
                      <MenuItem value="Retired">Retired</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="annual-income">Annual Income</InputLabel>
                    <Select fullWidth id="annual-income" value={annualIncome} onChange={handleAnnualIncomeChange} displayEmpty>
                      <MenuItem value="" disabled>
                        Select Annual Income
                      </MenuItem>
                      <MenuItem value="Less than $20,000">Less than $20,000</MenuItem>
                      <MenuItem value="$20,000 - $50,000">$20,000 - $50,000</MenuItem>
                      <MenuItem value="$50,000 - $100,000">$50,000 - $100,000</MenuItem>
                      <MenuItem value="Above $100,000">Above $100,000</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="languages-known">Languages Known</InputLabel>
                    <Select fullWidth id="languages-known" value={languagesKnown} onChange={handleLanguagesKnownChange} displayEmpty>
                      <MenuItem value="" disabled>
                        Select Languages Known
                      </MenuItem>
                      <MenuItem value="English">English</MenuItem>
                      <MenuItem value="Spanish">Spanish</MenuItem>
                      <MenuItem value="French">French</MenuItem>
                      <MenuItem value="German">German</MenuItem>
                      <MenuItem value="Hindi">Hindi</MenuItem>
                      <MenuItem value="Mandarin">Mandarin</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
      {/* Buttons */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Previous
          </Button>
          <Button variant="contained">Continue</Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
