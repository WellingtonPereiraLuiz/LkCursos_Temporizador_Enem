import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box,
  Button
} from '@mui/material';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AppBar 
      position="fixed" 
      sx={{
        background: isScrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent',
        boxShadow: isScrolled ? '0px 2px 4px rgba(0, 0, 0, 0.1)' : 'none',
        transition: 'all 0.3s ease-in-out'
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img 
              src="/imagen/icone.png" 
              alt="LK Cursos" 
              style={{ 
                height: '32px',
                width: 'auto',
                marginRight: '8px'
              }} 
            />
            <Typography
              variant="h6"
              component="a"
              href="#"
              sx={{
                ml: 2,
                color: '#A8E10C',
                textDecoration: 'none',
                fontWeight: 700
              }}
            >
              LK CURSOS
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button color="inherit" href="#home">
              Home
            </Button>
            <Button color="inherit" href="#sobre">
              Quem Somos
            </Button>
            <Button color="inherit" href="#enem">
              Próximo ENEM
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;