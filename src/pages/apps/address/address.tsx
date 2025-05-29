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
  handleCountryChange: (state: string) => void;
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
  placeholder?: string;
}

const Address: React.FC<AddressProps> = ({
  fieldName,
  initialAddress = '',
  handleAddressChange,
  handleCityChange,
  handleStateChange,
  handleCountryChange,
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
  helperText,
  placeholder
}) => {
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedAddress, setSelectedAddress] = useState<string>(initialAddress);
  const [locationAddress, setLocationAddress] = useState<string>(initialAddress);
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedZip, setSelectedZip] = useState<string>('');
  const [selectedLatitude, setSelectedLatitude] = useState<number | null>(null);
  const [selectedLongitude, setSelectedLongitude] = useState<number | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const {
    suggestions: { status, data },
    setValue: setPlaceSearchValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    // requestOptions: { componentRestrictions: { country: 'IN' }, types: ['geocode'] },
    debounce: 300
  });
  const [getPlaceDetails] = usePlaceDetails();
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedAddress(value);
    if (fieldName == 'City') {
      setSelectedCity('');
      //setSelectedAddress('');
      handleCityChange('');
    }
    if (fieldName == 'State') {
      setSelectedState('');
      // setSelectedAddress('');
      handleStateChange('');
    }
    if (fieldName == 'Country') {
      setSelectedState('');
      //setSelectedAddress('');
      handleCountryChange('');
    }
    if (fieldName == 'Place of Birth') {
      //setSelectedState('');
      // setSelectedAddress('');
      handleAddressChange('');
    }
    setLocationAddress(value);
    setPlaceSearchValue(value);
  };
  const handleSelectSuggestion = (suggestion: string, placeData: any) => {
    setSelectedAddress(suggestion);
    // ✅ Clear suggestions immediately to close the dropdown
    setSuggestions([]);
    clearSuggestions();
    getPlaceDetails(placeData.place_id, (res: any) => {
      // if (res.country !== 'India') return; // ✅ Ensure selection is from India
      // setSelectedAddress(res.street_address || '');
      setSelectedAddress('');
      if (fieldName == 'City') {
        if (res.city == null) {
          setSelectedCity(res.street_address || '');
          handleCityChange(res.street_address.split(',')[0].trim());
        } else {
          setSelectedCity(res.city || '');
          handleCityChange(res.city);
        }
        setSelectedState(res.state || '');
        setSelectedCountry(res.country || '');
        handleStateChange(res.state);
        handleCountryChange(res.country);
      }
      if (fieldName == 'State') {
        setSelectedState(res.state || '');
        setSelectedCountry(res.country || '');
        handleStateChange(res.state);
        handleCountryChange(res.country);
      }
      if (fieldName == 'Country') {
        setSelectedCountry(res.country || '');
        handleCountryChange(res.country);
      }
      const completeAddress = `${res.street_address || ''}${res.city || res.state || res.country || res.postal_code ? ', ' : ''}${res.city || ''}${res.state || res.country || res.postal_code ? ', ' : ''}${res.state || ''}${res.country || res.postal_code ? ', ' : ''} ${res.country || ''}${res.country || res.postal_code ? ', ' : ''} ${res.postal_code || ''}`;

      if (fieldName == 'Place of Birth') {
        setSelectedAddress(completeAddress || '');
        handleAddressChange(completeAddress);
      }
      setSelectedZip(res.postal_code || '');
      setSelectedLatitude(res.location.coordinates[0]);
      setSelectedLongitude(res.location.coordinates[1]);

      setLocationAddress(
        pageName === 'Education Details'
          ? `${res.city || ''}, ${res.state || ''}, ${res.postal_code || ''}`
          : `${res.city || ''}${res.state ? ', ' : ''}${res.state || ''}`
      );
      // handleAddressChange(res.street_address);
      // handleAddressChange(completeAddress);
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
  return (
    <Grid container direction="column" spacing={1} sx={{ padding: '0' }}>
      <Grid sx={{ padding: '0' }}>
        <TextField
          inputRef={addressInputRef}
          variant="outlined"
          fullWidth
          value={selectedAddress}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
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
