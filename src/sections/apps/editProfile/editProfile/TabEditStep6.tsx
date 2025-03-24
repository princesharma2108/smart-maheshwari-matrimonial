import { useState, ChangeEvent, useEffect } from 'react';

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
interface TabEditStep6Props {
  gotra: string;
  setGotra: (value: string) => void;
  manglik: string;
  setManglik: (value: string) => void;
  gunnMatchingImportant: boolean;
  setGunnMatchingImportant: (value: boolean) => void;
  includeUnknownManglik: boolean;
  setIncludeUnknownManglik: (value: boolean) => void;
  gotraOptions: any;
  manglikOptions: any;
}
export default function TabEditStep6({
  gotra,
  setGotra,
  manglik,
  setManglik,
  gunnMatchingImportant,
  setGunnMatchingImportant,
  includeUnknownManglik,
  setIncludeUnknownManglik,
  gotraOptions = [],
  manglikOptions = []
}: TabEditStep6Props) {
  const theme = useTheme();

  // Handlers
  const handleGotraChange = (event: SelectChangeEvent) => setGotra(event.target.value);
  const handleManglikChange = (event: SelectChangeEvent) => setManglik(event.target.value);
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
                      {gotraOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
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
                      {manglikOptions?.sort().map((option: string) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
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
    </Grid>
  );
}
