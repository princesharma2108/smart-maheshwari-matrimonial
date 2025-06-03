import { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Grid, IconButton, Link, CircularProgress, Stack } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthDivider from 'sections/auth/AuthDivider';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import 'assets/styles/styles.scss';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import { postUserStage, uploadBiodata, uploadPhoto } from 'apiServices/user';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { APP_VERSION } from 'config';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import LoadingOverlay from 'components/LoaderOverlay';
interface ErrorData {
  response: any;
}
interface ResponseData {
  message: string;
  status: string;
}
export default function UploadPhotos() {
  const { register, handleSubmit, reset } = useForm();
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const onSubmit = (data: any) => {
    uploadPhotosAPI();
    //navigate('/widget/statistics');
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes

    // Filter files that exceed the size limit
    const validFiles = files.filter((file) => {
      if (file.size > maxSize) {
        alert(`The file "${file.name}" exceeds the 10MB limit.`);
        return false;
      }
      return true;
    });

    if (selectedImages.length + validFiles.length > 10) {
      alert('You can upload a maximum of 10 photos.');
      return;
    }

    setSelectedImages((prev) => [...prev, ...validFiles]);
    setPreviews((prev) => [...prev, ...validFiles.map((file) => (file.type.startsWith('image/') ? URL.createObjectURL(file) : ''))]);
    setSelectedFiles(validFiles);
  };
  const handleRemoveFile = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setPreviews(previews.filter((_, i) => i !== index));
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    // Clear the file input value so the same file can be uploaded again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
    const formData = new FormData();
    if (matrimonialId) {
      formData.append('matrimonialId', matrimonialId);
    } else {
      console.warn('No matrimonialId found in localStorage.');
    }
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
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      sessionStorage.setItem('allowedRoute', '/questionare');
      navigate('/questionare', { replace: true });
      reset();
      setSelectedImages([]);
      //setPreviews([]);
      setSelectedFiles([]);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
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
  const postUserStageAPI = async () => {
    const userId = localStorage.getItem('userId');
    const stageData = {
      userId: userId,
      registrationStage: 4
    };
    try {
      const response = await postUserStage(stageData);
      const responseData = response.data as ResponseData;
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
    } catch (error) {
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
    postUserStageAPI();
  }, []);
  return (
    <BackgroundWrapper>
      <>
        <LoadingOverlay
          loading={isLoading}
          message={' Uploading Photos'}
          IconComponent={
            <BallTriangle height={100} width={100} radius={5} color="#f00757" ariaLabel="ball-triangle-loading" visible={true} />
          }
          showSubLoader={true}
        />
        <Grid container spacing={3} justifyContent="center">
          {/* Back Button */}
          <Grid item xs={12} sx={{ textAlign: 'left', ml: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                sessionStorage.setItem('allowedRoute', '/additional-information');
                navigate('/additional-information', { replace: true });
              }}
              className="buttonStyleOutlined"
            >
              &lt; Back
            </Button>
          </Grid>
          {/* Title */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h3">Upload Photos</Typography>
            <Typography variant="body1" sx={{ mt: 1, color: 'gray' }}>
              You must upload at least 2 photos and a maximum of 10 photos.
              <br />
              Only JPG, JPEG, PNG, and GIF formats are allowed.
            </Typography>
          </Grid>
          {/* Divider */}
          <Grid item xs={12}>
            <AuthDivider>
              <Typography variant="body1">Select Your Photos</Typography>
            </AuthDivider>
          </Grid>
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
              <input
                type="file"
                accept="image/jpeg, image/jpg, image/png, image/gif"
                multiple
                {...register('photos')}
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
              />{' '}
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
          <Grid item xs={6} md={6} sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              // size="small"
              fullWidth
              onClick={handleSubmit(onSubmit)}
              disabled={selectedImages.length < 2}
              className="buttonStyle"
            >
              Upload
            </Button>
          </Grid>
          {/* Skip Link */}
          <>
            {/* <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              If you don't have photos, then{' '}
              <Link
                component={RouterLink}
                //to="/widget/statistics"
                to="/questionare"
                replace={true}
                sx={{ color: '#f00757', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Skip
              </Link>
            </Typography>
          </Grid> */}
          </>
        </Grid>
      </>
    </BackgroundWrapper>
  );
}
