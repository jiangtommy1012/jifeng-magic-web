import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>{title}</Typography>
    {subtitle && <Typography variant="body1" color="text.secondary">{subtitle}</Typography>}
    <Divider sx={{ mt: 1 }} />
  </Box>
);

export default PageHeader;
