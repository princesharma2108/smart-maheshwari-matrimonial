import { useState, useEffect } from 'react';
import { Grid, Typography, Button, Stack } from '@mui/material';
import MainCard from 'components/MainCard';
import checkPlan from 'assets/images/subscription/checkPlan.svg';
import uncheckPlan from 'assets/images/subscription/uncheckPlan.svg';
import { getSubscriptionPlan, subscriptionPayment } from 'apiServices/data';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';

interface ResponseData {
  status: string;
  message: string;
  subcriptions: any[] | null;
}

interface ErrorData {
  response: any;
}

const subscriptions = [
  {
    planId: 1,
    planName: 'Premium Plan',
    planDescription: 'Access to premium features',
    benefits: [
      'All benefits of the Monthly Plan',
      'Exclusive access to advanced astrology insights',
      'Dedicated relationship guidance and tips',
      'Profile boost for higher visibility',
      'Complimentary compatibility report with every new connection'
    ],
    price: 100,
    currency: 'INR',
    duration: 180,
    bestSeller: 0
  },
  {
    planId: 2,
    planName: 'Basic Plan',
    planDescription: 'A basic plan with limited features.',
    benefits: [
      'All benefits of the Monthly Plan',
      'Exclusive access to advanced astrology insights',
      'Dedicated relationship guidance and tips'
    ],
    price: 1,
    currency: 'INR',
    duration: 12,
    bestSeller: 1
  }
];

export default function SubscriptionPlan() {
  const [selectedPlan, setSelectedPlan] = useState<number | null>(null);
  const [subscriptionPlansData, setSubscriptionPlansData] = useState<any[]>(subscriptions); // Default to `subscriptions`

  const getSubscriptionPlanAPI = async () => {
    try {
      const response = await getSubscriptionPlan();
      const responseData = response.data as ResponseData;

      if (!responseData.subcriptions) {
        throw new Error('No subscription data available');
      }

      setSubscriptionPlansData(responseData.subcriptions);
    } catch (error) {
      console.error('Error fetching subscriptions:', error);

      const errorMessage = (error as ErrorData)?.response?.data?.message || 'Failed to load subscription plans';

      openSnackbar({
        open: true,
        message: errorMessage,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    }
  };

  useEffect(() => {
    getSubscriptionPlanAPI();
  }, []);
  const subscriptionPaymentAPI = async (planId: any) => {
    const userId = localStorage.getItem('userId');
    var paymentData = {
      userId: userId,
      planId: planId
    };
    try {
      const response = await subscriptionPayment(paymentData);
      const responseData = response.data as ResponseData;
    } catch (error) {
      console.error('Error fetching subscriptions:', error);

      const errorMessage = (error as ErrorData)?.response?.data?.message || 'Failed to load subscription plans';

      openSnackbar({
        open: true,
        message: errorMessage,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    }
  };
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
          {subscriptionPlansData.length > 0 ? (
            subscriptionPlansData.map((plan, index) => (
              <Grid
                key={plan.planId || index}
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
                  backgroundColor: selectedPlan === plan.planId ? '#f8f9fa' : 'transparent'
                }}
              >
                <Typography variant="h3">{plan.planName || 'N/A'}</Typography>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  {plan.planDescription || 'No description available'}
                </Typography>

                {/* Price Section */}
                <Grid item display="flex" flexDirection="column" alignItems="center">
                  <Typography variant="h1">
                    {plan.currency || 'USD'} {plan.price !== undefined ? plan.price : 'N/A'}
                  </Typography>
                  <Typography variant="body1">for {plan.duration || 'N/A'} months</Typography>
                </Grid>

                {/* Benefits List */}
                <Grid item display="flex" flexDirection="column" gap="12px">
                  {(plan.benefits && plan.benefits.length > 0 ? plan.benefits : ['No benefits listed']).map(
                    (benefit: string, idx: number) => (
                      <Stack key={idx} direction="row" spacing={2}>
                        <img src={checkPlan} alt="check" />
                        <Typography variant="body1">{benefit}</Typography>
                      </Stack>
                    )
                  )}
                </Grid>

                {/* Choose Plan Button */}
                <Button
                  variant="contained"
                  onClick={() => {
                    setSelectedPlan(plan.planId);
                    subscriptionPaymentAPI(plan.planId);
                  }}
                  sx={{
                    backgroundColor: selectedPlan === plan.planId ? '#f00757' : 'transparent',
                    color: selectedPlan === plan.planId ? '#fff' : '#f00757',
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
            ))
          ) : (
            <Typography variant="h5" sx={{ mt: 2 }}>
              No subscription plans available.
            </Typography>
          )}
        </Grid>
      </MainCard>
    </Grid>
  );
}
