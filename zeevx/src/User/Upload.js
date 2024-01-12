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

import { storage } from '../Auth/firebase';


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

const storageRef = storage.ref();

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
  const { userId } = useParams();
  const [images, setImages] = useState([]);


  const [selectedFile, setSelectedFile] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

 


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/user/${userId}/images`);
        setImages(response.data);
      } catch (error) {
        console.error('Error fetching user images:', error);
      }
    };

    fetchData();
  }, [userId]); 

  const handleUpload = () => {
    if (selectedFile) {
      const uploadTask = storageRef.child(`images/${selectedFile.name}`).put(selectedFile);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle the error, e.g., show an error message to the user
        },
        async () => {
          console.log('File uploaded successfully!');
          // Make an HTTP POST request to your backend after successful upload
          try {
            const response = await axios.post('/upload', {
              title: 'YourTitle', // Replace with the actual title
              description: 'YourDescription', // Replace with the actual description
            });
            console.log('Backend response:', response.data);
          } catch (error) {
            console.error('Error connecting to backend:', error);
            // Handle the error, e.g., show an error message to the user
          }
          
          // Refresh the list of images after successful upload
          await fetchData();
          // You might also want to reset the selected file state if needed
          setSelectedFile(null);
        }
      );
    } else {
      console.warn('No file selected for upload');
      // You might want to show a warning message to the user
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
                      component="div"
                      sx={{
                        // 16:9
                        pt: '56.25%',
                      }}
                      image={item.imageUrl} // Replace with your actual data structure
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.title} {/* Replace with your actual data structure */}
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