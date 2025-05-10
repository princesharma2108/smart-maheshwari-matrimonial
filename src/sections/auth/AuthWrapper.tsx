import { ReactElement } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import loginImage from 'assets/images/login/loginImage.jpg';

// project imports
import AuthCard from './AuthCard';
import { Card } from '@mui/material';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function AuthWrapper({ children }: Props) {
  return (
    <Box
      sx={{
        height: '100dvh',
        backgroundColor: '#FFE1E7',
        display: 'flex',
        alignItems: 'start',
        justifyContent: 'center',
        padding: 2
      }}
    >
      <Card
        sx={{
          padding: 2,
          boxShadow: 3,
          borderRadius: 2,
          maxWidth: 900,
          width: '100%',
          height: { xs: '100%', md: 600 }, // Set a fixed height for large screens
          display: 'flex',
          flexDirection: 'row'
        }}
      >
        <Grid container sx={{ flexGrow: 1, height: '100%' }}>
          {/* Left Side - Auth Form */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: 'flex',
              alignItems: 'start',
              justifyContent: 'center',
              padding: 3
            }}
          >
            {children}
          </Grid>

          {/* Right Side - Image (Takes Full Height) */}
          <Grid
            item
            //xs={12}
            md={6}
            sx={{
              display: { xs: 'none', md: 'flex' }, // Hide on small screens
              alignItems: 'start',
              justifyContent: 'center',
              height: '100%', // Make image section take full height
              backgroundColor: '#F5F5F5' // Optional background color for contrast
            }}
          >
            <img
              src={loginImage}
              alt="Login Background"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover', // Ensure the image covers the entire section
                borderRadius: '8px'
              }}
            />
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
}
