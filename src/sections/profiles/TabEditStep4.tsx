import { useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import TextField from '@mui/material/TextField';

// project-imports
import MainCard from 'components/MainCard';

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

export default function TabEditStep4() {
  const theme = useTheme();

  // State Variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [hometown, setHometown] = useState('');
  const [siblings, setSiblings] = useState('');
  const [familyIncome, setFamilyIncome] = useState('');
  const [familyType, setFamilyType] = useState('');

  // Handlers
  const handleSiblingsChange = (event: SelectChangeEvent) => setSiblings(event.target.value);
  const handleFamilyIncomeChange = (event: SelectChangeEvent) => setFamilyIncome(event.target.value);
  const handleFamilyTypeChange = (event: SelectChangeEvent) => setFamilyType(event.target.value);

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
                      id="father-name"
                      placeholder="Enter Father's Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
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
                      id="mother-name"
                      placeholder="Enter Mother's Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="inputField"
                    />
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="hometown">Hometown</InputLabel>
                    <TextField
                      fullWidth
                      id="hometown"
                      placeholder="Enter Hometown"
                      value={hometown}
                      onChange={(e) => setHometown(e.target.value)}
                      className="inputField"
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
                      <MenuItem value="No Siblings">No Siblings</MenuItem>
                      <MenuItem value="1 Sibling">1 Sibling</MenuItem>
                      <MenuItem value="2 Siblings">2 Siblings</MenuItem>
                      <MenuItem value="More than 2">More than 2</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="family-income">Family Income</InputLabel>
                    <Select fullWidth value={familyIncome} onChange={handleFamilyIncomeChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Family Income Range
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
                    <InputLabel htmlFor="family-type">Family Type</InputLabel>
                    <Select fullWidth value={familyType} onChange={handleFamilyTypeChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Family Type
                      </MenuItem>
                      <MenuItem value="Nuclear Family">Nuclear Family</MenuItem>
                      <MenuItem value="Joint Family">Joint Family</MenuItem>
                      <MenuItem value="Extended Family">Extended Family</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
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
