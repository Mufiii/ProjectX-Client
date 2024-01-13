
import { styled } from '@mui/system';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';

const Sidebar = styled('div')({
  width: '18rem', // Set to 100% width
  Width: '300px', // Limit maximum width
  // height: '100vh',
  backgroundColor: '#242424',
  color: '#fff',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
});

const MenuItem = styled('div')({
  marginBottom: '10px',
  cursor: 'pointer',

});

const Separator = styled('div')({
  borderTop: '1px solid #555', // Adjust color and width as needed
  width: '100%',
  marginTop:"10px"
});


const SideBar = () => {


  const { currentWorkspace } = useSelector((state) => state.workspace);
  console.log(currentWorkspace,"hgh");

  return (
    <div>
      <Sidebar className='h-full min-h-[43.2rem]'>
        <div className='flex justify-around'>

      <div>
          {currentWorkspace ? (
            currentWorkspace.name
            ):(<p>yoyoooo</p> )}
          
          <Button>
            <ArrowCircleLeftOutlinedIcon />
          </Button>
      </div>
    </div>
        <Separator/>
        <div className='mt-2'>
          <MenuItem>
            <SpaceDashboardIcon /> Boards
          </MenuItem>
          <MenuItem >
            <PersonOutlineOutlinedIcon /> Members <AddIcon />
          </MenuItem>
        </div>
        <label className='mt-5'>Your Boards</label>
      </Sidebar>

    </div>
  )
}

export default SideBar