import React, { useState, useEffect } from 'react';

import "../Css/Upload.css";
import { useParams } from 'react-router-dom';
import axios from '../Utils/axios';

import { Container, Button, Grid, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import AppBar from '@mui/material/AppBar';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

import { storage } from '../Auth/Firebase';
import {ref, uploadBytes, getDownloadURL   } from "firebase/storage"
import useAuth from "../Hooks/useAuth";


function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const storageRef = ref(storage, `/files`)

const defaultTheme = createTheme();
const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function Upload() {

  const { auth } = useAuth();
  const [images, setImages] = useState([]);


  const [selectedFile, setSelectedFile] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

 


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

    const fetchData = async () => {
      try {
        const response = await axios.get(`/user/${auth.uid}/images`);
        setImages(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };
  useEffect(() => {
    fetchData();
  }, [auth.uid]); 

  const handleUpload = async () => {
    if (selectedFile) {
      const fileRef = ref(storageRef, `images/${selectedFile.name}`);
      const snapshot = await uploadBytes(fileRef, selectedFile);
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log('File uploaded successfully!', downloadURL);

      try {
        const response = await axios.post(`/user/${auth.uid}/upload`, {
          name: 'TiTLE', 
         // description: 'YourDescription', // Replace with the actual description
          imgUrl: downloadURL, // Pass the download URL to your backend
        });
        console.log('Backend response:', response.data);
      } catch (error) {
        console.error('Error connecting to backend:', error);
      }

      // Refresh the list of images after successful upload
      await fetchData();
      // Reset the selected file state
      setSelectedFile(null);
    } else {
      console.warn('No file selected for upload');
    }
  };
  

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };


  return (
    <>
      <div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handlePopoverClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <Container maxWidth="sm" className="upload" style={{ padding: '16px' }}>
            <Typography variant="h4" gutterBottom>
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Button
                  component="label"
                  variant="contained"
                  onChange={handleFileChange}
                  startIcon={<CloudUploadIcon />}
                  onClick={handleUpload}
                >
                  Upload Image
                  <VisuallyHiddenInput type="file" />
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Popover>
      </div>

      <ThemeProvider theme={defaultTheme}>

        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Album 
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
               
              </Typography>
              <Fab color="secondary" aria-label="add" onClick={handleButtonClick}>
                <AddIcon />
              </Fab>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            
            <Grid container spacing={4}>
              {images.map((item) => (
                <Grid item key={item.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      src={item.imgUrl} 
                      alt={item.name}

                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.name} {/* Replace with your actual data structure */}
                      </Typography>
                      <Typography>
                        {item.description} {/* Replace with your actual data structure */}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">View</Button>
                      <Button size="small">Edit</Button>
                      <Button variant="outlined" color="error" size="small">
                        Delete
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
    </>
  );
};

export default Upload;