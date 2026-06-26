import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Rating from '@mui/material/Rating';
import Divider from '@mui/material/Divider';
import { Review } from '../../types';

const ReviewList = ({ reviews }: { reviews: Review[] }) => {
  if (reviews.length === 0)
    return <Typography color="text.secondary">No reviews yet.</Typography>;

  return (
    <Box>
      {reviews.map((r, i) => (
        <Box key={r.id}>
          <Box sx={{ py: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
              <Typography sx={{ fontWeight: 600 }}>{r.author}</Typography>
              <Typography variant="caption" color="text.secondary">{r.date}</Typography>
            </Box>
            <Rating value={r.rating} size="small" readOnly />
            <Typography variant="body2" sx={{ mt: 0.5 }}>{r.comment}</Typography>
          </Box>
          {i < reviews.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
};

export default ReviewList;
