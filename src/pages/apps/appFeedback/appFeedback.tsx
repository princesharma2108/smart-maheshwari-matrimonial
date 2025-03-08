// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Box } from '@mui/material';

// ===========================|| WIDGET - STATISTICS ||=========================== //

export default function AppFeedback() {
  const theme = useTheme();
  return (
    <>
      <Grid container marginBottom={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h3">App Feedback </Typography>
      </Grid>
    </>
  );
}
