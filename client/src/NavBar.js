import React, { useContext } from 'react';

//mui imports
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { AuthContext } from './context/auth';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);

  const pages = ['Calendar', 'Lessons', 'Create'];
  const settings = user
    ? ['Profile', 'Dashboard', 'Logout']
    : ['LogIn', 'Register'];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const navigate = useNavigate();

  const logOutAndNavigate = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleClickNavMenu = (route) => {
    if (route) {
      navigate(route, { replace: true });
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      className='nav-bar'
      position='static'
      sx={{ backgroundColor: '#6D8A96' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              fontFamily: 'Ubuntu',
              mr: 2,
              display: { xs: 'none', md: 'flex' },
            }}>
            WantIn
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'>
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={() => {
                handleClickNavMenu();
              }}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}>
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handleClickNavMenu(`/${page.toLowerCase()}`);
                  }}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant='h6'
            noWrap
            component='div'
            sx={{
              fontFamily: 'Ubuntu',
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}>
            WantIn
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => {
                  handleClickNavMenu(`/${page.toLowerCase()}`);
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}>
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title='Open settings'>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user ? `${user.username[0].toUpperCase()}` : 'U'}
                  src='/static/images/avatar/2.jpg'
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id='menu-appbar'
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}>
              {settings.map((setting) => {
                if (setting === 'Logout') {
                  return (
                    <MenuItem key={setting} onClick={logOutAndNavigate}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  );
                }
                if (setting === 'Dashboard') {
                  return (
                    <MenuItem
                      key={setting}
                      onClick={() => {
                        navigate(`/dashboard/${user.id}`);
                      }}>
                      <Typography textAlign='center'>{setting}</Typography>
                    </MenuItem>
                  );
                }
                return (
                  <MenuItem
                    key={setting}
                    onClick={() => {
                      handleClickNavMenu(`/${setting.toLowerCase()}`);
                    }}>
                    <Typography textAlign='center'>{setting}</Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
