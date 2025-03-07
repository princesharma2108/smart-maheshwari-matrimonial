// material-ui
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import locationIconBlack from 'assets/images/latestMatches/locationIconBlack.svg';
import birthdayIconBlack from 'assets/images/latestMatches/birthdayIconBlack.svg';
import degreeIconBlack from 'assets/images/latestMatches/degreeIconBlack.svg';
import heightIcon from 'assets/images/latestMatches/heightIcon.svg';
import incomeIconBlack from 'assets/images/latestMatches/incomeIconBlack.svg';
import professionIcon from 'assets/images/latestMatches/professionIcon.svg';
import notificationIcon from 'assets/images/latestMatches/notificationIcon.svg';
import AnimateButton from 'components/@extended/AnimateButton';
// assets
import loginBG from 'assets/images/login/loginBG.jpeg';
import loginBG2 from 'assets/images/login/loginBG2.jpeg';
import loginBG3 from 'assets/images/login/loginBG3.jpeg';
import Button from '@mui/material/Button';
import './latestMatches.scss';
import { Box } from '@mui/material';

// ===========================|| WIDGET - STATISTICS ||=========================== //

const profiles = [
  {
    name: 'Anju Maheshwari',
    location: 'Lucknow, Uttar Pradesh',
    age: 28,
    height: '5\'6"',
    education: "Master's Degree",
    profession: 'Self-Employed',
    income: '10-12 LPA',
    manglik: 'Manglik',
    image: loginBG2,
    requestMatch: true
  },
  {
    name: 'Anjali Maheshwari',
    location: 'Indore, Madhya Pradesh',
    age: 26,
    height: '5\'5"',
    education: 'Bachelor Degree',
    profession: 'Employed',
    income: '5-10 LPA',
    manglik: 'Manglik',
    image: loginBG,
    requestMatch: false
  },

  {
    name: 'Rani Maheshwari',
    location: 'Delhi',
    age: 25,
    height: '5\'4"',
    education: 'Master of Computer Application',
    profession: 'Software Developer',
    income: '10-15 LPA',
    manglik: 'Manglik',
    image: loginBG3,
    requestMatch: true
  },
  {
    name: 'Divya Maheshwari',
    location: 'Jaipur,Rajasthan',
    age: 25,
    height: '5\'3"',
    education: 'Bachelor of Computer Application',
    profession: 'Software Developer',
    income: '14-18 LPA',
    manglik: 'Manglik',
    image: loginBG3,
    requestMatch: false
  }
];

const MatchProfile = ({ profile }: { profile: (typeof profiles)[0] }) => (
  <Grid container spacing={0} sx={{ height: '450px', marginBottom: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Grid item xs={4} sx={{ height: '100%', display: 'flex', boxShadow: '-5px 0px 10px rgba(0,0,0,0.1)', borderRadius: '10px 0 0 10px' }}>
      <img src={profile.image} alt="Match" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px 0 0 10px' }} />
    </Grid>
    <Grid item xs={4} sx={{ height: '100%', display: 'flex', boxShadow: '5px 0px 10px rgba(0,0,0,0.1)', borderRadius: '0 10px 10px 0' }}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: '100%',
          backgroundColor: '#FFF3EB',
          borderRadius: '0 10px 10px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          height: '100%'
        }}
      >
        <Grid container justifyContent="space-between">
          <Typography variant="h4" fontWeight="bold">
            {profile.name}
          </Typography>
          <Typography variant="h6" fontWeight="bold" color={'#f00757'}>
            {profile.manglik}
          </Typography>
        </Grid>
        <Typography variant="h6">
          <b>📍 {profile.location}</b>
        </Typography>
        <Typography variant="h6">
          <b>🎂 Age:</b> {profile.age}
        </Typography>
        <Typography variant="h6">
          <b>📏 Height:</b> {profile.height}
        </Typography>
        <Typography variant="h6">
          <b>🎓 Education:</b> {profile.education}
        </Typography>
        <Typography variant="h6">
          <b>💼 Profession:</b> {profile.profession}
        </Typography>
        <Typography variant="h6">
          <b>💰 Income:</b> {profile.income}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        {profile.requestMatch && (
          <Box sx={{ width: '100%' }}>
            <AnimateButton>
              <Button variant="contained" sx={{ width: '100%', backgroundColor: '#F00757', '&:hover': { backgroundColor: '#F00757' } }}>
                Request Matchmaking
              </Button>
            </AnimateButton>
          </Box>
        )}
      </Paper>
    </Grid>
  </Grid>
);

export default function LatestMatches() {
  const theme = useTheme();
  return (
    <>
      <Grid container marginBottom={3} display="flex" justifyContent="space-between" alignItems="center">
        {/* Left side buttons */}
        <Grid container spacing={2} item xs="auto">
          <Grid item>
            <Button variant="contained" className="topButtons">
              New
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className="topButtons">
              Nearby
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className="topButtons">
              Top Matches
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" className="topButtons">
              Requested Matches
            </Button>
          </Grid>
        </Grid>

        {/* Right side notification icon */}
        <Grid item xs="auto">
          <img src={notificationIcon} alt="Notifications" />
        </Grid>
      </Grid>

      {profiles.map((profile, index) => (
        <MatchProfile key={index} profile={profile} />
      ))}
    </>
  );
}
