import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import logo from '/src/assets/flyhas-logo.png';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

// Gradient AppBar with background shape
const StyledAppBar = styled(AppBar)(() => ({
  position: 'relative',
  background: 'linear-gradient(90deg, #007FFF 0%, #005BB5 100%)',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
}));

const StyledToolbar = styled(Toolbar)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minHeight: 70,
  padding: '0 24px',
}));

const NavLinks = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '32px',
}));

const LoginBtn = styled(Button)(() => ({
  backgroundColor: '#fff',
  color: '#005BB5',
  textTransform: 'none',
  padding: '6px 16px',
  '&:hover': { backgroundColor: '#f0f0f0' },
}));

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const isLoggedIn = Boolean(localStorage.getItem('userToken'));
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => { localStorage.clear(); navigate('/Login'); };
  const goToProfile = () => {
    if (userRole === 'ADMIN') navigate('/AdminProfile/MyProfile');
    else if (userRole === 'MANAGER') navigate('/ManagerProfile/MyProfile');
    else navigate('/UserProfile/MyProfile');
  };

  return (
    <>
      <StyledAppBar>
        {/* Decorative background shape */}
        <Box
          sx={{
            position: 'absolute', top: 0, right: 0,
            width: 250, height: '100%',
            background: '#001F5B',
            clipPath: 'polygon(15% 0, 100% 0, 100% 100%, 0 100%)',
            display: { xs: 'none', md: 'block' }, zIndex: 1,
          }}
        />

        <StyledToolbar sx={{ position: 'relative', zIndex: 2 }}>
          {/* Logo & Brand */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <img src={logo} alt="Logo" style={{ width: 48, height: 48 }} />
            <Typography variant="h6" sx={{ color: '#fff', ml: 1 }}>Flyhas</Typography>
          </Box>

          {/* Center Links: only Services & City Guide */}
          <NavLinks>
            <Button
              onClick={() => navigate('/Services')}
              startIcon={<FlightTakeoffIcon sx={{ color: '#ff9800' }} />}
              sx={{
                color: '#f7f7f7',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              Services
            </Button>

            <Button
              onClick={() => navigate('/CityGuide')}
              startIcon={<LocationCityIcon sx={{ color: '#ff9800' }} />}
              sx={{
                color: '#f7f7f7',
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 'bold'
              }}
            >
              City Guide
            </Button>
          </NavLinks>

          {/* Right Actions: Profile or Login */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isLoggedIn ? (
              <>
                <Chip
                  icon={<AccountCircleIcon sx={{ color: '#f7f7f7' }} />}
                  label={`Hello, ${userName}`}
                  variant="outlined"
                  sx={{ borderColor: 'rgba(255,255,255,0.7)', color: '#fff', backgroundColor: 'rgba(0,0,0,0.2)', cursor: 'pointer' }}
                  onClick={goToProfile}
                />
                <IconButton onClick={handleLogout} sx={{ color: '#fff' }}>
                  <ExitToAppIcon />
                </IconButton>
              </>
            ) : (
              <LoginBtn onClick={() => navigate('/Login')} startIcon={<LoginIcon />}>
                Login
              </LoginBtn>
            )}

            {/* Mobile Menu Icon */}
            <IconButton
              edge="end"
              color="inherit"
              onClick={toggleDrawer(true)}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </StyledToolbar>
      </StyledAppBar>

      {/* Mobile Drawer: only Services & City Guide */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)} ModalProps={{ keepMounted: true, disableScrollLock: true }}>
        <List sx={{ width: 250 }}>
          <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/Services'); }}>
            <ListItemIcon><FlightTakeoffIcon /></ListItemIcon>
            <ListItemText primary="Services" />
          </ListItemButton>
          <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/CityGuide'); }}>
            <ListItemIcon><LocationCityIcon /></ListItemIcon>
            <ListItemText primary="City Guide" />
          </ListItemButton>
          {isLoggedIn ? (
            <>
              <ListItemText sx={{ ml: 2, mt: 1, mb: 1 }} primary={`Hello, ${userName}`} />
              <ListItemButton onClick={() => { setDrawerOpen(false); goToProfile(); }}>
                <ListItemIcon><AccountBoxIcon /></ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
              <ListItemButton onClick={() => { setDrawerOpen(false); handleLogout(); }}>
                <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItemButton>
            </>
          ) : (
            <ListItemButton onClick={() => { setDrawerOpen(false); navigate('/Login'); }}>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;