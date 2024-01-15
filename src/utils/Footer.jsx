import React from 'react';
import { Box, Typography } from '@mui/material';

const MyComponent = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      bgcolor="primary.main"
      padding={2}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        AFSL Web App
      </Typography>
      <Typography variant="h6" component="p" gutterBottom>
        Sub project
      </Typography>
      <Typography variant="body1" component="p" gutterBottom>
        Next review in 17 days
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" component="span" mr={1}>
          13
        </Typography>
        <Typography variant="body1" component="span">
          tasks completed
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" component="span" mr={1}>
          9
        </Typography>
        <Typography variant="body1" component="span">
          tasks remaining
        </Typography>
      </Box>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" component="span" mr={1}>
          32
        </Typography>
        <Typography variant="body1" component="span">
          total tasks
        </Typography>
      </Box>
      <Typography variant="body1" component="p" gutterBottom>
        Josephine Blanton
      </Typography>
    </Box>
  );
};

export default MyComponent;