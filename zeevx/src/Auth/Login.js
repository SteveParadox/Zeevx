import React, { useState } from 'react';
import { FirebaseAuth, provider } from './Firebase.js';
import MicrosoftLogin from './MicrosoftLogin';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';


import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import GoogleIcon from '@mui/icons-material/Google';
import "../Css/Login.css";
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="/">
        ZeeVX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const handleLogin = () => {
    // Implement your traditional login logic here
    // You can use state values (username and password) for authentication
  };


  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(FirebaseAuth, provider);
      const user = result.user;
      console.log('Logged in with Google:', user);
  
      const response = await fetch('http://localhost:8001/google-login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          displayName: user.displayName,
          email: user.email,
        }),
      });
  
      const data = await response.json();
      console.log('Backend response:', data);
  
      navigate('/home');
    } catch (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };


  const handleMicrosoftLogin = (loginResponse) => {
    // Handle the Microsoft login response, e.g., send to server, update state, etc.
    console.log('Microsoft login response:', loginResponse);
  };


  return (
    <ThemeProvider theme={defaultTheme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form"  noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <TextField
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          autoComplete="current-password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
          <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<GoogleIcon />} 
          onClick={handleGoogleLogin}
        >
          Login with Google
        </Button>
        <MicrosoftLogin onMicrosoftLogin={handleMicrosoftLogin} />
        <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
        
  );
};

export default Login;
