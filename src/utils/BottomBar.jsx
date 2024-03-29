import './bottomBar.css'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Typography, Button, Menu, MenuItem } from '@mui/material';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const BottomBar = () => {

  const {logoutUser} = useContext(AuthContext)
  
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
            <InventoryIcon /> Projects
          </Typography>
          <Button
            variant='contained'
            color='success'
            as="a"
            href='/workspace'
          >
            Go to Workspace
          </Button>
          <Button onClick={(e) => logoutUser(e)} variant="contained" color="error" className='float-right'>
            Log out
          </Button>
        </div>
      </header>
    </div>
  )
}

export default BottomBar