import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CircularProgress from '@mui/material/CircularProgress';
import LinearProgress from '@mui/material/LinearProgress';
import PageHeader from '../../components/common/PageHeader';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchTrending } from '../../store/trendsSlice';
import { MarketRegion } from '../../types';

const TrendingPage = () => {
  const dispatch = useAppDispatch();
  const { items: trends, status } = useAppSelector((s) => s.trends);
  const [region, setRegion] = useState<MarketRegion | 'all'>('all');

  useEffect(() => {
    dispatch(fetchTrending(region));
  }, [dispatch, region]);

  const maxFocus = Math.max(...trends.map((t) => t.focusCount), 1);

  return (
    <Box>
      <PageHeader
        title="Trending"
        subtitle="What the magic community is focusing on right now"
      />

      <ToggleButtonGroup
        value={region}
        exclusive
        onChange={(_, v) => v && setRegion(v)}
        size="small"
        sx={{ mb: 3 }}
      >
        <ToggleButton value="all">All Markets</ToggleButton>
        <ToggleButton value="international">International</ToggleButton>
        <ToggleButton value="taiwan">台灣</ToggleButton>
      </ToggleButtonGroup>

      {status === 'loading' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
      ) : (
        <Grid container spacing={2}>
          {trends.map((t) => (
            <Grid size={{ xs: 12, md: 6 }} key={t.id}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1.5, alignItems: 'center' }}>
                  <Chip label={t.category} color="primary" />
                  <Chip label={t.region === 'taiwan' ? '台灣' : 'International'} size="small" />
                  <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                    {t.focusCount.toLocaleString()} mentions
                  </Typography>
                </Box>

                <LinearProgress
                  variant="determinate"
                  value={(t.focusCount / maxFocus) * 100}
                  sx={{ mb: 2, height: 6, borderRadius: 3 }}
                />

                <Typography variant="body2" sx={{ mb: 1.5 }}>{t.description}</Typography>

                <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }} gutterBottom>
                  Top Products:
                </Typography>
                <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                  {t.topProducts.map((name) => (
                    <Chip key={name} label={name} size="small" variant="outlined" />
                  ))}
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TrendingPage;
