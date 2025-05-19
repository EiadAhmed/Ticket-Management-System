// LoadingSpinner.js
import React from 'react';
import { Button, Box } from '@mui/material';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
  const navigate = useNavigate();
  const cookies = new Cookies();

  const handleLogout = () => {
    cookies.remove('Token', { path: '/' });
    navigate('/login');
  };

  return (
    <Box 
      sx={{ 
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 1000 
      }}
    >
      <Button
        variant="contained"
        onClick={handleLogout}
        startIcon={<LogoutIcon />}
        sx={{
          backgroundColor: 'rgb(8, 141, 110)',
          '&:hover': {
            backgroundColor: 'rgb(6, 111, 87)'
          },
          color: 'white',
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '8px',
          boxShadow: 2,
          px: 3,
          py: 1
        }}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Logout;