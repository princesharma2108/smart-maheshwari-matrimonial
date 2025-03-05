import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Button, Typography, Grid, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import DeleteIcon from '@mui/icons-material/Delete';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthDivider from 'sections/auth/AuthDivider';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
export default function UploadBiodata() {
  const { register, handleSubmit, reset } = useForm();
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const navigate = useNavigate();
  // Handle form submission
  const onSubmit = (data: any) => {
    navigate('/personal-details');
    console.log('Uploaded Biodata:', data.biodata[0]);
    //alert('Biodata uploaded successfully!');
    reset(); // Reset form after submission
    handleRemoveFile(); // Remove file after upload
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
      setFileName(file.name); // Store filename
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setFilePreview(null);
    setFileName(null);
    reset(); // Reset form field
  };

  return (
    <AuthWrapper>
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
          <Button variant="contained" component="label" startIcon={<CloudUploadIcon />} sx={{ backgroundColor: '#1976d2', color: '#fff' }}>
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
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary" fullWidth onClick={handleSubmit(onSubmit)} disabled={!fileName}>
            Upload
          </Button>
        </Grid>
      </Grid>
    </AuthWrapper>
  );
}
