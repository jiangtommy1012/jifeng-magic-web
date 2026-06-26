import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActionArea from '@mui/material/CardActionArea';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
}

const regionColor: Record<string, 'primary' | 'secondary'> = {
  international: 'primary',
  taiwan: 'secondary',
};

const ProductCard = ({ product, onClick }: ProductCardProps) => (
  <Card elevation={2} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
    <CardActionArea onClick={onClick} sx={{ flexGrow: 1 }}>
      <CardMedia
        component="img"
        height="160"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
          <Chip label={product.category} size="small" color="default" />
          <Chip label={product.region === 'taiwan' ? '台灣' : 'International'} size="small" color={regionColor[product.region]} />
        </Box>
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }} gutterBottom noWrap>
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {product.creator} · {product.source}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Rating value={product.rating} precision={0.1} size="small" readOnly />
          <Typography variant="caption" color="text.secondary">({product.reviewCount})</Typography>
        </Box>
        <Typography variant="h6" color="primary" sx={{ mt: 1 }}>
          ${product.price}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default ProductCard;
