import { useEffect, useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Link, CircularProgress } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AnimateButton from 'components/@extended/AnimateButton';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
import { SnackbarProps } from 'types/snackbar';
import { openSnackbar } from 'api/snackbar';
import { getQuestionDetails, sendQuestionAnswers } from 'apiServices/data';
import { postUserStage } from 'apiServices/user';
interface ResponseData {
  status: string;
  message: string;
  Categories: any;
}
interface ErrorData {
  response: any;
}

export default function Questionnaire() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    console.log('Submitted Answers:', answers);
    sendQuestionAnswersAPI();
  };
  const getQuestionDetailsAPI = async () => {
    try {
      const response = await getQuestionDetails(); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      console.log('responseData', responseData);
      console.log('responseData2', responseData.Categories);
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
    setIsLoading(true);
    const userId = localStorage.getItem('userId');
    const formatted = Object.entries(answers).map(([questionId, optionId]) => ({
      questionId: questionId.toString(),
      optionId: optionId.toString()
    }));
    console.log('answersformatted2', formatted);
    setFormattedAnswers(formatted);
    const answersData = {
      userId: userId,
      answers: formatted
    };
    try {
      const response = await sendQuestionAnswers(answersData); // Pass the required userId argument
      const responseData = response.data as ResponseData;
      console.log('responseData', responseData);
      console.log('responseData2', responseData.Categories);
      setQuestionsData(responseData.Categories);
      openSnackbar({
        open: true,
        message: responseData.message,
        variant: 'alert',
        alert: {
          color: 'success'
        }
      } as SnackbarProps);
      navigate('/widget/statistics');
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
    getQuestionDetailsAPI();
  }, []);

  console.log('answersformatted1', answers);
  return (
    <BackgroundWrapper>
      <>
        {isLoading && ( // Show Loader When API is in Progress
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh',
              position: 'absolute',
              width: '100%',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 9999
            }}
          >
            <CircularProgress size={60} sx={{ color: '#f00757' }} />
          </Box>
        )}
        <Grid container spacing={3} justifyContent="center">
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
              <Grid item xs={12} sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="body2">
                  Don’t want to fill it now?{' '}
                  <Link component={RouterLink} to="/widget/statistics" sx={{ color: '#f00757' }}>
                    Skip
                  </Link>
                </Typography>
              </Grid>
            </>
          ) : (
            <>
              {questionsData.length > 0 && questionsData[section] ? (
                <>
                  <Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}>
                    <Typography variant="h4" sx={{ color: '#000', fontWeight: 'bold' }}>
                      {questionsData[section].CategoryName}
                    </Typography>
                  </Grid>

                  {questionsData[section].Questions.map((q, index) => (
                    <Grid item xs={12} key={q.Id}>
                      <Typography variant="h6" sx={{ mb: 2 }}>
                        {index + 1}. {q.Question}
                      </Typography>
                      <Grid container spacing={2}>
                        {q.Options.map((option) => (
                          <Grid item xs={6} sm={6} key={option.OptionId}>
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
                </>
              ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', mt: 2 }}>
                  Loading questions...
                </Typography>
              )}

              <Grid item xs={12} sx={{ display: 'flex', justifyContent: section === 0 ? 'flex-end' : 'space-between', mt: 2 }}>
                {section > 0 && (
                  <Button
                    onClick={() => setSection(section - 1)}
                    sx={{
                      color: '#f00757',
                      '&:hover': { backgroundColor: '#FFE1E7', color: '#f00757' },
                      '&:focus': { outline: 'none', boxShadow: 'none' }
                    }}
                  >
                    Previous
                  </Button>
                )}

                {section < questionsData.length - 1 ? (
                  <Button
                    onClick={() => setSection(section + 1)}
                    sx={{
                      color: '#f00757',
                      '&:hover': { backgroundColor: '#FFE1E7', color: '#f00757' },
                      '&:focus': { outline: 'none', boxShadow: 'none' }
                    }}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    color="primary"
                    onClick={handleSubmit}
                    sx={{
                      color: '#f00757',
                      '&:hover': { backgroundColor: '#FFE1E7', color: '#f00757' },
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
