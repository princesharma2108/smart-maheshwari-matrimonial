import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Grid, IconButton, Link } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthDivider from 'sections/auth/AuthDivider';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import 'assets/styles/styles.scss';
import MainCard from 'components/MainCard';

export default function EditPhotos() {
  const { register, handleSubmit, reset } = useForm();
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    if (images.length < 2) {
      alert('Please upload at least 2 photos.');
      return;
    }
    console.log('Uploaded Photos:', images);
    navigate('/widget/statistics');
    reset();
    setImages([]);
    setPreviews([]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (images.length + files.length > 10) {
      alert('You can upload a maximum of 10 photos.');
      return;
    }

    const validFiles = files.filter((file) => file.type.startsWith('image/'));
    if (validFiles.length !== files.length) {
      alert('Only image files (JPEG, PNG) are allowed.');
      return;
    }

    setImages((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...validFiles.map((file) => URL.createObjectURL(file))]);
  };

  const handleRemoveFile = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };

  return (
    <Grid container justifyContent="center" sx={{ mt: 4 }}>
      <Grid item xs={12}>
        <MainCard>
          <Grid container spacing={3} justifyContent="center">
            {/* Title */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Typography variant="h3">Upload Photos</Typography>
              <Typography variant="body1" sx={{ mt: 1, color: 'gray' }}>
                You must upload at least 2 photos and a maximum of 10 photos.
              </Typography>
            </Grid>

            {/* Divider */}
            <Grid item xs={12}>
              <AuthDivider>
                <Typography variant="body1">Select Your Photos</Typography>
              </AuthDivider>
            </Grid>

            {/* Upload Button */}
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Button
                variant="contained"
                component="label"
                startIcon={<CloudUploadIcon />}
                sx={{ backgroundColor: '#1976d2', color: '#fff' }}
                disabled={images.length >= 10}
                className="buttonStyle"
              >
                Choose Files
                <input type="file" accept="image/*" multiple {...register('photos')} onChange={handleFileChange} hidden />
              </Button>
            </Grid>

            {/* Selected Photos */}
            {previews.length > 0 && (
              <Grid item xs={12}>
                <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
                  Selected Photos ({images.length}/10)
                </Typography>
                <Grid container spacing={2} justifyContent="center">
                  {previews.map((preview, index) => (
                    <Grid item key={index}>
                      <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                        <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 5 }} />
                        <IconButton
                          onClick={() => handleRemoveFile(index)}
                          sx={{ position: 'absolute', top: -10, right: -10, color: 'red', background: 'white' }}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            )}

            {/* Upload Button */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit(onSubmit)}
                disabled={images.length < 2}
                className="buttonStyle"
              >
                Upload
              </Button>
            </Grid>

            {/* Skip Link */}
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
              <Typography variant="body2">
                If you don't have photos, then{' '}
                <Link
                  component={RouterLink}
                  to="/widget/statistics"
                  sx={{ color: '#f00757', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  Skip
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
