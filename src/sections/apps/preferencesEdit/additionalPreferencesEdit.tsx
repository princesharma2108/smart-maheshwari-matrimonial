import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// project-imports
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

// ==============================|| ACCOUNT PROFILE - PERSONAL PREFERENCES ||============================== //

export default function AdditionalPreferencesEdit() {
  const theme = useTheme();
  const navigate = useNavigate();
  // State Variables
  const [qualification, setQualification] = useState('');
  const [location, setLocation] = useState('');
  const [profession, setProfession] = useState('');
  const [workingWith, setWorkingWith] = useState('');
  const [hobbies, setHobbies] = useState('');

  // Handlers
  const handleQualificationChange = (event: SelectChangeEvent) => setQualification(event.target.value);
  const handleLocationChange = (event: SelectChangeEvent) => setLocation(event.target.value);
  const handleProfessionChange = (event: SelectChangeEvent) => setProfession(event.target.value);
  const handleWorkingWithChange = (event: SelectChangeEvent) => setWorkingWith(event.target.value);
  const handleHobbiesChange = (event: SelectChangeEvent) => setHobbies(event.target.value);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Additional Preferences">
          <Grid container spacing={3}>
            {/* Qualification */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="qualification">Qualification</InputLabel>
                <Select fullWidth value={qualification} onChange={handleQualificationChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['High School', "Bachelor's", "Master's", 'PhD', 'Diploma', 'Other', 'No Preference'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Location */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Select fullWidth value={location} onChange={handleLocationChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['Urban', 'Suburban', 'Rural', 'No Preference'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Profession */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="profession">Profession</InputLabel>
                <Select fullWidth value={profession} onChange={handleProfessionChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['Software Engineer', 'Doctor', 'Teacher', 'Business', 'Other', 'No Preference'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* Working With */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="working-with">Working With</InputLabel>
                <Select fullWidth value={workingWith} onChange={handleWorkingWithChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['Private Sector', 'Government', 'Self-Employed', 'Freelancer', 'Retired', 'No Preference'].map((option) => (
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
                <Select fullWidth value={hobbies} onChange={handleHobbiesChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select an option
                  </MenuItem>
                  {['Reading', 'Traveling', 'Cooking', 'Sports', 'Music', 'Gaming', 'Painting', 'Other', 'No Preference'].map((option) => (
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

      {/* Navigation Buttons */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary">
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              navigate('/additional-information');
            }}
            className="buttonStyle"
          >
            Continue
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
