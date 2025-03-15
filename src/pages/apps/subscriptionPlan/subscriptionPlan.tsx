import { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import MainCard from 'components/MainCard';
import splashLogo from 'assets/images/logo/splashLogo.png';
import AnimateButton from 'components/@extended/AnimateButton';
const subscriptionPlans = [
  { duration: '1 Month', price: 10 },
  { duration: '6 Months', price: 9 },
  { duration: '12 Months', price: 10 },
  { duration: '18 Months', price: 9 },
  { duration: '24 Months', price: 10 }
];

export default function SubscriptionPlan() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <Grid container justifyContent="center">
      <MainCard>
        {/* Title Section */}
        <Grid xs={12} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="h3">Subscription Plan</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            Choose any plan as per your need.
          </Typography>
        </Grid>

        {/* Logo Section */}
        <Grid xs={12} display="flex" alignItems="center" justifyContent="center">
          <img src={splashLogo} height={250} width={250} alt="Subscription Logo" />
        </Grid>

        {/* Subscription Plan Grid */}
        <Grid container spacing={3} justifyContent="center" sx={{ textAlign: 'center', mt: 3 }}>
          {subscriptionPlans.map((plan, index) => {
            const isSelected = selectedPlan === index;

            return (
              <Grid item xs={12} sm={6} key={index} display="flex" justifyContent="center">
                <Grid
                  onClick={() => setSelectedPlan(index)}
                  sx={{
                    border: isSelected ? '2px solid #f00757' : '1px solid gray',
                    backgroundColor: '#FFE1E7',
                    color: '#000',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                    p: 2,
                    gap: 1,
                    transition: 'all 0.3s ease-in-out'
                  }}
                >
                  <Typography variant="h6">{plan.duration} Plan First 3 Matches free</Typography>
                  <Typography>- Then ${plan.price}/Month</Typography>
                  <Button
                    variant="outlined"
                    sx={{
                      color: isSelected ? '#f00757' : 'gray',
                      borderColor: isSelected ? '#f00757' : 'gray',
                      mt: 2,
                      '&:hover': {
                        backgroundColor: isSelected ? '#d00647' : '#f00757',
                        color: '#fff',
                        borderColor: '#f00757'
                      }
                    }}
                  >
                    Choose Plan
                  </Button>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid
          container
          justifyContent="center"
          display={'flex'}
          flexDirection={'column'}
          alignItems={'center'}
          sx={{ textAlign: 'center', mt: 3 }}
        >
          <Typography>
            You agree to the <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
          </Typography>
          <Typography>Subscription automatically renews unless auto-renew is turned off at least 24 hours</Typography>
          <Typography>before the end of the current period.</Typography>
        </Grid>
        <Grid container justifyContent="center" display={'flex'} alignItems={'center'} sx={{ textAlign: 'center', mt: 3 }}>
          <AnimateButton>
            <Button variant="contained" sx={{ width: '100%', backgroundColor: '#F00757', '&:hover': { backgroundColor: '#F00757' } }}>
              Start My Membership
            </Button>
          </AnimateButton>
        </Grid>
      </MainCard>
    </Grid>
  );
}
