import React, { useState } from 'react';
import { auth, provider } from './Firebase.js';
import { TextField, Button, Grid, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your traditional login logic here
    // You can use state values (username and password) for authentication
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Logged in with Google:', user);
      // Add your logic after successful Google login
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={6}>
      <Card sx={{ maxWidth: 345 }}>

      <CardContent>

        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
              </CardContent>
              <CardActions>
        <Button variant="contained" color="primary" onClick={handleLogin}>
          Login
        </Button>
        <Button variant="contained" color="secondary" onClick={handleGoogleLogin}>
          Login with Google
        </Button>
        </CardActions>
        </Card>

      </Grid>
    </Grid>
  );
};

export default Login;
