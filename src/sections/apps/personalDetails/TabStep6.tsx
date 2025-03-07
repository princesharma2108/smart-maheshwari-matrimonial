import { useState, ChangeEvent } from 'react';

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

export default function TabStep6() {
  const theme = useTheme();

  // State Variables
  const [gotra, setGotra] = useState('');
  const [manglik, setManglik] = useState('');
  const [occupation, setOccupation] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [annualIncome, setAnnualIncome] = useState('');
  const [gunnMatchingImportant, setGunnMatchingImportant] = useState(false);
  const [includeUnknownManglik, setIncludeUnknownManglik] = useState(false);

  // Handlers
  const handleGotraChange = (event: SelectChangeEvent) => setGotra(event.target.value);
  const handleManglikChange = (event: SelectChangeEvent) => setManglik(event.target.value);
  const handleOccupationChange = (event: SelectChangeEvent) => setOccupation(event.target.value);
  const handleWorkingWithChange = (event: SelectChangeEvent) => setWorkingWith(event.target.value);
  const handleAnnualIncomeChange = (event: SelectChangeEvent) => setAnnualIncome(event.target.value);
  const handleGunnMatchingChange = (event: ChangeEvent<HTMLInputElement>) => setGunnMatchingImportant(event.target.checked);
  const handleIncludeUnknownManglikChange = (event: ChangeEvent<HTMLInputElement>) => setIncludeUnknownManglik(event.target.checked);

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
                    <InputLabel htmlFor="gotra">Gotra</InputLabel>
                    <Select fullWidth id="gotra" value={gotra} onChange={handleGotraChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Gotra
                      </MenuItem>
                      <MenuItem value="Bhardwaj">Bhardwaj</MenuItem>
                      <MenuItem value="Kashyap">Kashyap</MenuItem>
                      <MenuItem value="Vashishth">Vashishth</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
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
                    <InputLabel htmlFor="manglik">Manglik</InputLabel>
                    <Select fullWidth id="manglik" value={manglik} onChange={handleManglikChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Manglik Status
                      </MenuItem>
                      <MenuItem value="Yes">Yes</MenuItem>
                      <MenuItem value="No">No</MenuItem>
                      <MenuItem value="Don't Know">Don't Know</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
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
      {/* Buttons */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Previous
          </Button>
          <Button variant="contained" className="buttonStyle">
            Continue
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
