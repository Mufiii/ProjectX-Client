import React from 'react';
import { Box, Grid, Typography } from '@mui/material';

const 
MyComponent = () => {
  return (
    <div className='p-7'>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        bgcolor="black"
        color={'white'}
        padding={5}
        style={{ borderRadius: "15px" }}
      >
        <Grid container >
          <Grid item xs={3} >
            <div className='flex flex-col justify-center'>
              <Typography style={{marginBottom:"7px"}}>About Us</Typography>
              <Typography style={{marginBottom:"7px"}}>Feedback</Typography>
              <Typography style={{marginBottom:"7px"}}>Community</Typography>
            </div>
          </Grid>
          <Grid item xs={3} className='flex justify-center'>
            <div className='flex flex-col justify-center'>
              <Typography cstyle={{marginBottom:"7px"}}>Trust,Safety,Security</Typography>
              <Typography style={{marginBottom:"7px"}}>Help & Support</Typography>
              <Typography style={{marginBottom:"7px"}}>Gowork Foundation</Typography>
            </div>
          </Grid>
          <Grid item xs={3} className='flex justify-center'>
            <div className='flex flex-col justify-center'>
              <Typography style={{marginBottom:"7px"}}>Terms of service</Typography>
              <Typography style={{marginBottom:"7px"}}>Privacy Policy</Typography>
              <Typography style={{marginBottom:"7px"}}>Cookie settings</Typography>
            </div>
          </Grid>
          <Grid item xs={3} className='flex justify-center'>
            <div className='flex flex-col justify-center'>

              <Typography style={{marginBottom:"7px"}}>Accecebility</Typography>
              <Typography style={{marginBottom:"7px"}}>Enterprise Solutions</Typography>
              <Typography style={{marginBottom:"7px"}}></Typography>
            </div>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default MyComponent;