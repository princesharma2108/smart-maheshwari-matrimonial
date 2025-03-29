import React, { useRef, useState, useEffect } from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { usePlaceDetails } from './placesHook';
import { Grid, TextField, Typography, Box } from '@mui/material';
import dropdownUpArrow from '../../../../assets/images/poc/dropdownUpArrow.svg';
import dropdownDownArrow from '../../../../assets/images/poc/dropdownDownArrow.svg';
import 'assets/styles/styles.scss';
interface AddressProps {
  fieldName: string;
  initialAddress?: string;
  handleAddressChange: (address: string) => void;
  handleCityChange: (city: string) => void;
  handleStateChange: (state: string) => void;
  handleZipChange: (zip: string) => void;
  handleLatitudeChange: (latitude: number) => void;
  handleLongitudeChange: (longitude: number) => void;
  showArrow?: boolean;
  style?: React.CSSProperties;
  background?: string;
  editable?: boolean;
  pageName?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  labelColor?: string;
  borderColor?: string;
  error?: boolean;
  helperText?: string;
}

const Address: React.FC<AddressProps> = ({
  fieldName,
  initialAddress = '',
  handleAddressChange,
  handleCityChange,
  handleStateChange,
  handleZipChange,
  handleLatitudeChange,
  handleLongitudeChange,
  showArrow = true,
  background = '#ffffff',
  editable = false,
  pageName,
  onBlur,
  onFocus,
  labelColor,
  borderColor,
  error,
  helperText
}) => {
  console.log('homeAddressBirth2', initialAddress);
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>(initialAddress);
  const [locationAddress, setLocationAddress] = useState<string>(initialAddress);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedZip, setSelectedZip] = useState<string>('');
  const [selectedLatitude, setSelectedLatitude] = useState<number | null>(null);
  const [selectedLongitude, setSelectedLongitude] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const {
    suggestions: { status, data },
    setValue: setPlaceSearchValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    //requestOptions: { componentRestrictions: { country: 'IN' } },
    debounce: 300
  });

  const [getPlaceDetails] = usePlaceDetails();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedAddress(value);
    setLocationAddress(value);
    setPlaceSearchValue(value);
  };

  const handleSelectSuggestion = (suggestion: string, placeData: any) => {
    setSelectedAddress(suggestion);
    // ✅ Clear suggestions immediately to close the dropdown
    setSuggestions([]);
    clearSuggestions();
    getPlaceDetails(placeData.place_id, (res: any) => {
      console.log('resultAddress', res);
      // setSelectedAddress(res.street_address || '');
      setSelectedCity(res.city || '');
      setSelectedState(res.state || '');
      setSelectedZip(res.postal_code || '');
      setSelectedLatitude(res.location.coordinates[0]);
      setSelectedLongitude(res.location.coordinates[1]);

      const completeAddress = `${res.street_address || ''}${res.city || res.state || res.postal_code ? ',' : ''} ${res.city || ''}${res.state || res.postal_code ? ',' : ''} ${res.state || ''}${res.postal_code ? ',' : ''} ${res.postal_code || ''}`;
      setSelectedAddress(completeAddress);
      setLocationAddress(
        pageName === 'Education Details'
          ? `${res.city || ''}, ${res.state || ''}, ${res.postal_code || ''}`
          : `${res.city || ''}${res.state ? ', ' : ''}${res.state || ''}`
      );

      // handleAddressChange(res.street_address);
      handleAddressChange(completeAddress);
      handleCityChange(res.city);
      handleStateChange(res.state);
      handleZipChange(res.postal_code);
      handleLatitudeChange(res.location.coordinates[0]);
      handleLongitudeChange(res.location.coordinates[1]);
      // ✅ Clear suggestions to close the dropdown
      setSuggestions([]);
      clearSuggestions();
    });
  };

  useEffect(() => {
    if (status === 'OK') {
      setSuggestions(data.map((suggestion) => suggestion.description));
    } else {
      setSuggestions([]);
    }
  }, [status, data]);

  useEffect(() => {
    setSelectedAddress(initialAddress);
  }, [initialAddress]);
  useEffect(() => {
    if (!selectedAddress) {
      setSuggestions([]);
    }
  }, [selectedAddress]);
  console.log('homeAddressBirth3', selectedAddress);
  return (
    <Grid container direction="column" spacing={1} sx={{ padding: '0' }}>
      {/* {!editable && (
        <Grid item>
          <Typography variant="body2" color={labelColor || 'textSecondary'}>
            {fieldName}
          </Typography>
        </Grid>
      )} */}
      <Grid sx={{ padding: '0' }}>
        <TextField
          inputRef={addressInputRef}
          variant="outlined"
          fullWidth
          value={selectedAddress}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={'Enter Place of Birth'}
          autoComplete="off"
          className="inputField"
          error={error}
          helperText={helperText}
        />
      </Grid>
      {suggestions.length > 0 && (
        <Grid item sx={{ padding: '0' }}>
          <Box sx={{ border: '1px solid #ccc', borderRadius: 1, backgroundColor: '#fff' }}>
            {suggestions.map((suggestion, index) => (
              <Box
                key={index}
                sx={{
                  padding: '8px',
                  cursor: 'pointer',
                  '&:hover': { backgroundColor: '#f0f0f0' }
                }}
                onClick={() => handleSelectSuggestion(suggestion, data[index])}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};

export default Address;
