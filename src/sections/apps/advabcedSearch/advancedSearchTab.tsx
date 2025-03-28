import { useEffect, useState } from 'react';
import { Grid, Typography, Box } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import MainCard from 'components/MainCard';

interface TagData {
  tagName: string;
  tagDescription: string;
  iconUrl: string;
}

interface TagCategory {
  category: string;
  groups: { group: string; tagData: TagData[] }[]; // Ensure group is explicitly typed as string
}

interface AdvancedSearchTabProps {
  tagsData: TagCategory[];
  tagCategories: { name: string; tags: string[] }[];
  setTagCategories: (value: { name: string; tags: string[] }[]) => void;
}

export default function AdvancedSearchTab({ tagsData, tagCategories, setTagCategories }: AdvancedSearchTabProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, Record<string, string> | undefined>>({});
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const handleToggle = (category: string) => {
    setExpandedSection(expandedSection === category ? null : category);
  };

  const handleCapsuleClick = (category: string, group: string, tagName: string) => {
    setSelectedOptions((prev) => {
      const categorySelection = prev[category] || {}; // Get selected tags for the category
      const selectedTags = Object.values(categorySelection); // Flatten selected tags in the category

      if (categorySelection[group] === tagName) {
        // If tag is already selected, remove it
        const newCategorySelection = { ...categorySelection };
        delete newCategorySelection[group];
        return { ...prev, [category]: newCategorySelection };
      } else {
        if (selectedTags.length >= 3) return prev; // Block selection if 3 tags are already selected

        return {
          ...prev,
          [category]: { ...categorySelection, [group]: tagName } // Ensure only one tag per group
        };
      }
    });
  };

  const handleImageError = (tagName: string) => {
    setImageErrors((prev) => ({ ...prev, [tagName]: true }));
  };
  useEffect(() => {
    const tagCategories = Object.entries(selectedOptions).map(([category, groups]) => ({
      name: category,
      tags: Object.values(groups || {}) // Extract only selected tag names
    }));

    setTagCategories(tagCategories);
  }, [selectedOptions]);
  return (
    <Grid container spacing={3} sx={{ display: 'block' }}>
      <Grid item xs={12} sm={12}>
        <MainCard>
          <Grid container>
            {tagsData.map(({ category, groups }) => {
              const tagList = groups.flatMap(({ group, tagData }) => tagData.map((tag) => ({ ...tag, group })));

              return (
                <Box
                  key={category}
                  sx={{
                    width: '100%',
                    minWidth: '100%',
                    mb: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    border: '1px solid #FFE1E7',
                    borderRadius: '16px',
                    flex: 1
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
                      borderBottomLeftRadius: expandedSection == category ? '0' : '16px',
                      borderBottomRightRadius: expandedSection == category ? '0' : '16px',
                      p: 2,
                      cursor: 'pointer',
                      backgroundColor: expandedSection === category ? '#FFF4F6' : 'white',
                      width: '100%'
                    }}
                    onClick={() => handleToggle(category)}
                  >
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                      <Typography variant="h5">{category}</Typography>
                      {expandedSection === category ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </Grid>
                  </Grid>

                  {expandedSection === category && (
                    <Grid container spacing={2} sx={{ p: 2, display: 'flex', flexWrap: 'wrap', width: '100%' }}>
                      {tagList.map((tag) => {
                        const selectedTagsCount = Object.values(selectedOptions[category] || {}).length;
                        const isSelected = selectedOptions[category]?.[tag.group] === tag.tagName;
                        const isDisabled = selectedTagsCount >= 3 && !isSelected;
                        const isGroupSelected = !!selectedOptions[category]?.[tag.group];

                        return (
                          <Grid item xs={12} sm={6} md={4} key={tag.tagName}>
                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 1,
                                p: 1,
                                borderRadius: '20px',
                                border: isSelected ? '2px solid #f00757' : '1px solid black',
                                backgroundColor: isSelected ? '#FFE1E7' : 'white',
                                cursor: isDisabled ? 'not-allowed' : 'pointer',
                                width: '100%',
                                opacity: isDisabled || (isGroupSelected && !isSelected) ? 0.5 : 1,
                                '&:hover': { backgroundColor: isDisabled ? 'white' : '#FFE1E7' }
                              }}
                              onClick={() => !isDisabled && handleCapsuleClick(category, tag.group, tag.tagName)}
                            >
                              {tag.iconUrl && !imageErrors[tag.tagName] ? (
                                <img
                                  src={tag.iconUrl}
                                  alt={tag.tagName}
                                  width={30}
                                  height={30}
                                  onError={() => handleImageError(tag.tagName)}
                                />
                              ) : (
                                <BrokenImageIcon fontSize="small" color="error" />
                              )}
                              <Typography sx={{ color: isSelected ? '#f00757' : '#000' }}>{tag.tagName}</Typography>
                            </Box>
                          </Grid>
                        );
                      })}
                    </Grid>
                  )}
                </Box>
              );
            })}
          </Grid>
        </MainCard>
      </Grid>
    </Grid>
  );
}
