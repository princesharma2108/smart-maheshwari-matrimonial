import { useState, ChangeEvent, useEffect } from 'react';

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
import 'assets/styles/styles.scss';
// project-imports
import MainCard from 'components/MainCard';
import { Checkbox } from '@mui/material';

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //
interface TabStep2Props {
  weight: string;
  setWeight: (value: string) => void;
  height: string;
  setHeight: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  hobbies: string[];
  setHobbies: (value: string[]) => void;
  disability: string;
  setDisability: (value: string) => void;
  bloodGroup: string;
  setBloodGroup: (value: string) => void;
  complexion: string;
  setComplexion: (value: string) => void;
  maritalStatus: string;
  setMaritalStatus: (value: string) => void;
  heightOptions: any;
  hobbiesOptions: string[];
  disabilities: string[];
  bloodGroupOptions: string[];
  complexionOptions: any;
  maritalOptions: any;
}
export default function TabStep2({
  weight,
  setWeight,
  height,
  setHeight,
  gender,
  setGender,
  hobbies,
  setHobbies,
  disability,
  setDisability,
  bloodGroup,
  setBloodGroup,
  complexion,
  setComplexion,
  maritalStatus,
  setMaritalStatus,
  heightOptions = [],
  hobbiesOptions = [],
  disabilities = [],
  bloodGroupOptions = [],
  complexionOptions = [],
  maritalOptions = []
}: TabStep2Props) {
  const theme = useTheme();

  // Handlers
  // const handleHeightChange = (event: SelectChangeEvent) => setHeight(event.target.value);
  // const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => setWeight(event.target.value);
  // const handleGenderChange = (event: SelectChangeEvent) => setGender(event.target.value);
  // const handleHobbiesChange = (event: SelectChangeEvent) => setHobbies(event.target.value);
  // const handleDisabilityChange = (event: SelectChangeEvent) => setDisability(event.target.value);
  // const handleBloodGroupChange = (event: SelectChangeEvent) => setBloodGroup(event.target.value);
  // const handleComplexionChange = (event: SelectChangeEvent) => setComplexion(event.target.value);
  // const handleMaritalStatusChange = (event: SelectChangeEvent) => setMaritalStatus(event.target.value);
  const handleSelectChange = (setter: (value: string) => void) => (event: SelectChangeEvent) => setter(event.target.value);
  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => setWeight(event.target.value);

  return (
    <Grid container spacing={3}>
      {/* Left Side */}
      <Grid item xs={12} sm={6}>
        <MainCard title="">
          <Grid container spacing={3}>
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
            {/* Height */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="height">Height</InputLabel>
                <Select fullWidth value={height} onChange={handleSelectChange(setHeight)} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Height
                  </MenuItem>
                  {heightOptions?.sort().map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Gender */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select fullWidth value={gender} onChange={handleSelectChange(setGender)} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Gender
                  </MenuItem>
                  {['Male', 'Female', 'Other'].sort().map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Hobbies */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="hobbies">Hobbies</InputLabel>
                <Select
                  multiple
                  fullWidth
                  value={Array.isArray(hobbies) ? hobbies : []} // Ensuring value is always an array
                  onChange={(event) => {
                    setHobbies(event.target.value as string[]);
                  }}
                  displayEmpty
                  className="inputFieldLogin"
                  renderValue={(selected) => (Array.isArray(selected) && selected.length > 0 ? selected.join(', ') : 'Select Hobby')}
                >
                  <MenuItem value="" disabled>
                    Select Hobby
                  </MenuItem>
                  {hobbiesOptions?.sort().map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={hobbies.includes(option)} />
                      {option}
                    </MenuItem>
                  ))}
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
                <Select fullWidth value={disability} onChange={handleSelectChange(setDisability)} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Disability
                  </MenuItem>
                  {disabilities?.sort().map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Blood Group */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="blood-group">Blood Group</InputLabel>
                <Select fullWidth value={bloodGroup} onChange={handleSelectChange(setBloodGroup)} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Blood Group
                  </MenuItem>
                  {bloodGroupOptions?.sort().map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Complexion */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="complexion">Complexion</InputLabel>
                <Select fullWidth value={complexion} onChange={handleSelectChange(setComplexion)} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Complexion
                  </MenuItem>
                  {complexionOptions?.sort().map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Marital Status */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="marital-status">Marital Status</InputLabel>
                <Select
                  fullWidth
                  value={maritalStatus}
                  onChange={handleSelectChange(setMaritalStatus)}
                  displayEmpty
                  className="inputFieldLogin"
                >
                  <MenuItem value="" disabled>
                    Select Marital Status
                  </MenuItem>
                  {maritalOptions?.sort().map((option: string) => (
                    <MenuItem key={option} value={option}>
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
