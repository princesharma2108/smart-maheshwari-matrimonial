import { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, IconButton, Link, CircularProgress, Stack } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'assets/styles/styles.scss';
import SMMLogo from 'assets/images/logo/SMMLogo.svg';
import splashBottomImage from 'assets/images/login/splashBottomImage.png';
import SMMLogoWeb from 'assets/images/login/SMMLogoWeb.png';
import SMMLogoWebIMG from 'assets/images/login/SMMLogoWebIMG.png';
export default function SplashScreen() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Show blank screen for 1 second, then show content
    setTimeout(() => setLoading(false), 500);
    // Simulate loading and navigate after 3 seconds
    const timer = setTimeout(() => navigate('/login'), 4500);
    return () => clearTimeout(timer);
  }, [navigate]);
  if (loading) {
    return <Box sx={{ width: '100vw', height: '100vh', backgroundColor: '#fff' }} />;
  }
  return (
    <Grid
      container
      sx={{
        backgroundColor: '#fff',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Logo Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          //alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: -15, // Adjust as needed
          left: '50%',
          transform: 'translateX(-50%)'
        }}
      >
        <img src={SMMLogoWebIMG} alt="LOGO Image" style={{ width: 500, height: 400 }} />
      </motion.div>
      {/* Text Section (Between Logo and Bottom Image) */}
      <Box
        sx={{
          position: 'absolute',
          top: '57%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'right' // Align text to the right
        }}
      >
        {/* Smart Matrimony Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Starts slightly lower
          animate={{ opacity: 1, y: 0 }} // Moves to its correct position
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 2 }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 'bold',
              fontSize: '2.8rem',
              lineHeight: 1.1
            }}
          >
            Smart Matrimony
          </Typography>
        </motion.div>
        {/* for Maheshwari's Animation */}
        <motion.div
          initial={{ opacity: 0, y: 50 }} // Starts slightly lower
          animate={{ opacity: 1, y: 0 }} // Moves up into position
          transition={{ duration: 1.2, ease: 'easeInOut', delay: 2 }} // Slight delay after "Smart Matrimony"
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: '1.5rem',
              marginTop: '8px'
            }}
          >
            for Maheshwari's
          </Typography>
        </motion.div>
      </Box>
      {/* Bottom Image Animation */}
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.5 }}
        style={{
          position: 'absolute',
          bottom: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <img src={splashBottomImage} alt="Bottom Image" style={{ width: '100%', maxWidth: 550, height: '300px' }} />
      </motion.div>
    </Grid>
  );
}
