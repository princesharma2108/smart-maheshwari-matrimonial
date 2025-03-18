import { ReactElement } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import loginBG from 'assets/images/login/loginBG.jpeg';
import loginBG2 from 'assets/images/login/loginBG2.jpeg';
import loginBG3 from 'assets/images/login/loginBG3.jpeg';
// project imports
import AuthCard from './AuthCard';
import { Paper } from '@mui/material';

interface Props {
  children: ReactElement;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function BackgroundWrapper({ children }: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#FFE1E7',
        // backgroundImage: `url(${loginBG2})`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat: 'no-repeat',
        // backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: '100%',
          maxWidth: 800,
          mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
