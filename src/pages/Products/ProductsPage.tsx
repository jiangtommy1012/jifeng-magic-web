import React, { useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import ProductCard from '../../components/products/ProductCard';
import ProductFilters from '../../components/products/ProductFilters';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { fetchProducts, setFilters } from '../../store/productsSlice';
import { ProductFilters as Filters } from '../../types';

const ProductsPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, filters, status } = useAppSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchProducts(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (changed: Partial<Filters>) => {
    dispatch(setFilters(changed));
  };

  return (
    <Box>
      <PageHeader
        title="Products"
        subtitle="Browse magic products from top worldwide sources"
      />
      <ProductFilters filters={filters} onChange={handleFilterChange} />

      {status === 'loading' ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : items.length === 0 ? (
        <Typography color="text.secondary" sx={{ py: 4, textAlign: 'center' }}>
          No products found. Try adjusting the filters.
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {items.map((p) => (
            <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={p.id}>
              <ProductCard product={p} onClick={() => navigate(`/products/${p.id}`)} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default ProductsPage;
