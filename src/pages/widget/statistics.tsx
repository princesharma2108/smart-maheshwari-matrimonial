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
import matchScoreGreen from 'assets/images/latestMatches/matchScoreGreen.svg';
import matchScoreOrange from 'assets/images/latestMatches/matchScoreOrange.svg';
import matchScorePurple from 'assets/images/latestMatches/matchScorePurple.svg';
import gunnIcon from 'assets/images/latestMatches/gunnIcon.svg';
import AnimateButton from 'components/@extended/AnimateButton';
// assets
import loginBG from 'assets/images/login/loginBG.jpeg';
import loginBG2 from 'assets/images/login/loginBG2.jpeg';
import loginBG3 from 'assets/images/login/loginBG3.jpeg';
import Button from '@mui/material/Button';
import './latestMatches.scss';
import { Box, Stack } from '@mui/material';
import { getMatchResults, getUserDetails } from 'apiServices/data';
import latestMatchBG from 'assets/images/latestMatches/latestMatchBG.png';
import searchMatches from 'assets/images/latestMatches/searchMatches.png';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { useEffect, useState } from 'react';
import { postUserStage } from 'apiServices/user';
import { useLocation } from 'react-router';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import LoadingOverlay from 'components/LoaderOverlay';
// ===========================|| WIDGET - STATISTICS ||=========================== //
interface ResponseData {
  status: string;
  message: string;
  count: number;
  data: any;
}
interface ErrorData {
  response: any;
}
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

const matchProfiles = {
  count: 2,
  data: [
    {
      age: 23,
      degree: 'Graduation',
      distance: 0,
      employment: 'Employed',
      gunScore: 23,
      height: '5ft 6in - 167cm',
      income: '1.0-10.0Lac/Year',
      liked: null,
      location: 'Aligarh',
      maritalStatus: 'Never Married',
      matchScore: 78,
      matchedAt: '2025-02-19T17:54:24',
      matchedUserID: 'U491737982139',
      matrimonialId: 'MP831737982139',
      name: 'Agtaja Maheshwari',
      aboutMe: 'djbfbakbvjkbvjkdabvoijdfbvkjfdbvfiuvbkfbvk',
      profilePic: {
        compressed: '',
        original: 'https://smartmatrimony.s3.amazonaws.com/MP831737982139_8685491086.jpg'
      },
      requestMatch: true,
      isManglik: true
    },
    {
      age: 24,
      degree: "Bachelor's of Design",
      distance: 0,
      employment: 'Employed',
      gunScore: 23,
      height: '4ft 8in - 142cm',
      income: '1.0-12.0Lac/Year',
      liked: null,
      location: 'Hathras',
      maritalStatus: 'Never Married',
      matchScore: 90,
      matchedAt: '2025-02-19T17:54:24',
      matchedUserID: 'U781737980499',
      matrimonialId: 'MP271737980499',
      name: 'Adit Maheshw',
      aboutMe: 'djbfbakbvjkbvjkdabvoijdfbvkjfdbvfiuvbkfbvk',
      profilePic: {
        compressed: '',
        original: 'https://smartmatrimony.s3.amazonaws.com/MP271737980499_1814267079.jpg'
      },
      isRequested: true,
      isManglik: false
    }
  ],
  message: 'Matchmaking data retrieved successfully',
  status: 'success'
};
const MatchProfile = ({ profile }: { profile: (typeof matchProfiles.data)[0] }) => {
  const getMatchScoreImage = () => {
    if (profile.matchScore >= 85) return matchScoreGreen;
    if (profile.matchScore >= 60 && profile.matchScore < 85) return matchScoreOrange;
    return matchScorePurple;
  };
  const getMatchScoreImageWidth = () => {
    if (profile.matchScore < 0 || profile.matchScore > 99) return '53px';
    return '46px';
  };
  return (
    <Grid container spacing={0} sx={{ height: '450px', marginBottom: 3, display: 'flex', alignItems: 'center' }}>
      {/* Left Side: Profile Picture */}
      <Grid item xs={6} sx={{ height: '100%', display: 'flex', borderRadius: '16px 0 0 16px', position: 'relative' }}>
        <img
          src={profile?.profilePic?.original || latestMatchBG} // Fallback image if null
          alt="Match"
          style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px 0 0 16px' }}
        />
        {/* Overlay Content */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            padding: '6px 12px',
            backgroundColor: '#F00757', // Semi-transparent overlay
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '12px',
            fontWeight: 500,
            borderTopLeftRadius: '16px',
            borderBottomRightRadius: '16px'
          }}
        >
          {/* <img src={gunnIcon} /> */}
          <Typography>{profile.gunScore || 0}/36 Gunn Matched</Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8
          }}
        >
          {/* Stack-like Container */}
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background SVG */}
            <img src={getMatchScoreImage()} alt="Match Score" width={getMatchScoreImageWidth()} />

            {/* Overlay Percentage & Match Text */}
            <Box
              sx={{
                position: 'absolute',
                top: profile.matchScore < 0 || profile.matchScore > 99 ? 8 : 6,
                right: profile.matchScore < 0 ? 11 : 9,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 700, color: '#fff' }}>{profile.matchScore || 0}%</Typography>
              <Typography sx={{ fontSize: '7px', fontWeight: 500, color: '#fff' }}>Match</Typography>
            </Box>
          </Box>
        </Box>
      </Grid>
      <Grid item xs={6} sx={{ height: '100%', display: 'flex', borderRadius: '0 16px 16px 0' }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            width: '100%',
            backgroundColor: '#FAF7F2',
            borderRadius: '0 16px 16px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            height: '100%',
            boxShadow: 'none'
          }}
        >
          {/* Name & Manglik Status */}
          <Grid container flexDirection="column" alignItems="left">
            <Typography variant="h4" fontWeight="bold">
              {profile?.name || 'Unknown'}
            </Typography>
            {profile?.isManglik && (
              <Typography variant="h6" fontWeight="bold" color="#f00757">
                Manglik
              </Typography>
            )}
          </Grid>

          {/* Location, Age, Degree */}
          <Grid container alignItems="center" gap="8px">
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={locationIconBlack} alt="Location" /> {profile?.location || 'Unknown'}
            </Typography>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={birthdayIconBlack} alt="Age" /> {profile?.age ? `${profile.age} years` : 'N/A'}
            </Typography>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={degreeIconBlack} alt="Degree" /> {profile?.degree || 'Not Specified'}
            </Typography>
          </Grid>

          {/* Height, Employment, Income */}
          <Grid container alignItems="center" gap="8px">
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={heightIcon} height={16} width={16} alt="Height" /> {profile?.height || 'N/A'}
            </Typography>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={professionIcon} alt="Profession" /> {profile?.employment || 'Unemployed'}
            </Typography>
            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <img src={incomeIconBlack} alt="Income" /> {profile?.income || 'Not Disclosed'}
            </Typography>
          </Grid>
          <Grid>
            <Typography
              variant="h6"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 5,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden'
              }}
            >
              {profile?.aboutMe || 'No description available.'}
            </Typography>
          </Grid>

          {/* Match Request Button */}
          <Box sx={{ flexGrow: 1 }} />
          {profile?.isRequested ? (
            <Box sx={{ width: '100%' }}>
              <AnimateButton>
                <Button variant="contained" sx={{ width: '100%', backgroundColor: '#F00757', '&:hover': { backgroundColor: '#F00757' } }}>
                  Request Matchmaking
                </Button>
              </AnimateButton>
            </Box>
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default function LatestMatches() {
  const theme = useTheme();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchResults = location.state?.searchResults;
  console.log('searchResults', searchResults);
  const userId = localStorage.getItem('userId');
  const [matchProfilesData, setMatchProfiles] = useState([]);
  const getMatchResultsAPI = async () => {
    setIsLoading(true);
    try {
      const response = await getMatchResults(userId); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      setMatchProfiles(responseData.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
      const errorData = error as ErrorData;
      openSnackbar({
        open: true,
        message: errorData.response.data.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    } finally {
      setIsLoading(false); // Stop Loader
    }
  };
  useEffect(() => {
    getMatchResultsAPI();
    postUserStageAPI();
  }, []);
  const postUserStageAPI = async () => {
    //navigate('/upload-photos');
    const userId = localStorage.getItem('userId');
    const stageData = {
      userId: userId,
      registrationStage: 5
    };
    try {
      const response = await postUserStage(stageData);
      const responseData = response.data as ResponseData;
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1000);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
    } catch (error) {
      console.error('Error fetching customers:', error);
      const errorData = error as ErrorData;
      openSnackbar({
        open: true,
        message: errorData.response.data.message,
        variant: 'alert',
        alert: {
          color: 'error'
        }
      } as SnackbarProps);
    }
  };
  const hasMatchProfiles = Array.isArray(matchProfilesData) && matchProfilesData.length > 0;
  const hasSearchResults = Array.isArray(searchResults) && searchResults.length > 0;
  const dataToRender = hasSearchResults ? searchResults : hasMatchProfiles ? matchProfilesData : [];
  return (
    <>
      <LoadingOverlay
        loading={isLoading}
        message={'Fetching Data'}
        IconComponent={
          <BallTriangle height={100} width={100} radius={5} color="#f00757" ariaLabel="ball-triangle-loading" visible={true} />
        }
        showSubLoader={true}
      />
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
        {/* Display two profiles per row */}
        <Grid container spacing={3}>
          {/* {matchProfiles.data.map((profile, index) => ( */}
          {dataToRender.length > 0 ? (
            dataToRender.map((profile: any, index: any) => (
              <Grid item xs={12} md={6} key={index}>
                <MatchProfile profile={profile} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <img src={searchMatches} height={'200px'} width={'350px'} />
              <Typography variant="h1">Looking for matches as per your prefernces...</Typography>
            </Grid>
          )}
        </Grid>
      </>
    </>
  );
}
