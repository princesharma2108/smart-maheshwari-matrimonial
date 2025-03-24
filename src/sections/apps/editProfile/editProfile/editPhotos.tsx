import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Grid, IconButton, Link } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthDivider from 'sections/auth/AuthDivider';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import 'assets/styles/styles.scss';
import MainCard from 'components/MainCard';
import { uploadBiodata, uploadPhoto } from 'apiServices/user';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
interface ErrorData {
  response: any;
}
interface ResponseData {
  message: string;
  status: string;
}
export default function EditPhotos() {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]); // Store old photos

  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    uploadPhotosAPI();
    console.log('Uploaded Photos:', selectedImages);
    //navigate('/widget/statistics');
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    console.log('FilesInput', files);
    if (selectedImages.length + files.length > 10) {
      alert('You can upload a maximum of 10 photos.');
      return;
    }

    // const validFiles = files.filter((file) => file.type.startsWith('image/'));
    // if (validFiles.length !== files.length) {
    //   alert('Only image files (JPEG, PNG) are allowed.');
    //   return;
    // }

    // setSelectedImages((prev) => [...prev, ...validFiles]);
    // setPreviews((prev) => [...prev, ...validFiles.map((file) => URL.createObjectURL(file))]);
    setSelectedImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((file) => (file.type.startsWith('image/') ? URL.createObjectURL(file) : ''))]);
    setSelectedFiles(files);
  };
  const handleRemoveFile = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
  };
  const uploadPhotosAPI = async () => {
    const matrimonialId = localStorage.getItem('matrimonialId');
    const uploadData = {
      matrimonialId: matrimonialId,
      appVersion: '1.0.4'
    };
    let fileData = [];
    // Create a FormData object
    const formData = new FormData();
    // formData.append('data', JSON.stringify(uploadData));
    if (matrimonialId) {
      formData.append('matrimonialId', matrimonialId);
    } else {
      console.warn('No matrimonialId found in localStorage.');
    }
    // Only append the file if it's selected
    if (selectedImages) {
      console.log('uploadPhotos', selectedImages);
      console.log('uploadPhotos2', selectedFiles);
      console.log(
        'Selected files:',
        selectedFiles.map((file) => file.name)
      );
      fileData = selectedFiles.map((file) => file.name);
      selectedFiles.forEach((file) => {
        formData.append('photos', file);
      });
    } else {
      console.log('No file selected, proceeding without image');
    }
    formData.append('appVersion', '1.0.4');
    try {
      const response = await uploadPhoto(formData);
      const responseData = response.data as ResponseData;
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      // **Update local storage with new images**
      const newPhotoUrls = selectedFiles.map((file) => URL.createObjectURL(file));
      const updatedPhotos = [...existingPhotos, ...newPhotoUrls];

      localStorage.setItem('photosUrl', JSON.stringify(updatedPhotos));
      setExistingPhotos(updatedPhotos);
      //navigate('/questionare');
      reset();
      setSelectedImages([]);
      setPreviews([]);
    } catch (error) {
      console.error('Error fetching customers:', error);
      const errorData = error as ErrorData;
      openSnackbar({
        open: true,
        message: errorData.response.data.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    }
  };
  useEffect(() => {
    const storedData = localStorage.getItem('photosUrl');
    const photosUrlData: string[] = storedData ? JSON.parse(storedData) : [];

    if (photosUrlData.length > 0) {
      setPreviews(photosUrlData);
      setExistingPhotos(photosUrlData); // Store existing images separately
    }
  }, []);
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
                disabled={selectedImages.length >= 10}
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
                  Selected Photos ({selectedImages.length}/10)
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
            <Grid item xs={12} sm={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSubmit(onSubmit)}
                disabled={selectedImages.length < 2}
                className="buttonStyle"
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
