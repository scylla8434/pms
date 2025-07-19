import React from 'react';
import { Box, Typography } from '@mui/material';

const NotFound: React.FC = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
    <Typography variant="h3" color="error">404 - Page Not Found</Typography>
  </Box>
);

export default NotFound;
