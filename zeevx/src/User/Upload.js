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
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';



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


  // const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = () => {
    // Implement your upload logic here
    // You can use the 'selectedFile' state to perform further actions
    if (selectedFile) {
      console.log("Uploading file:", selectedFile);
      // Add your logic to upload the file, e.g., to a server or cloud storage
    } else {
      console.warn("No file selected for upload");
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
