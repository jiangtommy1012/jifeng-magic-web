import React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorefrontIcon from '@mui/icons-material/Storefront';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import ChatIcon from '@mui/icons-material/Chat';
import GroupsIcon from '@mui/icons-material/Groups';
import RadarIcon from '@mui/icons-material/Radar';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate, useLocation } from 'react-router-dom';
import Chip from '@mui/material/Chip';

const DRAWER_WIDTH = 220;

const activeRoutes = [
  { label: 'Dashboard', path: '/', icon: <DashboardIcon /> },
  { label: 'Products', path: '/products', icon: <StorefrontIcon /> },
  { label: 'Trending', path: '/trending', icon: <TrendingUpIcon /> },
];

const futureRoutes = [
  { label: 'AI Chat', path: '/chat', icon: <ChatIcon /> },
  { label: 'Community Buzz', path: '/community', icon: <GroupsIcon /> },
  { label: 'Early Signals', path: '/signals', icon: <RadarIcon /> },
  { label: 'Weekly Report', path: '/weekly-report', icon: <SummarizeIcon /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Box sx={{ width: DRAWER_WIDTH }}>
      <List dense>
        {activeRoutes.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              selected={pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path))}
              onClick={() => navigate(item.path)}
              sx={{ borderRadius: 1, mx: 0.5 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 1 }} />

      <Typography variant="caption" color="text.secondary" sx={{ px: 2, py: 0.5, display: 'block' }}>
        Coming Soon
      </Typography>

      <List dense>
        {futureRoutes.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              onClick={() => navigate(item.path)}
              sx={{ borderRadius: 1, mx: 0.5, opacity: 0.6 }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
              <Chip label="Soon" size="small" sx={{ fontSize: 10, height: 18 }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export { DRAWER_WIDTH };
export default Sidebar;
