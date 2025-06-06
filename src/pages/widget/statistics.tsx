// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Stack,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Popover,
  Tooltip,
  Divider
} from '@mui/material';
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
import Button from '@mui/material/Button';
import './latestMatches.scss';
import { getMatchResults, getUserDetails, priorityCategories } from 'apiServices/data';
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
import categoryInfoIcon from 'assets/images/latestMatches/categoryInfoIcon.svg';
import demographicsBlack from 'assets/images/latestMatches/demographicsBlack.svg';
import geographyBlack from 'assets/images/latestMatches/geographyBlack.svg';
import lifestyleBlack from 'assets/images/latestMatches/lifestyleBlack.svg';
import personalityBlack from 'assets/images/latestMatches/personalityBlack.svg';
import professionBlack from 'assets/images/latestMatches/professionBlack.svg';
import familyValuesBlack from 'assets/images/latestMatches/familyValuesBlack.svg';
import demographicsPink from 'assets/images/latestMatches/demographicsPink.svg';
import geographyPink from 'assets/images/latestMatches/geographyPink.svg';
import lifestylePink from 'assets/images/latestMatches/lifestylePink.svg';
import personalityPink from 'assets/images/latestMatches/personalityPink.svg';
import professionPink from 'assets/images/latestMatches/professionPink.svg';
import familyValuesPink from 'assets/images/latestMatches/familyValuesPink.svg';
import profileFemale from 'assets/images/latestMatches/profileFemale.png';
import profileMale from 'assets/images/latestMatches/profileMale.png';
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
const MatchProfile = ({ profile }: { profile: any }) => {
  const [isOriginalLoaded, setIsOriginalLoaded] = useState(false);
  const getMatchScoreImage = () => {
    if (profile.matchScore >= 85) return matchScoreGreen;
    if (profile.matchScore >= 60 && profile.matchScore < 85) return matchScoreOrange;
    return matchScorePurple;
  };
  const getMatchScoreImageWidth = () => {
    if (profile.matchScore < 0 || profile.matchScore > 99) return '53px';
    return '46px';
  };
  console.log('profile1:', profile.profileUrls?.original);
  console.log('profile2:', profile.profileUrls?.compressed);
  return (
    <Grid container spacing={0} sx={{ height: '450px', marginBottom: 3, display: 'flex', alignItems: 'center' }}>
      {/* Left Side: Profile Picture */}
      <Grid item xs={6} sx={{ height: '100%', display: 'flex', borderRadius: '16px 0 0 16px', position: 'relative' }}>
        {/* Compressed Image (visible until original loads) */}
        {!isOriginalLoaded && (
          <img
            src={profile?.profileUrls?.compressed || profile?.gender == 'Female' ? profileFemale : profileMale}
            alt="Compressed"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
              borderRadius: '16px 0 0 16px',
              zIndex: 1
            }}
          />
        )}
        {/* Original Image (appears after loading) */}
        <img
          src={profile?.profileUrls?.original || profile?.gender == 'Female' ? profileFemale : profileMale}
          alt="Original"
          onLoad={() => setIsOriginalLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '16px 0 0 16px',
            position: 'relative',
            zIndex: 2,
            opacity: isOriginalLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease-in-out'
          }}
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
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const isMobile = useMediaQuery('(max-width:768px)');
  const [showMobileNotice, setShowMobileNotice] = useState(false);
  const theme = useTheme();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchResults = location.state?.searchResults;
  const userId = localStorage.getItem('userId');
  const [matchProfilesData, setMatchProfiles] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const hasMatchProfiles = Array.isArray(matchProfilesData) && matchProfilesData.length > 0;
  const hasSearchResults = Array.isArray(searchResults) && searchResults.length > 0;
  const dataToRender = hasSearchResults ? searchResults : hasMatchProfiles ? matchProfilesData : [];
  let breadcrumbLinks: { title: string; to?: string }[] = [];
  if (searchResults) {
    breadcrumbLinks = [{ title: 'Home', to: '/dashboard' }, { title: 'Search Results' }];
  } else {
    breadcrumbLinks = [{ title: 'Home', to: '/dashboard' }, { title: 'Latest Matches' }];
  }
  const categories = [
    { label: 'Demographic', icon: [demographicsBlack, demographicsPink] },
    { label: 'Geographic', icon: [geographyBlack, geographyPink] },
    { label: 'Lifestyle', icon: [lifestyleBlack, lifestylePink] },
    { label: 'Personality', icon: [personalityBlack, personalityPink] },
    { label: 'Professional', icon: [professionBlack, professionPink] },
    { label: 'Family Values', icon: [familyValuesBlack, familyValuesPink] }
  ];
  const infoItems = [
    {
      title: 'Demographics',
      description: 'Basic personal details that define identity.'
    },
    {
      title: 'Geography',
      description: 'Location related preferences for better match alignment.'
    },
    {
      title: 'Lifestyle',
      description: 'Daily habits, interests, and family background that influence living styles.'
    },
    {
      title: 'Personality',
      description: 'Individual traits that shape how a person thinks and behaves.'
    },
    {
      title: 'Profession',
      description: 'Career and financial aspects that impact compatibility.'
    },
    {
      title: 'Family Values',
      description: 'The beliefs and principles that guide family relationships.'
    }
  ];
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
    if (isMobile) {
      setShowMobileNotice(true);
    } else {
      setShowMobileNotice(false);
    }
  }, [isMobile]);
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
  const handleCategoryContinue = () => {
    handlePostPriorityCategories();
  };
  const handleCategoryReset = () => {
    setSelectedCategories([]);
  };
  const handleSelect = (label: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(label)) {
        return prev.filter((item) => item !== label);
      } else if (prev.length < 3) {
        return [...prev, label];
      }
      return prev;
    });
  };
  const CategoryBox = ({ label, icon }: { label: string; icon: [string, string] }) => {
    const isSelected = selectedCategories.includes(label);
    const badgeNumber = selectedCategories.indexOf(label) + 1;

    return (
      <Box
        onClick={() => handleSelect(label)}
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '130px',
          height: '120px',
          cursor: 'pointer',
          p: 1.25,
          gap: 1,
          borderRadius: 2,
          bgcolor: '#FAFAFA',
          boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.15)',
          opacity: !isSelected && selectedCategories.length >= 3 ? 0.4 : 1,
          pointerEvents: !isSelected && selectedCategories.length >= 3 ? 'none' : 'auto'
        }}
      >
        {isSelected && (
          <Box
            sx={{
              position: 'absolute',
              top: 6,
              right: 6,
              background: '#00CC66',
              borderRadius: '50%',
              width: 20,
              height: 20,
              color: 'white',
              fontSize: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold'
            }}
          >
            {badgeNumber}
          </Box>
        )}
        <img src={isSelected ? icon[1] : icon[0]} />
        <Typography variant="subtitle1" fontWeight={500} color={isSelected ? '#F00757' : '#40444C'}>
          {label}
        </Typography>
      </Box>
    );
  };
  const CategoryInfoPopup = () => {
    return (
      <Box>
        {infoItems.map(({ title, description }, idx) => (
          <Box key={title}>
            <Typography variant="subtitle1" mb={1}>
              <Box component="span" sx={{ color: '#F00757', fontWeight: 600, fontSize: '16px' }}>
                {title}
              </Box>
              <Box component="span" sx={{ color: '#40444C', fontWeight: 400, fontSize: '14px' }}>
                {' '}
                – {description}
              </Box>
            </Typography>
            {idx !== infoItems.length - 1 && <Divider sx={{ borderColor: '#B6BAC3', my: 1 }} />}
          </Box>
        ))}
      </Box>
    );
  };
  const handlePostPriorityCategories = async () => {
    const matrimonialId = localStorage.getItem('matrimonialId');
    const formattedCategories = selectedCategories.map((item) => item.replace(/\s+/g, ''));
    const priorityData = {
      matrimonialId: matrimonialId,
      priorities: {
        first: formattedCategories[0],
        second: formattedCategories[1],
        third: formattedCategories[2]
      }
    };
    try {
      const response = await priorityCategories(priorityData);
      const responseData = response.data as ResponseData;
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      setShowCategoryPopup(false);
    } catch (error) {
      console.error('Error posting priority categories:', error);
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
  const getUserDetailsAPI = async () => {
    setIsLoading(true);
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserDetails(userId); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      setShowCategoryPopup(responseData.data.dynamicWeightsExist == '1' ? false : true);
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
    getUserDetailsAPI();
  }, []);
  return (
    <>
      <Dialog open={showCategoryPopup} maxWidth="sm" disableEscapeKeyDown onClose={() => {}}>
        <Grid sx={{ p: 2, borderRadius: 2.5, bgcolor: '#FAF7F2' }}>
          <Grid container justifyContent="space-between" alignItems="flex-start">
            <Typography fontWeight="bold" fontSize="1.5rem">
              Categories
            </Typography>
            <Tooltip
              placement="left-end"
              title={<CategoryInfoPopup />}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: '#FAF7F2',
                    maxWidth: 400,
                    padding: '6px 20px 16px 20px',
                    borderRadius: '8px',
                    boxShadow: '0px 3px 4px 0px rgba(0, 0, 0, 0.15)'
                  }
                },
                arrow: {
                  sx: {
                    color: '#F00757'
                  }
                }
              }}
            >
              <img src={categoryInfoIcon} style={{ cursor: 'pointer' }} />
            </Tooltip>
          </Grid>
          <Typography variant="subtitle1">Please Choose Top 3 priority</Typography>
          <Box mt={3}>
            <Stack gap={2}>
              {[0, 1].map((row) => (
                <Stack direction="row" gap={2} key={row}>
                  {categories.slice(row * 3, row * 3 + 3).map((cat) => (
                    <CategoryBox key={cat.label} {...cat} icon={cat.icon as [string, string]} />
                  ))}
                </Stack>
              ))}
            </Stack>
          </Box>

          <Grid display="flex" justifyContent="center" mt={3} gap={3}>
            <Button
              onClick={handleCategoryContinue}
              variant="contained"
              fullWidth
              sx={{ bgcolor: '#F00757', '&:hover': { bgcolor: '#d0064c' } }}
            >
              Continue
            </Button>
            <Button
              onClick={handleCategoryReset}
              fullWidth
              color="secondary"
              sx={{
                //color:  '#f00757',
                '&:hover': { backgroundColor: '#FFE1E7', color: '#f00757' },
                '&:focus': { outline: 'none', boxShadow: 'none' }
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Dialog>
      {
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
      }
    </>
  );
}
