import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Grid, IconButton, Link, CircularProgress } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthDivider from 'sections/auth/AuthDivider';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import 'assets/styles/styles.scss';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import { getUserStage, postUserStage, uploadBiodata } from 'apiServices/user';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
interface ErrorData {
  response: any;
}
interface ResponseData {
  message: string;
  status: string;
}
export default function UploadBiodata() {
  const { register, handleSubmit, reset } = useForm();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loader State
  const navigate = useNavigate();

  // Handle form submission
  const onSubmit = (data: any) => {
    console.log('Uploaded Biodata:', data.biodata?.[0]);
    uploadBiodataAPI();
  };

  // Handle file selection and preview
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        alert('Only PDF files are allowed!');
        return;
      }
      setFilePreview(URL.createObjectURL(file));
      setFileName(file.name);
      setSelectedFile(file);
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setFilePreview(null);
    setFileName(null);
    reset();
  };

  const uploadBiodataAPI = async () => {
    setIsLoading(true);
    const matrimonialId = localStorage.getItem('matrimonialId');
    const uploadData = {
      matrimonialId: matrimonialId,
      appVersion: '1.0.4'
    };
    // Create a FormData object
    const formData = new FormData();
    // formData.append('data', JSON.stringify(uploadData));
    if (matrimonialId) {
      formData.append('matrimonialId', matrimonialId);
    } else {
      console.warn('No matrimonialId found in localStorage.');
    }
    // Only append the file if it's selected
    if (selectedFile) {
      console.log('uploadBiodataPDF', selectedFile);
      formData.append('file', selectedFile);
    } else {
      console.log('No file selected, proceeding without image');
    }
    formData.append('appVersion', '1.0.4');
    try {
      const response = await uploadBiodata(formData);
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
      navigate('/personal-details');
      reset();
      handleRemoveFile();
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
    //navigate('/upload-photos');
    const userId = localStorage.getItem('userId');
    const stageData = {
      userId: userId,
      registrationStage: 1
    };
    try {
      const response = await postUserStage(stageData);
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
    }
  };
  useEffect(() => {
    postUserStageAPI();
  }, []);

  return (
    <BackgroundWrapper>
      <>
        {isLoading && ( // Show Loader When API is in Progress
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              position: 'absolute',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 9999
            }}
          >
            <CircularProgress size={60} sx={{ color: '#f00757' }} />
          </Box>
        )}
        <Grid container spacing={3} justifyContent="center">
          {/* Title */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="h3">Upload Biodata</Typography>
          </Grid>

          {/* Divider */}
          <Grid item xs={12}>
            <AuthDivider>
              <Typography variant="body1">Select Your File</Typography>
            </AuthDivider>
          </Grid>

          {/* Upload Button */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} className="buttonStyle">
              Choose File
              <input type="file" accept="application/pdf" {...register('biodata', { required: true })} onChange={handleFileChange} hidden />
            </Button>
          </Grid>

          {/* File Name & Remove Option */}
          {fileName && (
            <Grid item xs={12} sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ mt: 2, fontWeight: 'bold' }}>
                Selected File: {fileName}
              </Typography>
              <IconButton onClick={handleRemoveFile} sx={{ ml: 2, color: 'red' }}>
                <DeleteIcon />
              </IconButton>
            </Grid>
          )}

          {/* File Preview */}
          {filePreview && (
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <iframe src={filePreview} width="100%" height="200px" title="Biodata Preview"></iframe>
            </Grid>
          )}

          {/* Upload Button */}
          <Grid item xs={6} md={6} sx={{ textAlign: 'center' }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              onClick={handleSubmit(onSubmit)}
              disabled={!fileName}
              className="buttonStyle"
            >
              Upload
            </Button>
          </Grid>

          {/* Skip Link */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
            <Typography variant="body2">
              If you don't have biodata, then{' '}
              <Link
                component={RouterLink}
                to="/personal-details"
                sx={{ color: '#f00757', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Skip
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </>
    </BackgroundWrapper>
  );
}
