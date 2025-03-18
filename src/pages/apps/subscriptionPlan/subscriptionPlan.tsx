import { useState } from 'react';
import { Grid, Typography, Button, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import checkPlan from 'assets/images/subscription/checkPlan.svg';
import uncheckPlan from 'assets/images/subscription/uncheckPlan.svg';

const subscriptionPlans = [
  { duration: '1 Month', price: 7, features: [true, true, true, false, false, false] },
  { duration: '6 Months', price: 9, features: [true, true, true, true, false, false] },
  { duration: '12 Months', price: 10, features: [true, true, true, true, true, false] }
];

export default function SubscriptionPlan() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);

  return (
    <Grid container justifyContent="center">
      <MainCard xs={12} md={12} sx={{ width: '100%' }}>
        {/* Title Section */}
        <Grid xs={12} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
          <Typography variant="h2">Simple and Transparent</Typography>
          <Typography variant="h5" sx={{ mt: 1 }}>
            Simple pricing with no hidden fees to start - no trial, no contract, no risk.
          </Typography>
        </Grid>

        {/* Plans Section */}
        <Grid container display="flex" justifyContent="center" gap="32px" sx={{ mt: '32px' }}>
          {subscriptionPlans.map((plan, index) => (
            <Grid
              key={index}
              item
              xs={12}
              md={3}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '32px',
                border: '1px solid #B6BAC3',
                borderRadius: '10px',
                p: '32px 52px',
                backgroundColor: selectedPlan === index ? '#f8f9fa' : 'transparent'
              }}
            >
              <Typography variant="h3">{plan.duration} Plan</Typography>
              <Grid item display="flex" flexDirection="column" alignItems="center">
                <Typography variant="h1">${plan.price}</Typography>
                <Typography variant="body1">User/Month</Typography>
              </Grid>

              {/* Features List */}
              <Grid item display="flex" flexDirection="column" gap="12px">
                {plan.features.map((feature, idx) => (
                  <Stack key={idx} direction="row" spacing={2}>
                    <img src={feature ? checkPlan : uncheckPlan} alt="feature-check" />
                    <Typography variant="body1">Feature {idx + 1}</Typography>
                  </Stack>
                ))}
              </Grid>

              {/* Choose Plan Button */}
              <Button
                variant="contained"
                onClick={() => setSelectedPlan(index)}
                sx={{
                  backgroundColor: selectedPlan === index ? '#f00757' : 'transparent',
                  color: selectedPlan === index ? '#fff' : '#f00757',
                  border: '1px solid #f00757',
                  mt: 2,
                  '&:hover': {
                    backgroundColor: '#f00757',
                    color: '#fff',
                    borderColor: '#f00757'
                  }
                }}
              >
                {'Choose Plan'}
              </Button>
            </Grid>
          ))}
        </Grid>
      </MainCard>
    </Grid>
  );
}
