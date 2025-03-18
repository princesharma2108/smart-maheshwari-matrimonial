import { useState } from 'react';
import { Box, Button, Typography, Grid, Paper, Link } from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import AuthWrapper from 'sections/auth/AuthWrapper';
import AnimateButton from 'components/@extended/AnimateButton';
import BackgroundWrapper from 'sections/auth/BackgroundWrapper';
const sections = [
  {
    title: 'Personality Insights',
    questions: [
      {
        id: 1,
        question: 'How do you usually handle disagreements in a relationship?',
        options: [
          'Talk openly to resolve issues',
          'Avoid conflicts to maintain peace',
          'Find a middle ground solution',
          'Quickly agree to settle matters'
        ]
      },
      {
        id: 2,
        question: 'Are you more comfortable in small gatherings or large social events?',
        options: ['Small Intimate Gatherings', 'Big lively parties or events', 'Casual Outdoor meetups', 'Formal occasions or ceremonies']
      },
      {
        id: 3,
        question: 'Do you prefer making decisions spontaneously or after careful planning?',
        options: [
          'Quick-on-the-spot decisions',
          'Carefully planned and thought-out',
          'Situationally flexible approach',
          'Thorough analysis before deciding'
        ]
      },
      {
        id: 4,
        question: 'How important is emotional compatibility in your relationship?',
        options: [
          'Essential for strong bonding',
          'Somewhat significant for connection',
          'Neutral, not a key factor',
          'Not important at all'
        ]
      }
    ]
  },
  {
    title: 'Lifestyle Preferences',
    questions: [
      {
        id: 5,
        question: 'How often do you engage in physical activities or fitness routines?',
        options: ['Everyday fitness enthusiast', 'Weekly exercise routine', 'Occasionally active lifestyle', 'Hardly or never work out']
      },
      {
        id: 6,
        question: 'What your preferred way to spend weekends?',
        options: [
          'Relaxing at home comfortably',
          'Adventuring or exploring outdoors',
          'Socializing with friends or family',
          'Indulging in hobbies or interests'
        ]
      },
      {
        id: 7,
        question: 'How much do you enjoy traveeling?',
        options: [
          'Absolutely love travelling often',
          'Enjoy occasional getaways',
          'Prefer short and simple trips',
          'Do not like travelling much'
        ]
      },
      {
        id: 8,
        question: 'How often do you participate in cultural or social gatherings?',
        options: [
          'Very frequently and regularly',
          'Occasionally depending on events',
          'Rarely short and simple trips',
          'Do not like travelling much'
        ]
      }
    ]
  },
  {
    title: 'Family Values and Expectations',
    questions: [
      {
        id: 9,
        question: 'What role do you see yourself playing in family decsion-making?',
        options: [
          'Take leadership in decisions',
          'Collaborate equally with everyone',
          'Offer support when necessary',
          'Stay uninvolved in decisions'
        ]
      },
      {
        id: 10,
        question: 'When it comes to family traditions, do you prefer to follow, adapt, or create your own?',
        options: [
          'Follow existing family traditions',
          'Modify traditions to suit needs',
          'Create entirely new traditions',
          'Blend old and new traditions'
        ]
      },
      {
        id: 11,
        question: 'How important are joint family gatherings for you?',
        options: ['Very important for bonding', 'Somewhat imortant to connect', 'Neutral about such gatherings', 'Not significant for me']
      },
      { id: 12, question: 'Are you open to parenting in the future?', options: ['Definitely', 'Monthly', 'Occasionally', 'Rarely'] }
    ]
  },
  {
    title: 'Bride-Specific Questions',
    questions: [
      {
        id: 13,
        question: 'Are you comfortable adjusting to a joint family setup?',
        options: [
          'Fully comfortable and ready',
          'Partially comfortable with terms',
          'Depends on living arrangements',
          'No comfortable with the idea'
        ]
      },
      {
        id: 14,
        question: 'If you move into a joint family setup, what aspects would help you feel most comfortable?',
        options: [
          'Shared and balanced responsibilities',
          'Having dedicaated personal space',
          'Emaotional supports from members',
          'Clear family boundaries defied'
        ]
      }
    ]
  },
  {
    title: 'Groom-Specific Questions',
    questions: [
      {
        id: 15,
        question: 'How do you envision managing financial responsibilities after marriage ?',
        options: [
          'Split finances equally',
          'Take full financial responsibility',
          'Flexible depending on needs ',
          'Decide mutually as a couple'
        ]
      },
      {
        id: 16,
        question: 'Are you open to supporting your partners career ambitions ?',
        options: [
          'Fully supportive and encouraging ',
          'Somewhat supportive with limits',
          'Neutral and no strong opinion',
          'Not supportive of career growth'
        ]
      },
      {
        id: 17,
        question: 'How do you see your role in parenting and child-rearing?',
        options: [
          'Actively involved in parenting',
          'Supportive but not primary',
          'Equally shared responsibilities',
          'Minimal involvement in parenting'
        ]
      }
    ]
  },
  {
    title: 'Shared Questions',
    questions: [
      {
        id: 18,
        question: 'Are you open to following traditional family customes?',
        options: ['Follow customs completely', 'Follow with flexibility', 'Neutral about customs', 'Not interested in customs']
      },
      {
        id: 19,
        question: 'How do you prioritize spending time with extended family',
        options: ['Very important to connect', 'Moderately important to me', 'Occasionally when necessary', 'Rarely priritize family time']
      }
    ]
  }
];

export default function Questionnaire() {
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [section, setSection] = useState(0);
  const navigate = useNavigate();

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    console.log('Submitted Answers:', answers);
    navigate('/widget/statistics');
  };

  return (
    <BackgroundWrapper>
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
            <Grid item xs={12} md={6} sx={{ textAlign: 'center' }}>
              <AnimateButton>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  className="buttonStyle"
                  onClick={() => setShowQuestions(true)}
                >
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
            <Grid item xs={12} sx={{ textAlign: 'center', mt: 1 }}>
              <Typography variant="h4" sx={{ color: '#000', fontWeight: 'bold' }}>
                {sections[section].title}
              </Typography>
            </Grid>

            {sections[section].questions.map((q) => (
              <Grid item xs={12} key={q.id}>
                <Typography variant="h6" sx={{ mb: 2 }}>
                  {q.question}
                </Typography>
                <Grid container spacing={2}>
                  {q.options.map((option) => (
                    <Grid item xs={12} sm={6} key={option}>
                      <Paper
                        elevation={0}
                        onClick={() => handleAnswerChange(q.id, option)}
                        sx={{
                          p: 1,
                          textAlign: 'center',
                          cursor: 'pointer',
                          border: answers[q.id] === option ? '1px solid #f00757' : '1px solid #FFE1E7',
                          backgroundColor: answers[q.id] === option ? '#f00757' : 'transparent',
                          color: answers[q.id] === option ? '#fff' : '#000'
                        }}
                      >
                        {option}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}

            <Grid item xs={12} sx={{ display: 'flex', justifyContent: section === 0 ? 'flex-end' : 'space-between', mt: 2 }}>
              {section > 0 && (
                <Button
                  onClick={() => setSection(section - 1)}
                  sx={{
                    // backgroundColor: '#ccc', // Light gray
                    color: '#f00757', // Black text
                    '&:hover': {
                      backgroundColor: '#FFE1E7', // Darker gray on hover
                      color: '#f00757' // White text on hover
                    },
                    '&:focus': {
                      outline: 'none', // Removes blue outline
                      boxShadow: 'none' // Removes shadow effect
                    }
                  }}
                >
                  Previous
                </Button>
              )}

              {section < sections.length - 1 ? (
                <Button
                  onClick={() => setSection(section + 1)}
                  sx={{
                    //backgroundColor: '#f00757', // Primary color
                    color: '#f00757', // White text
                    '&:hover': {
                      backgroundColor: '#FFE1E7', // Darker red on hover
                      color: '#f00757' // White text remains
                    },
                    '&:focus': {
                      outline: 'none', // Removes blue outline
                      boxShadow: 'none' // Removes shadow effect
                    }
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  color="primary"
                  onClick={handleSubmit}
                  sx={{
                    //backgroundColor: '#28a745', // Green
                    color: '#f00757', // White text
                    '&:hover': {
                      backgroundColor: '#FFE1E7', // Darker green on hover
                      color: '#f00757' // White text remains
                    },
                    '&:focus': {
                      outline: 'none', // Removes blue outline
                      boxShadow: 'none' // Removes shadow effect
                    }
                  }}
                >
                  Submit
                </Button>
              )}
            </Grid>
          </>
        )}
      </Grid>
    </BackgroundWrapper>
  );
}
