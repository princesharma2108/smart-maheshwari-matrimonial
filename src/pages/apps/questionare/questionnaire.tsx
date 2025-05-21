import { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Link, CircularProgress, Stack } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AnimateButton from 'components/@extended/AnimateButton';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { getQuestionDetails, getUserDetails, sendQuestionAnswers } from 'apiServices/data';
import { postUserStage } from 'apiServices/user';
import { BallTriangle, ThreeDots } from 'react-loader-spinner';
import LoadingOverlay from 'components/LoaderOverlay';
interface ResponseData {
  status: string;
  message: string;
  Categories: any;
}
interface ResponseData {
  status: string;
  message: string;
  data: any;
}
interface ErrorData {
  response: any;
}

export default function Questionnaire() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [userGender, setUserGender] = useState('');
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isGetQuestionsLoading, setIsGetQuestionsLoading] = useState<boolean>(false);
  const [answers, setAnswers] = useState<{ [key: number]: string | number }>({});
  const [formattedAnswers, setFormattedAnswers] = useState<{ questionId: string; optionId: string }[]>([]);
  const [questionsData, setQuestionsData] = useState<
    { CategoryName: string; Questions: { Id: number; Question: string; Options: { OptionId: number; OptionText: string }[] }[] }[]
  >([]);
  const [section, setSection] = useState(0);
  const navigate = useNavigate();
  const handleAnswerChange = (questionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };
  const handleSubmit = () => {
    sendQuestionAnswersAPI();
  };
  const getQuestionDetailsAPI = async () => {
    setIsGetQuestionsLoading(true);
    try {
      const response = await getQuestionDetails(); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      setIsGetQuestionsLoading(false);
      setQuestionsData(responseData.Categories);
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
  const sendQuestionAnswersAPI = async () => {
    setIsSaveLoading(true);
    const userId = localStorage.getItem('userId');
    const formatted = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId: questionId.toString(),
      optionId: optionId.toString()
    }));
    setFormattedAnswers(formatted);
    const answersData = {
      userId: userId,
      answers: formatted
    };
    try {
      const response = await sendQuestionAnswers(answersData); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      setQuestionsData(responseData.Categories);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      /*For Complete APP*/
      sessionStorage.setItem('allowedRoute', '/dashboard');
      navigate('/dashboard', { replace: true });
      /*For Coming Soon*/
      // sessionStorage.setItem('allowedRoute', '/maintenance/coming-soon2');
      // navigate('/maintenance/coming-soon2', { replace: true });
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
      setIsSaveLoading(false); // Stop Loader
    }
  };
  const getUserDetailsAPI = async () => {
    const userId = localStorage.getItem('userId');
    try {
      const response = await getUserDetails(userId); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      setUserGender(responseData.data.profile.gender);
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
  useEffect(() => {
    getQuestionDetailsAPI();
    getUserDetailsAPI();
  }, []);
  // Filter questions based on userGender
  // const filteredQuestions = questionsData
  //   .filter((category) => category.CategoryName === 'Bride-Specific Questions' || userGender === 'Female')
  //   .filter((category) => category.CategoryName === 'Groom-Specific Questions' || userGender === 'Male');
  const filteredQuestions = questionsData.filter((category) => {
    if (userGender === 'Male') {
      return category.CategoryName !== 'Bride-Specific Questions';
    } else if (userGender === 'Female') {
      return category.CategoryName !== 'Groom-Specific Questions';
    }
    return true; // In case gender is not yet determined
  });
  // Get current section's questions
  // const currentSectionQuestions = questionsData[section]?.Questions || [];
  const currentSectionQuestions = filteredQuestions[section]?.Questions || [];
  // Check if all questions in the current section are answered
  const isSectionComplete = currentSectionQuestions.every((q) => answers[Number(q.Id)] !== undefined);
  // if (!filteredQuestions.length || !filteredQuestions[section]) return null;
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [section]);
  return (
    <BackgroundWrapper padding={0}>
      <>
        <LoadingOverlay
          loading={isGetQuestionsLoading || isSaveLoading}
          message={isGetQuestionsLoading ? 'Fetching Questions' : 'Saving Answers'}
          IconComponent={
            <BallTriangle height={100} width={100} radius={5} color="#f00757" ariaLabel="ball-triangle-loading" visible={true} />
          }
          showSubLoader={true}
        />
        <Grid container spacing={3} justifyContent="center">
          {/* Back Button */}
          <Grid item xs={12} sx={{ textAlign: 'left', ml: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                if (showQuestions) {
                  // Go back to questionnaire main screen
                  setShowQuestions(false);
                } else {
                  // If on main screen, go back to upload-photos
                  sessionStorage.setItem('allowedRoute', '/upload-photos');
                  navigate('/upload-photos', { replace: true });
                }
              }}
              className="buttonStyleOutlined"
            >
              &lt; Back
            </Button>
          </Grid>
          {!showQuestions ? (
            <>
              <Grid item xs={12} sx={{ textAlign: 'center' }}>
                <Typography variant="h3">Questionnaire</Typography>
                <Typography variant="h5" sx={{ mt: 1, color: 'gray' }}>
                  Find Your Perfect Match
                </Typography>
                <Typography variant="body1" sx={{ mt: 1, color: 'gray' }}>
                  Complete this questionnaire to get personalized matches.
                </Typography>
                <Typography variant="h5" sx={{ mt: 1, color: '#f00757' }}>
                  It only takes 2 minutes!
                </Typography>
              </Grid>
              <Grid item xs={6} md={6} sx={{ textAlign: 'center' }}>
                <AnimateButton>
                  <Button fullWidth size="large" variant="contained" className="buttonStyle" onClick={() => setShowQuestions(true)}>
                    Start Now
                  </Button>
                </AnimateButton>
              </Grid>
              {/* <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Don’t want to fill it now?{' '}
                  <Link
                    component={RouterLink}
                    replace={true}
                    to="/widget/statistics"
                    onClick={() => sessionStorage.setItem('allowedRoute', '/widget/statistics')}
                    // to="/maintenance/coming-soon2"
                    // onClick={() => sessionStorage.setItem('allowedRoute', '/maintenance/coming-soon2')}
                    sx={{ color: '#f00757' }}
                  >
                    Skip
                  </Link>
                </Typography>
              </Grid> */}
            </>
          ) : (
            <>
              {questionsData
                .filter((category) => {
                  if (category.CategoryName === 'Bride-Specific Questions') return userGender === 'Female';
                  if (category.CategoryName === 'Groom-Specific Questions') return userGender === 'Male';
                  return true;
                })
                .map((filteredCategory, catIndex) =>
                  section === catIndex ? (
                    <Grid container justifyContent="center" gap={'36px'} sx={{ padding: '36px 30px' }} key={filteredCategory.CategoryName}>
                      <Grid item xs={12} sx={{ textAlign: 'center' }}>
                        <Typography variant="h4" sx={{ color: '#f00757', fontWeight: 500, fontSize: '40px' }}>
                          {filteredCategory.CategoryName}
                        </Typography>
                      </Grid>
                      <Grid item container xs={12} justifyContent="center" gap={'32px'}>
                        {filteredCategory.Questions.map((q, index) => (
                          <Grid item container xs={12} key={q.Id} justifyContent={'center'} gap={'20px'}>
                            <Typography
                              sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontWeight: 600,
                                fontSize: '20px'
                              }}
                            >
                              {q.Question}
                            </Typography>
                            <Grid item container display={'flex'} flexDirection={'row'} justifyContent={'center'} gap={'5px'}>
                              {q.Options.map((option) => (
                                <Grid item xs={6} sm={2.5} key={option.OptionId}>
                                  <Paper
                                    elevation={0}
                                    onClick={() => handleAnswerChange(q.Id, option.OptionId)}
                                    sx={{
                                      p: 1,
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      border: Number(answers[q.Id]) === option.OptionId ? '1px solid #f00757' : '1px solid #FFE1E7',
                                      backgroundColor: Number(answers[q.Id]) === option.OptionId ? '#f00757' : 'transparent',
                                      color: Number(answers[q.Id]) === option.OptionId ? '#fff' : '#000'
                                    }}
                                  >
                                    {option.OptionText}
                                  </Paper>
                                </Grid>
                              ))}
                            </Grid>
                          </Grid>
                        ))}
                      </Grid>
                    </Grid>
                  ) : null
                )}

              <Grid
                item
                xs={12}
                sx={{ display: 'flex', justifyContent: section === 0 ? 'flex-end' : 'space-between', padding: '0!important' }}
              >
                {section > 0 && (
                  <Button
                    onClick={() => {
                      setSection(section - 1);
                      //window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    sx={{
                      color: '#f00757',
                      paddingLeft: '35px!important',
                      '&:hover': { backgroundColor: '#FFE1E7', color: '#f00757' },
                      '&:focus': { outline: 'none', boxShadow: 'none' }
                    }}
                  >
                    Previous
                  </Button>
                )}

                {section < filteredQuestions.length - 1 ? (
                  <Button
                    onClick={
                      () => {
                        setSection(section + 1);
                        //window.scrollTo({ top: 0, behavior: 'smooth' });
                      } // Scroll to top
                    }
                    disabled={!isSectionComplete} // Disable if not all questions are answered
                    sx={{
                      color: !isSectionComplete ? 'gray' : '#f00757',
                      '&:hover': { backgroundColor: '#FFE1E7', color: !isSectionComplete ? 'gray' : '#f00757' },
                      '&:focus': { outline: 'none', boxShadow: 'none' }
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!isSectionComplete} // Disable if not all questions are answered
                    sx={{
                      color: !isSectionComplete ? 'gray' : '#f00757',
                      '&:hover': { backgroundColor: '#FFE1E7', color: !isSectionComplete ? 'gray' : '#f00757' },
                      '&:focus': { outline: 'none', boxShadow: 'none' }
                    }}
                  >
                    Submit
                  </Button>
                )}
              </Grid>
            </>
          )}
        </Grid>
      </>
    </BackgroundWrapper>
  );
}
