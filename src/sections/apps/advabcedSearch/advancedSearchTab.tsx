import { useEffect, useState, ChangeEvent } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MainCard from 'components/MainCard';
import 'assets/styles/styles.scss';
import { useNavigate } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

const sectionOptions: Record<string, { name: string; image: string }[]> = {
  Professional: [
    { name: 'Techie', image: '/images/techie.png' },
    { name: 'Doctor', image: '/images/doctor.png' },
    { name: 'Teacher', image: '/images/teacher.png' },
    { name: 'Finance', image: '/images/finance.png' },
    { name: 'Lawyer', image: '/images/lawyer.png' },
    { name: 'Artist', image: '/images/artist.png' },
    { name: 'Govt. Job', image: '/images/govt_job.png' },
    { name: 'Engineer', image: '/images/engineer.png' },
    { name: 'Business', image: '/images/business.png' },
    { name: 'Hospitality', image: '/images/hospitality.png' },
    { name: 'Spiritual', image: '/images/spiritual.png' },
    { name: 'Homemaker', image: '/images/homemaker.png' },
    { name: 'NGO Worker', image: '/images/ngo_worker.png' }
  ],
  Demographics: [
    { name: 'Graduate', image: '/images/graduate.png' },
    { name: 'Postgrad', image: '/images/postgrad.png' },
    { name: 'PhD', image: '/images/phd.png' },
    { name: 'Nuclear Family', image: '/images/nuclear_family.png' },
    { name: 'Joint Family', image: '/images/joint_family.png' },
    { name: 'Middle-Class', image: '/images/middle_class.png' },
    { name: 'Upper-Middle', image: '/images/upper_middle.png' },
    { name: 'Wealthy', image: '/images/wealthy.png' },
    { name: 'Low Income', image: '/images/low_income.png' },
    { name: 'Tall Slim', image: '/images/tall_slim.png' },
    { name: 'Athletic', image: '/images/athletic.png' },
    { name: 'Healthy', image: '/images/healthy.png' }
  ],
  Geography: [
    { name: 'Urban-Relocate', image: '/images/urban_relocate.png' },
    { name: 'Urban-Resident', image: '/images/urban_resident.png' },
    { name: 'Rural-Relocate', image: '/images/rural_relocate.png' },
    { name: 'Rural-Resident', image: '/images/rural_resident.png' }
  ],
  Lifestyle: [
    { name: 'Veg', image: '/images/veg.png' },
    { name: 'Non-Veg', image: '/images/non_veg.png' },
    { name: 'Vegan', image: '/images/vegan.png' },
    { name: 'No Alcohol', image: '/images/no_alcohol.png' },
    { name: 'Social Drinker', image: '/images/social_drinker.png' },
    { name: 'Drinks Often', image: '/images/drinks_often.png' },
    { name: 'No Smoking', image: '/images/no_smoking.png' },
    { name: 'Smoker', image: '/images/smoker.png' },
    { name: 'Fitness Buff', image: '/images/fitness_buff.png' },
    { name: 'Casual Fitness', image: '/images/casual_fitness.png' },
    { name: 'Fitness Enthusiast', image: '/images/fitness_lover.png' },
    { name: 'Moderate Activity', image: '/images/mildly_active.png' },
    { name: 'Relaxation-Oriented', image: '/images/mildly_active.png' },
    { name: 'Adventurous', image: '/images/mildly_active.png' },
    { name: 'Travel Enthusiast', image: '/images/mildly_active.png' },
    { name: 'Travel Minimalist', image: '/images/mildly_active.png' },
    { name: 'Socially Active', image: '/images/mildly_active.png' },
    { name: 'Minimal Social Engagement', image: '/images/mildly_active.png' }
  ],
  Personality: [
    { name: 'Open Communicator', image: '/images/introvert.png' },
    { name: 'Conflict Avoider', image: '/images/extrovert.png' },
    { name: 'Introverted Preference', image: '/images/ambivert.png' },
    { name: 'Spontaneous Thinker', image: '/images/optimist.png' },
    { name: 'Strategic Planner', image: '/images/pessimist.png' },
    { name: 'Emotionally Flexible', image: '/images/realist.png' },
    { name: 'Family Leadership', image: '/images/introvert.png' },
    { name: 'Collaborative Decision-Maker', image: '/images/extrovert.png' },
    { name: 'Tradition-Oriented', image: '/images/ambivert.png' },
    { name: 'Flexible Tradition Adopter', image: '/images/optimist.png' },
    { name: 'Independent Preference', image: '/images/pessimist.png' },
    { name: 'Joint Family Adaptability', image: '/images/realist.png' }
  ],
  'Family Values': [
    { name: 'Emotionally Supportive', image: '/images/traditional.png' },
    { name: 'Family Bond-Oriented', image: '/images/modern.png' },
    { name: 'Parenting-Oriented', image: '/images/balanced.png' },
    { name: 'Parenting Flexibility', image: '/images/progressive.png' },
    { name: 'Personal Space Preference', image: '/images/conservative.png' },
    { name: 'Culturally Inclusive', image: '/images/independent.png' }
  ]
};

export default function AdvancedSearchTab() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedCapsule, setSelectedCapsule] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);

  const handleToggle = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string | null>>({});

  const handleCapsuleClick = (section: string, option: string) => {
    setSelectedOptions((prev) => {
      const isSingleSelection = section === 'Professional' || section === 'Geography';

      if (isSingleSelection) {
        // If an option is already selected in either section, disable other options
        return {
          ...prev,
          Professional: section === 'Professional' ? (prev[section] === option ? null : option) : prev.Professional,
          Geography: section === 'Geography' ? (prev[section] === option ? null : option) : prev.Geography
        };
      } else {
        // Multi-selection logic
        const selectedArray = prev[section] ? prev[section]!.split(', ') : [];

        if (selectedArray.includes(option)) {
          return {
            ...prev,
            [section]: selectedArray.filter((item) => item !== option).join(', ') || null
          };
        } else if (selectedArray.length < 3) {
          return {
            ...prev,
            [section]: [...selectedArray, option].join(', ')
          };
        }
      }

      return prev;
    });
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MainCard title="">
          <Grid container>
            {Object.keys(sectionOptions).map((title) => (
              <Box
                key={title}
                sx={{
                  width: '100%',
                  mb: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  border: '1px solid #FFE1E7',
                  borderRadius: '16px'
                }}
              >
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderTopLeftRadius: '16px',
                    borderTopRightRadius: '16px',
                    borderBottomLeftRadius: expandedSection == title ? '0' : '16px',
                    borderBottomRightRadius: expandedSection == title ? '0' : '16px',
                    p: 2,
                    cursor: 'pointer',
                    backgroundColor: expandedSection === title ? '#FFF4F6' : 'white'
                  }}
                  onClick={() => handleToggle(title)}
                >
                  <Typography variant="h5">{title}</Typography>
                  {expandedSection === title ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </Grid>

                {expandedSection === title && (
                  <Grid container spacing={2} sx={{ p: 2, display: 'flex', flexWrap: 'wrap' }}>
                    {sectionOptions[title].map((option) => {
                      //   const isSelected = selectedOptions[title] === option.name;
                      //   const isDisabled = selectedOptions[title] != undefined && !isSelected; // Only disable other options *after* one is selected
                      const isSelected = selectedOptions[title]?.split(', ').includes(option.name);
                      const selectedArray = selectedOptions[title] ? selectedOptions[title]!.split(', ') : []; // Ensuring non-null
                      const isDisabled =
                        (title === 'Professional' && selectedOptions.Professional && selectedOptions.Professional !== option.name) ||
                        (title === 'Geography' && selectedOptions.Geography && selectedOptions.Geography !== option.name) ||
                        (title !== 'Professional' &&
                          title !== 'Geography' &&
                          selectedArray.length >= 3 &&
                          !selectedArray.includes(option.name));

                      console.log(`Section: ${title}, Selected Count: ${selectedArray.length}, Disabled: ${isDisabled}`);
                      return (
                        <Grid item xs={12} sm={6} md={4} key={option.name}>
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              //justifyContent: 'center',
                              gap: 1,
                              p: 1,
                              borderRadius: '20px',
                              border: isSelected ? '2px solid #f00757' : '1px solid black',
                              backgroundColor: isSelected ? '#FFE1E7' : 'white',
                              cursor: isDisabled ? 'not-allowed' : 'pointer',
                              width: '100%',
                              opacity: isDisabled ? 0.5 : 1, // Reduce opacity for disabled items *only after* selection
                              '&:hover': { backgroundColor: isDisabled ? 'white' : '#FFE1E7' }
                            }}
                            onClick={() => handleCapsuleClick(title, option.name)}
                          >
                            <img
                              src={option.image}
                              alt={option.name}
                              width={30}
                              height={30}
                              onError={() => setImageError(true)}
                              style={{ display: imageError ? 'none' : 'block' }}
                            />
                            {imageError && <BrokenImageIcon fontSize="small" color="error" />}
                            <Typography sx={{ color: isSelected ? '#f00757' : '#000' }}>{option.name}</Typography>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}
              </Box>
            ))}
          </Grid>
        </MainCard>
      </Grid>

      <Grid item xs={12}>
        <Stack direction="row" justifyContent="flex-end" spacing={2}>
          <Button variant="outlined" color="secondary" onClick={() => navigate('/upload-biodata')}>
            Previous
          </Button>
          <Button variant="contained" className="buttonStyle">
            Continue
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
}
