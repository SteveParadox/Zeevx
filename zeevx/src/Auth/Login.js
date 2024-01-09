import React, { useRef, useState, useEffect  } from 'react';
import { FirebaseAuth, provider } from './Firebase.js';
import MicrosoftLogin from './MicrosoftLogin';
import { TextField, Button, Grid, Paper, Typography } from '@mui/material';
import { signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


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

import useAuth from '../Hooks/useAuth';
import {  Link as _Link, useNavigate, useLocation } from 'react-router-dom';

import axios from '../Utils/axios';


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
 // const [username, setUsername] = useState('');
 // const [password, setPassword] = useState('');
    const googleAuth = () => {
      window.open(
        'http://localhost:8001/auth/google/callback',
        "_self"
      );
    };
 
    const { setAuth } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const userRef = useRef(null); 
    const errRef = useRef(null); 
    

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8001/login',
                JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            // setAuth({ user, pwd, roles, accessToken });
            setUser('');
            setPwd('');
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
      };



const handleGoogleLogin = async () => {
  try {
    // Sign in with Google
    const result = await signInWithPopup(FirebaseAuth, provider);
    const user = result.user;
    console.log('Logged in with Google:', user);

    // Get the user's ID token
    const idToken = await user.getIdToken();

    // Send the ID token to your backend
    const response = await fetch('http://localhost:8001/auth/google-login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`, 
      },
      body: JSON.stringify({
        displayName: user.displayName,
        email: user.email,
      }),
    });

    const data = await response.json();

    if (data.success === true) {
      console.log('Setting auth state:', data.user);
      setAuth(data.user);
    }else {
      console.error('Login failed:', data.error);
    }

    console.log('Backend response:', data);

    navigate(from, { replace: true });
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
              ref={userRef}
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={user}
              onChange={(e) => setUser(e.target.value)}
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
                          value={pwd}
                          onChange={(e) => setPwd(e.target.value)}
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
              onClick={googleAuth}
            >
              Sign In
            </Button>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<GoogleIcon />} 
                onClick={handleGoogleLogin}
              >
              </Button>
              <MicrosoftLogin onMicrosoftLogin={handleMicrosoftLogin} />
            </div>

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
