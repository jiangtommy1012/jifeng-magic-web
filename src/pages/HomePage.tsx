import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { increment, decrement, reset } from '../store/counterSlice';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { useThemeContext } from '../context/ThemeContext';

const HomePage = () => {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter.value);
  const { isDarkMode } = useThemeContext();

  return (
    <Box sx={{ p: 4, maxWidth: 600, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Jifeng Magic Web
      </Typography>

      <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
        <Chip label="React" color="primary" />
        <Chip label="Redux Toolkit" color="secondary" />
        <Chip label="MUI" color="success" />
        <Chip label="useContext" color="warning" />
      </Stack>

      <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="subtitle1" gutterBottom>
          Current Theme: {isDarkMode ? 'Dark' : 'Light'}
        </Typography>
        <Typography variant="h2" sx={{ my: 2 }}>
          {count}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Redux Counter (state managed by Redux Toolkit)
        </Typography>
        <ButtonGroup variant="contained" sx={{ mt: 2 }}>
          <Button onClick={() => dispatch(decrement())}>-</Button>
          <Button onClick={() => dispatch(reset())} color="secondary">
            Reset
          </Button>
          <Button onClick={() => dispatch(increment())}>+</Button>
        </ButtonGroup>
      </Paper>
    </Box>
  );
};

export default HomePage;
