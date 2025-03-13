import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Grid, Link, Typography } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import { Global } from 'iconsax-react';
import MainCard from 'components/MainCard';
// ==============================|| USER PROFILE - BASIC ||============================== //

export default function AboutUs() {
  const navigate = useNavigate();
  const icons = {
    contactGlobe: LanguageIcon
  };
  return (
    <Grid>
      <MainCard>
        <Typography variant="h3">Maheshwari Innovative IT Services</Typography>
        <Typography variant="h5" sx={{ mt: 1 }}>
          About Our Company
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Based in Goverdhan, Maheshwari Innovative IT Services LLP is dedicated to providing cutting-edge IT solutions that meet the
          ever-evolving needs of our clients. As a leading service-based company, we specialize in creating innovative, technology-driven
          products aimed at solving real-world challenges.
        </Typography>
        <Typography variant="body1" sx={{ mt: 1 }}>
          Our matrimonial app was born out of the desire to simplify the match-making process within the Maheshwari community. We recognized
          the challenges families face in manually browsing biodatas across various platforms, so we utilized our technical expertise to
          develop an automated, user-friendly solution. This app represents our commitment to giving back to the community through
          technology.
        </Typography>
        <Typography variant="h5" sx={{ mt: 2, color: '#f00757' }}>
          Visit Our Websites
        </Typography>
        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2, display: 'flex', gap: 1 }}>
          <LanguageIcon />
          <Typography variant="body2">
            <Link
              component={RouterLink}
              to="https://miiscollp.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#f00757', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              miiscolp.com
            </Link>
          </Typography>
        </Grid>
        <Grid item xs={12} sx={{ textAlign: 'center', mt: 2, display: 'flex', gap: 1, alignItems: 'center' }}>
          <LanguageIcon />
          <Typography variant="body2">
            <Link
              component={RouterLink}
              to="https://smartmaheshwari.com"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#f00757', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
            >
              smartmaheshwari.com
            </Link>
          </Typography>
        </Grid>
      </MainCard>
    </Grid>
  );
}
