import { styled } from '@mui/system';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import { Avatar, Button, ListItem, ListItemText } from '@mui/material';
import WorkspaceInviteModal from './WorkspaceInviteModal';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentWorkspace } from '../Redux/slices/WorkspaceSlice';
// import { boardError, boardLoading, selectBoards } from '../Redux/slices/BoardSlice';
import { fetchWorkspaceData } from '../Redux/Actions/Actions';
import { deepOrange } from '@mui/material/colors';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useParams } from 'react-router-dom';
import { selectWorkspaceData } from '../Redux/slices/WorkspaceDataSlice';




const Sidebar = styled('div')({
  width: '100%',
  maxWidth: '290px',
  height: '83.5%',
  backgroundColor: '#242424',
  color: '#fff',
  padding: '10px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 1000,
});

const MenuItem = styled('div')({
  marginBottom: '10px',
  cursor: 'pointer',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  '&:hover': {
    backgroundColor: '#555',
  },
  '& svg': {
    marginRight: '8px',
  },
});

const Separator = styled('div')({
  borderTop: '1px solid #555',
  width: '100%',
  marginTop: '10px',
});


const SideBar = ({ handleOpen }) => {

  const { store } = useContext(AuthContext)
  const currentWorkspace = useSelector(selectCurrentWorkspace);
  const { workspace_id } = useParams()

  const dispatch = useDispatch()

  // const boards = useSelector(selectBoards)
  // const loading = useSelector(boardLoading)
  // const error = useSelector(boardError)
  const boards = useSelector(selectWorkspaceData)

  useEffect(() => {
    console.log("inside board useeffect");
    dispatch(fetchWorkspaceData(workspace_id))
      .then((result) => console.log("fetch success:", result))
      .catch((err) => console.error("fetch error:", err));
  }, [dispatch])

  // if (loading) {
  //   console.log('Loading...');
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   console.log('Error:', error);
  //   return <p>Error: {error}</p>;
  // }

  // console.log('Boards:', boards);


  return (
    <Sidebar>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <div className='flex mx-5'>
          <p style={{ fontSize: "1.5em", fontWeight: "700" }}>
            {currentWorkspace ? currentWorkspace.name : 'No workspace selected'}
          </p>
          {/* <Button style={{color:"gray"}}> <ArrowBackIosOutlinedIcon /> </Button> */}
        </div>
      </div>
      <Separator />
      <div style={{ marginTop: '10px' }}>
        <MenuItem>
          <SpaceDashboardIcon />
          Boards
        </MenuItem>
        <MenuItem className='flex justify-between' >
          <PersonOutlineOutlinedIcon onClick={() => handleOpen(<WorkspaceInviteModal />)} />
          Members<WorkspaceInviteModal /> 
          <AddIcon />
        </MenuItem>
      </div>
      <label style={{ marginTop: '5px', padding: '10px', color: 'white', fontSize: '16px' }}>
        Your Boards <AddIcon/>
      </label>
      <div>
        {boards.boards.map((board, index) => (
          <div key={index}>
            <ListItem className='flex justify-center'>
              <Avatar style={{ backgroundColor: deepOrange[500] }} variant="square">
                {board.title.charAt(0).toUpperCase()}
              </Avatar>
              <ListItemText
                primary={board.title}
                style={{ color: "white", margin: "auto", paddingLeft: '8px' }}
                />
                <MoreHorizIcon/>
            </ListItem>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};

export default SideBar;
