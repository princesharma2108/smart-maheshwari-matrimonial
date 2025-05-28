// components/LoadingOverlay.tsx
import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import { display } from '@mui/system';

type LoadingOverlayProps = {
  loading: boolean;
  message?: string;
  IconComponent?: React.ReactNode;
  showSubLoader?: boolean;
};

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ loading, message = 'Loading...', IconComponent, showSubLoader = false }) => {
  if (!loading) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '4px',
        height: '100vh',
        width: '100%',
        position: 'fixed',
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 2,
        zIndex: 999
      }}
    >
      <Stack spacing={2} alignItems="center">
        {IconComponent}
        <Stack spacing={2} direction="row" alignItems="">
          <Typography variant="h6" color="#f00757">
            {message}
          </Typography>
          {showSubLoader && (
            <ThreeDots
              visible={true}
              height="10"
              width="10"
              color="#f00757"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{ margin: '0 0 0 2px', display: 'flex', alignItems: 'flex-end' }}
              wrapperClass=""
            />
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default LoadingOverlay;
