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
interface TabEditStep2Props {
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
  setIsStepValid: (value: boolean) => void;
}
export default function TabEditStep2({
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
  setIsStepValid,
  heightOptions = [],
  hobbiesOptions = [],
  disabilities = [],
  bloodGroupOptions = [],
  complexionOptions = [],
  maritalOptions = []
}: TabEditStep2Props) {
  const theme = useTheme();
  const [errors, setErrors] = useState({
    weight: '',
    height: '',
    gender: '',
    hobbies: '',
    complexion: '',
    maritalStatus: ''
  });
  const handleSelectChange = (setter: (value: string) => void) => (event: SelectChangeEvent) => setter(event.target.value);
  const handleWeightChange = (event: ChangeEvent<HTMLInputElement>) => setWeight(event.target.value);
  const validateStep = () => {
    let newErrors = {
      weight: '',
      height: '',
      gender: '',
      hobbies: '', // Ensure hobbies is an array
      complexion: '',
      maritalStatus: ''
    };

    if (!weight) newErrors.weight = 'This field is required.';
    if (!height) newErrors.height = 'This field is required.';
    if (!gender) newErrors.gender = 'This field is required.';
    if (hobbies.length == 0) newErrors.hobbies = 'This field is required.';
    if (!complexion) newErrors.complexion = 'This field is required.';
    if (!maritalStatus) newErrors.maritalStatus = 'This field Status is required.';

    setErrors(newErrors);
    const isValid = Object.values(newErrors).every((err) => err === '');
    setIsStepValid(isValid); // Update parent state
    return isValid;
  };

  useEffect(() => {
    validateStep(); // Validate on component mount/update
  }, [weight, height, gender, hobbies, complexion, maritalStatus]);
  return (
    <Grid container spacing={3}>
      {/* {/ Left Side /} */}
      <Grid item xs={12} sm={6}>
        <MainCard title="">
          <Grid container spacing={3}>
            {/* {/ Weight /} */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="weight">
                  Weight (kg)<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <TextField
                  fullWidth
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={handleWeightChange}
                  placeholder="Enter weight"
                  className="inputField"
                  onBlur={validateStep}
                  error={!!errors.weight}
                  helperText={errors.weight}
                />
              </Stack>
            </Grid>
            {/* {/ Height /} */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="height">
                  Height<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  value={height}
                  onChange={handleSelectChange(setHeight)}
                  displayEmpty
                  className="inputFieldLogin"
                  onBlur={validateStep}
                  error={!!errors.height}
                >
                  <MenuItem value="" disabled>
                    Select Height
                  </MenuItem>
                  {!heightOptions.includes(height) && height && <MenuItem value={height}>{height}</MenuItem>}
                  {heightOptions?.sort().map((option: string) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>

            {/* {/ Gender /} */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="gender">
                  Gender<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  value={gender}
                  onChange={handleSelectChange(setGender)}
                  displayEmpty
                  className="inputFieldLogin"
                  onBlur={validateStep}
                  error={!!errors.gender}
                >
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

            {/* {/ Hobbies /} */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="hobbies">
                  Hobbies<span style={{ color: 'red' }}>*</span>
                </InputLabel>
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
                  onBlur={validateStep}
                  error={!!errors.hobbies}
                >
                  <MenuItem value="" disabled>
                    Select Hobby
                  </MenuItem>
                  {hobbiesOptions?.sort().map((option) => (
                    <MenuItem key={option} value={option}>
                      <Checkbox checked={hobbies.includes(option)} className="inputFieldCheckbox" />
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </Stack>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>

      {/* {/ Right Side /} */}
      <Grid item xs={12} sm={6}>
        <MainCard>
          <Grid container spacing={3}>
            {/* {/ Disability /} */}
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

            {/* {/ Blood Group /} */}
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

            {/* {/ Complexion /} */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="complexion">
                  Complexion<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  value={complexion}
                  onChange={handleSelectChange(setComplexion)}
                  displayEmpty
                  className="inputFieldLogin"
                  onBlur={validateStep}
                  error={!!errors.complexion}
                >
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

            {/* {/ Marital Status /} */}
            <Grid item xs={12}>
              <Stack spacing={1}>
                <InputLabel htmlFor="marital-status">
                  Marital Status<span style={{ color: 'red' }}>*</span>
                </InputLabel>
                <Select
                  fullWidth
                  value={maritalStatus}
                  onChange={handleSelectChange(setMaritalStatus)}
                  displayEmpty
                  className="inputFieldLogin"
                  onBlur={validateStep}
                  error={!!errors.maritalStatus}
                >
                  <MenuItem value="" disabled>
                    Select Marital Status
                  </MenuItem>
                  {!maritalOptions.includes(maritalStatus) && maritalStatus && <MenuItem value={maritalStatus}>{maritalStatus}</MenuItem>}
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
