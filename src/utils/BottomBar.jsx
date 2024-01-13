import './bottomBar.css'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Typography,Button,Menu,MenuItem } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {


  return (
    <div>
        <header style={{ backgroundColor: "white" }} className="w-full h-14 flex items-center justify-between">
          <div className="flex items-center px-8 space-x-5">
          <Typography
            className='ty'
            as="a" 
            href="#" 
          >
            <FormatListBulletedIcon /> Overview
          </Typography>
          <Typography
          className='ty'
            as="a" 
            href="/projects"
          >
            <InventoryIcon/> Projects
          </Typography>
            <Button
              variant='contained'
              color='success'
              // onClick={handleClick}
            >
              Create
            </Button>
            <Menu
              // anchorEl={anchorEl}
              // open={Boolean(anchorEl)}
              // onClose={handleClose}
            >
            {/* //   <MenuItem onClick={() => navigate('/addprojects')}>Project</MenuItem>
            //   <MenuItem onClick={() => navigate('Option2')}>Workspace</MenuItem> */}
            </Menu>
            <Button
              variant='contained'
              color='error'
              as="a"
              href='/workspace'
            >
              Go to Workspace
            </Button>
          </div>
        </header>
    </div>
  )
}

export default BottomBar