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
  padding?: string | number;
}

// ==============================|| AUTHENTICATION - WRAPPER ||============================== //

export default function BackgroundWrapper({ children, padding = 3 }: Props) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#F2F2F2',
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
          p: padding ? padding : 3,
          width: '100%',
          maxWidth: 800,
          height: '100%',
          //mx: 'auto',
          bgcolor: 'rgba(255, 255, 255, 0.85)',
          border: '1px solid #070C0026',
          //backdropFilter: 'blur(10px)',
          borderRadius: 2
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'center'
          // alignItems: 'center'
        }}
      >
        {children}
      </Paper>
    </Box>
  );
}
