import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { ProductFilters as Filters } from '../../types';

interface Props {
  filters: Filters;
  onChange: (f: Partial<Filters>) => void;
}

const regions = ['all', 'international', 'taiwan'];
const sources = ['all', 'Penguin Magic', 'TCC Magic', 'Vanishing Inc', '52magic', 'Other'];
const categories = ['all', 'Card', 'Coin', 'Mentalism', 'iPhone', 'Stage', 'Close-up', 'Street', 'Other'];

const ProductFilters = ({ filters, onChange }: Props) => (
  <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, flexWrap: 'wrap', mb: 3 }}>
    <TextField
      label="Search"
      size="small"
      value={filters.search}
      onChange={(e) => onChange({ search: e.target.value })}
      sx={{ flex: { xs: '1 1 100%', sm: '0 0 auto' }, minWidth: { sm: 180 } }}
    />
    <TextField
      select label="Region" size="small" value={filters.region}
      onChange={(e) => onChange({ region: e.target.value as Filters['region'] })}
      sx={{ flex: { xs: '1 1 45%', sm: '0 0 auto' }, minWidth: { xs: 0, sm: 140 } }}
    >
      {regions.map((r) => <MenuItem key={r} value={r}>{r === 'all' ? 'All Regions' : r === 'taiwan' ? '台灣' : 'International'}</MenuItem>)}
    </TextField>
    <TextField
      select label="Source" size="small" value={filters.source}
      onChange={(e) => onChange({ source: e.target.value as Filters['source'] })}
      sx={{ flex: { xs: '1 1 45%', sm: '0 0 auto' }, minWidth: { xs: 0, sm: 160 } }}
    >
      {sources.map((s) => <MenuItem key={s} value={s}>{s === 'all' ? 'All Sources' : s}</MenuItem>)}
    </TextField>
    <TextField
      select label="Category" size="small" value={filters.category}
      onChange={(e) => onChange({ category: e.target.value as Filters['category'] })}
      sx={{ flex: { xs: '1 1 45%', sm: '0 0 auto' }, minWidth: { xs: 0, sm: 140 } }}
    >
      {categories.map((c) => <MenuItem key={c} value={c}>{c === 'all' ? 'All Categories' : c}</MenuItem>)}
    </TextField>
  </Box>
);

export default ProductFilters;
