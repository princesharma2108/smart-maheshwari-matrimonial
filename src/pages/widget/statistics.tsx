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
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import useMediaQuery from '@mui/material/useMediaQuery';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

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

const MatchProfile = ({ profile }: { profile: any }) => {
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
        {/* <Box
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
          <Typography>{profile.gunScore || 0}/36 Gunn Matched</Typography>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 8
          }}
        >
          <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={getMatchScoreImage()} alt="Match Score" width={getMatchScoreImageWidth()} />
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
        </Box> */}
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
          {/* {profile?.isRequested ? (
            <Box sx={{ width: '100%' }}>
              <AnimateButton>
                <Button
                  href="https://play.google.com/store/apps/details?id=org.miiscollp.smartmatrimonialmaheshwari"
                  variant="contained"
                  sx={{ width: '100%', backgroundColor: '#F00757', '&:hover': { backgroundColor: '#F00757' } }}
                >
                  Request Matchmaking
                </Button>
              </AnimateButton>
            </Box>
          ) : null} */}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default function LatestMatches() {
  // ✅ ADD THIS at the start of LatestMatches function
  const isMobile = useMediaQuery('(max-width:768px)');
  const [showMobileNotice, setShowMobileNotice] = useState(false);

  useEffect(() => {
    if (isMobile) {
      setShowMobileNotice(true);
    } else {
      setShowMobileNotice(false);
    }
  }, [isMobile]);

  const theme = useTheme();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchResults = location.state?.searchResults;
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
      registrationStage: 6
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
  let breadcrumbLinks: { title: string; to?: string }[] = [];
  if (searchResults) {
    breadcrumbLinks = [{ title: 'Home', to: '/dashboard' }, { title: 'Search Results' }];
  } else {
    breadcrumbLinks = [{ title: 'Home', to: '/dashboard' }, { title: 'Latest Matches' }];
  }
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
      <Breadcrumbs custom heading={searchResults ? 'Search Results' : 'Latest Matches'} links={breadcrumbLinks} />
      {/* ✅ IF MOBILE: Show warning and Play Store button */}
      {showMobileNotice ? (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            bgcolor: 'white',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: 3
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="#F00757" mb={2}>
            Our website is only for desktop/laptop users.
          </Typography>
          <Typography variant="h6" color="text.secondary" mb={4}>
            Please download our app for the best experience on mobile phones.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<PlayArrowIcon />}
            href="https://play.google.com/store/apps/details?id=org.miiscollp.smartmatrimonialmaheshwari"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ backgroundColor: '#F00757', '&:hover': { backgroundColor: '#d0064c' } }}
          >
            Download on Play Store
          </Button>
        </Box>
      ) : (
        // ✅ IF NOT MOBILE: Show normal content
        <Grid container spacing={3}>
          {dataToRender.length > 0 ? (
            dataToRender.map((profile: any, index: any) => (
              <Grid item xs={12} md={6} key={index}>
                <MatchProfile profile={profile} />
              </Grid>
            ))
          ) : (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <img src={searchMatches} height={'200px'} width={'350px'} />
              <Typography variant="h1">Looking for matches as per your preferences...</Typography>
            </Grid>
          )}
        </Grid>
      )}
    </>
  );

  {
    /*
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
        {/* Display two profiles per row */
  }
  // <Grid container spacing={3}>
  {
    /* {matchProfiles.data.map((profile, index) => ( */
  }

  {
    /*
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
}  */
  }
}
