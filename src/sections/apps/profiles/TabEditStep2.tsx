import { useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
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

export default function TabEditStep2() {
  const theme = useTheme();

  // State Variables
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [gender, setGender] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [disability, setDisability] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [complexion, setComplexion] = useState('');
  const [maritalStatus, setMaritalStatus] = useState('');

  // Handlers
  const handleHeightChange = (event: SelectChangeEvent) => setHeight(event.target.value);
  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => setWeight(event.target.value);
  const handleGenderChange = (event: SelectChangeEvent) => setGender(event.target.value);
  const handleHobbiesChange = (event: SelectChangeEvent) => setHobbies(event.target.value);
  const handleDisabilityChange = (event: SelectChangeEvent) => setDisability(event.target.value);
  const handleBloodGroupChange = (event: SelectChangeEvent) => setBloodGroup(event.target.value);
  const handleComplexionChange = (event: SelectChangeEvent) => setComplexion(event.target.value);
  const handleMaritalStatusChange = (event: SelectChangeEvent) => setMaritalStatus(event.target.value);

  return (
    <Grid container spacing={3}>
      {/* Left Side */}
      <Grid item xs={12} sm={6}>
        <MainCard title="">
          <Grid container spacing={3}>
            {/* Height */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="height">Height</InputLabel>
                <Select fullWidth value={height} onChange={handleHeightChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Height
                  </MenuItem>
                  <MenuItem value="Short">Short</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Tall">Tall</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* Weight */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="weight">Weight (kg)</InputLabel>
                <TextField
                  fullWidth
                  id="weight"
                  value={weight}
                  onChange={handleWeightChange}
                  placeholder="Enter weight"
                  className="inputField"
                />
              </Stack>
            </Grid>

            {/* Gender */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select fullWidth value={gender} onChange={handleGenderChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* Hobbies */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="hobbies">Hobbies</InputLabel>
                <Select fullWidth value={hobbies} onChange={handleHobbiesChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Hobby
                  </MenuItem>
                  <MenuItem value="Reading">Reading</MenuItem>
                  <MenuItem value="Sports">Sports</MenuItem>
                  <MenuItem value="Music">Music</MenuItem>
                  <MenuItem value="Gaming">Gaming</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Right Side */}
      <Grid item xs={12} sm={6}>
        <MainCard>
          <Grid container spacing={3}>
            {/* Disability */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="disability">Disability</InputLabel>
                <Select fullWidth value={disability} onChange={handleDisabilityChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Disability
                  </MenuItem>
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Visual Impairment">Visual Impairment</MenuItem>
                  <MenuItem value="Hearing Impairment">Hearing Impairment</MenuItem>
                  <MenuItem value="Physical Disability">Physical Disability</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* Blood Group */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="blood-group">Blood Group</InputLabel>
                <Select fullWidth value={bloodGroup} onChange={handleBloodGroupChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Blood Group
                  </MenuItem>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* Complexion */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="complexion">Complexion</InputLabel>
                <Select fullWidth value={complexion} onChange={handleComplexionChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Complexion
                  </MenuItem>
                  <MenuItem value="Fair">Fair</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="Dark">Dark</MenuItem>
                </Select>
              </Stack>
            </Grid>

            {/* Marital Status */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="marital-status">Marital Status</InputLabel>
                <Select fullWidth value={maritalStatus} onChange={handleMaritalStatusChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Marital Status
                  </MenuItem>
                  <MenuItem value="Single">Single</MenuItem>
                  <MenuItem value="Married">Married</MenuItem>
                  <MenuItem value="Divorced">Divorced</MenuItem>
                  <MenuItem value="Widowed">Widowed</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Navigation Buttons */}
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
