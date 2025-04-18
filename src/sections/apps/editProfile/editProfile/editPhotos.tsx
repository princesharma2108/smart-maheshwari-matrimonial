import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Grid, IconButton, Link, Menu, MenuItem, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthDivider from 'sections/auth/AuthDivider';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import 'assets/styles/styles.scss';
import MainCard from 'components/MainCard';
import { makeProfilePhoto, uploadBiodata, uploadPhoto } from 'apiServices/user';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { APP_VERSION } from 'config';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
interface ErrorData {
  response: any;
}
interface ResponseData {
  message: string;
  status: string;
}
export default function EditPhotos() {
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader State
  const [isLoadingMakeProfile, setIsLoadingMakeProfile] = useState<boolean>(false); // Loader State
  const [isLoadingDeletePhoto, setIsLoadingDeletePhoto] = useState<boolean>(false); // Loader State
  const { register, handleSubmit, reset } = useForm();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<string[]>([]); // Store old photos
  const [menuAnchor, setMenuAnchor] = useState<(null | HTMLElement)[]>(Array(10).fill(null));

  const navigate = useNavigate();
  const onSubmit = (data: any) => {
    uploadPhotosAPI();
    //navigate('/widget/statistics');
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
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
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>, index: number) => {
    setMenuAnchor((prev) => {
      const newAnchors = [...prev];
      newAnchors[index] = event.currentTarget;
      return newAnchors;
    });
  };

  const handleMenuClose = (index: number) => {
    setMenuAnchor((prev) => {
      const newAnchors = [...prev];
      newAnchors[index] = null;
      return newAnchors;
    });
  };

  const handleSetAsProfilePhoto = (index: number, preview: string) => {
    if (index !== 0) {
      const updatedPreviews = [previews[index], ...previews.filter((_, i) => i !== index)];
      setPreviews(updatedPreviews);
    }
    makeProfilePhotoAPI(preview);
    handleMenuClose(index);
  };
  const makeProfilePhotoAPI = async (preview: string) => {
    setIsLoadingMakeProfile(true);
    const matrimonialId = localStorage.getItem('matrimonialId');
    const profileData = {
      matrimonialId: matrimonialId,
      profileUrl: preview
    };
    try {
      const response = await makeProfilePhoto(profileData);
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
    } finally {
      setIsLoadingMakeProfile(false); // Stop Loader
    }
  };
  const handleRemoveFile = (index: number, preview: string) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
    deletePhotoAPI(preview);
    handleMenuClose(index);
  };
  const deletePhotoAPI = async (preview: string) => {
    setIsLoadingDeletePhoto(true);
    const matrimonialId = localStorage.getItem('matrimonialId');
    const deleteData = {
      matrimonialId: matrimonialId,
      profileUrl: preview
    };
    try {
      const response = await makeProfilePhoto(deleteData);
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
    } finally {
      setIsLoadingDeletePhoto(false); // Stop Loader
    }
  };
  const uploadPhotosAPI = async () => {
    setIsLoading(true);
    const matrimonialId = localStorage.getItem('matrimonialId');
    const uploadData = {
      matrimonialId: matrimonialId,
      appVersion: APP_VERSION
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
    } finally {
      setIsLoading(false); // Stop Loader
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
    <>
      {(isLoading || isLoadingMakeProfile || isLoadingDeletePhoto) && ( // Show Loader When API is in Progress
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            alignItems: 'left',
            gap: '4px',
            height: '100vh',
            position: 'absolute',
            width: '100%',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999
          }}
        >
          {/* <CircularProgress size={60} sx={{ color: '#f00757' }} /> */}
          <BallTriangle
            height={100}
            width={100}
            radius={5}
            color="#f00757"
            ariaLabel="ball-triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
          <Stack spacing={2} flexDirection={'row'} alignItems={'center'}>
            <Typography variant="h3" color={'#f00757'}>
              {isLoading ? 'Updating Photos' : isLoadingMakeProfile ? 'Updating Profile Photo' : 'Deleting Photo'}
            </Typography>
            <ThreeDots
              visible={true}
              height="20"
              width="20"
              color="#f00757"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ marginBottom: '5px' }}
              wrapperClass=""
            />
          </Stack>
        </Box>
      )}
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
                      <Grid item xs={6} sm={4} md={2.4} key={index}>
                        <Box sx={{ position: 'relative', width: 120, height: 120 }}>
                          <img src={preview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 5 }} />
                          {/* Three-Dot Menu */}
                          <IconButton
                            onClick={(event) => handleMenuClick(event, index)}
                            sx={{
                              height: '25px',
                              width: '25px',
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              color: 'white',
                              background: 'rgba(0,0,0,0.5)',
                              borderRadius: '8px',
                              borderTopRightRadius: '5px',
                              borderTopLeftRadius: '0',
                              borderBottomRightRadius: '0'
                            }}
                          >
                            <MoreVertIcon sx={{ height: '15px', width: '15px' }} />
                          </IconButton>

                          {/* Menu Options */}
                          <Menu anchorEl={menuAnchor[index]} open={Boolean(menuAnchor[index])} onClose={() => handleMenuClose(index)}>
                            <MenuItem onClick={() => handleSetAsProfilePhoto(index, preview)}>Set as Profile Picture</MenuItem>
                            <MenuItem onClick={() => handleRemoveFile(index, preview)}>Remove Photo</MenuItem>
                          </Menu>
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
                  disabled={isLoading || (selectedImages.length === 0 && existingPhotos.length === 0)} // Fix here
                  className="buttonStyle"
                >
                  Upload
                </Button>
              </Grid>
            </Grid>
          </MainCard>
        </Grid>
      </Grid>
    </>
  );
}
