// import './bottomBar.css'
import { Typography, Button, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import CreateWorkSpace from './CreateWorkSpace';
import { AuthContext } from '../../context/AuthContext';
import CreateBoard from '../Board/CreateBoard';
import { useDispatch, useSelector } from 'react-redux';
import { selectWorkspaces, selectLoading, selectError } from '../../Redux/slices/WorkspaceSlice';
import { fetchAllWorkspaces } from '../../Redux/Actions/WorkspaceActions';

const BottomBar = () => {

  const [anchorEl, setAnchorEl] = useState(null);
  const [drop, setDrop] = useState(null);
  const { setStore } = useContext(AuthContext)

  const navigate = useNavigate()
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenMenu = (event) => {
    setDrop(event.currentTarget);
  };

  const handleMenuItemClick = (index) => {
    setSelectedIndex(index);
    setDrop(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseMenu = () => {
    setDrop(null);
  };
  const selectedItem = (workspace) => {
    setStore({ id: workspace.id, name: workspace.name });
    navigate(`/workspace/${workspace.id}`);
  };

  const dispatch = useDispatch();
  const workspaces = useSelector(selectWorkspaces);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    console.log('Inside useEffect');
    dispatch(fetchAllWorkspaces())
      .then((result) => console.log('Fetch success:', result))
      .catch((err) => console.error('Fetch error:', err));
  }, [dispatch]);

  if (loading) {
    console.log('Loading...');
    return <p>Loading...</p>;
  }

  if (error) {
    console.log('Error:', error);
    return <p>Error: {error}</p>;
  }

  // console.log('Workspaces:', workspaces);


  return (
    <div>
      <header style={{ backgroundColor: "#242424" }} className="w-full h-14 flex items-center justify-between">
        <div className="flex items-center px-8 space-x-5">
          <Button style={{ color: "white", fontWeight: "bold" }}>Home</Button>
          <div>
            <Button onClick={handleOpenMenu}>
              <span style={{ color: "white", fontWeight: "bold" }}>
                workspaces <KeyboardArrowDownIcon />
              </span>
            </Button>
            <Menu
              id="workspace-menu"
              anchorEl={drop}
              open={Boolean(drop)}
              onClose={handleCloseMenu}
            >
              {workspaces.map((workspace, index) => (
                <MenuItem
                  key={workspace.id}
                  style={{ width: '250px' }}
                  selected={index === selectedIndex}
                  onClick={() => selectedItem(workspace)}
                >
                  {workspace.name}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <Button
            variant='contained'
            color='success'
            onClick={handleClick}
          >
            Create
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem style={{ width: "200px" }} >
              {/* <PeopleAltIcon/> Create Workspace */}
              <CreateWorkSpace />
            </MenuItem>
            <MenuItem >
              <SpaceDashboardIcon />
              <CreateBoard />
            </MenuItem>
          </Menu>
        </div>
      </header>
    </div>
  )
}

export default BottomBar