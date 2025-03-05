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
import { LocalizationProvider, TimePicker, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// third-party
import { PatternFormat } from 'react-number-format';

// project-imports
import Avatar from 'components/@extended/Avatar';
import MainCard from 'components/MainCard';

import { ThemeMode, facebookColor, linkedInColor } from 'config';
import defaultImages from 'assets/images/users/default.png';

// assets
import { Apple, Camera, Facebook, Google } from 'iconsax-react';
import Autocomplete from '@mui/material/Autocomplete';

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

export default function TabEditStep1() {
  const theme = useTheme();
  const [selectedImage, setSelectedImage] = useState<File | undefined>(undefined);
  const [firstName, setFirstName] = useState('Anshan');
  const [lastName, setLastName] = useState('Handgun');
  const [avatar, setAvatar] = useState<string | undefined>(defaultImages);
  const [timeOfBirth, setTimeOfBirth] = useState<Dayjs | null>(null);
  const [dateOfBirth, setDateOfBirth] = useState<Dayjs | null>(null);
  const [placeOfBirth, setPlaceOfBirth] = useState('');
  const [placeOptions, setPlaceOptions] = useState<string[]>([]);
  useEffect(() => {
    if (selectedImage) {
      setAvatar(URL.createObjectURL(selectedImage));
    }
  }, [selectedImage]);

  // Fetch place suggestions
  const fetchPlaces = async (query: string) => {
    if (!query) return;

    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await response.json();

    setPlaceOptions(data.map((place: any) => place.display_name));
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12}>
        <MainCard title="Let's know you better">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Stack spacing={2.5} alignItems="center" sx={{ m: 3 }}>
                <FormLabel
                  htmlFor="change-avtar"
                  sx={{
                    position: 'relative',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    '&:hover .MuiBox-root': { opacity: 1 },
                    cursor: 'pointer'
                  }}
                >
                  <Avatar alt="Avatar 1" src={avatar} sx={{ width: 76, height: 76 }} />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      backgroundColor: theme.palette.mode === ThemeMode.DARK ? 'rgba(255, 255, 255, .75)' : 'rgba(0,0,0,.65)',
                      width: '100%',
                      height: '100%',
                      opacity: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Stack spacing={0.5} alignItems="center">
                      <Camera style={{ color: theme.palette.secondary.lighter, fontSize: '1.5rem' }} />
                      <Typography sx={{ color: 'secondary.lighter' }} variant="caption">
                        Upload
                      </Typography>
                    </Stack>
                  </Box>
                </FormLabel>
                <TextField
                  type="file"
                  id="change-avtar"
                  placeholder="Outlined"
                  variant="outlined"
                  sx={{ display: 'none' }}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedImage(e.target.files?.[0])}
                />
              </Stack>
            </Grid>
            {/* First Name */}
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                <TextField
                  fullWidth
                  id="personal-first-name"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </Stack>
            </Grid>
            {/* Last Name */}
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                <TextField
                  fullWidth
                  id="personal-last-name"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-time-of-birth">Time of Birth</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    value={timeOfBirth}
                    onChange={(newValue) => setTimeOfBirth(newValue)}
                    slotProps={{ textField: { fullWidth: true } }} // ✅ Correct way to pass props
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-date-of-birth">Date of Birth</InputLabel>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={dateOfBirth}
                    onChange={(newValue) => setDateOfBirth(newValue)}
                    slotProps={{ textField: { fullWidth: true } }} // ✅ Correct prop usage
                  />
                </LocalizationProvider>
              </Stack>
            </Grid>
            {/* Place of Birth Autocomplete */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="personal-place-of-birth">Place of Birth</InputLabel>
                <Autocomplete
                  freeSolo
                  options={placeOptions}
                  value={placeOfBirth}
                  onInputChange={(event, newInputValue) => {
                    setPlaceOfBirth(newInputValue);
                    fetchPlaces(newInputValue);
                  }}
                  renderInput={(params) => <TextField {...params} placeholder="Enter place of birth" fullWidth />}
                />
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
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
