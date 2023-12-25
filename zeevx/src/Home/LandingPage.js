// LandingPage.js
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Container maxWidth="md" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to Your Kingdom
      </Typography>
      <Typography variant="h5" paragraph>
        Discover the wonders and beauty of your kingdom. Join us on an extraordinary journey.
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/login">
        Get Started
      </Button>
    </Container>
  );
};

export default LandingPage;
