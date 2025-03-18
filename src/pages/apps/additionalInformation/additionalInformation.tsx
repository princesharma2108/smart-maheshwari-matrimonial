import React, { useState } from 'react';
import {
  Tabs,
  Tab,
  Box,
  Typography,
  Paper,
  Card,
  CardContent,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Grid,
  Stack,
  Button
} from '@mui/material';
import loginBG from 'assets/images/login/loginBG.jpeg';
import { useNavigate } from 'react-router-dom';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div role="tabpanel" hidden={value !== index} style={{ padding: '16px' }}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const AdditionalInformation: React.FC = () => {
  const [selectedAboutMe, setSelectedAboutMe] = useState('');
  const navigate = useNavigate();
  const handleAboutMeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAboutMe(event.target.value);
  };

  const aboutMeOptions = [
    'I am a passionate traveler who loves exploring new cultures and cuisines. Adventure and spontaneity define my lifestyle.',
    'I am a dedicated professional focused on career growth while maintaining a healthy work-life balance. Fitness and reading are my favorite pastimes.',
    'I enjoy quiet evenings with a good book or a movie. I believe in meaningful conversations and strong personal connections.',
    'A fun-loving and social person, I love spending time with family and friends. My weekends are filled with laughter, music, and great food.'
  ];

  return (
    <BackgroundWrapper>
      <>
        <Typography variant="h5" gutterBottom>
          Additional Information
        </Typography>

        {/* About Me Card */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  About Me
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup value={selectedAboutMe} onChange={handleAboutMeChange}>
                    {aboutMeOptions.map((text, index) => (
                      <FormControlLabel
                        key={index}
                        value={text}
                        control={
                          <Radio
                            sx={{
                              color: '#FF4081', // Default (unchecked) color
                              '&.Mui-checked': {
                                color: '#D81B60' // Outer ring color when checked
                              },
                              '&.Mui-checked .MuiSvgIcon-root': {
                                fill: '#D81B60' // Changes the inner ball color when checked
                              },
                              '& .MuiSvgIcon-root': {
                                fontSize: 28 // Optional: Adjust radio button size
                              }
                            }}
                          />
                        }
                        label={<Typography variant="body2">{text}</Typography>}
                      />
                    ))}
                  </RadioGroup>
                </FormControl>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  navigate('/preferences');
                }}
              >
                Previous
              </Button>
              <Button
                variant="contained"
                onClick={() => {
                  navigate('/upload-photos');
                }}
                className="buttonStyle"
              >
                Continue
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </>
    </BackgroundWrapper>
  );
};

export default AdditionalInformation;
