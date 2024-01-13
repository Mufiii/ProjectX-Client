import { Outlet } from 'react-router-dom';
import WorkspaceBar from './WorkspaceBar.jsx';
import SideBar from '../../utils/SideBar.jsx';
import Secondbar from '../../utils/Secondbar.jsx';
import axios from 'axios';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext.jsx';



const Workspace = () => {

  const { workspaces, setWorkspaces, authToken } = useContext(AuthContext);

  const listWorkspace = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/workspace/', {
        headers: {
          'Authorization': `Bearer ${authToken.access}`,
        },
      });
      setWorkspaces(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    listWorkspace();
  }, []);

  return (
    <div>
      <WorkspaceBar workspaces={workspaces} />


        <div className='flex'> <SideBar />      <Outlet /></div>
        {/* <div> <Secondbar /></div> */}


      <div>
      </div>
      
    </div>
  );
};

export default Workspace;
