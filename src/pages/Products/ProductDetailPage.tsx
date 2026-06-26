import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReviewList from '../../components/products/ReviewList';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchProductById, clearSelected } from '../../store/productsSlice';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { selected: product, reviews, status } = useAppSelector((s) => s.products);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id));
    return () => { dispatch(clearSelected()); };
  }, [dispatch, id]);

  if (status === 'loading') return (
    <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><CircularProgress /></Box>
  );

  if (!product) return (
    <Box sx={{ py: 8, textAlign: 'center' }}>
      <Typography>Product not found.</Typography>
      <Button onClick={() => navigate('/products')} sx={{ mt: 2 }}>Back to Products</Button>
    </Box>
  );

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate('/products')} sx={{ mb: 2 }}>
        Back to Products
      </Button>

      <Grid container spacing={4}>
        <Grid size={{ xs: 12, md: 5 }}>
          <Box component="img" src={product.imageUrl} alt={product.name}
            sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }} />
        </Grid>

        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
            <Chip label={product.category} size="small" />
            <Chip label={product.region === 'taiwan' ? '台灣' : 'International'} size="small" color="primary" />
            <Chip label={product.source} size="small" variant="outlined" />
          </Box>

          <Typography variant="h4" sx={{ fontWeight: 700 }} gutterBottom>{product.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>by {product.creator}</Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating value={product.rating} precision={0.1} readOnly />
            <Typography variant="body2" color="text.secondary">
              {product.rating} ({product.reviewCount} reviews)
            </Typography>
          </Box>

          <Typography variant="h4" color="primary" sx={{ fontWeight: 700 }} gutterBottom>
            ${product.price} {product.currency}
          </Typography>

          <Typography variant="body1" sx={{ mb: 2 }}>{product.description}</Typography>

          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mb: 2 }}>
            {product.tags.map((tag) => (
              <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" />
            ))}
          </Box>

          <Typography variant="caption" color="text.secondary">
            Released: {product.releaseDate}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>
        Customer Reviews ({reviews.length})
      </Typography>
      <ReviewList reviews={reviews} />
    </Box>
  );
};

export default ProductDetailPage;
