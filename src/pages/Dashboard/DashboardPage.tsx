import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/dashboard/StatCard';
import ProductCard from '../../components/products/ProductCard';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchProducts } from '../../store/productsSlice';
import { fetchTrending } from '../../store/trendsSlice';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items: products, status: pStatus } = useAppSelector((s) => s.products);
  const { items: trends, status: tStatus } = useAppSelector((s) => s.trends);

  useEffect(() => {
    dispatch(fetchProducts({}));
    dispatch(fetchTrending('all'));
  }, [dispatch]);

  const recentProducts = [...products]
    .sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime())
    .slice(0, 4);

  const totalReviews = products.reduce((sum, p) => sum + p.reviewCount, 0);
  const avgRating = products.length
    ? (products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)
    : '—';

  const isLoading = pStatus === 'loading' || tStatus === 'loading';

  return (
    <Box>
      <PageHeader
        title="Dashboard"
        subtitle="Magic market overview — international & Taiwan"
      />

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Stat Cards */}
          <Grid container spacing={2} sx={{ mb: 4 }}>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard label="Total Products Tracked" value={products.length} icon={<StorefrontIcon fontSize="inherit" />} color="#1976d2" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard label="Trending Categories" value={trends.length} icon={<TrendingUpIcon fontSize="inherit" />} color="#2e7d32" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard label="Total Reviews" value={totalReviews.toLocaleString()} icon={<PeopleIcon fontSize="inherit" />} color="#ed6c02" />
            </Grid>
            <Grid size={{ xs: 12, sm: 6, md: 3 }}>
              <StatCard label="Avg. Rating" value={avgRating} icon={<StarIcon fontSize="inherit" />} color="#9c27b0" />
            </Grid>
          </Grid>

          {/* Recently Released */}
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            Recently Released
          </Typography>
          <Grid container spacing={2} sx={{ mb: 4 }}>
            {recentProducts.map((p) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                <ProductCard product={p} onClick={() => navigate(`/products/${p.id}`)} />
              </Grid>
            ))}
          </Grid>

          {/* What Magicians Are Focusing On */}
          <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
            What Magicians Are Focusing On
          </Typography>
          <Grid container spacing={2}>
            {trends.slice(0, 4).map((t) => (
              <Grid size={{ xs: 12, sm: 6 }} key={t.id}>
                <Paper elevation={1} sx={{ p: 2 }}>
                  <Box sx={{ display: 'flex', gap: 1, mb: 1, alignItems: 'center' }}>
                    <Chip label={t.category} color="primary" size="small" />
                    <Chip label={t.region === 'taiwan' ? '台灣' : 'International'} size="small" />
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 'auto' }}>
                      {t.focusCount.toLocaleString()} mentions
                    </Typography>
                  </Box>
                  <Typography variant="body2">{t.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Box>
  );
};

export default DashboardPage;
