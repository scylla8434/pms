import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const drawerWidth = 240;

interface Props {
  window?: () => Window;
  children: React.ReactNode;
}

export default function ResponsiveLayout(props: Props) {
  // Toggle drawer for mobile
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const { window, children } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  const container = window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {[
          { text: 'Dashboard', path: '/' },
          { text: 'Projects', path: '/projects' },
          { text: 'Tasks', path: '/tasks' },
          { text: 'Teams', path: '/teams' },
          { text: 'Reports', path: '/reports' },
          { text: 'Files', path: '/files' }
        ].map(({ text, path }) => (
          <ListItem component="button" key={text} onClick={() => navigate(path)}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  // Only show layout for authenticated/protected routes
  const publicRoutes = ['/login', '/register', '/reset-password'];
  if (!isAuthenticated && publicRoutes.includes(location.pathname)) {
    return <>{children}</>;
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Project Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          background: theme.palette.background.default,
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}
