// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

// project-imports

import DropboxStorage from 'sections/widget/statistics/DropboxStorage';
import SwitchBalanace from 'sections/widget/statistics/SwitchBalanace';

// ==============================|| DASHBOARD - ANALYTICS ||============================== //

export default function DashboardAnalytics() {
  const theme = useTheme();

  return (
    <Grid container rowSpacing={4.5} columnSpacing={3}>
      {/* row 1 */}
      <Grid item xs={12} md={4} lg={3}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <DropboxStorage />
          </Grid>
          <Grid item xs={12}>
            <SwitchBalanace />
          </Grid>
        </Grid>
      </Grid>

      {/* row 2 */}

      {/* row 3 */}
      <Grid item xs={12} lg={3}>
        <Grid container spacing={3}></Grid>
      </Grid>

      <Grid item xs={12} lg={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={12}></Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
