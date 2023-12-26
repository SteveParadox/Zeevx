import React from 'react';
import { AppBar, Avatar, Typography, Paper, Grid, Button, Tabs, Tab } from '@mui/material';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles((theme) => ({
  profileHeader: {
    // Custom styles
  },
  avatar: {
    // Custom styles
  },
  statItem: {
    // Custom styles
  },
  actionButton: {
    // Custom styles
  },
  // Add more styles as needed
}));

function Test() {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static" className={classes.profileHeader}>
        {/* AppBar content */}
      </AppBar>
      <Paper elevation={6} className={classes.avatar}>
        <Avatar src="/path/to/profile/image.jpg" />
      </Paper>
      <Typography variant="h6">Asad Dukku</Typography>
      <Typography variant="subtitle1">Creative Director</Typography>
      <Grid container>
        <Grid item className={classes.statItem}>
          <Typography variant="h6">720</Typography>
          <Typography>Posts</Typography>
        </Grid>
        {/* Repeat for followers and following */}
      </Grid>
      <Button variant="contained" color="primary" className={classes.actionButton}>
        Follow
      </Button>
      {/* Repeat for other buttons */}
      <Tabs value={0} indicatorColor="primary" textColor="primary">
        <Tab label="Timeline" />
        {/* Repeat for other tabs */}
      </Tabs>
      {/* Add more components as needed */}
    </div>
  );
}

export default Test;
