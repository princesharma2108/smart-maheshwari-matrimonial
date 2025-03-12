import { useEffect, useState, ChangeEvent } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';

// project-imports
import MainCard from 'components/MainCard';
import { useNavigate } from 'react-router-dom';

// styles & constant
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};

// ==============================|| ACCOUNT PROFILE - PERSONAL ||============================== //

export default function BasicSearchTab() {
  const navigate = useNavigate();
  const theme = useTheme();

  const [maritalStatus, setMaritalStatus] = useState('');
  const [minAge, setMinAge] = useState('');
  const [maxAge, setMaxAge] = useState('');
  const [minHeight, setMinHeight] = useState('');
  const [maxHeight, setMaxHeight] = useState('');
  const [location, setLocation] = useState('');

  // Handlers for select inputs
  const handleMaritalStatusChange = (event: SelectChangeEvent) => setMaritalStatus(event.target.value);
  const handleMinAgeChange = (event: SelectChangeEvent) => setMinAge(event.target.value);
  const handleMaxAgeChange = (event: SelectChangeEvent) => setMaxAge(event.target.value);
  const handleMinHeightChange = (event: SelectChangeEvent) => setMinHeight(event.target.value);
  const handleMaxHeightChange = (event: SelectChangeEvent) => setMaxHeight(event.target.value);
  const handleLocationChange = (event: SelectChangeEvent) => setLocation(event.target.value);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="">
          <Grid container spacing={3}>
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

            {/* Age Selection */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="min-age">Min Age</InputLabel>
                    <Select fullWidth value={minAge} onChange={handleMinAgeChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Min Age
                      </MenuItem>
                      <MenuItem value="18">18</MenuItem>
                      <MenuItem value="25">25</MenuItem>
                      <MenuItem value="30">30</MenuItem>
                      <MenuItem value="40">40</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="max-age">Max Age</InputLabel>
                    <Select fullWidth value={maxAge} onChange={handleMaxAgeChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Max Age
                      </MenuItem>
                      <MenuItem value="30">30</MenuItem>
                      <MenuItem value="40">40</MenuItem>
                      <MenuItem value="50">50</MenuItem>
                      <MenuItem value="60">60</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Height Selection */}
            <Grid item xs={12}>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="min-height">Min Height (cm)</InputLabel>
                    <Select fullWidth value={minHeight} onChange={handleMinHeightChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Min Height
                      </MenuItem>
                      <MenuItem value="140">140 cm</MenuItem>
                      <MenuItem value="150">150 cm</MenuItem>
                      <MenuItem value="160">160 cm</MenuItem>
                      <MenuItem value="170">170 cm</MenuItem>
                      <MenuItem value="180">180 cm</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
                <Grid item xs={6}>
                  <Stack spacing={1}>
                    <InputLabel htmlFor="max-height">Max Height (cm)</InputLabel>
                    <Select fullWidth value={maxHeight} onChange={handleMaxHeightChange} displayEmpty className="inputFieldLogin">
                      <MenuItem value="" disabled>
                        Select Max Height
                      </MenuItem>
                      <MenuItem value="160">160 cm</MenuItem>
                      <MenuItem value="170">170 cm</MenuItem>
                      <MenuItem value="180">180 cm</MenuItem>
                      <MenuItem value="190">190 cm</MenuItem>
                      <MenuItem value="200">200 cm</MenuItem>
                    </Select>
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* Location Selection */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="location">Location</InputLabel>
                <Select fullWidth value={location} onChange={handleLocationChange} displayEmpty className="inputFieldLogin">
                  <MenuItem value="" disabled>
                    Select Location
                  </MenuItem>
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                  <MenuItem value="Chicago">Chicago</MenuItem>
                  <MenuItem value="Houston">Houston</MenuItem>
                  <MenuItem value="Miami">Miami</MenuItem>
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* Buttons */}
      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/upload-biodata')}>
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
