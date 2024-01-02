
import './bottomBar.css'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Typography } from '@mui/material';

const BottomBar = () => {
  return (
    <div>
        <header style={{ backgroundColor: "black" }} className="w-full h-14 flex items-center justify-between">
          <div className="flex items-center px-8 space-x-5">
          <Typography
          className='ty'
            as="a" 
            href="#" 
            // onClick={handleOverviewClick}
          >
            <FormatListBulletedIcon /> Overview
          </Typography>
          <Typography
          className='ty'
            as="a" 
            href="/projects"
            // onClick={handleOverviewClick}
          >
            <InventoryIcon/> Projects
          </Typography>
          </div>
        </header>
    </div>
  )
}

export default BottomBar