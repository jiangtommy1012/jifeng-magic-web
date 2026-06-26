import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const ComingSoonPage = () => (
  <Box sx={{ textAlign: 'center', py: 10 }}>
    <AutoAwesomeIcon sx={{ fontSize: 64, color: 'primary.main', mb: 2 }} />
    <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>Coming Soon</Typography>
    <Typography variant="body1" color="text.secondary">
      This feature is under development. Stay tuned!
    </Typography>
  </Box>
);

export default ComingSoonPage;
